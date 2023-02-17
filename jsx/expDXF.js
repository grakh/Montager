(function () {

#include 'div.js';
#include 'del.js';

PMagenta = new CMYKColor();
PMagenta .name = 'Process Magenta';
PMagenta .black =0; 
PMagenta .cyan = 0; 
PMagenta .magenta = 100; 
PMagenta .yellow = 0;

const mm = 72/25.4;
const TOLERANCE = 0.5;
const MIN_ANGLE = 0, // Degrees range for the Tolerance
      MAX_ANGLE = 180, // Degrees range for the Tolerance
      COS_INACCURACY = -0.999999, // Correction of coordinate inaccuracy
      COS_180 = -1,
      COS_0 = 1;

var p, op, pnts;
var docRef = app.activeDocument;
var layerName = "Knife";
var lazerName = "Laser";
//var newLayer = docRef.layers.add();
//    newLayer.name="Laser";

function laser(znamber){

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

    var pathes = [];
    getPathItemsInSelection(1, pathes);
    if(pathes.length < 1){
      //alert("pathes.length < 1 "+pathes.length);
      return;
    }

    //var znamber  = prompt("Zakaz namber:", '');
    //var znamber  = doc.getElementById('Namber').value;
    //alert(znamber);
    var path = '\\\\storage\\zakaz\\'+znamber.substr (0, znamber.length-3)+'000-'+znamber.substr (0, znamber.length-3)+'999\\'+znamber+'/laser/RLL.dxf';
    
    //alert("pathes.length " + pathes.length);
    var SaveFileDefault = new File( path ); 
        SaveFileDefault.open ("w"); 
        SaveFileDefault.write("0\nSECTION\n2\nENTITIES\n"); 

    for(var i = 0; i < pathes.length; i++){
      convertToArc(pathes[i], SaveFileDefault);
    }



    SaveFileDefault.write("ENDSEC\n0\nEOF");  
    SaveFileDefault.close(); 
    
    docRef.selection = null;

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

for (i = 0; i < d.length; i++) newPts.push(d[i]);

if (pi.closed) {newPts.push(d[0]); figClose = true;}

t = 1;

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


          var ts = 0, te = 1;
          var arcLine = [], curv;

          //markPnt(curve.firstDerivative([newPts[j].anchor, newPts[j].rightDirection, newPts[j+1].anchor, newPts[j+1].leftDirection], 0.5));
          //newPnt = getDivPnt([newPts[i], newPts[i+1]], 0, 0.5, 1);
          
          //var A = getABC([newPts[i], newPnt, newPts[i+1]]);

          newPoints[i][1] = curve.linear(pointStart.anchor, pointStart.rightDirection, (t - ts));

          //alert(getT4Len([newPts[j].anchor, newPts[j].rightDirection, newPts[j+1].anchor, newPts[j+1].leftDirection], 0.5));

        t = 1
       // pointEnd = newPts[j+1];
      


          newPnt = divide([getDataRevert(pointStart), getDataRevert(pointEnd)], (t - ts)/2, ts, te);

          newPoints.push(newPnt);

          newPnt2 = curve.linear(pointEnd.anchor, pointEnd.leftDirection, 1-((t - ts)/2));

          arcLine.push(arcDiv( pointStart, pointEnd, outPts ));
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
        for (j=0; j < outPts[i].length; j++) SaveDefault += outPts[i][j] + "\n";
      };
  
      SaveFile.write(SaveDefault);  


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

laser(sp.Namb);

})();