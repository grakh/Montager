
var doc = document;

    var casing = 0;

    
  function verify(n) {
      
casing = n;

      var wrappedP = doc.getElementById("Wrap");
      var elem = doc.createElement("div");
      elem.id = "Wrap";
      content = doc.createElement("label");
      elem.appendChild(content);
      
        if (n==0) {
            
             content = doc.createTextNode("Diameter:");
            elem.appendChild(content);
             //wrappedP.parentNode.replaceChild(elem, wrappedP);
            
            content = doc.createElement("input");
            content.type = "text";
            elem.appendChild(content);
            //wrappedP.parentNode.appendChild(elem, wrappedP);
            console.log(elem);
            content = doc.createElement("br");
            elem.appendChild(content);
            
            wrappedP.parentNode.replaceChild(elem, wrappedP);
            
        } else if (n==1) {
             content = doc.createTextNode(" X, mm: ");
            elem.appendChild(content);
            
            content = doc.createElement("input");
            content.id = "XYR";
            elem.appendChild(content);
            
            content = doc.createTextNode(" Y, mm: ");
            elem.appendChild(content);
            
            content = doc.createElement("input");
            content.id = "XYR";
            elem.appendChild(content);
            
            content = doc.createTextNode(" R, mm: ");
            elem.appendChild(content);
            
            content = doc.createElement("input");
            content.id = "XYR";
            elem.appendChild(content);
            console.log(elem);
            content = doc.createElement("br");
            elem.appendChild(content);
            
            wrappedP.parentNode.replaceChild(elem, wrappedP);
            
        } else if (n==2 || n==3) {
        
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
             elem.appendChild(content);
            content.setAttribute("for", "check");
           
            cont = doc.createTextNode("Select All");
            content.appendChild(cont);
            
            console.log(elem);
            content = doc.createElement("br");
            elem.appendChild(content);
            
            wrappedP.parentNode.replaceChild(elem, wrappedP);
            
        }
    }

function subm(){
    
     /* var Namber = doc.getElementById("Namber").value;
      var Customer = doc.getElementById("Customer").value;
      var Raport = doc.getElementById("Raport").value;
      var Repetition = doc.getElementById("Repetition").value;
      var Streams = doc.getElementById("Streams").value;
      var GAP = doc.getElementById("GAP").value;
      */
      //alert("Namber "+Namber+"\nCustomer "+Customer+"\nRaport "+Raport+"\nRepetition "+Repetition+"\nStreams "+Streams+"\nGAP "+GAP);
    
     //var csInterface = new CSInterface();  
  
  //csInterface.evalScript(sayHello());
   // jsx.evalscript(hostscript());
    //flabel(casing);
}
