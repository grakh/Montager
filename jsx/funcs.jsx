
var doc = document;


    var casing = 0;
    var Forms ='';
    var PL=false;
    var path='';
    var xmlDoc;

$("#Namber").on("keypress", function(e){
    var char = /["a-zA-Z]/;
    var val = String.fromCharCode(e.which);
    var test = char.test(val);
    if (!test) return false;
});


function fxml(){
var x = doc.getElementById("Namber").value;

doc.getElementById("gross").checked = false;
localStorage.getItem('lineSet') > 0 ? doc.getElementById("Line").value = localStorage.getItem('lineSet') : doc.getElementById("Line").value = 0.7;
          
//localStorage.removeItem('lineSet');

path = '\\\\storage\\zakaz\\'+x.substr (0, x.length-3)+'000-'+x.substr (0, x.length-3)+'999\\'+x+'\\XML\\specification_'+x+'.xml';
//alert(path);
doc.getElementById("Customer").value = '';
doc.getElementById("Material").value = '';
doc.getElementById("Raport").value = '';
doc.getElementById("Polurot").value = '';
doc.getElementById("Repetition").value = '1';
doc.getElementById("Streams").value = '1';
doc.getElementById("GAP").value = '3';
doc.getElementById("GAP2").value = '';
doc.getElementById("Knife").value = '';
doc.getElementById("Angle").value = '';
doc.getElementById("Dist").value = '0';
doc.getElementById("Polurot").setAttribute("disabled", "disabled");
doc.getElementById("GAP2").disabled = true;
doc.getElementById("disa").checked = true;
doc.getElementById("Customer").setAttribute('rll', '');
doc.getElementById("Customer").setAttribute('rez', '');
doc.getElementById("Customer").setAttribute('perf', '');
doc.getElementById("Customer").setAttribute('micro', '');
doc.getElementById("Customer").setAttribute('perimetr', '');
doc.getElementById("Customer").setAttribute('google', '');


var element = doc.getElementById("comm");
    element.scrollTop = 0;

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
    doc.getElementById("Customer").value=(xmlDoc.documentElement.attributes['НаименованиеЗаказа'].value+' / '+xmlDoc.documentElement.attributes['Покупатель'].value).replace(/"/g, "'");
    //alert(xmlDoc.documentElement.attributes['КомментарийКонтрагента']);
    doc.getElementById("comm").value = (xmlDoc.documentElement.attributes['КомментарийКонтрагента'] !== undefined) ? (xmlDoc.documentElement.attributes['КомментарийКонтрагента'].value).replace(/"/g, "'")+'\n' : '' ;
    doc.getElementById("comm").value += (xmlDoc.documentElement.attributes['Комментарий'].value).replace(/"/g, "'")+'\n';
    doc.getElementById("manager").innerHTML = (xmlDoc.documentElement.attributes['УтвердилСпецификацию'] !== undefined) ? ('Manager:' + (xmlDoc.documentElement.attributes['УтвердилСпецификацию'].value).replace(/"/g, "'")) : 'Manager: ';
    doc.getElementById("Angle").value=xmlDoc.getElementsByTagName("УголЗаточкиКромки")[0] ? xmlDoc.getElementsByTagName("УголЗаточкиКромки")[0].childNodes[0].nodeValue : 'не найден';
    doc.getElementById("Material").value=xmlDoc.getElementsByTagName("ТипВырубки")[0] ? xmlDoc.getElementsByTagName("ТипВырубки")[0].childNodes[0].nodeValue : 'не найден';
    doc.getElementById("Raport").value=xmlDoc.getElementsByTagName("ШагПечатногоВала")[0] ? xmlDoc.getElementsByTagName("ШагПечатногоВала")[0].childNodes[0].nodeValue : 'не найден';
  
    doc.getElementById("Polurot").value=xmlDoc.getElementsByTagName("ДлинаНожа")[0] ? xmlDoc.getElementsByTagName("ДлинаНожа")[0].childNodes[0].nodeValue : '';
    doc.getElementById("PolurotY").value=xmlDoc.getElementsByTagName("ШиринаНожа")[0] ? xmlDoc.getElementsByTagName("ШиринаНожа")[0].childNodes[0].nodeValue : '';

    doc.getElementById("Repetition").value=xmlDoc.getElementsByTagName("КоличествоПовторенийНаРаппорте")[0] ? xmlDoc.getElementsByTagName("КоличествоПовторенийНаРаппорте")[0].childNodes[0].nodeValue : '1';
    doc.getElementById("Streams").value=xmlDoc.getElementsByTagName("КоличествоРучьев")[0] ? xmlDoc.getElementsByTagName("КоличествоРучьев")[0].childNodes[0].nodeValue : '1';
    
    les = 0;
    less = xmlDoc.getElementsByTagName("КоличествоУгловМеньше06");
    for ( i = 0; i < less.length; i++)
        les += parseInt(xmlDoc.getElementsByTagName("КоличествоУгловМеньше06")[i].childNodes[0].nodeValue);
       
    doc.getElementById("Customer").setAttribute('perimetr', xmlDoc.getElementsByTagName("СуммаПериметровЭлементов")[0].childNodes[0].nodeValue);
 
    doc.getElementById("less").value=xmlDoc.getElementsByTagName("КоличествоУгловМеньше06")[0] ? les : '0';
    doc.getElementById("GAP").value = xmlDoc.getElementsByTagName("РасстояниеМеждуРучьями")[0] ? (xmlDoc.getElementsByTagName("РасстояниеМеждуРучьями")[0].childNodes[0].nodeValue > 0 ? xmlDoc.getElementsByTagName("РасстояниеМеждуРучьями")[0].childNodes[0].nodeValue : '3' )  : '3';
    doc.getElementById("GAP2").value=xmlDoc.getElementsByTagName("РасстояниеМеждуПовторениями")[0] ? xmlDoc.getElementsByTagName("РасстояниеМеждуПовторениями")[0].childNodes[0].nodeValue : doc.getElementById("Raport").value / doc.getElementById("Repetition").value;    
    doc.getElementById("Knife").value=xmlDoc.getElementsByTagName("ВысотаНожа")[0] ? xmlDoc.getElementsByTagName("ВысотаНожа")[0].childNodes[0].nodeValue : 'не найден';
    if (doc.getElementById("Knife").value > 0.5) {doc.getElementById("gross").checked = true; 
           localStorage.getItem('gross') > 0 ? doc.getElementById("Line").value = localStorage.getItem('gross') : doc.getElementById("Line").value = 1.1;}

	di(); doc.getElementById("disa").value='1';
	if (~doc.getElementById("Material").value.indexOf("Плоская")) {doc.getElementById("disa").checked = false; doc.getElementById("Dist").value = "0";}
	
	if (~doc.getElementById("Material").value.indexOf("Полуротация") || ~doc.getElementById("Material").value.indexOf("Плоская")) {
		$('#Polurot').removeAttr('disabled'); 
		$('#GAP2').removeAttr('disabled');
		PL=true;
		};

    if (xmlDoc.getElementsByTagName("ЛазернаяЗакалка")[0].childNodes[0].nodeValue =='true') {
            //doc.getElementById("Customer").value +=' /RLL';
            doc.getElementById("Customer").setAttribute('rll', 'RLL');
            doc.getElementById("comm").value +='== RLL =='
        };
    if (xmlDoc.getElementsByTagName("КромкаМенее2ммОтКраяШтампа")[0].childNodes[0].nodeValue =='true') {
            doc.getElementById("Customer").setAttribute('rez', 'Фигурная подрезка!');
            doc.getElementById("comm").value +='Фигурная подрезка!'
        };
if ( xmlDoc.getElementsByTagName("Контур")[0].childNodes[0].nodeValue==3) {
        if (xmlDoc.getElementsByTagName("Перфорация")[0].childNodes[0].nodeValue =='true') {
            doc.getElementById("Customer").setAttribute('perf', 'Перфорация: '+ xmlDoc.getElementsByTagName("ВысотаПерфорации")[0].childNodes[0].nodeValue);
            doc.getElementById("comm").value += '\n'+doc.getElementById('Customer').getAttribute('perf');
        };

        if (xmlDoc.getElementsByTagName("Микроперфорация")[0].childNodes[0].nodeValue =='true') {
            doc.getElementById("Customer").setAttribute('micro', 'Есть Микроперфорация!!');
            doc.getElementById("comm").value +='\nЕсть Микроперфорация!!';
        };

        if (xmlDoc.getElementsByTagName("БесконечныйНож")[0].childNodes[0].nodeValue =='true') {
            doc.getElementById("Customer").setAttribute('google', 'Нож бесконечный. Режем пилой!');
            doc.getElementById("comm").value +='\nНож бесконечный. Режем пилой!';
        };
    }
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

function comm(){

/*
    var parseXml;

    if (typeof window.DOMParser != "undefined") {
    
        parseXml = function(xmlStr) {
    
            return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    
        };
    
    } else if (typeof window.ActiveXObject != "undefined" &&
    
           new window.ActiveXObject("Microsoft.XMLDOM")) {
    
        parseXml = function(xmlStr) {
    
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
    
            xmlDoc.async = "false";
    
            xmlDoc.loadXML(xmlStr);
    
            return xmlDoc;
    
        };
    
    } else {
    
        throw new Error("No XML parser found");
    }

    var xml = parseXml("<foo>Stuff</foo>");
    alert(xml.documentElement.nodeName);

*/

xmlDoc.documentElement.setAttribute("Комментарий","food");

//XmlDoc.save('c:\\Temp\\test.xml');
//----------------------------------------------------------------
// function onInitFs(fs) {

//     fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
  
//       fileEntry.createWriter(function(fileWriter) {
  
//         fileWriter.onwriteend = function(e) {
//           console.log('Write completed.');
//         };
  
//         fileWriter.onerror = function(e) {
//           console.log('Write failed: ' + e.toString());
//         };
  
//         var bb = new BlobBuilder();
//         bb.append('Ipsum Lorem');
//         fileWriter.write(bb.getBlob('text/plain'));
  
//       }, errorHandler);
  
//     }, errorHandler);
  
//   }
  
//   window.requestFileSystem(window.PERSISTENT, 1024*1024, onInitFs, errorHandler);

//     alert(xmlDoc.documentElement.getAttribute("Комментарий"));
//----------------------------------------------------------------

var text = "как записать строку в файл .txt с помощью js?";
document.write('<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(text) + '" download="c:/temp/text.txt">text.txt</a>');
var file = new File( 'C:/Temp/text.txt');
            
if (file.open("w")) {
    file.write(text);
    file.close();
}
else {
    alert("Access to slected directory is denied");
}
}

function loadXMLDoc(dname) 
{
try //Internet Explorer
  {
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  }
catch(e)
  {
  try //Firefox, Mozilla, Opera, etc.
    {
    xmlDoc=document.implementation.createDocument("","",null);
    }
  catch(e) {alert(e.message)}
  }
try 
  {
  xmlDoc.async=false;
  xmlDoc.load(dname);
  return(xmlDoc);
  }
catch(e) {alert(e.message)}
return(null);
}

function di(){
    d = $('#Raport').val();
    H = $('#Knife').val();
	var dis;
    //alert(((d/Math.PI)-0.734)*Math.PI/d);
	if (doc.getElementById("disa").checked != false){
        if (H <= 0.5) dis = ((d/Math.PI)-0.734)*Math.PI/d; 
        else dis = d/(d-(0.5-2*H)*Math.PI);
		doc.getElementById("Dist").value = parseFloat(parseFloat(dis).toFixed(5));
		return dis;
	}
}
    
  function verify(n) {
      
casing = n;
      
      
      var wrappedP = doc.getElementById("Wrap");
      var elem = doc.createElement("div");
      elem.id = "Wrap";
      content = doc.createElement("label");
      elem.appendChild(content);
	  
      
        if (n==0) {
            
             content = doc.createTextNode("Diameter, mm:  D1:");
            elem.appendChild(content);
             //wrappedP.parentNode.replaceChild(elem, wrappedP);

            
            content = doc.createElement("input");
            content.id = "diam1";
            elem.appendChild(content);

            content = doc.createElement("input");
            content.type="checkbox";
            content.id="elipse";
            content.setAttribute("value", "1");
            content.setAttribute("checked", "checked");
			elem.appendChild(content);
            
            content = doc.createElement("span");
            content.id="d2";
            cont = doc.createTextNode(", D2:");
            content.appendChild(cont);
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
            doc.getElementById("diam1").onchange = function(e){
                if(doc.getElementById("elipse").checked)
                    doc.getElementById("diam2").value = doc.getElementById("diam1").value;
                    doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value-doc.getElementById("diam2").value
                };
            doc.getElementById("diam2").onkeypress = function(e){return !(/[^\d\.\d]/.test(String.fromCharCode(e.charCode)))};
            doc.getElementById("elipse").onchange = function(e){
                if(doc.getElementById("elipse").checked) doc.getElementById("diam2").value = doc.getElementById("diam1").value;
                   doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value-doc.getElementById("diam2").value
            };

			if (!PL) doc.getElementById("diam2").onchange = function(e){
                   if(doc.getElementById("elipse").checked) doc.getElementById("diam1").value = doc.getElementById("diam2").value;
                      doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value-doc.getElementById("diam2").value
            };
			if (!PL) doc.getElementById("Raport").onchange = function(e){di(); doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value-doc.getElementById("diam2").value}
			if (!PL) doc.getElementById("Repetition").onchange = function(e){doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value-doc.getElementById("diam2").value}
            
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
			if (!PL) doc.getElementById("Y").onchange = function(e){doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value-doc.getElementById("Y").value}
            if (!PL) doc.getElementById("Raport").onchange = function(e){di(); doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value-doc.getElementById("Y").value}
			if (!PL) doc.getElementById("Repetition").onchange = function(e){doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value-doc.getElementById("Y").value}
			
        } else if (n==2 || n==3) {
            
            if(n==2){$('#Repetition').removeAttr('disabled');
                     $('#Streams').removeAttr('disabled');
                    // $('#GAP').removeAttr('disabled');
					if (!PL) doc.getElementById("Raport").onchange = function(e){di(); doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value}
					if (!PL) doc.getElementById("Repetition").onchange = function(e){doc.getElementById("GAP2").value = doc.getElementById("Raport").value / doc.getElementById("Repetition").value}
                    };
            
            if(n==3){$('#Repetition').attr('disabled','disabled');
                     $('#Streams').attr('disabled','disabled');
					 if (!PL) doc.getElementById("Raport").onchange = function(e){di();}
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
			
			content2 = doc.createElement("input");
            
            content2.type="checkbox";
            content2.id="check2";
            content2.setAttribute("value", "1");
			
			contd.appendChild(content2);
			
			content2 = doc.createElement("label");
             content2.id="checkLabel2";
             elem.appendChild(content2);
            content2.setAttribute("for", "check2");
           
            cont2 = doc.createTextNode("Close Path");
            content2.appendChild(cont2);
            
            contd.appendChild(content2);
            
            console.log(elem);
            content = doc.createElement("br");
            elem.appendChild(content);
            
            wrappedP.parentNode.replaceChild(elem, wrappedP);
			
			
            
        }
    }

