(function () {
'use strict';

    var csInterface = new CSInterface();

    // ========== PERSISTENT STORAGE ==========
    // localStorage в CEP периодически чистится браузерным движком.
    // Оборачиваем его так, чтобы все записи дублировались в файл
    // %APPDATA%/ru.list.don.montager/settings.json через ExtendScript.
    // При старте читаем файл и восстанавливаем localStorage.

    var STORAGE_LOADED = false;
    var _origSetItem = localStorage.setItem.bind(localStorage);
    var _origRemoveItem = localStorage.removeItem.bind(localStorage);

    function _flushToDisk() {
        // сериализуем весь localStorage и пишем в файл
        var all = {};
        for (var i = 0; i < localStorage.length; i++) {
            var k = localStorage.key(i);
            all[k] = localStorage.getItem(k);
        }
        var json = JSON.stringify(all);
        // JSON нужно ещё раз обернуть как строковой литерал для evalScript
        csInterface.evalScript('storageSaveAll(' + JSON.stringify(json) + ')');
    }

    // перехват setItem — сохраняем в localStorage И в файл
    localStorage.setItem = function(k, v) {
        _origSetItem(k, v);
        if (STORAGE_LOADED) _flushToDisk();
    };
    localStorage.removeItem = function(k) {
        _origRemoveItem(k);
        if (STORAGE_LOADED) _flushToDisk();
    };

    function loadSettingsFromDisk(cb) {
        csInterface.evalScript('storageLoadAll()', function(result) {
            try {
                var obj = JSON.parse(result || '{}');
                for (var k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        // пишем напрямую, минуя наш перехватчик (не нужен flush при загрузке)
                        _origSetItem(k, obj[k]);
                    }
                }
            } catch(e) { /* файл битый или пустой — не страшно */ }
            STORAGE_LOADED = true;
            if (cb) cb();
        });
    }
    // ========== / PERSISTENT STORAGE ==========

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
		'rad': doc.getElementById("Rad").checked,
		'irll': doc.getElementById("iRll").value,
        'colorText': localStorage.getItem('Text'),
        'colorRisk': localStorage.getItem('Risk'),
        'colorDush': localStorage.getItem('Dush'),
        'colorText1': localStorage.getItem('Text1'),
        'colorRisk1': localStorage.getItem('Risk1'),
        'colorDush1': localStorage.getItem('Dush1'),
		'gpp': doc.getElementById("gpp").value,
        // === Параметры экспорта DXF (см. expDXF.js) ===
        // Tolerance — из формы index.html (точность аппроксимации, мм)
        // DistX / DistShear / DistShearY — из настроек set.html (localStorage)
        'Tolerance': doc.getElementById("Tolerance").value,
        'DistX': localStorage.getItem('DistX'),
        'DistShear': localStorage.getItem('DistShear'),
        'DistShearY': localStorage.getItem('DistShearY')
        };  

        //alert(doc.getElementById('Customer').getAttribute('rez'));  
 
      csInterface.evalScript('sayHello('+JSON.stringify(dict)+')'); 
      //csInterface.closeExtension();     
        //csInterface.evalScript('sayHello("'+Namber+';'+Customer+';'+Raport+';'+Repetition+';'+Streams+';'+GAP+';'+casing+';'+Dis+';'+Material+';'+Knife+';'+Forms+'")');
    });

    $("#btnRll").click(function () {
      doc.getElementById('btnRll').classList.remove('gre');
      doc.getElementById('btnRll').classList.remove('grayb');
      doc.getElementById('btnRll').classList.add('grayl');
      var dict = {
        'btnRll': true,
		'Raport': doc.getElementById("Raport").value,
		'irll': doc.getElementById("iRll").value,
        'Namb': $('#Namber').val(),
        // те же параметры, что и в основном dict — RLL может вызываться отдельно
        'Tolerance': doc.getElementById("Tolerance").value,
        'DistX': localStorage.getItem('DistX'),
        'DistShear': localStorage.getItem('DistShear'),
        'DistShearY': localStorage.getItem('DistShearY')
      };
      csInterface.evalScript('sayHello('+JSON.stringify(dict)+')'); 
  
    });

    $("#inp").click(function () {

      csInterface.evalScript('saves('+$('#Namber').val()+')'); 
    });

    $("#ipt").click(function () {
      csInterface.evalFile(new File("C:\\Program Files\\Adobe\\Adobe Illustrator CC 2017\\CEP\\extensions\\ru.list.don'\\infolder.bat")); 
    });

    return;
  }
    // Сначала подгружаем настройки из файла в localStorage, потом инициализация UI.
    // Если evalScript не дошёл (например ExtendScript ещё не готов) — всё равно стартуем,
    // чтобы интерфейс не висел.
    var initCalled = false;
    function safeInit() {
        if (initCalled) return;
        initCalled = true;
        init();
    }
    loadSettingsFromDisk(safeInit);
    // страховка — если evalScript почему-то не вернёт коллбэк за 2 сек, стартуем без настроек
    setTimeout(safeInit, 2000);
	

    
})();