//#target illustrator
app.bringToFront();
var mm = 72/25.4;

var PHint = new CMYKColor();
    PHint.name = 'PHint';
    PHint.black =0; 
    PHint.cyan = 70; 
    PHint.magenta = 0; 
    PHint.yellow = 0;

var PLabel = new CMYKColor();
    PLabel.name = 'PLabel';
    PLabel.black =100; 
    PLabel.cyan = 100; 
    PLabel.magenta = 100; 
    PLabel.yellow = 100;

var PWhite = new CMYKColor();
    PWhite.name = 'PWhite';
    PWhite.black =0; 
    PWhite.cyan = 0; 
    PWhite.magenta = 0; 
    PWhite.yellow = 0;


function flabel(n) { 
 
   
var docRef = app.documents.add();
var myText = docRef.textFrames.add();
      myText.position = [200,200];
      myText.contents = "Helllo"+n;
      
      
   }