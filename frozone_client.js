
// :author: pbrian <paul@mikadosoftware.com>
// :JQuery scripts for ednamode project for CNX.org


// when document is loaded, run this root function, that lisp style will call everything else.... OK.
var TGTURL="http://" + FROZONE.e2repoFQDN + "/e2repo/module/";


    function logout(msg){
        //TOtally assumes existence of firebug.

        // write to a textarea in html if not firebug - Nah !!!
        var txt = $("#logarea").html();
        $("#logarea").html(txt + "<li> " + msg);
        console.log(msg);
    };

    function get_textarea_html5(){
        //hardcoded textare ref here....
        var txtarea = $('#e2textarea').tinymce().getContent();
        return txtarea;
    };

    function display_textarea(){
        txtarea = get_textarea_html5();
        logout(txtarea);
    };

    function load_textarea(){
        //mhash box should have right id in it.
        mhashid = $('#mhash').val()
        
        var request =$.ajax({
	    url: TGTURL + mhashid,
            type: 'GET'
        });
	request.done(function(data) {
	    //$("#responsearea").html(data);      
	    logout(data + 'done a success');
            $('#e2textarea').tinymce().setContent(data);
	});

	request.fail(function(jqXHR, textStatus, err) {
	    logout( "Request failed: " + textStatus + ":" + err + ":" +  jqXHR.status);
	});

	request.always(function(jqXHR, textStatus){
	    logout(textStatus);
	});

                
    };


    function sendajax(){
	 //constants
         // TODO: really stick this here - need cleaner JS model.
          

         var requestmethod = $('input:radio[name=method]:checked').val();
         var payload = {'moduletxt':  get_textarea_html5()}; 

	 var menuId = 42;

	 var request = $.ajax({
	     url: TGTURL,
	     type: requestmethod,
             data: payload
	 });

	 request.done(function(data) {
	     //$("#responsearea").html(data);      
	     logout(data + 'done a success');
	 });

	 request.fail(function(jqXHR, textStatus, err) {
	     logout( "Request failed: " + textStatus + ":" + err + ":" +  jqXHR.status);
	 });

	 request.always(function(jqXHR, textStatus){
	     logout(textStatus);
	 });

    };



$(document).ready(function() {

    //bind various clicks
    $("#clickShowTextArea").click(function(e){display_textarea(); 
                                              e.preventDefault()});

    $("#clickLoadTextArea").click(function(e){load_textarea();
                                              e.preventDefault()});

    logout('AJAX will fire at ' + TGTURL);    

    $("#click1").click(function(event){
                         sendajax();
                         event.preventDefault();
                       }
                      );

  
});


