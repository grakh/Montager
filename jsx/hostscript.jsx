/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function sayHello(sp) {

  if (sp.btnRll) {
    #include './expDXF.js';
    return;
  };
    
//var fonts="OLFSimpleSansCJK-Regular";
var fonts="MagistralTT";  

var docRef = app.activeDocument;
var newLayer=docRef.activeLayer;
//newLayer = docRef.layers.add();
//newLayer.zOrder(ZOrderMethod.BRINGTOFRONT);
    newLayer.name="Knife";

var Linfo = docRef.layers.add();
//Linfo .zOrder(ZOrderMethod.BRINGTOFRONT);
    Linfo .zOrder(ZOrderMethod.SENDTOBACK);
    Linfo .name="info";

var L_Test = docRef.layers.add();
    L_Test.zOrder(ZOrderMethod.SENDTOBACK);
    L_Test.name="L-Test";

var REZ = docRef.layers.add();
    REZ.zOrder(ZOrderMethod.SENDTOBACK);
    REZ.name="REZ";
    
docRef.rulerOrigin = Array (0,0);
    var units = 1; // 2-inches, 3-milllimeters, 0-points
    app.preferences.setIntegerPreference("rulerType", units);
    app.preferences.setIntegerPreference("strokeUnits", units);
    
var wi= docRef.width;
var hi = docRef.height;
    
  //alert(sp);  
    //var form=sp.split(';');
 var Da= new Date ();

//Dat=Da.toLocaleString();

var Dat= String (''+Da.getDate() +'-'+ (Da.getMonth()+1)+'-'+  Da.getFullYear());
  //alert("Namber "+form[0]+"\nCustomer "+form[1]+"\nRaport "+form[2]+"\nRepetition "+form[3]+"\nStreams "+form[4]+"\nGAP "+Gapp[0]+"\ncasing "+form[6]+"\ndist "+form[7]);  
    //@target illustrator
//app.bringToFront();
    //alert("Namber "+form[10]);
    var dop='';
    var rll='', raa='';
    var Nam = sp.Namber;
    var Cust = sp.Customer;
    if (sp.rll != '') {dop = rll = ' / '+sp.rll;}
    if (sp.raa != '') {dop += raa = ' / '+sp.raa;}
    if (sp.rez != '') {dop += ' / '+sp.rez;}
    if (sp.perf != '') {dop += ' / '+sp.perf;}
    if (sp.micro != '') {dop += ' / '+sp.micro;}
    if (sp.google != '') {dop += ' / '+sp.google;}
//alert(parseFloat(sp.offset));
    var perimetr = 0;
        perimetr = sp.perimetr;

    var Rap = sp.Raport; //.split(' ');
    
    var PolurotY = sp.PolurotY;
    var Polurot = sp.Polurot;
	//alert (sp.gross);
    var Rep = sp.Repetition;
    var Stre = sp.Streams;
    var Gapp = sp.GAP.split(' ');


	var Gap2 = Gapp[1]*1.0;
	//alert (PolurotY/Rep+'\n'+Gap2);
    var casi = sp.casing;
    var Distor = sp.Dis;
    var Ang = sp.Material.substring(0, sp.Material.indexOf(" "));
    var Mate = sp.Material.substring(sp.Material.indexOf(" "), sp.Material.lastIndexOf(" "));
    var Kni = sp.Knife;
	
	var SAll = sp.Forms.split(';');

  var Plosk = false;

	if (~Mate.indexOf("Плоская")) Plosk = true;
    
   var lineOb = parseFloat(sp.Material.substring(sp.Material.lastIndexOf(" ")));   
    
mm = 72.0/25.4;
mms= mm/2.0;
var WidthLab = 19*mm; 
var xEl=0, yEl=0;
var compens = 6;
 

var elm = newLayer.groupItems.add();

    
    var docSelection = new Array();
    var docSelection2 = new Array();

    var procText = sp.colorText, procDash = sp.colorDush, procRisk = sp.colorRisk;

var dotPoint = 2.0;

    if(sp.gross){
      procText = sp.colorText1;
      procDash = sp.colorDush1;
      procRisk = sp.colorRisk1;

      dotPoint = 3.0;
    }

var Prll = new CMYKColor(); // text
    Prll.name = 'rllColor';
    Prll.black = 0; 
    Prll.cyan = 0; 
    Prll.magenta = 0; 
    Prll.yellow = 1;
    
var PLabel = new CMYKColor(); // text
    PLabel.name = 'labelColor';
    PLabel.black = 0; 
    PLabel.cyan = 0; 
    PLabel.magenta = procText; 
    PLabel.yellow = 0;
    
var PCyan = new CMYKColor(); //Dashed Line
    PCyan.name = 'labelColor';
    PCyan.black = 0; 
    PCyan.cyan = 0; 
    PCyan.magenta = procDash; 
    PCyan.yellow = 0;

var PRisk= new CMYKColor();  //Metki
    PRisk.name = 'labelColor';
    PRisk.black = 0; 
    PRisk.cyan = 0; 
    PRisk.magenta = procRisk; 
    PRisk.yellow = 0;
    
var PWhite = new CMYKColor();
    PWhite.name = 'WhiteColor';
    PWhite.black =0; 
    PWhite.cyan = 0; 
    PWhite.magenta = 0; 
    PWhite.yellow = 0;
    
var PFull = new CMYKColor();
    PFull.name = 'FullColor';
    PFull.black = 100; 
    PFull.cyan = 100; 
    PFull.magenta = 100; 
    PFull.yellow = 100;
     
 if  (casi==2){if (SAll[1]=='true') {closePath();} el();  Gap2 = Rap/Rep - SAll[1]; elSelect(0); recRap(Rap, (SAll[0]*Stre)+(Gapp[0]*Stre)+15); return};
 if  (casi==3){if (SAll[1]=='true') {closePath();} el(); fullSelect();}; 
 if  (casi==0){circ();elSelect(1);};
 if  (casi==1){rect();elSelect(1);};
 //alert(Polurot);
 if (Polurot!=='') Rap=Polurot;

 if (~Mate.indexOf("Полуротация")){
    if (Polurot==='0')
      if (casi==3) Rap = elm.width/mm + 10;
        else Rap = (elm.width/mm+Gap2)*Rep-Gap2 + 10;
  };

  if (~Mate.indexOf("Ротация")) Polurot = Rap;
  //if (Rap==0 & form[6]==2) alert (); 
 //alert (Rap+' '+elm.width);
    
var newGroup = newLayer.groupItems.add();
    
for(var i=0;i<docRef.pathItems.length;i++){
    var a = docRef.pathItems[i];
a.moveToBeginning(newGroup);
         }
for(var i=0;i<docRef.textFrames.length;i++){
    var a = docRef.textFrames[i];
a.moveToBeginning(newGroup);
         }
    
 var WidthForm = (SAll[0]*Stre)+(Gapp[0]*Stre)+20 - compens; 
 //if ((Polurot!=Rap) && PlTrue) {WidthForm = PolurotY; }

 if (PolurotY!='') WidthForm = PolurotY; 
 //alert(newGroup.width/mm+"\n"+newGroup.height/mm);
 if (PolurotY <= newGroup.height/mm + 0.5*mm && PolurotY!='') alert("Нож не влезает в эту ширину!");
 if (Polurot <= newGroup.width/mm + 0.5*mm) alert("Нож не влезает в эту длину!");
    
var LI = Linfo.groupItems.add();
var RiskGorizont = LI.groupItems.add();
    
Oporka = LI.pathItems.rectangle( 12*mm, 5*mm, Rap*mm, -WidthForm*mm);
//Oporka.setEntirePath( Array( Array(0, 0), Array(0, hi), Array(5*mm, hi), Array(5*mm, 0) ) );
Oporka.closed = true;
Oporka.filled = false;
Oporka.stroked = true;
Oporka.strokeColor = PCyan;
Oporka.fillOverprint = false;
Oporka.strokeWidth = 0.1*mm;
Oporka.strokeDashes = [2,2,2,2];
    
    angleLB = LI.pathItems.add();
    angleLB.setEntirePath( Array( Array(2*mm, 12*mm), Array(5*mm, 12*mm), Array(5*mm, 9*mm) ) );
    angleLB.stroked = true;
    angleLB.strokeColor = PCyan;
    angleLB.strokeWidth = 0.1*mm;
    angleLB.filled = false;
  
    angleLT = LI.pathItems.add();
    angleLT.setEntirePath( Array( Array(2*mm, WidthForm*mm+12*mm), Array(5*mm, WidthForm*mm+12*mm), Array(5*mm, WidthForm*mm+15*mm) ) );
    angleLT.stroked = true;
    angleLT.strokeColor = PCyan;
    angleLT.strokeWidth = 0.1*mm;
    angleLT.filled = false;
     
    angleRT = LI.pathItems.add();
    angleRT.setEntirePath( Array( Array(Rap*mm+8*mm, 12*mm), Array(Rap*mm+5*mm, 12*mm), Array(Rap*mm+5*mm, 9*mm) ) );
    angleRT.stroked = true;
    angleRT.strokeColor = PCyan;
    angleRT.strokeWidth = 0.1*mm;
    angleRT.filled = false;
   
    angleRB = LI.pathItems.add();
    angleRB.setEntirePath( Array( Array(Rap*mm+8*mm, WidthForm*mm+12*mm), Array(Rap*mm+5*mm, WidthForm*mm+12*mm), Array(Rap*mm+5*mm, WidthForm*mm+15*mm) ) );
    angleRB.stroked = true;
    angleRB.strokeColor = PCyan;
    angleRB.strokeWidth = 0.1*mm;
    angleRB.filled = false;
	

		
		riskCenter = LI.pathItems.add();
		riskCenter.setEntirePath( Array( Array(4*mm, WidthForm*mm/2+12*mm), Array(10*mm, WidthForm*mm/2+12*mm)) );
		riskCenter.stroked = true;
		riskCenter.strokeColor = PRisk;
		riskCenter.strokeWidth = 0.15*mm;
		riskCenter.filled = false;
		
		riskCenter = LI.pathItems.add();
		riskCenter.setEntirePath( Array( Array(Rap*mm+6*mm, WidthForm*mm/2+12*mm), Array(Rap*mm, WidthForm*mm/2+12*mm)) );
		riskCenter.stroked = true;
		riskCenter.strokeColor = PRisk;
		riskCenter.strokeWidth = 0.15*mm;
		riskCenter.filled = false;
        

var i = 0, yRisk = 0, yCompensation=0;
    iv=(SAll[0]*mm+Gapp[0]*mm);
    if (casi==3){iv/=2; Stre+=1;};
    //alert(newGroup.height);
    if (newGroup.height/mm >= (WidthForm - 0.5*mm)) {
      yCompensation = ((newGroup.height/mm - WidthForm)/2 + 5)*mm;
      //alert(newGroup.height/mm+"\n"+WidthForm+"\n"+yCompensation);
      //alert(yCompensation);
    }
//---- Metki po ruchym
for (s1=0; s1<=Stre; s1++) {
  //alert(WidthLab+'  '+i+'  '+iv);

    yRisk = WidthLab+i;

    if (yCompensation) {
      s1==0 ? yRisk += yCompensation : yRisk; 
      s1==Stre ? yRisk -= yCompensation : yRisk;
    }
  
    LabelSw1 = RiskGorizont.pathItems.add();
    LabelSw1.setEntirePath( Array( Array(5*mm, yRisk), Array(10*mm, yRisk)) );
    LabelSw1.stroked = true;
    LabelSw1.strokeColor = PRisk;
    LabelSw1.strokeWidth = 0.1*mm;
    LabelSw1.filled = false;
    
    LabelSw2 = RiskGorizont.pathItems.add();
    LabelSw2.setEntirePath( Array( Array(Rap*mm+5*mm, yRisk), Array(Rap*mm, yRisk)) );
    LabelSw2.stroked = true;
    LabelSw2.strokeColor = PRisk;
    LabelSw2.strokeWidth = 0.1*mm;
    LabelSw2.filled = false;
    i+=iv;
}
var offsetVector = 0*mm;    
var LVector1 = LI.groupItems.add();
    LV1 = LVector1.pathItems.add();
    LV1.setEntirePath( Array( Array(4*mm, WidthLab-5*mm+offsetVector), Array(13*mm, WidthLab-5*mm+offsetVector)) );
    LV1.stroked = true;
    LV1.strokeColor = PRisk;
    LV1.strokeWidth = 0.1*mm;
    LV1.filled = false;
    LV2 = LVector1.pathItems.add();
    LV2.setEntirePath( Array( Array(10*mm, WidthLab-6*mm+offsetVector), Array(15*mm, WidthLab-5*mm+offsetVector), Array(10*mm, WidthLab-4*mm+offsetVector)) );
    LV2.stroked = true;
    LV2.strokeColor = PRisk;
    LV2.strokeWidth = 0.1*mm;
    LV2.filled = false;

//var LVector2 = LVector1.duplicate();
    LVector1.top = Oporka.top-1*mm-offsetVector;
    LVector1.left = 11*mm;
/* var LVector3 = LVector1.duplicate();
    LVector3.rotate(180);
    LVector3.left = Rap*mm-5*mm; */
    
var LVector4 = LVector1.duplicate();
    LVector4.rotate(180);
    LVector4.left = Rap*mm-12*mm;
    LVector4.top = Oporka.top-1*mm-offsetVector;

var Llog = LI.textFrames.add();
    Llog.position = [(Rap*mm)/2-50*mm, Oporka.top];
    Llog.contents = "www.justcut.ru  +7(495) 665-20-50";
    Llog.textRange.characterAttributes.size = 13;
	Llog.textRange.characterAttributes.tracking = 30;
    //Llog.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
    Llog.textRange.characterAttributes.textFont = app.textFonts.getByName(fonts);
    Llog.textRange.characterAttributes.fillColor = PLabel;
   // Llog.textRange.characterAttributes.strokeColor = PLabel;
   // Llog.textRange.characterAttributes.stroked = true;
   // Llog.textRange.characterAttributes.strokeWidth = 0.05*mm;
   // Llog.textRange.characterAttributes.filled = false;
	if (Llog.width > Rap*mm) Llog.width = Rap*mm;
	Llog.position = [(Rap*mm)/2-(Llog.width/2)+5*mm, Oporka.top+0.2*mm];

	//alert(SAll[0],SAll[1]);
	 if  (casi!=3) {xEl = SAll[0]; yEl = SAll[1];}
	
var LPod = Linfo.textFrames.add();
var rQ = " | ВАЛ Z"+Math.round(parseFloat(sp.Raport/3.175))+" ("+sp.Raport+")";
var topPos = 1;
var _str ='';
    if (Plosk) rQ = "";
  if(sp.eWi == 0 || sp.eHi == 0)
    LPod.contents = (""+Dat+" / "+Cust+" @ "+parseFloat(parseFloat(yEl).toFixed(2))+"x"+parseFloat(parseFloat(xEl).toFixed(2))+rQ+" / "+Nam+" / "+Ang+Mate + rll + raa); //.split(".").join(" ");
  else LPod.contents = (""+Dat+" / "+Cust+" @ "+sp.eWi+"x"+sp.eHi+rQ+" / "+Nam+" / "+Ang+Mate + rll + raa);
  
    LPod.textRange.characterAttributes.size = 12;
	LPod.textRange.characterAttributes.tracking = 30;
    LPod.textRange.paragraphAttributes.justification = Justification.CENTER;
    LPod.textRange.characterAttributes.textFont = app.textFonts.getByName(fonts);
    LPod.textRange.characterAttributes.fillColor = PLabel;
   // LPod.textRange.characterAttributes.strokeColor = PLabel;
   // LPod.textRange.characterAttributes.stroked = true;
   // LPod.textRange.characterAttributes.filled = false;
   // LPod.textRange.characterAttributes.strokeWidth = 0.05*mm;
    //if(!sp.gross) if (LPod.width > Rap*mm) LPod.width = Rap*mm;
    if (LPod.width > (Rap*mm)) {
      _str = LPod.contents;
      LPod.contents = LPod.contents.replace(/@/g, "\n");
      LPod.contents = LPod.contents.replace(/\|/g, "/");
      topPos = 5.5*mm;
     
      if (LPod.width > (Rap*mm)) {
        LPod.contents = _str;
        LPod.contents = LPod.contents.replace(/\|/g, "\n");
        LPod.contents = LPod.contents.replace(/@/g, "/");
        topPos = 10.5*mm;
                          }
    } else LPod.contents = LPod.contents.replace(/@|\|/g, "/");
    LPod.position = [(Rap*mm)/2-(LPod.width/2)+5*mm, 16*mm + topPos];
    
var LPod2 = Linfo.textFrames.add();
    LPod2.position = [(Rap*mm)/2-(LPod2.width/2)-38*mm, 11*mm];
    LPod2.contents = (sp.data + ' / '+ Distor+" - "+Kni+" - "+Ang+" - Mirror, L"+lineOb+dop); //.split(".").join(" ");
    LPod2.textRange.characterAttributes.size = 12;
	LPod2.textRange.characterAttributes.tracking = 30;
    LPod2.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
    LPod2.textRange.characterAttributes.textFont = app.textFonts.getByName(fonts);
    LPod2.textRange.characterAttributes.fillColor = PLabel;
  //  LPod2.textRange.characterAttributes.strokeColor = PLabel;
  //  LPod2.textRange.characterAttributes.stroked = true;
  //  LPod2.textRange.characterAttributes.filled = false;
  //  LPod2.textRange.characterAttributes.strokeWidth = 0.05*mm;
	if (LPod2.width > Rap*mm) LPod2.width = Rap*mm;
    LPod2.position = [(Rap*mm)/2-(LPod2.width/2)+5*mm, 11.3*mm];
    
if (Distor!=0){   
    
    LI.width *= Distor;
    //docRef.layers["info"].locked = true;
    newGroup.width *= Distor;

    if (sp.offset != '0'){
      //newGroup.left = LI.width - newGroup.width - parseFloat(sp.offset)*mm - mm;
      newGroup.left = (5*mm + parseFloat(sp.offset)*mm) * Distor - lineOb*mm/2.0;
      //alert(newGroup.left);
    } else {
      newGroup.left = 5*mm +(LI.width-newGroup.width-6*mm)/2-lineOb*mm/2.0;
    }
/*    
app.executeMenuCommand('selectall');
//app.executeMenuCommand('transformscale');
 var docSel=[];   
for (var i=0; i<docRef.selection.length;i++){
    docSel.push(docRef.selection[i]);
}    
 docSel.moveToBeginning(newGroup); 
  */  

    //newGroup.width *= form[7];
   // LI.moveToBeginning(Linfo);
   
  }
  
  //if (!Plosk)
	   //if (PolurotY!=Rap)
  {   
    
    //docRef.layers["info"].locked = true;
	
	newGroup.top = WidthForm*mm/2.0 + newGroup.height/2.0 + lineOb*mm/2.0 + 12*mm;
	RiskGorizont.top = WidthForm*mm/2.0 + RiskGorizont.height/2.0 + 0.15*mm/2.0 + 12*mm;
	//Llog.top = WidthForm*mm + 10*mm;
	//LVector2.top = WidthForm*mm + 8*mm;
	//LVector4.top = WidthForm*mm + 8*mm;
  if (Plosk) newGroup.left = 5*mm +(LI.width-newGroup.width-6*mm)/2-lineOb*mm/2.0;

   
  }

  risk (LI.width); 

//-------------------------REZ--------------------------------- 
    var lineCenter = REZ.pathItems.add();
        lineCenter .setEntirePath( Array( Array(Oporka.left-0.55*mm+Oporka.strokeWidth/2, WidthForm*mm/2+12*mm), Array(Oporka.left+Oporka.width+0.55*mm+Oporka.strokeWidth/2, WidthForm*mm/2+12*mm)) );
        lineCenter.stroked = false;
        lineCenter.strokeColor = Prll;
        lineCenter.strokeWidth = 0.01*mm;
        lineCenter.filled = false;
        lineCenter.strokeOverprint = true;
        
    var leftRez = REZ.pathItems.add();
        leftRez .setEntirePath( Array( Array(Oporka.left+0.3*mm+Oporka.strokeWidth/2, WidthForm*mm+15*mm), Array(Oporka.left+0.3*mm+Oporka.strokeWidth/2, 9*mm)) );
        leftRez.stroked = false;
        leftRez.strokeColor = Prll;
        leftRez.strokeWidth = 0.01*mm;
        leftRez.filled = false;
        leftRez.strokeOverprint = true;

    var rightRez = REZ.pathItems.add();
        rightRez .setEntirePath( Array( Array(Oporka.left+Oporka.width-0.3*mm+Oporka.strokeWidth/2, WidthForm*mm+15*mm), Array(Oporka.left+Oporka.width-0.3*mm+Oporka.strokeWidth/2, 9*mm)) );
        rightRez.stroked = false;
        rightRez.strokeColor = Prll;
        rightRez.strokeWidth = 0.01*mm;
        rightRez.filled = false;
        rightRez.strokeOverprint = true;
    
//------------------POINT----------------------------------------    

    
var Point0 = L_Test.groupItems.add();
    
var P0K = Point0.pathItems.ellipse(dotPoint/2, -dotPoint/2, dotPoint, dotPoint, false, false );
    P0K.stroked = false;
    P0K.filled = true;
    P0K.fillColor = PFull;
    P0K.fillOverprint = false;
    
var P0W = Point0.pathItems.ellipse(dotPoint/8, -dotPoint/8, dotPoint/4, dotPoint/4, false, false );
    P0W.stroked = false;
    P0W.filled = true;
    P0W.fillColor = PWhite;
    P0W.fillOverprint = false;
    
var P1K = Point0.duplicate();
    P1K.left += Rap*mm;
    
//----------RLL----------
var rll0 = newLayer.pathItems.add();
    rll0.setEntirePath( Array( Array(0, 0), Array(0, -mm)) );
    rll0.stroked = false;
    rll0.strokeColor = Prll;
    rll0.strokeWidth = 0.01*mm;
    rll0.filled = false;
    rll0.strokeOverprint = true;

var rll1 = newLayer.pathItems.add();
    rll1.setEntirePath( Array( Array(Rap*mm, 0), Array(Rap*mm, -mm)) );
    rll1.stroked = true;
    rll1.strokeColor = Prll;
    rll1.strokeWidth = 0.01*mm;
    rll1.filled = false;
    rll1.strokeOverprint = true;

   var countLabel=0;
   var i = 0;
   
   var gor=parseInt((Rap)/10);
    if (gor>40) gor=40;
   var ver = parseInt(WidthForm/10);
    if (ver>40) ver=40;
    //alert('gor '+gor+"\n ver "+ver);
    
for (s=0; s<gor; s++) {
    countLabel++;
var LTest = L_Test.groupItems.add();
    newPath = LTest.pathItems.add();
    newPath.setEntirePath( Array( Array(5*mm+i, 6*mm), Array(5*mm+i, 0), Array(8.5*mm+i, 0) ) );
    newPath.stroked = true;
    newPath.strokeColor = PFull;
    newPath.strokeCap = StrokeCap.ROUNDENDCAP;
    newPath.strokeWidth = lineOb*mm;
    newPath.filled = false;
var LText = Linfo.textFrames.add();
    LText.position = [7*mm+i,6*mm];
    LText.contents = countLabel;
    LText.textRange.characterAttributes.size = 11;
    LText.textRange.characterAttributes.textFont = app.textFonts.getByName(fonts);
    LText.textRange.characterAttributes.fillColor = PLabel;
    i+=10*mm;

    }
    
   var countLabel=0;
   var i = 0;
for (s=0; s<ver; s++) {
    countLabel++;
var LTest = L_Test.groupItems.add();
    newPath = LTest.pathItems.add();
    newPath.setEntirePath( Array( Array(-8*mm, 6*mm+i), Array(-8*mm, i), Array(-4.5*mm, i) ) );
    newPath.stroked = true;
    newPath.strokeColor = PFull;
    newPath.strokeCap = StrokeCap.ROUNDENDCAP;
    newPath.strokeWidth = lineOb*mm;
    newPath.filled = false;
var LText = Linfo.textFrames.add();
    LText.position = [-6*mm,6*mm+i];
    LText.contents = countLabel;
    LText.textRange.characterAttributes.size = 11;
    LText.textRange.characterAttributes.textFont = app.textFonts.getByName(fonts);
    LText.textRange.characterAttributes.fillColor = PLabel;
    i+=10*mm;

    }
    
    
Gabarit = L_Test.pathItems.rectangle( -5*mm, -12*mm, Rap*mm+23*mm, -WidthForm*mm-27*mm);
//Oporka.setEntirePath( Array( Array(0, 0), Array(0, hi), Array(5*mm, hi), Array(5*mm, 0) ) );
Gabarit.closed = true;
Gabarit.filled = false;
Gabarit.stroked = true;
Gabarit.strokeColor = PFull;
Gabarit.fillOverprint = false;
Gabarit.strokeWidth = 1.5*mm;

newLayer = null;
Linfo = null;
L_Test = null;
    
 
//---------------------------------- functions
    
function circ(){
    var i =0;
    var j =0;
 // alert(SAll[0],SAll[1]);
 
    elip = elm.pathItems.ellipse(0, 0, 70, 70, false, false );
    elip.stroked = true;
    elip.filled = false;
    elip.strokeColor = PFull;
    elip.strokeWidth = lineOb*mm;
    elip.width=SAll[0]*mm;
    elip.height=SAll[1]*mm;
    elip.top = WidthLab+i+elip.height+Gapp[0]*mm/2+lineOb*mm/2.0;
    elip.left = (5*mm-lineOb*mm/2.0)+((Gap2)*mm/2);

    }
    
    
function rect(){
    
     var i =0;
    var j =0;
    var corn = SAll[0]/SAll[1];

 
    elip = elm.pathItems.roundedRectangle(0, 0, SAll[0]*mm, SAll[1]*mm, SAll[2]*mm, SAll[2]*mm, false );
    elip.stroked = true;
    elip.filled = false;
    elip.strokeColor = PFull;
    elip.strokeWidth = lineOb*mm;
    //elip.width=form[11]*mm;
    //elip.height=form[10]*mm;
    elip.top = WidthLab+i+elip.height+Gapp[0]*mm/2+lineOb*mm/2;
    elip.left = (5*mm-lineOb*mm/2)+((Gap2)*mm/2);

        //roundedRectangle (top: number, left: number, width: number, height: number[, horizontalRadius: number=15][, verticalRadius: number=20][, reversed: bool=false])
    
}
    
 function el(){

     if (SAll[0]=="true") selAll(); else {
         if (app.documents.length >0){
			 docSelection2 = docRef.selection;
			 
			 if (docSelection2.length>0){
 for(var i = 0; i < docSelection2.length; i++){
    docSelection  = docSelection2[i]; 
     docSelection.strokeColor = PFull;
	 docSelection.filled = false;
     docSelection.strokeWidth = lineOb*mm;
    docSelection.moveToBeginning(elm); 
     
 }
 SAll[0]=elm.width/mm; SAll[1]=elm.height/mm;
				   //Gap2 = Rap/Rep - form[11];
				   //alert(Gap2);
//alert(form[10]+"--"+form[11]);
  
			   
			 } else alert("No selection");
     

										}
											}
 } 
    
function selAll(){
  var iSel = 0;
 for(var i = 0; i < documents[0].pathItems.length; i++){
    docSelection  = documents[0].pathItems[i]; 
     docSelection.strokeColor = PFull;
	 docSelection.filled = false;
     docSelection.strokeWidth = lineOb*mm;
    docSelection.moveToBeginning(elm); 
    iSel += documents[0].pathItems[i].length/mm;
 }
 SAll[0]=elm.width/mm; SAll[1]=elm.height/mm;  
   xEl=documents[0].pathItems[0].width/mm; yEl=documents[0].pathItems[0].height/mm;

  // if (parseInt((parseFloat(perimetr)*Distor)) > parseFloat(parseFloat(iSel).toFixed(1)))
  //    alert(parseInt((parseFloat(perimetr)*Distor))+"\n"+parseFloat(parseFloat(iSel).toFixed(1))+"\n"+"Не совпадение длины периметра!\nВозможна двойная дисторция");
 }
    
function elSelect(mirror){
    if (mirror) { elm.transform(app.getScaleMatrix(-100,100));
                  elm.rotate(-90);}
    else elm.rotate(90);
    
    var i =0;
    var j =0;
    elm.strokeColor = PFull;
	elm.filled = false;
    elm.strokeWidth = lineOb*mm;
    elm.top = WidthLab+i+elm.height+Gapp[0]*mm/2+lineOb*mm/2;
    elm.left = (5*mm-lineOb*mm/2)+((Gap2)*mm/2)+ j;
	var kostyl = false;
	
	var tr=Gap2*mm+SAll[1]*mm;

for (q=0; q<Rep; q++){      
for (w=0; w<Stre; w++){ 

	if (kostyl) elm.duplicate();
    elm.strokeColor = PFull;
	elm.filled = false;
    elm.strokeWidth = lineOb*mm;
    elm.top = WidthLab+i+elm.height+Gapp[0]*mm/2+lineOb*mm/2;
    elm.left = (5*mm-lineOb*mm/2)+((Gap2)*mm/2)+ j;
    i+=(SAll[0]*mm+Gapp[0]*mm);

    //elm.moveToBeginning(elm1);
   //alert(w+" i="+i+"\n"+q+" j="+j);
kostyl = true;
            }

    //elm2 = elm1.duplicate();
    //elm1.moveToBeginning(elm2);

    j+= tr;
	//alert(PolurotY/form[3]*mm+'\n'+tr);
    i=0;
    //elm.left= (10*mm-elm.strokeWidth/2)+((form[2]/form[3]-form[11])*mm/2) + j;
        }
  
    }
    
    
function fullSelect(){
    elm.transform(app.getScaleMatrix(-100,100));
    elm.rotate(-90);
    
    //var WidthLab = 29*mm; 

    elm.strokeColor = PFull;
	elm.filled = false;
    elm.strokeWidth = lineOb*mm;
    elm.top = WidthLab+elm.height+lineOb*mm/2+Gapp[0]*mm/2;
    elm.left = (5*mm-lineOb*mm/2)+((PolurotY-SAll[1])*mm/2);
    
    Rep=1;
    Stre=1;
	

    }

function closePath(){
	
// -------------------------------------------------------------------

var warning_limit = 400;

// -------------------------------------------------------------------

var X="Close All Paths\n\n"; {

  var MSG_asksel = X+"Close all selected open path-items?";
  var MSG_ask = X+"Close all open path-items in this document.";
  var MSG_allclosed = X+"There are no open path-items in this document.";
  var MSG_allselclosed = X+"The selection does not contain any open path-item.";
  var MSG_nopath = X+"You have not selected any path-item.";
  var MSG_nodocs = X+"You have no open document."
  var MSG_warning = X+"The document will be analyzed for open path-items ...";
  var MSG_status = X+"Closed path-items: ";

}

var error=0;
var locked = false;
var proccessedItems = 0;

if (documents.length<1) {
  error++;
  alert(MSG_nodocs);
} else {
  {
    var allPaths = activeDocument.pathItems;
    if (selection.length > 0) {
      var onlySelection = 1;
      var selcount = 0;
      for (var i = 0; i < selection.lenght; i++)
      {
        if (selection[i].typename == "PathItem") { selcount++; }
      }
      if (selcount == selection.lenght)
      {
        var allPaths = selection;
      }
    } else {
      var onlySelection = 0;
    }
    if (allPaths.length > warning_limit ) { alert (MSG_warning+ " ("+allPaths.length+")"); }
    var count=0;
    for (var i=0; i < allPaths.length; i++) {
      locked = false;
      isLocked(allPaths[i]);
      if ((allPaths[i].selected == true || onlySelection == 0) && !locked && !allPaths[i].layer.locked )
      {
        if( !allPaths[i].closed) { count++; }
      }
    }
    if (count == 0) {
      error++;
      if (selection.length > 0) { alert(MSG_allselclosed); } else { alert(MSG_allclosed); }
    }

    if (allPaths.length < 0) { error++; alert(MSG_nopath); }
    if (error < 1) {
      if (selection.length > 0) {
        var confirmed = confirm(MSG_asksel + " ("+count+")" );
      } else {
        var confirmed = confirm(MSG_ask + " ("+count+")");
      }
      if (confirmed) {
        close(allPaths);
        if (proccessedItems != count) {
          alert(MSG_status+proccessedItems+"/"+count);
        } else {
          alert(MSG_status+proccessedItems);
        }
      }
    }
  }
}


function close(thePaths) {
  for (var i = 0; i < thePaths.length; i++) {

    if ((thePaths[i].selected == true || onlySelection == 0) && !thePaths[i].closed  )
    {
      try
      {
        thePaths[i].closed=true;
        proccessedItems++;
      } catch (e) { }
    }
  }
}

function isLocked (test) {
  if (test.typename == "Layer")
  {
    if (!locked) { locked = test.locked; }
    if (!locked) { locked = test.hidden; }
  } else {
    if (test.typename != "Layer" && test.locked == true)
    {
      if (!locked) { locked = test.locked; }
      if (!locked) { locked = test.hidden; }
    } else {
      isLocked(test.parent);
    }
  }
}
  } 

function risk (li_wi) {

  LabelW2 = LI.pathItems.add();
  LabelW2.setEntirePath( Array( Array(newGroup.left+lineOb*mm/2, 11*mm), Array(newGroup.left+lineOb*mm/2, 17*mm)) );
  LabelW2.stroked = true;
  LabelW2.strokeColor = PRisk;
  LabelW2.strokeWidth = 0.1*mm;
  LabelW2.filled = false;
  
  LabelW2 = LI.pathItems.add();
  LabelW2.setEntirePath( Array( Array(newGroup.left+newGroup.width+lineOb*mm/2, 11*mm), Array(newGroup.left+newGroup.width+lineOb*mm/2, 17*mm)) );
  LabelW2.stroked = true;
  LabelW2.strokeColor = PRisk;
  LabelW2.strokeWidth = 0.1*mm;
  LabelW2.filled = false;
  
  LabelW2 = LI.pathItems.add();
  LabelW2.setEntirePath( Array( Array(newGroup.left+lineOb*mm/2, WidthForm*mm+13*mm), Array(newGroup.left+lineOb*mm/2, WidthForm*mm+7*mm)) );
  LabelW2.stroked = true;
  LabelW2.strokeColor = PRisk;
  LabelW2.strokeWidth = 0.1*mm;
  LabelW2.filled = false;
  
  LabelW2 = LI.pathItems.add();
  LabelW2.setEntirePath( Array( Array(newGroup.left+newGroup.width+lineOb*mm/2, WidthForm*mm+13*mm), Array(newGroup.left+newGroup.width+lineOb*mm/2, WidthForm*mm+7*mm)) );
  LabelW2.stroked = true;
  LabelW2.strokeColor = PRisk;
  LabelW2.strokeWidth = 0.1*mm;
  LabelW2.filled = false;
//----------
  LabelSw1 = LI.pathItems.add();
  LabelSw1.setEntirePath( Array( Array(4*mm, newGroup.top-lineOb*mm/2), Array(9*mm, newGroup.top-lineOb*mm/2)) );
  LabelSw1.stroked = true;
  LabelSw1.strokeColor = PRisk;
  LabelSw1.strokeWidth = 0.1*mm;
  LabelSw1.filled = false;
  
  LabelSw1 = LI.pathItems.add();
  LabelSw1.setEntirePath( Array( Array(4*mm, newGroup.top-newGroup.height-lineOb*mm/2), Array(9*mm, newGroup.top-newGroup.height-lineOb*mm/2)) );
  LabelSw1.stroked = true;
  LabelSw1.strokeColor = PRisk;
  LabelSw1.strokeWidth = 0.1*mm;
  LabelSw1.filled = false;

  LabelSw2 = LI.pathItems.add();
  LabelSw2.setEntirePath( Array( Array(li_wi, newGroup.top-lineOb*mm/2), Array(li_wi-5*mm, newGroup.top-lineOb*mm/2)) );
  LabelSw2.stroked = true;
  LabelSw2.strokeColor = PRisk;
  LabelSw2.strokeWidth = 0.1*mm;
  LabelSw2.filled = false;
  
  LabelSw2 = LI.pathItems.add();
  LabelSw2.setEntirePath( Array( Array(li_wi, newGroup.top-newGroup.height-lineOb*mm/2), Array(li_wi-5*mm, newGroup.top-newGroup.height-lineOb*mm/2)) );
  LabelSw2.stroked = true;
  LabelSw2.strokeColor = PRisk;
  LabelSw2.strokeWidth = 0.1*mm;
  LabelSw2.filled = false;

}   


function recRap (Rap, WidthForm) {
  var Pr = new CMYKColor(); // text
    Pr.name = 'PrColor';
    Pr.black = 0; 
    Pr.cyan = 100; 
    Pr.magenta = 0; 
    Pr.yellow = 100;

  RRap = Linfo.pathItems.rectangle( 12*mm, 5*mm, Rap*mm, -WidthForm*mm);
  RRap.closed = true;
  RRap.filled = false;
  RRap.stroked = true;
  RRap.strokeColor = Pr;
  RRap.fillOverprint = false;
  RRap.strokeWidth = 0.3*mm;

  RR1 = REZ.pathItems.rectangle( -3*mm, -10*mm, Rap*mm+30*mm, -WidthForm*mm-30*mm);
  RR1.closed = true;
  RR1.filled = false;
  RR1.stroked = true;
  RR1.strokeColor = Pr;
  RR1.fillOverprint = false;
  RR1.strokeWidth = 0;

	app.activeDocument.layers["REZ"].hasSelectedArtwork = true;
	app.activeDocument.fitArtboardToSelectedArt(0);
	app.activeDocument.selection = null;

  app.activeDocument.layers.getByName('L-Test').remove();
  app.activeDocument.layers.getByName('REZ').remove();

}

  docRef = null;
  delete sp;
  return;  
};
