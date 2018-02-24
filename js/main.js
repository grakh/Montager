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
      

      //alert("Namber "+casing+"\nCustomer "+Customer+"\nRaport "+Raport+"\nRepetition "+Repetition+"\nStreams "+Streams+"\nGAP "+GAP);
          
            csInterface.evalScript('sayHello("'+Namber+', '+Customer+', '+Raport+', '+Repetition+', '+Streams+', '+GAP+', '+casing+'")');
    });
  }
    init();
    
})();