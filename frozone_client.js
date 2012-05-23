
// :author: pbrian <paul@mikadosoftware.com>
// :JQuery scripts for ednamode project for CNX.org
// NB: assume conf.js is included earlier ...



    var REPOBASEURL="http://" + FROZONE.e2repoFQDN + "/e2repo";
    var MODULEURL="http://" + FROZONE.e2repoFQDN + "/e2repo/module/";
    var WORKSPACEURL="http://" + FROZONE.e2repoFQDN + "/e2repo/workspace/";



    function logout(msg){
        //log to a HTML area all messages

        var txt = $("#logarea").html();
        $("#logarea").html(txt + "<li> " + msg);
    };

    function get_username(){
        return $('#username').val();
    };

    function get_modulename(){
        var mname = $('#modulename').val();
        return mname;
    };

function save_validate(){
    var modulename=get_modulename();
    if (modulename = ''){
        jQuery.error('Must have a modulename');
    }
    return
}

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


    function load_textarea(modulename){
        
        var request =$.ajax({
	    url: MODULEURL + mhashid,
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


function getLoadHistoryVer(filename){
//    alert('called ' + filename);
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: MODULEURL + filename,
        success: function(module){
//            alert('here');
            var modulename = module['modulename'];
            var txtarea = module['txtarea'];
 
            $('#modulename').val(modulename);
            $('#e2textarea').tinymce().setContent(txtarea);
        },

        error: function(jqXHR, textStatus, err) {
            logout( "Request failed: " + textStatus + ":" + err + ":" +  jqXHR.status);
        }
    });    


}

function buildHistory(){

    var htmlfrag = '<ul>'
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: WORKSPACEURL,
        success: function(historyarr){
            historyarr.sort();
            $.each(historyarr, function(i,elem){
                var strelem = "'" + elem + "'";
		htmlfrag += '<li> <a href="#" onclick="getLoadHistoryVer(' +  strelem + ');" >' + elem + '</a>';
                });
            $('#workspaces').html(htmlfrag);    
        }
    });    
};

function showres(i, elem){

    logout(i + ': ' + elem);
};


    function saveText(){
	 //constants

        save_validate();
         
         var requestmethod = 'POST';
//         var payload = {'moduletxt':  get_textarea_html5()}; 
         var payload = {'moduletxt':  get_textarea_html5()}; 

	 var menuId = 42;

	 var request = $.ajax({
	     url: MODULEURL,
	     type: requestmethod,
             data: payload,
             dataType:'json'
	 });

	 request.done(function(data) {
	     //$("#responsearea").html(data);
             $.each(data, showres);
             buildHistory();
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

    $("#clickLoadTextArea").click(function(e){load_textarea();
                                              e.preventDefault()});

    logout('AJAX will fire at ' + MODULEURL);    
    buildHistory();    


    $("a").click(function(event){
        logout('noclick');
	event.preventDefault();
    });

    $("#click1").click(function(event){
                         saveText();
                         event.preventDefault();
                       }
                      );

  
});


