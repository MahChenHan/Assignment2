
$(document).ready(function () {
    $('.load-send').hide(); 
    $("#contact-form").submit(function(e) {
        $('.load-send').show(); 
        $('#contact-button').hide(); 
        e.preventDefault();
        let jsondata = {
            "name": $("#name").val(),
            "email": $("#email").val(),
            "subject": $("#subject").val(),
            "message": $("#message").val()
        };

        $.ajax({
            "async": true,
            "crossDomain": true, 
            "url": "https://planetcommerce-d339.restdb.io/rest/contactform",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "620e631834fd62156585873b",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }).done(function() {
            $('.load-send').hide();
            $('#contact-button').show();
            location.reload();
        });
    });
});