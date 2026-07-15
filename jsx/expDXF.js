(function () {

#include 'div.js';
#include 'del.js';
#include 'smooth.js';

// === ДИАГНОСТИКА: поставь DEBUG_MODE = true если вдруг опять перестанет сохранять ===
var DEBUG_MODE = false;
function dbg(msg) { if (DEBUG_MODE) alert("[DXF] " + msg); }

var PMagenta = new CMYKColor();
PMagenta .name = 'Process Magenta';
PMagenta .black =0; 
PMagenta .cyan = 0; 
PMagenta .magenta = 100; 
PMagenta .yellow = 0;

//const mm = 72/25.4;
// Был:
//   const TOLERANCE = 0.5;
//   const T_STEP = 0.05;
//   const T_MIN_SEGMENT = 0.05;
// Теперь:
var TOLERANCE = (typeof $.global.Tolerance !== 'undefined' && parseFloat($.global.Tolerance) > 0)
    ? parseFloat($.global.Tolerance)
    : 0.5;
var T_STEP = TOLERANCE / 10;          // 0.5 → 0.05 — как было по умолчанию
var T_MIN_SEGMENT = T_STEP;

// === Параметры искажения геометрии перед записью DXF ===
// Передаются из index.html через main.js → hostscript.jsx → $.global
// DIST_X         — масштаб по X в % (100 = без изменений)
// DIST_SHEAR     — наклон по горизонтали (x' = x + tan(α)·y), 0 = без наклона
// DIST_SHEAR_Y   — наклон по вертикали   (y' = y + tan(β)·x), 0 = без наклона
var DIST_X = (typeof $.global.DistX !== 'undefined' && !isNaN(parseFloat($.global.DistX)))
    ? parseFloat($.global.DistX) : 100;
var DIST_SHEAR = (typeof $.global.DistShear !== 'undefined' && !isNaN(parseFloat($.global.DistShear)))
    ? parseFloat($.global.DistShear) : 0;
var DIST_SHEAR_Y = (typeof $.global.DistShearY !== 'undefined' && !isNaN(parseFloat($.global.DistShearY)))
    ? parseFloat($.global.DistShearY) : 0;
const MIN_ANGLE = 0, // Degrees range for the Tolerance
      MAX_ANGLE = 180, // Degrees range for the Tolerance
      COS_INACCURACY = -0.999999, // Correction of coordinate inaccuracy
      COS_180 = -1,
      COS_0 = 1;
	  
var p, op, pnts;
var docRef = app.activeDocument;
var layerName = "Knife";
var lazerName = null;
docRef.selection = null;

dbg("start. Nams=" + Nams + ", irll=" + irll);

//alert(docRef.layers["RLL"].name);
try {
	if (docRef.layers["RLL"].name === "RLL"){
		dbg("RLL exists, using existing");
		lazerName = docRef.layers["RLL"];
		docRef.layers["RLL"].hasSelectedArtwork = true;
		pnts = laser();
		dbg("laser() returned " + (pnts ? pnts.length + " paths" : "nothing"));
		saves(Nams, pnts);
	}
} catch(e) {	
	dbg("RLL doesn't exist, creating. exception: " + e);

	lazerName = docRef.layers.add();
		lazerName.name="RLL";
		lazerName.printable = false;
		lazerName.zOrder(ZOrderMethod.SENDTOBACK);	

	dbg("Knife layer pageItems: " + docRef.layers[layerName].pageItems.length);

	// === Копируем Knife → RLL внутрь ОДНОЙ обёрточной группы. ===
	// Это нужно, чтобы потом применить искажение (X / Shear) ко всей
	// раскладке как к единому целому: group.width *= sxF и group.shear()
	// действуют на содержимое пропорционально, как делает hostscript для
	// основной дисторции (см. строка ~462: newGroup.width *= Distor).
	// БЕЗ обёрточной группы каждый pathItem трансформируется относительно
	// своего собственного центра — формы сжимаются, но раскладка
	// (расстояния между ними) остаётся прежней — это не то, что нужно.
	var rllWrap = lazerName.groupItems.add();
	for (var i = docRef.layers[layerName].pageItems.length - 1; i >= 0; i--) {
		var pageItem = docRef.layers[layerName].pageItems[i];
		pageItem.duplicate(rllWrap, ElementPlacement.PLACEATBEGINNING);
	}

	// === Применяем искажение к ОБЁРТОЧНОЙ ГРУППЕ ===
	// Сразу после копирования и ДО ungroup — пока есть единый groupItem,
	// который Illustrator умеет ресайзить как единое целое.
	applyRllDistortion(rllWrap, DIST_X, DIST_SHEAR, DIST_SHEAR_Y);

	// Теперь выделяем уже искажённую группу и разбираем её на отдельные
	// pathItem (как было раньше — для последующей работы laser/saves).
	docRef.selection = null;
	lazerName.hasSelectedArtwork = true;

	dbg("before ungroup, selection length: " + docRef.selection.length);
	ungroup();
	dbg("after ungroup, selection length: " + docRef.selection.length);

	if (irll != 0) { addDensityMath(irll); convertPoint(); };

	docRef.selection = null;

	var angleRLL = lazerName.pathItems.add();
    angleRLL.setEntirePath( Array( Array((Rap*mm+3*mm), 0), Array((Rap*mm+1*mm), 1.5*mm), Array((Rap*mm+3*mm), 3*mm)) );
    angleRLL.stroked = true;
    angleRLL.strokeColor = PMagenta;
    angleRLL.strokeWidth = 0.2*mm;
    angleRLL.filled = false;

	lazerName.hasSelectedArtwork = true;
	dbg("before laser(), RLL selected items: " + docRef.selection.length);

	pnts = laser();
	dbg("laser() returned " + (pnts ? pnts.length + " paths" : "nothing or empty"));

	saves(Nams, pnts);
	dbg("saves() completed");
}

	docRef.selection = null;


/*
for (var i = 0; i < docRef.selection.length; i++) {
    var selectedItem = docRef.selection[i];
    // Check if the item is a path and is stroked
    if (selectedItem.typename == "PathItem") {
        selectedItem.strokeColor = PMagenta; // Apply the new color
		selectedItem.strokeWidth = 0.2*mm;
    }
}
*/
function saves(znamber, pathes){
	var SDefault = "";
    dbg("saves() called, znamber=" + znamber + ", pathes.length=" + (pathes ? pathes.length : "undefined"));
    if (!pathes || pathes.length === 0) {
        dbg("saves(): pathes is empty, abort");
        return;
    }
    var path = '\\\\storage\\zakaz\\'+znamber.substr (0, znamber.length-3)+'000-'+znamber.substr (0, znamber.length-3)+'999\\'+znamber+'/laser/RLL.dxf';
    dbg("saves(): path = " + path);
    var SaveFileDefault = new File( path );
    var opened = SaveFileDefault.open ("w");
    dbg("saves(): file.open() = " + opened + ", File.error = " + SaveFileDefault.error);
    if (!opened) {
        alert("Не удалось открыть файл для записи:\n" + path + "\n\nОшибка: " + SaveFileDefault.error);
        return;
    }
    SaveFileDefault.write("0\nSECTION\n2\nENTITIES\n"); 

    for(var i = 0; i < pathes.length; i++){
     SDefault += convertToArc(pathes[i], SaveFileDefault);
	 
    }
	SDefault += "ENDSEC\n0\nEOF";
    SaveFileDefault.write(SDefault);  
    SaveFileDefault.close();
    dbg("saves(): DONE, written " + SDefault.length + " chars");
}


function laser(){
/*
    // targets are the open-pathes with 2 or more anchors
    docRef.selection = null;
    //alert (docRef.layers[0].name);
    try {
      
        for(var i = 0; i < docRef.layers[layerName].pathItems.length; i++)
            docRef.layers[layerName].pathItems[i].selected = true;
        
        for(var i = 0; i < docRef.layers[layerName].groupItems.length; i++)
            docRef.layers[layerName].groupItems[i].selected = true;
        
        for(var i = 0; i < docRef.layers[layerName].compoundPathItems.length; i++)
            docRef.layers[layerName].compoundPathItems[i].selected = true;

    } catch (e) {
        alert("Layer with name - " + layerName + " doesn't exists");
    }
	
*/

    var pathes = [];
    getPathItemsInSelection(1, pathes);
    if(pathes.length < 1){
      //alert("pathes.length < 1 "+pathes.length);
      return;
    }
	return pathes;

  }

// ------------------------------------------------
// extract PathItems from the selection which length of PathPoints
// is greater than "n"
function getPathItemsInSelection(n, pathes){
    if(documents.length < 1) return;
    
    var s = activeDocument.selection;
    
    if (!(s instanceof Array) || s.length < 1) return;
	
    //alert ( s.length);
    extractPathes(s, n, pathes);
  }
  
  // --------------------------------------
  // extract PathItems from "s" (Array of PageItems -- ex. selection),
  // and put them into an Array "pathes".  If "pp_length_limit" is specified,
  // this function extracts PathItems which PathPoints length is greater
  // than this number.
  function extractPathes(s, pp_length_limit, pathes){
    for(var i = 0; i < s.length; i++){
      if(s[i].typename == "PathItem"){
         //&& !s[i].closed){ // open pathes only
        if(pp_length_limit && s[i].pathPoints.length <= pp_length_limit){
          continue;
        }
        pathes.push(s[i]);
        
      } else if(s[i].typename == "GroupItem"){
        // search for PathItems in GroupItem, recursively
        extractPathes(s[i].pageItems, pp_length_limit, pathes);
        
      } else if(s[i].typename == "CompoundPathItem"){
        // searches for pathitems in CompoundPathItem, recursively
        // ( ### Grouped PathItems in CompoundPathItem are ignored ### )
        extractPathes(s[i].pathItems, pp_length_limit , pathes);
      }
    }
  }

  function convertToArc(pi, SaveFile){
    
    var p = pi.pathPoints;

    if (p.length < 2) return false;

/* var line = newLayer.pathItems.add();
      line.stroked = true;
      line.filled = false;
      line.strokeWidth = 0.2*mm;
      line.strokeColor = PMagenta; */

var newPoints = [];
var newPts = [];
var delPts = [];
var outPts = []
var figClose = false;

  //var newPoint = line.pathPoints.add();
   // for (i = 0; i < p.length; i++){
   //   newPoints[i] = p[i];
   // }

    //if  (pi.closed) {
     // newPoints[p.length+1] = p[0];
    //};


        //alert(result);
    //for (i = 0; i < p.length; i++) newPoints.push(getData(p[i], line));


   //if (pi.closed) newPoints.push(getData(p[0], line));
var d = delPoints(p);

for (var i = 0; i < d.length; i++) newPts.push(d[i]);

if (pi.closed) {newPts.push(d[0]); figClose = true;}

var t = 1;

var n = newPts.length;
var j = 0, i = 0;
var newPnt2 = newPts[0].leftDirection;
var newPnt1 = newPts[0].rightDirection;

while( i < n ) {

  var pointStart = newPts[j];
  var pointEnd = newPts[j+1];

        newPoints.push(getDat(newPts[j]));

        newPoints[i][2] = newPnt2;
        newPoints[i][1] = newPnt1;
        //markPnt(newPts[j].anchor,1);

        newPnt2 = newPts[j].leftDirection;
        newPnt1 = newPts[j].rightDirection;

        if (j < newPts.length-1 && getPointType(getDataRevert(newPts[j]), getDataRevert(newPts[j+1]), 0.05) == 'bezier') {
          
          var newPnt = [];
          var newPntMid = [];
          var tmpPnt = [];
		  var isGood = 0;
			
          var ts = 0, te = 1;
          var arcLine = [], curv;

          //markPnt(curve.firstDerivative([newPts[j].anchor, newPts[j].rightDirection, newPts[j+1].anchor, newPts[j+1].leftDirection], 0.5));
          //newPnt = getDivPnt([newPts[i], newPts[i+1]], 0, 0.5, 1);
          
          //var A = getABC([newPts[i], newPnt, newPts[i+1]]);

          newPoints[i][1] = curve.linear(pointStart.anchor, pointStart.rightDirection, (t - ts));

          //alert(getT4Len([newPts[j].anchor, newPts[j].rightDirection, newPts[j+1].anchor, newPts[j+1].leftDirection], 0.5));

        t = 1;
       // pointEnd = newPts[j+1];
      


          newPnt = divide([getDataRevert(pointStart), getDataRevert(pointEnd)], (t - ts)/2, ts, te);

          newPoints.push(newPnt);

          newPnt2 = curve.linear(pointEnd.anchor, pointEnd.leftDirection, 1-((t - ts)/2));

          //arcLine.push(arcDiv( pointStart, pointEnd, outPts ));
		  isGood = arcDiv( pointStart, pointEnd, outPts );
		  //outPts.push ([0, "ARC", 8, "APS_GEOMETRY", 10, newPnt[0]/mm, 20, newPnt[1]/mm, 40, newPnt.r/mm, 50, newPnt.s, 51, newPnt.e]);
          //var Cp =  _getC([newPts[j].anchor, newPts[j+1].anchor], t);
          //var Ap = _getA(newPnt[0], Cp, t);
          
 /*          arcLine[0] = getccenter(pointStart.anchor, newPnt[0], pointEnd.anchor);
          //alert (angle(mPoint, newPts[j].anchor) * 57.295779513); //180 / Pi

          
          curv = (Math.abs((newPnt[4]/mm) - (arcLine[0].r/mm)).toFixed(3));
//alert(curv);
k = 0;
      if (curv > TOLERANCE) {
        arcLine.push(arcDiv( pointStart, pointEnd, outPts ));
        k = 1;
        //alert(arcLine[k]);
      }

  do {
    
        outPts.push ([0, "ARC", 8, "APS_GEOMETRY", 10, arcLine[k][0]/mm, 20, arcLine[k][1]/mm, 40, arcLine[k].r/mm, 50, arcLine[k].s, 51, arcLine[k].e]);
      k++;
      }  while ( k < arcLine.length ); 
 */

          i+=1; n+=1;

        } else {
          if (j < newPts.length-1) {
            outPts.push ([0, "LINE", 8, lazerName, 10, newPts[j].anchor[0]/mm, 20, newPts[j].anchor[1]/mm, 11, newPts[j+1].anchor[0]/mm, 21, newPts[j+1].anchor[1]/mm]);

/*             getArc([[newPts[j].anchor[0], newPts[j].anchor[1],
                     newPts[j].rightDirection[0], newPts[j].rightDirection[1]],
                    [newPts[j+1].anchor[0], newPts[j+1].anchor[1],
                     newPts[j+1].leftDirection[0], newPts[j+1].leftDirection[1]]],
              line); */
          }

          //newPnt2 = newPts[j].anchor;
          //newPnt1 = newPts[j].anchor;
        }
//alert(outPts[j]);
        j++; i++;

    }


  //   for (i = 0; i < newPoints.length; i+=1) {

  //     getData(newPoints[i], line);

  //  };
  var SaveDefault = "";
      for(i=0; i < outPts.length; i++) {
        for (var jj=0; jj < outPts[i].length; jj++) SaveDefault += outPts[i][jj] + "\n";
      };
 if (isGood > 0) alert ("Проблемы с геометрией, проверить RLL");
 return SaveDefault;
    //  SaveFile.write(SaveDefault);  


  }

//END// ----------------------------------------------//END//

 // ----------------------------------------------
// return distance between p1 [x,y], p2 [x,y]
function dist(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0],2) + Math.pow(p1[1] - p2[1],2));
}



