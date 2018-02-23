$._ext_PHXS={
    run : function() {
    
    	/**********  Replace below sample code with your own JSX code  **********/
        var appName;	    
	    appName = "Hello Photoshop";	    
        alert(appName);
        /************************************************************************/
        
        return appName;
    },
};

// get Radio Button selected info into Photoshop
ext_testRadioButtonInfo = testRadioButtonInfo;
function testRadioButtonInfo(inRadio)
{
	alert("Photoshop says: The Selected Radio button is: " + inRadio ) ;  // Photoshop knows what button you pressed.
	var returnString = ("Data out of photoshop : \"Hello, "+ inRadio +" !!\"") ;  // Photoshop can update the extension too!
	return  returnString;

}
