//  READY
$(document).ready(function () {
});

//  navbar scroll
$(window).scroll(function() {
    /* DETECT IF NAVBAR IS AT TOP */
    var $nav = $('.navbar');
    if( $(this).scrollTop() == 0 ) {
        $nav.removeClass('scrolling');
    } else if( !$nav.hasClass('scrolling') ) {
        $nav.addClass('scrolling');
    }
});

//  Active nav items
$('.navbar-nav li').click(function() {
    $('.navbar-nav li').removeClass('active');
    $(this).addClass('active');
});

$('.md-trigger').click(function() {
    $('body').css({'overflow':'hidden'});
});

$('.md-close').click(function() {
    $('body').css({'overflow':'auto'});
});

//  On scroll change active link in navbar
$(window).on("scroll", onScroll);

$(window).scroll(function() {
    if($(this).scrollTop() + $(this).height() === $(document).height()) {
        $menu_items = $('.navbar-collapse li');
        $menu_items_length = $menu_items.length-1;

        $menu_items.each(function (index) {
            console.log(index);
            if(index !== $menu_items_length) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
        });
    }
});

function onScroll(event){
    var scrollPos = $(document).scrollTop()+106;
    $('.navbar-collapse li').each(function () {
        var currLink = $(this).children("a");
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.navbar-collapse ul li').removeClass("active");
            $(this).addClass("active");
        }
        else{
            $(this).removeClass("active");
        }
    });
}

//  smoothscroll
$('.smoothscroll').click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, {
        duration: 1000,
        easing: 'easeInOutCubic'
    });
});

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