// ----------------------------------------------
function getDataRevert(p){ // pathPoint
  //alert(p);
    var nPoint = [];
        nPoint[0] = p.anchor;
        nPoint[1] = p.rightDirection;
        nPoint[2] = p.leftDirection;
        nPoint[3] = p.pointType;
  
      return nPoint;
    
  }

// ----------------------------------------------
function getData(p, line){ // pathPoint
//alert(p);
  var newPoint = line.pathPoints.add();

      newPoint.leftDirection = (p[2]);
      newPoint.anchor = (p[0]);
      newPoint.rightDirection = (p[1]);
      newPoint.pointType = (p[3]);

    return newPoint;
  
}

// ----------------------------------------------
function getArc(a, line){ // pathPoint
  //alert(p);
    var newPoint1 = line.pathPoints.add();
    var newPoint2 = line.pathPoints.add();

       newPoint1.rightDirection = [a[0][2], a[0][3]];
       newPoint1.anchor = [a[0][0], a[0][1]];
       newPoint2.leftDirection = [a[1][2], a[1][3]];
       newPoint2.anchor = [a[1][0], a[1][1]];

    
  }


function getDat(p){ // pathPoint
  with(p) return [anchor, rightDirection, leftDirection, pointType];
}


  function getPointType(point1, point2, tolerance) {
    var xArr1 = [],
        yArr1 = [];
    var xArr2 = [],
        yArr2 = [];
  

      xArr1.push(point1[2][0]);  // left handle
      xArr1.push(point1[0][0]);         // point
      xArr1.push(point1[1][0]); // right handle
      yArr1.push(point1[2][1]);  // left handle
      yArr1.push(point1[0][1]);         // point
      yArr1.push(point1[1][1]); // right handle



      xArr2.push(point2[2][0]);  // left handle
      xArr2.push(point2[0][0]);         // point
      xArr2.push(point2[1][0]); // right handle
      yArr2.push(point2[2][1]);  // left handle
      yArr2.push(point2[0][1]);         // point
      yArr2.push(point2[1][1]); // right handle

  
    var isZeroLHandle1 = (xArr1[0] == xArr1[1]) && (yArr1[0] == yArr1[1]),
        isZeroRHandle1 = (xArr1[1] == xArr1[2]) && (yArr1[1] == yArr1[2]);

    var isZeroLHandle2 = (xArr2[0] == xArr2[1]) && (yArr2[0] == yArr2[1]),
        isZeroRHandle2 = (xArr2[1] == xArr2[2]) && (yArr2[1] == yArr2[2]);
  
        var handlesCos1 = calcAngleCos(xArr1, yArr1);
        var handlesCos2 = calcAngleCos(xArr2, yArr2);
          // Convert Degrees to Radians
          var radians = TOLERANCE * (Math.PI / 180);
        var handle1 = getRad2(point1[1], point1[0], point2[0]);
        var handle2 = getRad2(point2[2], point2[0], point1[0]);
       // If cos of angle is -1, then angle is 180 degrees 
        //alert ('p1='+point1[3]+', p2='+point2[3]+'\nhandlesCos1='+handlesCos1+', handlesCos2='+handlesCos2);
        //alert ('p1='+point1[3]+', xl='+xArr1[0]+', xr='+xArr1[2]+'\nyl='+yArr1[0]+', yr='+yArr1[2]+
        //	'\np2='+point2[3]+', xl='+xArr2[0]+', xr='+xArr2[2]+'\nyl='+yArr2[0]+', yr='+yArr2[2]);
        
          //if (point1[3] === PointType.SMOOTH && Math.round(handlesCos1) == COS_180 || Math.round(handlesCos1) == COS_0) return 'bezier';
          //if (point2[3] === PointType.SMOOTH && Math.round(handlesCos2) == COS_180 || Math.round(handlesCos2) == COS_0) return 'bezier';
          //alert ('handle1='+handle1+', handle2='+handle2 +', radians='+radians);
      
        if ((isZeroLHandle1 && isZeroRHandle1) && (isZeroLHandle2 && isZeroRHandle2)) return 'flat';
        if ((isZeroLHandle2) && (isZeroRHandle1)) return 'flat';
        if (handle1 <= radians) return 'flat';
        if (handle2 <= radians) return 'flat';
          
        //alert ('handlesCos1='+handlesCos1+'\nCOS_180 + radians='+(COS_180 + radians)+'\nCOS_0 - radians='+(COS_0 - radians));
        //if (point1[3] === PointType.CORNER && handlesCos1 <= Math.cos(radians)) return 'bezier';
          //if (point2[3] === PointType.CORNER && handlesCos2 <= Math.cos(radians)) return 'bezier';
          //if ((isZeroLHandle1 && isZeroRHandle1) && (isZeroLHandle2 && isZeroRHandle2)) return 'flat';
          //if ((isZeroLHandle2) && (isZeroRHandle1)) return 'flat';
      
          //if (point1[3] === PointType.CORNER && handlesCos1 <= Math.cos(radians)) return 'flat';
          //if (point2[3] === PointType.CORNER && handlesCos2 <= Math.cos(radians)) return 'flat';
          //if (handlesCos1 > Math.cos(radians) || handlesCos2 > Math.cos(radians)) return 'bezier';
          
          //if (isZeroRHandle) return 'r_zero';
          //if (point.pointType === PointType.SMOOTH && Math.round(handlesCos) == COS_180) return 'bezier';
          //if (handlesCos > Math.cos(radians)) return 'corner';
          //if (point.pointType === PointType.CORNER && handlesCos <= Math.cos(radians)) return 'broken';
          return 'bezier';
  }
  // Calculate Cos of angle between vectors
  //var radians = tolerance * (Math.PI / 180);
