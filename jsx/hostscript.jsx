﻿/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function sayHello(sp) {
    
var fonts="MagistralTT";
    
var docRef = app.activeDocument;
var newLayer=docRef.activeLayer;
//newLayer = docRef.layers.add();
//newLayer.zOrder(ZOrderMethod.BRINGTOFRONT);
newLayer.name="Knife";
L_Test = docRef.layers.add();
L_Test.zOrder(ZOrderMethod.SENDTOBACK);
L_Test.name="L-Test";
    
Linfo = docRef.layers.add();
Linfo .zOrder(ZOrderMethod.BRINGTOFRONT);
Linfo .name="info";
    
docRef.rulerOrigin = Array (0,0);
    var units = 1; // 2-inches, 3-milllimeters, 0-points
    app.preferences.setIntegerPreference("rulerType", units);
    app.preferences.setIntegerPreference("strokeUnits", units);
    
var wi= docRef.width;
var hi = docRef.height;
    
  //alert(sp);  
    var form=sp.split(';');
 var Da= new Date ();

//Dat=Da.toLocaleString();

var Dat= String (''+Da.getDate() +'-'+ (Da.getMonth()+1)+'-'+  Da.getFullYear());
  //alert("Namber "+form[0]+"\nCustomer "+form[1]+"\nRap[1]ort "+form[2]+"\nRepetition "+form[3]+"\nStreams "+form[4]+"\nGAP "+Gapp[0]+"\ncasing "+form[6]+"\ndist "+form[7]);  
    //@target illustrator
//app.bringToFront();
    //alert("Namber "+form[10]);
    var Nam = form[0];
    var Cust = form[1];
    var Rap = form[2].split(' ');
	//alert (Rap[0]+' '+ Rap[1]);
    var Rep = form[3];
    var Stre = form[4];
    var Gapp = form[5].split(' ');
	var Plosk = Rap[1];
	var Rap0 = Rap[0];
	var PlTrue= true;

	var Gap2 = Gapp[1]*1.0;
	//alert (Rap[0]/Rep+'\n'+Gap2);
    var casi = form[6];
    var Distor = form[7];
    var Ang = form[8].substring(0, form[8].indexOf(" "));
    var Mate = form[8].substring(form[8].indexOf(" "), form[8].lastIndexOf(" "));
    var Kni = form[9];
    if (~Mate.indexOf("Плоская")) {Rap[1]=Rap[0]; Rap[0]= Plosk+0.001;}
    if (~Mate.indexOf("Ротация")) {Mate=''; Rap[1]=Rap[0]; Rap[0]= Plosk;}
	if (~Mate.indexOf("Полуротация")) PlTrue = false;
	
	var SAll = form[10];
	var cheks = form[11];
	//alert(cheks);
    
   var lineOb = parseFloat(form[8].substring(form[8].lastIndexOf(" ")));   
    
mm = 72.0/25.4;
mms= mm/2.0;
var WidthLab = 19*mm; 
var xEl=0, yEl=0;
var compens = 6;
 
    
var elem = newLayer.groupItems.add();  
var elis = newLayer.groupItems.add(); 
var elm = newLayer.groupItems.add();
var elm1 = newLayer.groupItems.add();
var elm2 = newLayer.groupItems.add();
var alls = newLayer.groupItems.add();
    
    var docSelection = new Array();
    var docSelection2 = new Array();
    
var PLabel = new CMYKColor();
    PLabel.name = 'labelColor';
    PLabel.black =0; 
    PLabel.cyan = 0; 
    PLabel.magenta = 80; 
    PLabel.yellow = 0;
    
var PCyan = new CMYKColor();
    PCyan.name = 'labelColor';
    PCyan.black =0; 
    PCyan.cyan = 100; 
    PCyan.magenta = 100; 
    PCyan.yellow = 0;
var PRisk= new CMYKColor();
    PRisk.name = 'labelColor';
    PRisk.black =100; 
    PRisk.cyan = 100; 
    PRisk.magenta = 0; 
    PRisk.yellow = 0;
    
var PWhite = new CMYKColor();
    PWhite.name = 'WhiteColor';
    PWhite.black =0; 
    PWhite.cyan = 0; 
    PWhite.magenta = 0; 
    PWhite.yellow = 0;
    
var PFull = new CMYKColor();
    PFull.name = 'FullColor';
    PFull.black =100; 
    PFull.cyan = 100; 
    PFull.magenta = 100; 
    PFull.yellow = 100;
     
 if  (form[6]==2){if (cheks=='true') {closePath();} el();  Gap2 = Rap[1]/Rep - form[11]; elSelect();};
 if  (form[6]==3){if (cheks=='true') {closePath();} el(); fullSelect();}; 
 if  (form[6]==0){circ();elSelect();};
 if  (form[6]==1){rect();elSelect();};
 
 if (Rap[1]==0)
	 if (form[6]==3) Rap[1] = elm.width/mm + 10;
		else Rap[1] = (elm.width/mm+Gap2)*Rep-Gap2 + 10;

 //if (Rap[1]==0 & form[6]==2) alert (); 
 //alert (Rap[1]+' '+elm.width);
    
var newGroup = newLayer.groupItems.add();
    
for(var i=0;i<docRef.pathItems.length;i++){
    var a = docRef.pathItems[i];
a.moveToBeginning(newGroup);
         }
for(var i=0;i<docRef.textFrames.length;i++){
    var a = docRef.textFrames[i];
a.moveToBeginning(newGroup);
         }
    
 var WidthForm = (form[10]*form[4])+(Gapp[0]*form[4])+20 - compens; 
 if ((Rap[0]!=Rap[1]) && PlTrue) {WidthForm = Plosk; }
    
var LI = Linfo.groupItems.add();
var RiskGorizont = LI.groupItems.add();
    
Oporka = LI.pathItems.rectangle( 12*mm, 5*mm, Rap[1]*mm, -WidthForm*mm);
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
    angleRT.setEntirePath( Array( Array(Rap[1]*mm+8*mm, 12*mm), Array(Rap[1]*mm+5*mm, 12*mm), Array(Rap[1]*mm+5*mm, 9*mm) ) );
    angleRT.stroked = true;
    angleRT.strokeColor = PCyan;
    angleRT.strokeWidth = 0.1*mm;
    angleRT.filled = false;
   
    angleRB = LI.pathItems.add();
    angleRB.setEntirePath( Array( Array(Rap[1]*mm+8*mm, WidthForm*mm+12*mm), Array(Rap[1]*mm+5*mm, WidthForm*mm+12*mm), Array(Rap[1]*mm+5*mm, WidthForm*mm+15*mm) ) );
    angleRB.stroked = true;
    angleRB.strokeColor = PCyan;
    angleRB.strokeWidth = 0.1*mm;
    angleRB.filled = false;
	
	    LabelW2 = LI.pathItems.add();
		LabelW2.setEntirePath( Array( Array(11*mm, 12*mm), Array(11*mm, 17*mm)) );
		LabelW2.stroked = true;
		LabelW2.strokeColor = PRisk;
		LabelW2.strokeWidth = 0.15*mm;
		LabelW2.filled = false;
		
		LabelW2 = LI.pathItems.add();
		LabelW2.setEntirePath( Array( Array(Rap[1]*mm-1*mm, 12*mm), Array(Rap[1]*mm-1*mm, 17*mm)) );
		LabelW2.stroked = true;
		LabelW2.strokeColor = PRisk;
		LabelW2.strokeWidth = 0.15*mm;
		LabelW2.filled = false;
		
		LabelW2 = LI.pathItems.add();
		LabelW2.setEntirePath( Array( Array(11*mm, WidthForm*mm+12*mm), Array(11*mm, WidthForm*mm+7*mm)) );
		LabelW2.stroked = true;
		LabelW2.strokeColor = PRisk;
		LabelW2.strokeWidth = 0.15*mm;
		LabelW2.filled = false;
		
		LabelW2 = LI.pathItems.add();
		LabelW2.setEntirePath( Array( Array(Rap[1]*mm-1*mm, WidthForm*mm+12*mm), Array(Rap[1]*mm-1*mm, WidthForm*mm+7*mm)) );
		LabelW2.stroked = true;
		LabelW2.strokeColor = PRisk;
		LabelW2.strokeWidth = 0.15*mm;
		LabelW2.filled = false;
		
		riskCenter = LI.pathItems.add();
		riskCenter.setEntirePath( Array( Array(5*mm, WidthForm*mm/2+12*mm), Array(10*mm, WidthForm*mm/2+12*mm)) );
		riskCenter.stroked = true;
		riskCenter.strokeColor = PRisk;
		riskCenter.strokeWidth = 0.15*mm;
		riskCenter.filled = false;
		
		riskCenter = LI.pathItems.add();
		riskCenter.setEntirePath( Array( Array(Rap[1]*mm+5*mm, WidthForm*mm/2+12*mm), Array(Rap[1]*mm, WidthForm*mm/2+12*mm)) );
		riskCenter.stroked = true;
		riskCenter.strokeColor = PRisk;
		riskCenter.strokeWidth = 0.15*mm;
		riskCenter.filled = false;

var i = 0;
    iv=(form[10]*mm+Gapp[0]*mm);
    if (form[6]==3){iv/=2; form[4]+=1;};
    //alert('gor '+form[7]+"\n ver "+iv);
for (s1=0; s1<=form[4]; s1++) {
    LabelSw1 = RiskGorizont.pathItems.add();
    LabelSw1.setEntirePath( Array( Array(5*mm, WidthLab+i), Array(10*mm, WidthLab+i)) );
    LabelSw1.stroked = true;
    LabelSw1.strokeColor = PRisk;
    LabelSw1.strokeWidth = 0.15*mm;
    LabelSw1.filled = false;
    
    LabelSw2 = RiskGorizont.pathItems.add();
    LabelSw2.setEntirePath( Array( Array(Rap[1]*mm+5*mm, WidthLab+i), Array(Rap[1]*mm, WidthLab+i)) );
    LabelSw2.stroked = true;
    LabelSw2.strokeColor = PRisk;
    LabelSw2.strokeWidth = 0.15*mm;
    LabelSw2.filled = false;
    i+=iv;
}
    
var LVector1 = LI.groupItems.add();
    LV1 = LVector1.pathItems.add();
    LV1.setEntirePath( Array( Array(10*mm, WidthLab-5*mm), Array(28*mm, WidthLab-5*mm)) );
    LV1.stroked = true;
    LV1.strokeColor = PLabel;
    LV1.strokeWidth = 0.1*mm;
    LV1.filled = false;
    LV2 = LVector1.pathItems.add();
    LV2.setEntirePath( Array( Array(25*mm, WidthLab-6*mm), Array(30*mm, WidthLab-5*mm), Array(25*mm, WidthLab-4*mm)) );
    LV2.stroked = true;
    LV2.strokeColor = PLabel;
    LV2.strokeWidth = 0.1*mm;
    LV2.filled = false;

var LVector2 = LVector1.duplicate();
    LVector2.top = WidthLab+i-iv+6*mm;
    
var LVector3 = LVector1.duplicate();
    LVector3.rotate(180);
    LVector3.left = Rap[1]*mm-20*mm;
    
var LVector4 = LVector1.duplicate();
    LVector4.rotate(180);
    LVector4.left = Rap[1]*mm-20*mm;
    LVector4.top = WidthLab+i-iv+6*mm;
    
var Llog = LI.textFrames.add();
    Llog.position = [(Rap[1]*mm)/2-50*mm,WidthLab+i-iv+5*mm];
    Llog.contents = "www.justcut.ru  +7(495) 155-62-73";
    Llog.textRange.characterAttributes.size = 16;
	Llog.textRange.characterAttributes.tracking = 30;
    //Llog.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
    Llog.textRange.characterAttributes.textFont = app.textFonts.getByName(fonts);
    Llog.textRange.characterAttributes.fillColor = PLabel;
	if (Llog.width > Rap[1]*mm) Llog.width = Rap[1]*mm;
	Llog.position = [(Rap[1]*mm)/2-(Llog.width/2)+5*mm, WidthLab+i-iv+7*mm];
    
	
	 if  (form[6]!=3) {xEl = form[10]; yEl = form[11];}
	
var LPod = LI.textFrames.add();
    LPod.contents = (""+Dat+" / "+form[1]+" / "+parseFloat(parseFloat(xEl).toFixed(3))+"x"+parseFloat(parseFloat(yEl).toFixed(3))+" / ВАЛ "+parseInt(Rap0/3.175)+"("+Rap0+")"+" / "+form[0]+" / "+Ang+Mate); //.split(".").join(" ");
    LPod.textRange.characterAttributes.size = 12;
	LPod.textRange.characterAttributes.tracking = 30;
    //LPod.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
    LPod.textRange.characterAttributes.textFont = app.textFonts.getByName(fonts);
    LPod.textRange.characterAttributes.fillColor = PLabel;
    if (LPod.width > Rap[1]*mm) LPod.width = Rap[1]*mm;
    LPod.position = [(Rap[1]*mm)/2-(LPod.width/2)+5*mm, 17*mm];
    
var LPod2 = LI.textFrames.add();
    LPod2.position = [(Rap[1]*mm)/2-(LPod2.width/2)-38*mm, 11*mm];
    LPod2.contents = (form[7]+" - "+form[9]+" - "+Ang+" - Mirror, L"+lineOb); //.split(".").join(" ");
    LPod2.textRange.characterAttributes.size = 12;
	LPod2.textRange.characterAttributes.tracking = 30;
    LPod2.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
    LPod2.textRange.characterAttributes.textFont = app.textFonts.getByName(fonts);
    LPod2.textRange.characterAttributes.fillColor = PLabel;
	if (LPod2.width > Rap[1]*mm) LPod2.width = Rap[1]*mm;
    LPod2.position = [(Rap[1]*mm)/2-(LPod2.width/2)+5*mm, 11*mm];
    
if (form[7]!=0){   
    
    LI.width *= form[7];
    //docRef.layers["info"].locked = true;
    newGroup.width *= form[7];
    newGroup.left = 5*mm +(LI.width-newGroup.width-6*mm)/2-lineOb*mm/2.0;
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
  
  //if (~Mate.indexOf("Плоская"))
	   if (Rap[0]!=Rap[1])
  {   
    
    //docRef.layers["info"].locked = true;
	
	newGroup.top = WidthForm*mm/2.0 + newGroup.height/2.0 + lineOb*mm/2.0 + 12*mm;
	RiskGorizont.top = WidthForm*mm/2.0 + RiskGorizont.height/2.0 + 0.15*mm/2.0 + 12*mm;
	Llog.top = WidthForm*mm + 10*mm;
	LVector2.top = WidthForm*mm + 8*mm;
	LVector4.top = WidthForm*mm + 8*mm;
    newGroup.left = 5*mm +(LI.width-newGroup.width-6*mm)/2-lineOb*mm/2.0;

   
  }
    

    
//----------------------------------------------------------    
    
    
var Point0 = L_Test.groupItems.add();
    
var P0K = Point0.pathItems.ellipse(2.0/2, -2.0/2, 2.0, 2.0, false, false );
    P0K.stroked = false;
    P0K.filled = true;
    P0K.fillColor = PFull;
    P0K.fillOverprint = false;
    
var P0W = Point0.pathItems.ellipse(2.0/8, -2.0/8, 2.0/4, 2.0/4, false, false );
    P0W.stroked = false;
    P0W.filled = true;
    P0W.fillColor = PWhite;
    P0W.fillOverprint = false;
    
var P1K = Point0.duplicate();
    P1K.left += Rap[1]*mm;
    
   var countLabel=0;
   var i = 0;
   
   var gor=parseInt((Rap[1])/10);
    if (gor>20) gor=20;
   var ver = parseInt(WidthForm/9);
    if (ver>20) ver=20;
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
    
    
Gabarit = L_Test.pathItems.rectangle( -5*mm, -12*mm, Rap[1]*mm+23*mm, -WidthForm*mm-27*mm);
//Oporka.setEntirePath( Array( Array(0, 0), Array(0, hi), Array(5*mm, hi), Array(5*mm, 0) ) );
Gabarit.closed = true;
Gabarit.filled = false;
Gabarit.stroked = true;
Gabarit.strokeColor = PFull;
Gabarit.fillOverprint = false;
Gabarit.strokeWidth = 1.5*mm;
    
 
//---------------------------------- functions
    
function circ(){
    var i =0;
    var j =0;

 
    elip = elm.pathItems.ellipse(0, 0, 70, 70, false, false );
    elip.stroked = true;
    elip.filled = false;
    elip.strokeColor = PFull;
    elip.strokeWidth = lineOb*mm;
    elip.width=form[10]*mm;
    elip.height=form[11]*mm;
    elip.top = WidthLab+i+elip.height+Gapp[0]*mm/2+lineOb*mm/2.0;
    elip.left = (5*mm-lineOb*mm/2.0)+((Gap2)*mm/2);

    }
    
    
function rect(){
    
     var i =0;
    var j =0;
    var corn = form[10]/form[11];

 
    elip = elm.pathItems.roundedRectangle(0, 0, form[10]*mm, form[11]*mm, form[12]*mm, form[12]*mm, false );
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

     if (SAll=="true") selAll(); else {
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
				   form[10]=elm.width/mm; form[11]=elm.height/mm;
				   //Gap2 = Rap[1]/Rep - form[11];
				   //alert(Gap2);
//alert(form[10]+"--"+form[11]);
  
			   
			 } else alert("No selection");
     

										}
											}
 } 
    
