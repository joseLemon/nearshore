//  Ajax contact form
$(function() {

    var close = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
    // Get the form.
    var form = $('#contact-form');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        $('#form-output').append('<div class="message"></div>');
        // Get the messages div.
        var formMessages = $('#form-output .message');
        // Stop the browser from submitting the form.
        e.preventDefault();
        $("#form-submit").val("SENDING...");

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('alert alert-danger');
                $(formMessages).addClass('alert alert-success');

                // Set the message text.
                $(formMessages).html(close+response);

                // Clear the form.
                $('#name').val('');
                $('#email').val('');
                $('#msg').val('');
                $("#form-submit").val("SEND");
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('alert alert-success');
                $(formMessages).addClass('alert alert-danger');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).html(close+data.responseText);
                    $("#form-submit").val("SEND");
                } else {
                    $(formMessages).html(close+'Oops! OcurriÃ³ un error, intentelo nuevamente.');
                    $("#form-submit").val("SEND");
                }
            });

    });

});