function calcAngleCos(xArr, yArr) {
  var angleCos;
  var leftEdge = parseFloat(Math.sqrt(Math.pow((xArr[0] - xArr[1]), 2) + Math.pow((yArr[0] - yArr[1]), 2)));
  var rightEdge = parseFloat(Math.sqrt(Math.pow((xArr[2] - xArr[1]), 2) + Math.pow((yArr[2] - yArr[1]), 2)));
  var farEdge = parseFloat(Math.sqrt(Math.pow((xArr[0] - xArr[2]), 2) + Math.pow((yArr[0] - yArr[2]), 2)));
  if (leftEdge == 0 || rightEdge ==0) return 0.0;
  angleCos = parseFloat((Math.pow(leftEdge, 2) + Math.pow(rightEdge, 2) - Math.pow(farEdge, 2)) / (2 * leftEdge * rightEdge));
  //alert('l='+leftEdge+', r='+rightEdge+'\nf='+farEdge+', a='+angleCos);
  return angleCos;
  }

// ------------------------------------------------
// return the bezier curve parameter "t"
// at the point which the length of the bezier curve segment
// (from the point start drawing) is "len"
// when "len" is 0, return the length of whole this segment.
function getT4Len(q, len){
  var m = [q[3][0] - q[0][0] + 3 * (q[1][0] - q[2][0]),
           q[0][0] - 2 * q[1][0] + q[2][0],
           q[1][0] - q[0][0]];
  var n = [q[3][1] - q[0][1] + 3 * (q[1][1] - q[2][1]),
           q[0][1] - 2 * q[1][1] + q[2][1],
           q[1][1] - q[0][1]];
  var k = [ m[0] * m[0] + n[0] * n[0],
            4 * (m[0] * m[1] + n[0] * n[1]),
            2 * ((m[0] * m[2] + n[0] * n[2]) + 2 * (m[1] * m[1] + n[1] * n[1])),
            4 * (m[1] * m[2] + n[1] * n[2]),
            m[2] * m[2] + n[2] * n[2]];
  
   var fullLen = getLength(k, 1);

  if(len == 0){
    return fullLen;
    
  } else if(len < 0){
    len += fullLen;
	
    if(len < 0) return 0;
    
  } else if(len > fullLen){
    return 1;
  }
  
  

  var t, d;
  var t0 = 0;
  var t1 = 1;
  var torelance = 0.001;
  
  
  for(var h = 1; h < 30; h++){
    t = t0 + (t1 - t0) / 2;
    d = len - getLength(k, t);
    
    if(Math.abs(d) < torelance) break;
    else if(d < 0) t1 = t;
    else t0 = t;
  }
 
  return t;
}