function selAll(){
 for(var i = 0; i < documents[0].pathItems.length; i++){
    docSelection  = documents[0].pathItems[i]; 
     docSelection.strokeColor = PFull;
	 docSelection.filled = false;
     docSelection.strokeWidth = lineOb*mm;
    docSelection.moveToBeginning(elm); 
     
 }
   form[10]=elm.width/mm; form[11]=elm.height/mm;  
   xEl=documents[0].pathItems[0].width/mm; yEl=documents[0].pathItems[0].height/mm;
   //Gap2 = Rap[1]/Rep - form[11];
 
 }
    
function elSelect(){
    elm.transform(app.getScaleMatrix(-100,100));
    elm.rotate(-90);
    var i =0;
    var j =0;
    elm.strokeColor = PFull;
	elm.filled = false;
    elm.strokeWidth = lineOb*mm;
    elm.top = WidthLab+i+elm.height+Gapp[0]*mm/2+lineOb*mm/2;
    elm.left = (5*mm-lineOb*mm/2)+((Gap2)*mm/2)+ j;
	var kostyl = false;
	
	var tr=Gap2*mm+form[11]*mm;

for (q=0; q<form[3]; q++){      
for (w=0; w<form[4]; w++){ 

	if (kostyl) elm.duplicate();
    elm.strokeColor = PFull;
	elm.filled = false;
    elm.strokeWidth = lineOb*mm;
    elm.top = WidthLab+i+elm.height+Gapp[0]*mm/2+lineOb*mm/2;
    elm.left = (5*mm-lineOb*mm/2)+((Gap2)*mm/2)+ j;
    i+=(form[10]*mm+Gapp[0]*mm);

    //elm.moveToBeginning(elm1);
   //alert(w+" i="+i+"\n"+q+" j="+j);
kostyl = true;
            }

    //elm2 = elm1.duplicate();
    //elm1.moveToBeginning(elm2);

    j+= tr;
	//alert(Rap[0]/form[3]*mm+'\n'+tr);
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
    elm.left = (5*mm-lineOb*mm/2)+((Rap[0]-form[11])*mm/2);
    
    form[3]=1;
    form[4]=1;
	

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
    
};
