/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function sayHello(sp) {
    
var docRef = app.activeDocument;
var newLayer=docRef.activeLayer;
//newLayer = docRef.layers.add();
//newLayer.zOrder(ZOrderMethod.BRINGTOFRONT);
newLayer.name="Cut";
L_Test = docRef.layers.add();
L_Test.zOrder(ZOrderMethod.SENDTOBACK);
L_Test.name="L-Test";
    
Linfo = docRef.layers.add();
Linfo .zOrder(ZOrderMethod.BRINGTOFRONT);
Linfo .name="info";
    
docRef.rulerOrigin = Array (0,0);
    var units = 3; // 2-inches, 3-milllimeters, 0-points
    app.preferences.setIntegerPreference("rulerType", units);
    app.preferences.setIntegerPreference("strokeUnits", units);
    
var wi= docRef.width;
var hi = docRef.height;
    
    
    var form=sp.split(';');

  //alert("Namber "+form[0]+"\nCustomer "+form[1]+"\nRaport "+form[2]+"\nRepetition "+form[3]+"\nStreams "+form[4]+"\nGAP "+form[5]+"\ncasing "+form[6]+"\ndiam "+form[7]);  
    //@target illustrator
//app.bringToFront();
    //alert("Namber "+form[8]);
    
    
    
mm = 72.0/25.4;
mms= mm/2.0;
var WidthLab = 22*mm; 
 
    
var elem = newLayer.groupItems.add();  
var elis = newLayer.groupItems.add(); 
var elm = newLayer.groupItems.add();
var elm1 = newLayer.groupItems.add();
var elm2 = newLayer.groupItems.add();
var alls = newLayer.groupItems.add();
    
    var docSelection = new Array();
    
    
var PLabel = new CMYKColor();
    PLabel.name = 'labelColor';
    PLabel.black =0; 
    PLabel.cyan = 70; 
    PLabel.magenta = 0; 
    PLabel.yellow = 0;
    
var PCyan = new CMYKColor();
    PCyan.name = 'labelColor';
    PCyan.black =0; 
    PCyan.cyan = 100; 
    PCyan.magenta = 0; 
    PCyan.yellow = 0;
    
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
     
 if  (form[6]==2){el(); elSelect();};
 if  (form[6]==3){el(); fullSelect();}; 
 if  (form[6]==0){circ();};
 if  (form[6]==1){rect();};
    
var newGroup = newLayer.groupItems.add();
    
for(var i=0;i<docRef.pathItems.length;i++){
    var a = docRef.pathItems[i];
a.moveToBeginning(newGroup);
         }
for(var i=0;i<docRef.textFrames.length;i++){
    var a = docRef.textFrames[i];
a.moveToBeginning(newGroup);
         }
    
 var WidthForm = (form[8]*form[4])+(form[5]*form[4])+20; 
    
var LI = Linfo.groupItems.add();
    
Oporka = LI.pathItems.rectangle( 12*mm, 5*mm, form[2]*mm, -WidthForm*mm);
//Oporka.setEntirePath( Array( Array(0, 0), Array(0, hi), Array(5*mm, hi), Array(5*mm, 0) ) );
Oporka.closed = true;
Oporka.filled = false;
Oporka.stroked = true;
Oporka.strokeColor = PCyan;
Oporka.fillOverprint = false;
Oporka.strokeWidth = 0.1*mm;
Oporka.strokeDashes = [2,2,2,2];
    
    

var i = 0;
    iv=(form[8]*mm+form[5]*mm);
    //alert('gor '+form[7]+"\n ver "+iv);
for (s1=0; s1<=form[4]; s1++) {
    LabelSw1 = LI.pathItems.add();
    LabelSw1.setEntirePath( Array( Array(5*mm, WidthLab+i), Array(10*mm, WidthLab+i)) );
    LabelSw1.stroked = true;
    LabelSw1.strokeColor = PCyan;
    LabelSw1.strokeWidth = 0.1*mm;
    LabelSw1.filled = false;
    
    LabelSw2 = LI.pathItems.add();
    LabelSw2.setEntirePath( Array( Array(form[2]*mm+5*mm, WidthLab+i), Array(form[2]*mm, WidthLab+i)) );
    LabelSw2.stroked = true;
    LabelSw2.strokeColor = PCyan;
    LabelSw2.strokeWidth = 0.1*mm;
    LabelSw2.filled = false;
    i+=iv;
}
    
var LVector1 = LI.groupItems.add();
    LV1 = LVector1.pathItems.add();
    LV1.setEntirePath( Array( Array(10*mm, WidthLab-5*mm), Array(30*mm, WidthLab-5*mm)) );
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
    LVector3.left = form[2]*mm-20*mm;
    
var LVector4 = LVector1.duplicate();
    LVector4.rotate(180);
    LVector4.left = form[2]*mm-20*mm;
    LVector4.top = WidthLab+i-iv+6*mm;
    
var Llog = LI.textFrames.add();
    Llog.position = [(form[2]*mm)/2-40*mm,WidthLab+i-iv+7*mm];
    Llog.contents = "www.justcut.ru  +7(495) 155-62-73";
    Llog.textRange.characterAttributes.size = 16;
    //Llog.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
    Llog.textRange.characterAttributes.textFont = app.textFonts.getByName("CourierNewPSMT");
    Llog.textRange.characterAttributes.fillColor = PLabel;
    
var LPod = LI.textFrames.add();
    LPod.contents = ""+form[1]+" / "+parseFloat(parseFloat(form[8]).toFixed(3))+"x"+parseFloat(parseFloat(form[9]).toFixed(3))+" / ВАЛ "+parseInt(form[2]/3.175)+"("+form[2]+")"+" / "+form[0];
    LPod.textRange.characterAttributes.size = 12;
    //LPod.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
    LPod.textRange.characterAttributes.textFont = app.textFonts.getByName("CourierNewPSMT");
    LPod.textRange.characterAttributes.fillColor = PLabel;
    LPod.position = [(form[2]*mm)/2-(LPod.width/2)+3*mm, 17*mm];
    
var LPod2 = LI.textFrames.add();
    LPod2.position = [(form[2]*mm)/2-(LPod2.width/2)-30*mm, 11*mm];
    LPod2.contents = form[7]+" - 0.442 - 70°";
    LPod2.textRange.characterAttributes.size = 12;
    LPod2.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
    LPod2.textRange.characterAttributes.textFont = app.textFonts.getByName("CourierNewPSMT");
    LPod2.textRange.characterAttributes.fillColor = PLabel;
    
    
if (form[7]!=0){   
    
    LI.width *= form[7];
    //docRef.layers["info"].locked = true;
    newGroup.width *= form[7];
    newGroup.left = 5*mm +(LI.width-newGroup.width)/2-0.25*mm;
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
    P1K.left += form[2]*mm;
    
   var countLabel=0;
   var i = 0;
   
   var gor=parseInt((form[2])/10);
    if (gor>20) gor=20;
   var ver=parseInt((WidthForm+5*mm)/10);
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
    newPath.strokeWidth = 0.45*mm;
    newPath.filled = false;
var LText = LTest.textFrames.add();
    LText.position = [8*mm+i,6*mm];
    LText.contents = countLabel;
    LText.textRange.characterAttributes.size = 11;
    //LText.textRange.characterAttributes.textFont = "Arial";
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
    newPath.strokeWidth = 0.45*mm;
    newPath.filled = false;
var LText = LTest.textFrames.add();
    LText.position = [-5*mm,6*mm+i];
    LText.contents = countLabel;
    LText.textRange.characterAttributes.size = 11;
    //LText.textRange.characterAttributes.textFont = app.textFonts.getByName("Arial");;
    LText.textRange.characterAttributes.fillColor = PLabel;
    i+=10*mm;

    }
    
    
Gabarit = L_Test.pathItems.rectangle( -5*mm, -12*mm, form[2]*mm+20*mm, -WidthForm*mm-24*mm);
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

for (w=0; w<form[4]; w++){    
    elip = elem.pathItems.ellipse(0, 0, 70, 70, false, false );
    elip.stroked = true;
    elip.filled = false;
    elip.strokeColor = PFull;
    elip.strokeWidth = 0.5*mm;
    elip.width=form[9]*mm;
    elip.height=form[8]*mm;
    elip.top = WidthLab+i+elip.height+form[5]*mm/2+elip.strokeWidth/2;
    elip.left = (5*mm-elip.strokeWidth/2)+((form[2]/form[3]-form[9])*mm/2);
    i+=(form[8]*mm+form[5]*mm);
    
            }
    
for (q=1; q<form[3]; q++){    
    elis = elem.duplicate();
    j+=form[2]/form[3]*mm;
    elis.left= (5*mm-elip.strokeWidth/2)+((form[2]/form[3]-form[9])*mm/2) + j;

        }
    }
    
    
