/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function sayHello(sp) {
    
    var form=sp.split(',');

  //alert("Namber "+form[0]+"\nCustomer "+form[1]+"\nRaport "+form[2]+"\nRepetition "+form[3]+"\nStreams "+form[4]+"\nGAP "+form[5]+"\ncasing "+form[6]+"\ndiam "+form[7]);  
    //@target illustrator
//app.bringToFront();
    
    
    //alert (WidthForm);
    
mm = 72.0/25.4;
mms= mm/2.0;

    
    
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
    
var docRef = app.activeDocument;
var newLayer=docRef.activeLayer;
//newLayer = docRef.layers.add();
//newLayer.zOrder(ZOrderMethod.BRINGTOFRONT);
newLayer.name="Cut";
docRef.rulerOrigin = Array (0,0);
    var units = 1; // 2-inches, 1-milllimeters, 0-points
    app.preferences.setIntegerPreference("rulerType", units);
    app.preferences.setIntegerPreference("strokeUnits", units);
    
var wi= docRef.width;
var hi = docRef.height;
var WidthForm = (form[7]*form[4])+(form[5]*form[4]);    
    
Gabarit = newLayer.pathItems.rectangle( -10*mm, -15*mm, form[2]*mm+45*mm, -WidthForm*mm-50*mm);
//Oporka.setEntirePath( Array( Array(0, 0), Array(0, hi), Array(5*mm, hi), Array(5*mm, 0) ) );
Gabarit.closed = true;
Gabarit.filled = false;
Gabarit.stroked = true;
Gabarit.strokeColor = PFull;
Gabarit.fillOverprint = false;
Gabarit.strokeWidth = 1.5*mm;
    
var Point0 = newLayer.groupItems.add();
    
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
    
    //alert(Raport);
    
var P1K = newLayer.pathItems.ellipse(2.0/2, -2.0/2+form[2]*mm, 2.0, 2.0, false, false );
    P1K.stroked = false;
    P1K.filled = true;
    P1K.fillColor = PFull;
    P1K.fillOverprint = false;
    
    
Oporka = newLayer.pathItems.rectangle( 15*mm, 10*mm, form[2]*mm, -WidthForm*mm);
//Oporka.setEntirePath( Array( Array(0, 0), Array(0, hi), Array(5*mm, hi), Array(5*mm, 0) ) );
Oporka.closed = true;
Oporka.filled = false;
Oporka.stroked = true;
Oporka.strokeColor = PCyan;
Oporka.fillOverprint = false;
Oporka.strokeWidth = 0.1*mm;
Oporka.strokeDashes = [2,2,2,2];
    

   var countLabel=0;
   var i = 0;
   
   var gor=parseInt((form[2])/10);
    if (gor>20) gor=20;
   var ver=parseInt((WidthForm+5*mm)/10);
    if (ver>20) ver=20;
    alert('gor '+gor+"\n ver "+ver);
    
for (s=0; s<gor; s++) {
    countLabel++;
var LTest = newLayer.groupItems.add();
    newPath = LTest.pathItems.add();
    newPath.setEntirePath( Array( Array(5*mm+i, 6*mm), Array(5*mm+i, 0), Array(8.5*mm+i, 0) ) );
    newPath.stroked = true;
    newPath.strokeColor = PFull;
    //newPath.strokeCap = strokeCap.ROUNDENDCAP;
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
var LTest = newLayer.groupItems.add();
    newPath = LTest.pathItems.add();
    newPath.setEntirePath( Array( Array(-8*mm, 6*mm+i), Array(-8*mm, i), Array(-4.5*mm, i) ) );
    newPath.stroked = true;
    newPath.strokeColor = PFull;
    //newPath.strokeCap = strokeCap.ROUNDENDCAP;
    newPath.strokeWidth = 0.45*mm;
    newPath.filled = false;
var LText = LTest.textFrames.add();
    LText.position = [-5*mm,6*mm+i];
    LText.contents = countLabel;
    LText.textRange.characterAttributes.size = 11;
    //LText.textRange.characterAttributes.textFont = "Arial";
    LText.textRange.characterAttributes.fillColor = PLabel;
    i+=10*mm;

    }
    
};