// ------------------------------------------------
// return the length of bezier curve segment
// in range of parameter from 0 to "t"
// "m" and "n" are coefficients.
function getLength(k, t){
  var h = t / 128;
  var hh = h * 2;
  
  var fc = function(t, k){
    return Math.sqrt(t * (t * (t * (t * k[0] + k[1]) + k[2]) + k[3]) + k[4]) || 0 };
  
  var total = (fc(0, k) - fc(t, k)) / 2;
  
  for(var i = h; i < t; i += hh){
    total += 2 * fc(i, k) + fc(i + h, k);
  }
  

  //alert (total * hh);
  return total * hh;
}

function computeError(pc, np1, s, e) {
  var     q = (e - s) / 4,
         c1 = curve.get(s + q),
         c2 = curve.get(e - q),
        ref = dist(pc[0], pc[1], np1[0], np1[1]),
         d1 = dist(pc[0], pc[1], c1[0], c1[1]),
         d2 = dist(pc[0], pc[1], c2[0], c2[1]);
  return Math.abs(d1 - ref) + Math.abs(d2 - ref);
}

function ungroup() {
	// Итеративный разгруппировщик без рекурсии.
	// Работает, пока в выделении есть группы/compound-пути.
	// ВАЖНО: итерируем с конца, т.к. коллекция selection "живая" и изменяется при remove().
	var hasGroups = true;
	var safetyLimit = 50; // защита от бесконечного цикла на патологических данных
	var iteration = 0;

	while (hasGroups && iteration < safetyLimit) {
		hasGroups = false;
		iteration++;

		// копия ссылок на текущее выделение в обычный массив, чтобы не мутировать "живую" коллекцию во время обхода
		var sel = docRef.selection;
		var items = [];
		for (var k = 0; k < sel.length; k++) items.push(sel[k]);

		for (var i = items.length - 1; i >= 0; i--) {
			var item = items[i];
			// доступ к удаленным объектам кидает исключение — оборачиваем
			try {
				var tn = item.typename;
			} catch (e) {
				continue;
			}

			if (tn == "GroupItem" || tn == "CompoundPathItem") {
				var elements = getChildAll(item);
				for (var jj = 0; jj < elements.length; jj++) {
					try { elements[jj].moveBefore(item); } catch (e) {}
				}
				try { item.remove(); } catch (e) {}
				hasGroups = true;
			} else if (tn == "PathItem") {
				item.strokeColor = PMagenta;
				item.strokeWidth = 0.2*mm;
			}
		}
	}
}

