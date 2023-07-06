(function () {
'use strict';

    var csInterface = new CSInterface();
	
    
    function init() {
                
        themeManager.init();
                
        $("#button").click(function () {
      if (doc.getElementById("gross").checked) localStorage.setItem('lineGross', doc.getElementById("Line").value)
          else localStorage.setItem('lineSet', doc.getElementById("Line").value);
      $('#btnRll').removeAttr('disabled');
      doc.getElementById('btnRll').classList.remove('grayb');
      doc.getElementById('btnRll').classList.remove('grayl');
      if(doc.getElementById('Customer').getAttribute('rll')){
          doc.getElementById('btnRll').classList.add('gre');
      } else doc.getElementById('btnRll').classList.add('grayl');
      
      var dict ={};
      
      var Namber = $('#Namber').val();
      var Customer = $('#Customer').val();
      var Raport = doc.getElementById("Raport").value;
	 // if ($('#Polurot').val() != '') Raport = Raport+' '+$('#Polurot').val(); else Raport += ' '+ Raport;

      var Polurot = $('#Polurot').val();
      var PolurotY = $('#PolurotY').val();	  
      var Repetition = doc.getElementById("Repetition").value;
      var Streams = doc.getElementById("Streams").value;
      var GAP = doc.getElementById("GAP").value +' '+ doc.getElementById("GAP2").value;
      var Material = doc.getElementById("Angle").value+'° '+doc.getElementById("Material").value+' '+doc.getElementById("Line").value;
      var Knife = doc.getElementById("Knife").value;
      //alert(doc.getElementById('Customer').getAttribute('rll'));
            
      if (casing==0) Forms = doc.getElementById("diam1").value+';'+doc.getElementById("diam2").value;
      if (casing==1) Forms = doc.getElementById("X").value+';'+doc.getElementById("Y").value+';'+doc.getElementById("R").value;
      if (casing==2 || casing==3) Forms = doc.getElementById("check").checked+';'+doc.getElementById("check2").checked;     
      var Dis = doc.getElementById("Dist").value;

      //alert("Namber "+casing+"\nCustomer "+Customer+"\nRaport "+Raport+"\nRepetition "+Repetition+"\nStreams "+Streams+"\nGAP "+GAP);
          
      var dict = {
        'Namber': Namber,
        'PolurotY': PolurotY,
        'Polurot': Polurot,
        'Customer': Customer,
        'Raport': Raport,
        'Repetition': Repetition,
        'Streams': Streams,
        'GAP': GAP,
        'casing': casing,
        'Material': Material,
        'Knife': Knife,
        'Forms': Forms,
        'Dis': Dis,
        'offset': doc.getElementById("offset").value,
        'rll': doc.getElementById('Customer').getAttribute('rll'),
        'raa': doc.getElementById('Customer').getAttribute('raa'),
        'rez': doc.getElementById('Customer').getAttribute('rez'),
        'perf': doc.getElementById('Customer').getAttribute('perf'),
        'data': doc.getElementById('Customer').getAttribute('data'),
        'micro': doc.getElementById('Customer').getAttribute('micro'),
        'google': doc.getElementById('Customer').getAttribute('google'),
        'perimetr': doc.getElementById('Customer').getAttribute('perimetr'),
        'eWi': doc.getElementById('Customer').getAttribute('eWi'),
        'eHi': doc.getElementById('Customer').getAttribute('eHi'),
        'gross': doc.getElementById("gross").checked,
        'colorText': localStorage.getItem('Text'),
        'colorRisk': localStorage.getItem('Risk'),
        'colorDush': localStorage.getItem('Dush'),
        'colorText1': localStorage.getItem('Text1'),
        'colorRisk1': localStorage.getItem('Risk1'),
        'colorDush1': localStorage.getItem('Dush1')
        };  

        //alert(doc.getElementById('Customer').getAttribute('rez'));  
 
      csInterface.evalScript('sayHello('+JSON.stringify(dict)+')'); 
           
        //csInterface.evalScript('sayHello("'+Namber+';'+Customer+';'+Raport+';'+Repetition+';'+Streams+';'+GAP+';'+casing+';'+Dis+';'+Material+';'+Knife+';'+Forms+'")');
    });

    $("#btnRll").click(function () {
      doc.getElementById('btnRll').classList.remove('gre');
      doc.getElementById('btnRll').classList.remove('grayb');
      doc.getElementById('btnRll').classList.add('grayl');
      var dict = {
        'btnRll': true,
        'Namb': $('#Namber').val()
      };
      csInterface.evalScript('sayHello('+JSON.stringify(dict)+')'); 
      //csInterface = null;
    });



    return;
  }
    init();
	

    
})();