
var doc = document;


    var casing = 0;
    var Forms ='';

$("#Namber").on("keypress", function(e){
    var char = /["a-zA-Z]/;
    var val = String.fromCharCode(e.which);
    var test = char.test(val);
    if (!test) return false;
});


function fxml(){
var x = doc.getElementById("Namber").value;

var path = '\\\\storage\\zakaz\\'+x.substr (0, x.length-3)+'000-'+x.substr (0, x.length-3)+'999\\'+x+'\\XML\\specification_'+x+'.xml';
//alert(path);
doc.getElementById("Material").value = '';

function parseXML() {
//alert(path);
	if (window.XMLHttpRequest) {
		xmlDoc = new window.XMLHttpRequest();
		xmlDoc.open("GET", path, false);
		xmlDoc.send("");
		xmlDoc = xmlDoc.responseXML;
	} else if (ActiveXObject("Microsoft.XMLDOM")) { // IE5, IE6
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.load(path);
	}

		// в xmlDoc собссно и хранится XML
		//var root = xmlDoc.firstChild.childNodes[0].nodeName;
  /*      
        var root = xmlDoc.documentElement;
        for (var i = 0; i < root.childNodes.length; i++) {
            
		alert(i+' -> '+root.childNodes[i].nodeName+' = '+root.childNodes[i].nodeValue);
        }
   */ 

 

    //alert (xmlDoc.documentElement.nodeName+' <'+xmlDoc.documentElement.attributes[0].name+' = '+xmlDoc.documentElement.attributes[0].value+'>');
    doc.getElementById("Customer").value=(xmlDoc.documentElement.attributes[1].value+' / '+xmlDoc.documentElement.attributes[0].value).replace(/"/g, "'");
    doc.getElementById("Angle").value=xmlDoc.getElementsByTagName("УголЗаточкиКромки")[0] ? xmlDoc.getElementsByTagName("УголЗаточкиКромки")[0].childNodes[0].nodeValue : 'не найден';
    doc.getElementById("Material").value=xmlDoc.getElementsByTagName("ТипВырубки")[0] ? xmlDoc.getElementsByTagName("ТипВырубки")[0].childNodes[0].nodeValue : 'не найден';
    doc.getElementById("Raport").value=xmlDoc.getElementsByTagName("ШагПечатногоВала")[0] ? xmlDoc.getElementsByTagName("ШагПечатногоВала")[0].childNodes[0].nodeValue : 'не найден';
    doc.getElementById("Repetition").value=xmlDoc.getElementsByTagName("КоличествоПовторенийНаРаппорте")[0] ? xmlDoc.getElementsByTagName("КоличествоПовторенийНаРаппорте")[0].childNodes[0].nodeValue : '1';
    doc.getElementById("Streams").value=xmlDoc.getElementsByTagName("КоличествоРучьев")[0] ? xmlDoc.getElementsByTagName("КоличествоРучьев")[0].childNodes[0].nodeValue : '1';

    doc.getElementById("GAP").value = xmlDoc.getElementsByTagName("РасстояниеМеждуРучьями")[0] ? (xmlDoc.getElementsByTagName("РасстояниеМеждуРучьями")[0].childNodes[0].nodeValue > 0 ? xmlDoc.getElementsByTagName("РасстояниеМеждуРучьями")[0].childNodes[0].nodeValue : '3' )  : '3';
    //alert("12");    
    doc.getElementById("Knife").value=xmlDoc.getElementsByTagName("ВысотаНожа")[0] ? xmlDoc.getElementsByTagName("ВысотаНожа")[0].childNodes[0].nodeValue : 'не найден';
    di(); doc.getElementById("disa").value='1';
    //x=xmlDoc.getElementsByTagName("ШагПечатногоВала")[0];
    //alert (x.nodeName+' <'+x.childNodes[0].nodeValue+'>');
    if ( xmlDoc.getElementsByTagName("Контур")[0].childNodes[0].nodeValue==3) {doc.getElementsByName("figure")[3].checked=true;  verify(3) ;}
     if ( xmlDoc.getElementsByTagName("Контур")[0].childNodes[0].nodeValue==2) {doc.getElementsByName("figure")[1].checked=true;  verify(1) ;
         doc.getElementById("X").value=xmlDoc.getElementsByTagName("ШиринаПрямоугольника")[0] ? xmlDoc.getElementsByTagName("ШиринаПрямоугольника")[0].childNodes[0].nodeValue : '0';
         doc.getElementById("Y").value=xmlDoc.getElementsByTagName("ДлинаПрямоугольника")[0] ? xmlDoc.getElementsByTagName("ДлинаПрямоугольника")[0].childNodes[0].nodeValue : '0';
         doc.getElementById("R").value=xmlDoc.getElementsByTagName("РадиусСкругления")[0] ? xmlDoc.getElementsByTagName("РадиусСкругления")[0].childNodes[0].nodeValue : '0';
         }
      if ( xmlDoc.getElementsByTagName("Контур")[0].childNodes[0].nodeValue==1) {doc.getElementsByName("figure")[0].checked=true;  verify(0) ;
         doc.getElementById("diam1").value=xmlDoc.getElementsByTagName("ДиаметрКруга")[0] ? xmlDoc.getElementsByTagName("ДиаметрКруга")[0].childNodes[0].nodeValue : '0';
         doc.getElementById("diam2").value=xmlDoc.getElementsByTagName("ДиаметрКруга")[0] ? xmlDoc.getElementsByTagName("ДиаметрКруга")[0].childNodes[0].nodeValue : '0';
          }
}

parseXML();
    
}

function di(){
    d=$('#Raport').val();
    //alert(((d/Math.PI)-0.734)*Math.PI/d);
    doc.getElementById("Dist").value = ((d/Math.PI)-0.734)*Math.PI/d;

}
    
  function verify(n) {
      
casing = n;
      
      
      var wrappedP = doc.getElementById("Wrap");
      var elem = doc.createElement("div");
      elem.id = "Wrap";
      content = doc.createElement("label");
      elem.appendChild(content);
      
        if (n==0) {
            
             content = doc.createTextNode("Diameter:  ");
            elem.appendChild(content);
             //wrappedP.parentNode.replaceChild(elem, wrappedP);
            
             content = doc.createTextNode(" X, mm: ");
            elem.appendChild(content);
            
            content = doc.createElement("input");
            content.id = "diam1";
            elem.appendChild(content);
            
            content = doc.createTextNode(" Y, mm: ");
            elem.appendChild(content);
            
            content = doc.createElement("input");
            content.id = "diam2";
            elem.appendChild(content);
            //wrappedP.parentNode.appendChild(elem, wrappedP);
            console.log(elem);
            content = doc.createElement("br");
            elem.appendChild(content);
            
            wrappedP.parentNode.replaceChild(elem, wrappedP);
            
            $('#Repetition').removeAttr('disabled');
            $('#Streams').removeAttr('disabled');
            //$('#GAP').removeAttr('disabled');
            
            doc.getElementById("diam1").onkeypress = function(e){return !(/[^\d\.\d]/.test(String.fromCharCode(e.charCode)));}
            doc.getElementById("diam2").onclick = function(e){doc.getElementById("diam2").value = doc.getElementById("diam1").value;};
            doc.getElementById("diam2").onkeypress = function(e){return !(/[^\d\.\d]/.test(String.fromCharCode(e.charCode)))};
            
        } else if (n==1) {
             content = doc.createTextNode(" X, mm: ");
            elem.appendChild(content);
            
            content = doc.createElement("input");
            content.name = "XYR";
            content.id = "X";
            elem.appendChild(content);
            
            content = doc.createTextNode(" Y, mm: ");
            elem.appendChild(content);
            
            content = doc.createElement("input");
            content.name= "XYR";
            content.id = "Y";
            elem.appendChild(content);
            
            content = doc.createTextNode(" R, mm: ");
            elem.appendChild(content);
            
            content = doc.createElement("input");
            content.name = "XYR";
            content.id = "R";
            elem.appendChild(content);
            console.log(elem);
            content = doc.createElement("br");
            elem.appendChild(content);
            
            wrappedP.parentNode.replaceChild(elem, wrappedP);
            
            $('#Repetition').removeAttr('disabled');
            $('#Streams').removeAttr('disabled');
            //$('#GAP').removeAttr('disabled');
            
            doc.getElementById("X").onkeypress = function(e){return !(/[^\d\.\d]/.test(String.fromCharCode(e.charCode)));}
            doc.getElementById("Y").onkeypress = function(e){return !(/[^\d\.\d]/.test(String.fromCharCode(e.charCode)));}
            doc.getElementById("R").onkeypress = function(e){return !(/[^\d\.\d]/.test(String.fromCharCode(e.charCode)));}
            
        } else if (n==2 || n==3) {
            
            if(n==2){$('#Repetition').removeAttr('disabled');
                     $('#Streams').removeAttr('disabled');
                    // $('#GAP').removeAttr('disabled');
                    };
            
            if(n==3){$('#Repetition').attr('disabled','disabled');
                     $('#Streams').attr('disabled','disabled');
                    // $('#GAP').attr('disabled','disabled');
                    };
        
            contd = doc.createElement("div");
            contd.setAttribute("class", "checkboxFour");
            elem.appendChild(contd);
            content = doc.createElement("input");
            
            content.type="checkbox";
            content.id="check";
            content.setAttribute("value", "1");
            content.setAttribute("checked", "checked");
            
            
            contd.appendChild(content);
            
            content = doc.createElement("label");
             content.id="checkLabel";
             elem.appendChild(content);
            content.setAttribute("for", "check");
           
            cont = doc.createTextNode("Select All");
            content.appendChild(cont);
            
            contd.appendChild(content);
            
            console.log(elem);
            content = doc.createElement("br");
            elem.appendChild(content);
            
            wrappedP.parentNode.replaceChild(elem, wrappedP);
            
        }
    }