function getChildAll(obj) {
	var childsArr = [];
	var ln;

	if (obj.typename == "GroupItem") ln = obj.pageItems;
	else ln = obj.pathItems;

	for (var i = 0; i < ln.length; i++) {
		var elm = ln[i];
		elm.strokeColor = PMagenta; // Apply the new color
		elm.strokeWidth = 0.2*mm;
		//elm.simplify (98,0,false,false);
		childsArr.push(elm);
	}
	return childsArr;
}


// =====================================================================
// applyRllDistortion(group, distXpct, shearDeg, shearYDeg)
//
// Применяет к ГРУППЕ (groupItem) масштаб по X и два наклона (shear).
// Параметры:
//   distXpct  — масштаб по X в процентах. 100 = без изменений.
//   shearDeg  — наклон по горизонтали в градусах (x' = x + tan(α)·y).
//   shearYDeg — наклон по вертикали   в градусах (y' = y + tan(β)·x).
//
// Масштаб по X — через group.width *= sx/100 (как в hostscript.jsx).
// Shear — через transform(matrix, ..., DOCUMENTORIGIN). Оба наклона
// (X и Y) комбинируются в одну матрицу и применяются ОДНОВРЕМЕННО
// ко всем pageItem группы.
//
// Вызывается ДО ungroup() — пока ещё есть единая группа.
// =====================================================================
function applyRllDistortion(group, distXpct, shearDeg, shearYDeg) {
	var sx = parseFloat(distXpct);
	var sh = parseFloat(shearDeg);
	var shY = parseFloat(shearYDeg);
	if (isNaN(sx)) sx = 100;
	if (isNaN(sh)) sh = 0;
	if (isNaN(shY)) shY = 0;

	var EPS = 0.0001;
	var doScale  = Math.abs(sx - 100) > EPS;
	var doShear  = Math.abs(sh)       > EPS;
	var doShearY = Math.abs(shY)      > EPS;
	if (!doScale && !doShear && !doShearY) {
		dbg("applyRllDistortion: identity, skip");
		return;
	}

	dbg("applyRllDistortion: X=" + sx + "%, ShearX=" + sh + "°, ShearY=" + shY + "°, group.width=" + group.width);

	try {
		// 1) Shear по X (наклон по горизонтали) И/ИЛИ по Y (наклон по вертикали).
		//
		// Делаем через transform() с явной матрицей. Это рабочий
		// рецепт из проверенного скрипта пользователя.
		//
		// КЛЮЧЕВОЕ — последний аргумент Transformation.DOCUMENTORIGIN.
		// Без него transform применяется относительно центра объекта,
		// и сдвиг визуально не виден. С DOCUMENTORIGIN объект двигается
		// относительно начала координат документа — точка с y > 0
		// реально смещается по X на tan(α)·y.
		//
		// Матрица Illustrator (column-major): [A C TX; B D TY]
		//   A=mValueA   B=mValueB   C=mValueC   D=mValueD   TX=mValueTX TY=mValueTY
		//   x' = A·x + C·y + TX
		//   y' = B·x + D·y + TY
		//
		// Horizontal shear:  x' = x + tan(α)·y, y' = y       →  C = tan(α)
		// Vertical   shear:  x' = x,            y' = y + tan(β)·x  →  B = tan(β)
		// Оба сразу комбинируются в одну матрицу C и B.
		if (doShear || doShearY) {
			var shTanX = doShear  ? Math.tan(sh  * Math.PI / 180.0) : 0;
			var shTanY = doShearY ? Math.tan(shY * Math.PI / 180.0) : 0;

			// Берём настоящий Matrix через app.getIdentityMatrix() —
			// объект-литерал {mValueA:..., mValueB:...} в ExtendScript
			// не всегда распознается как Matrix.
			var M = app.getIdentityMatrix();
			if (doShear)  M.mValueC = shTanX;   // X-shear (горизонтальный)
			if (doShearY) M.mValueB = shTanY;   // Y-shear (вертикальный)

			dbg("applyRllDistortion: shear matrix C=" + shTanX + " B=" + shTanY);

			// Применяем к КАЖДОМУ pageItem группы — с одной и той же
			// матрицей и относительно ОДНОЙ опорной точки (DOCUMENTORIGIN).
			// Так наклон получается согласованным: все элементы
			// смещаются по тому же закону.
			//
			// transform(matrix, changePositions, changeFillPatterns,
			//           changeFillGradients, changeStrokePattern,
			//           lineScale, transformAbout)
			var children = group.pageItems;
			for (var i = 0; i < children.length; i++) {
				try {
					children[i].transform(M, true, true, true, true, 1,
						Transformation.DOCUMENTORIGIN);
				} catch(e) {
					dbg("applyRllDistortion: shear failed on item " + i + ": " + e);
				}
			}
			dbg("applyRllDistortion: shear applied to " + children.length + " items");
		}

		// 2) Масштаб по X. Меняем ширину группы — Illustrator сам
		//    пропорционально пересчитает всё содержимое (как hostscript:
		//    newGroup.width *= Distor).
		if (doScale) {
			var sxF = sx / 100.0;
			group.width = group.width * sxF;
			dbg("applyRllDistortion: after scale group.width=" + group.width);
		}
	} catch(e) {
		dbg("applyRllDistortion: failed: " + e);
	}
}

