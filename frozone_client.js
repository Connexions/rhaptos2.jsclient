
// :author: pbrian <paul@mikadosoftware.com>
// :JQuery scripts for ednamode project for CNX.org
// NB: assume conf.js is included earlier ...



var TGTURL="http://" + FROZONE.e2repoFQDN + "/e2repo/module/";


    function logout(msg){
        //log to a HTML area all messages

        var txt = $("#logarea").html();
        $("#logarea").html(txt + "<li> " + msg);
    };

    function get_username(){
        return $('#username').val();
    };

    function get_modulename(){
        return $('#modulename').val();
    };


    function get_textarea_html5(){
        //retrieve, as JSON, the contents of the edit-area 
        var txtarea = $('#e2textarea').tinymce().getContent();
        var payload = {
            'username': get_username(),
            'modulename': get_modulename(),
            'txtarea': txtarea
        };

        var json_text = JSON.stringify(payload, null, 2);
        return json_text;
    };

    function display_textarea(){
        //put returned values into text area.
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

function showres(i, elem){

    logout(i + ': ' + elem);
};


    function sendajax(){
	 //constants
         
         var requestmethod = 'POST';
//         var payload = {'moduletxt':  get_textarea_html5()}; 
         var payload = {'moduletxt':  get_textarea_html5()}; 

	 var menuId = 42;

	 var request = $.ajax({
	     url: TGTURL,
	     type: requestmethod,
             data: payload,
             dataType:'json'
	 });

	 request.done(function(data) {
	     //$("#responsearea").html(data);
             $.each(data, showres);
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


