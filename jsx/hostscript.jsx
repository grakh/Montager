/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function sayHello(){
    
    //@target illustrator
//app.bringToFront();
var mm = 72/25.4;

var docRef = app.activeDocument;
var newLayer=docRef.layers;
//newLayer = docRef.layers.add();
//newLayer.zOrder(ZOrderMethod.BRINGTOFRONT);
newLayer.name="Cut";
docRef.rulerOrigin = Array (0,0);
    var units = 3; // 2-inches, 3-milllimeters, 0-points
    app.preferences.setIntegerPreference("rulerUnits", units);
    app.preferences.setIntegerPreference("strokeUnits", units);
    
var PLabel = new CMYKColor();
PLabel.name = 'labelColor';
PLabel.black =0; 
PLabel.cyan = 70; 
PLabel.magenta = 0; 
PLabel.yellow = 0;
    
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
    
var myText = docRef.textFrames.add();
      myText.position = [200,200];
      myText.contents = "Helllo";
      myText.textRange.characterAttributes.fillColor = PLabel;
};