function myCustomDynamicAction(smoothf) {
	//alert (smoothf);
    var actionCode =
        "/version 3" +
        "/name [ 5" +
        "	5365742032" +
        "]" +
        "/isOpen 1" +
        "/actionCount 1" +
        "/action-1 {" +
        "	/name [ 8" +
        "		53696d706c696679" +
        "	]" +
        "	/keyIndex 0" +
        "	/colorIndex 0" +
        "	/isOpen 1" +
        "	/eventCount 1" +
        "	/event-1 {" +
        "		/useRulersIn1stQuadrant 0" +
        "		/internalName (ai_plugin_simplify)" +
        "		/localizedName [ 8" +
        "			53696d706c696679" +
        "		]" +
        "		/isOpen 0" +
        "		/isOn 1" +
        "		/hasDialog 1" +
        "		/showDialog 0" +
        "		/parameterCount 4" +
        "		/parameter-1 {" +
        "			/key 1919182693" +
        "			/showInPalette 4294967295" +
        "			/type (unit real)" +
        "			/value 100.0" +
        "			/unit 592474723" +
        "		}" +
        "		/parameter-2 {" +
        "			/key 1634561652" +
        "			/showInPalette 4294967295" +
        "			/type (unit real)" +
        "			/value 0.0" +
        "			/unit 591490663" +
        "		}" +
        "		/parameter-3 {" +
        "			/key 1936553064" +
        "			/showInPalette 4294967295" +
        "			/type (boolean)" +
        "			/value 0" +
        "		}" +
        "		/parameter-4 {" +
        "			/key 1936552044" +
        "			/showInPalette 4294967295" +
        "			/type (boolean)" +
        "			/value 0" +
        "		}" +
        "	}" +
        "}";
    var tmp = File(Folder.desktop + "/Simplify.aia");
    tmp.open("w");
    tmp.write(actionCode);
    tmp.close();
    app.loadAction(tmp);
    app.doScript("Simplify", "Set 2");
    app.unloadAction("Set 2", "");
    tmp.remove();
}