function rect(){
    
     var i =0;
    var j =0;
    var corn = form[8]/form[9];

for (w=0; w<form[4]; w++){    
    elip = elem.pathItems.roundedRectangle(0, 0, form[9]*mm, form[8]*mm, form[10]*mm, form[10]*mm, false );
    elip.stroked = true;
    elip.filled = false;
    elip.strokeColor = PFull;
    elip.strokeWidth = 0.5*mm;
    //elip.width=form[9]*mm;
    //elip.height=form[8]*mm;
    elip.top = WidthLab+i+elip.height+form[5]*mm/2+elip.strokeWidth/2;
    elip.left = (5*mm-elip.strokeWidth/2)+((form[2]/form[3]-form[9])*mm/2);
    i+=(form[8]*mm+form[5]*mm);
    
            }
    
for (q=1; q<form[3]; q++){    
    elis = elem.duplicate();
    j+=form[2]/form[3]*mm;
    elis.left= (5*mm-elip.strokeWidth/2)+((form[2]/form[3]-form[9])*mm/2) + j;

        }
        //roundedRectangle (top: number, left: number, width: number, height: number[, horizontalRadius: number=15][, verticalRadius: number=20][, reversed: bool=false])
    
}
    
 function el(){

     if (form[8]) selAll(); else {
         if (app.documents.length >0){
             docSelection = docRef.selection;
                if (docSelection.length>0){
                        for (i=0; i<docSelection.length; i++){
                                docSelection.strokeColor = PFull;
                                docSelection.strokeWidth = 0.5*mm;
                                elem = docSelection.moveToBeginning(docSelection);
       }
     }
   }
                                 }
//alert ('x '+form[8]+'\ny '+form[9]);
     
 } 
    
