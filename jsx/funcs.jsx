
var doc = document;


    var casing = 0;
    var Forms ='';

$("#Namber").on("keypress", function(e){
    var char = /["a-zA-Z]/;
    var val = String.fromCharCode(e.which);
    var test = char.test(val);
    if (!test) return false;
});

    
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
            $('#GAP').removeAttr('disabled');
            
            doc.getElementById("diam1").onkeypress = function(e){return !(/[А-Яа-яA-Za-z]/.test(String.fromCharCode(e.charCode)));}
            doc.getElementById("diam2").onclick = function(e){doc.getElementById("diam2").value = doc.getElementById("diam1").value;};
            doc.getElementById("diam2").onkeypress = function(e){return !(/[А-Яа-яA-Za-z]/.test(String.fromCharCode(e.charCode)))};
            
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
            $('#GAP').removeAttr('disabled');
            
            doc.getElementById("X").onkeypress = function(e){return !(/[А-Яа-яA-Za-z]/.test(String.fromCharCode(e.charCode)));}
            doc.getElementById("Y").onkeypress = function(e){return !(/[А-Яа-яA-Za-z]/.test(String.fromCharCode(e.charCode)));}
            doc.getElementById("R").onkeypress = function(e){return !(/[А-Яа-яA-Za-z]/.test(String.fromCharCode(e.charCode)));}
            
        } else if (n==2 || n==3) {
            
            if(n==2){$('#Repetition').removeAttr('disabled');
                     $('#Streams').removeAttr('disabled');
                     $('#GAP').removeAttr('disabled');
                    };
            
            if(n==3){$('#Repetition').attr('disabled','disabled');
                     $('#Streams').attr('disabled','disabled');
                     $('#GAP').attr('disabled','disabled');
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