function addDensityMath(TOLER) {
	if (app.documents.length === 0 || app.selection.length === 0) return;
	
    var minDistanceMM = TOLER;
    var ptLimit = minDistanceMM * 2.83465;
	var t = 0.5; //Центр между точек
    var sel = app.selection;

    for (var i = 0; i < sel.length; i++) {
        if (sel[i].typename === "PathItem") {
            var item = sel[i];
            var lastCount = 0;

            // Цикл пока количество точек растет и не превышен предел безопасности
            while (item.pathPoints.length > lastCount) {
                lastCount = item.pathPoints.length;
                var data = getNewPointsData(item, ptLimit);
                
                // Если новых точек не добавилось, выходим из цикла для этого объекта
                if (data.length === lastCount) break;
                applyPoints(item, data);
            }
        }
    }

    function getNewPointsData(path, limit) {
        var pts = path.pathPoints;
        var len = pts.length;
        var result = [];

        // Сначала просто копируем все точки в независимые объекты
        for (var i = 0; i < len; i++) {
            result.push({
                anchor: [pts[i].anchor[0], pts[i].anchor[1]],
                left: [pts[i].leftDirection[0], pts[i].leftDirection[1]],
                right: [pts[i].rightDirection[0], pts[i].rightDirection[1]],
                type: pts[i].pointType
            });
        }

        var finalData = [];
        for (var i = 0; i < len; i++) {
            var curr = result[i];
            var next = result[(i + 1) % len];

            finalData.push(curr);

            if (!path.closed && i === len - 1) break;

            // Расчет дистанции между анкорами
            var dist = Math.sqrt(Math.pow(next.anchor[0] - curr.anchor[0], 2) + Math.pow(next.anchor[1] - curr.anchor[1], 2));

            if (dist > limit) {
                var p0 = curr.anchor, r0 = curr.right, l1 = next.left, p3 = next.anchor;
                
                // Алгоритм Де Кастельжо (t=0.5)
                var p01 = [ (p0[0]+r0[0])*t, (p0[1]+r0[1])*t ];
                var r1l = [ (r0[0]+l1[0])*t, (r0[1]+l1[1])*t ];
                var l1p3 = [ (l1[0]+p3[0])*t, (l1[1]+p3[1])*t ];
                
                var p01l = [ (p01[0]+r1l[0])*t, (p01[1]+r1l[1])*t ];
                var r1lp3 = [ (r1l[0]+l1p3[0])*t, (r1l[1]+l1p3[1])*t ];
                
                var mid = [ (p01l[0]+r1lp3[0])*t, (p01l[1]+r1lp3[1])*t ];

                // Корректируем рычаги текущей и следующей точек
                curr.right = p01;
                next.left = l1p3;

                // Добавляем новую точку посередине
                finalData.push({
                    anchor: mid,
                    left: p01l,
                    right: r1lp3,
                    type: PointType.SMOOTH
                });
            }
        }
        return finalData;
    }

    function applyPoints(path, data) {
        var isClosed = path.closed;
        // Очистка через удаление (единственный стабильный способ)
        while (path.pathPoints.length > 1) {
            path.pathPoints[path.pathPoints.length - 1].remove();
        }
        
        for (var i = 0; i < data.length; i++) {
            var p = (i === 0) ? path.pathPoints[0] : path.pathPoints.add();
            p.anchor = data[i].anchor;
            p.leftDirection = data[i].left;
            p.rightDirection = data[i].right;
            p.pointType = data[i].type;
        }
        path.closed = isClosed;
    }
};


})();