function selAll(){
 for(var i = 0; i < documents[0].pathItems.length; i++){
    docSelection  = documents[0].pathItems[i]; 
     docSelection.strokeColor = PFull;
     docSelection.strokeWidth = 0.5*mm;
    docSelection.moveToBeginning(elm); 
     
 }
   form[8]=elm.width/mm; form[9]=elm.height/mm;  
 
 }
    
function elSelect(){
    elm.rotate(-90);
    var i =0;
    var j =0;

   // var WidthLab = 29*mm; 

for (q=0; q<form[3]; q++){      
for (w=0; w<form[4]; w++){ 
     
    elm.strokeColor = PFull;
    elm.strokeWidth = 0.5*mm;
    elm.top = WidthLab+i+elm.height+form[5]*mm/2+elm.strokeWidth/2;
    elm.left = (5*mm-elm.strokeWidth/2)+((form[2]/form[3]-form[9])*mm/2)+ j;
    i+=(form[8]*mm+form[5]*mm);
    elm1 = elm.duplicate();
    elm.moveToBeginning(elm1);

    
            }
 
  
    //elm2 = elm1.duplicate();
    //elm1.moveToBeginning(elm2);
    j+=form[2]/form[3]*mm;
    i=0;
    //elm.left= (10*mm-elm.strokeWidth/2)+((form[2]/form[3]-form[9])*mm/2) + j;

        }
   
    
    }
    
    
function fullSelect(){
    elm.rotate(-90);

    //var WidthLab = 29*mm; 

    elm.strokeColor = PFull;
    elm.strokeWidth = 0.5*mm;
    elm.top = WidthLab+elm.height+elm.strokeWidth/2+form[5]*mm/2;
    elm.left = (5*mm-elm.strokeWidth/2)+((form[2]-form[9])*mm/2);
    
    form[3]=1;
    form[4]=1;

    }
    
    
};
