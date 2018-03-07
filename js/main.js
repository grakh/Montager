(function () {
'use strict';

    var csInterface = new CSInterface();
    
    function init() {
                
        themeManager.init();
                
        $("#button").click(function () {
      
     
      var Namber = $('#Namber').val();
      var Customer = $('#Customer').val();
      var Raport = doc.getElementById("Raport").value;
      var Repetition = doc.getElementById("Repetition").value;
      var Streams = doc.getElementById("Streams").value;
      var GAP = doc.getElementById("GAP").value;
      var Material = doc.getElementById("Material").value;
      var Knife = doc.getElementById("Knife").value;
            
      if (casing==0) Forms = doc.getElementById("diam1").value+';'+doc.getElementById("diam2").value;
      if (casing==1) Forms = doc.getElementById("X").value+';'+doc.getElementById("Y").value+';'+doc.getElementById("R").value;
      if (casing==2 || casing==3) Forms = doc.getElementById("check").checked+';'+doc.getElementById("check").checked;     
      var Dis = doc.getElementById("Dist").value;

      //alert("Namber "+casing+"\nCustomer "+Customer+"\nRaport "+Raport+"\nRepetition "+Repetition+"\nStreams "+Streams+"\nGAP "+GAP);
          
          //alert("Namber "+Forms);  
           
        csInterface.evalScript('sayHello("'+Namber+';'+Customer+';'+Raport+';'+Repetition+';'+Streams+';'+GAP+';'+casing+';'+Dis+';'+Forms+'")');
    });
  }
    init();
    
})();