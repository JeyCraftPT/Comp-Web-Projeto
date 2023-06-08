$( document ).ready(function() {

    $(document).on('click', '#acti_gym', function(e){
        e.preventDefault();
        $("#gym" ).fadeIn(1000).css("display", "flex");
        $("#escola").fadeOut(500).css("display", "none");
        $("#casa" ).fadeOut(500).css("display", "none");
    });

    $(document).on('click', '#acti_school', function(e){
        e.preventDefault();
        $("#escola").fadeIn(1000).css("display", "flex");
        $("#casa" ).fadeOut(500).css("display", "none");
        $("#gym" ).fadeOut(500).css("display", "none");
    });
    
    $(document).on('click', '#acti_home', function(e){
        e.preventDefault();
        $("#casa" ).fadeIn(1000).css("display", "flex");
        $("#escola").fadeOut(500).css("display", "none");
        $("#gym" ).fadeOut(500).css("display", "none");
    });


});