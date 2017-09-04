(function ($) {
    $.fn.parallax = function () {
        var window_width = $(window).width();

        // Parallax Scripts
        return this.each(function(i) {
            var $this = $(this);
            $this.addClass('parallax');

            function updateParallax(initial) {
                var $img = $this.children("img").first();

                var img_height = $img.height();
                var img_width = $img.width();
                var container_height = $this.height();
                var container_width = $this.width();
                var diff_height = container_height / img_height;
                var diff_width = container_width / img_width;

                if((diff_height >= 1) || (diff_width >= 1))
                {
                    (diff_height > diff_width) ? $img.css({'min-height' : '150%', 'min-width' : 'auto'}) : $img.css({'min-height' : 'auto', 'min-width' : '100%'});
                }

                if(window_width < 601) {
                    container_height = ($this.height() > 0) ? $this.height() : $img.height();
                }
                else {
                    container_height = ($this.height() > 0) ? $this.height() : 500;
                }

                var parallax_dist = img_height - container_height;
                var top = $this.offset().top;
                var bottom = $this.offset().top + container_height;
                var scrollTop = $(window).scrollTop();
                var windowHeight = window.innerHeight;
                var windowBottom = scrollTop + windowHeight;
                var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
                var parallax = Math.round((parallax_dist * percentScrolled));

                if(initial) {
                    $img.css('display', 'block');
                }

                ($this.hasClass("center-parallax")) ? $img.css('left', '50%') :
                    ($this.hasClass("right-parallax")) ? $img.css('right', '0') : $img.css('left', '0');


                if((bottom > scrollTop) && (top < (scrollTop + windowHeight)) && !$this.hasClass("center-parallax")) {
                    $img.css('transform', "translate3D(0," + parallax + "px, 0)");
                }
                else if((bottom > scrollTop) && (top < (scrollTop + windowHeight)) && $this.hasClass("center-parallax")) {
                    $img.css('transform', "translate3D(0," + parallax + "px, 0) translateX(-50%)");
                }
            }

            // Wait for image load
            $this.children("img").one("load", function() {
                updateParallax(true);
            }).each(function() {
                if(this.complete) $(this).load();
            });

            $(window).scroll(function() {
                window_width = $(window).width();
                updateParallax(false);
            });

            $(window).resize(function() {
                window_width = $(window).width();
                updateParallax(false);
            });
        });
    };
}(jQuery));

// Init Parallax
$('.parallax').parallax();