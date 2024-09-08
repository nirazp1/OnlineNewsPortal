(function($) {
    'use strict';

    var $window = $(window);

    // Fullscreen height adjustment
    $window.on('resizeEnd', function() {
        $(".full_height").height($window.height());
    });

    // Custom 'resizeEnd' event to avoid excessive function calls during resize
    $window.on('resize', function() {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 300);
    }).trigger("resize");

    // Initialize news ticker for breaking news
    $.simpleTicker($("#breakingNewsTicker"), {
        speed: 1000,
        delay: 3500,
        easing: 'swing',
        effectType: 'roll'
    });

    // Initialize news ticker for stock news
    $.simpleTicker($("#stockNewsTicker"), {
        speed: 1200,
        delay: 3500,
        easing: 'swing',
        effectType: 'roll'
    });

    var welcomeSlide = $('.welcome-blog-post-slide');

    // Initialize welcome slider using Owl Carousel
    if ($.fn.owlCarousel) {
        welcomeSlide.owlCarousel({
            items: 3,
            margin: 0,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }

    // Handle animations for welcome slider items
    welcomeSlide.on('translate.owl.carousel', function() {
        // Reset animations when slide changes
        var slideLayer = $("[data-animation]");
        slideLayer.each(function() {
            var anim_name = $(this).data('animation');
            $(this).removeClass('animated ' + anim_name).css('opacity', '0');
        });
    });

    welcomeSlide.on('translated.owl.carousel', function() {
        // Apply animations to active slide
        var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
        slideLayer.each(function() {
            var anim_name = $(this).data('animation');
            $(this).addClass('animated ' + anim_name).css('opacity', '1');
        });
    });

    // Set animation delay for elements with 'data-delay' attribute
    $("[data-delay]").each(function() {
        var anim_del = $(this).data('delay');
        $(this).css('animation-delay', anim_del);
    });

    // Set animation duration for elements with 'data-duration' attribute
    $("[data-duration]").each(function() {
        var anim_dur = $(this).data('duration');
        $(this).css('animation-duration', anim_dur);
    });

    // Initialize marquee for elements with 'simple-marquee-container' class
    if ($.fn.SimpleMarquee) {
        $('.simple-marquee-container').SimpleMarquee({
            duration: 80000,
            padding: 0,
            marquee_class: '.marquee',
            container_class: '.simple-marquee-container',
            sibling_class: 0,
            hover: true
        });
    }

    // Initialize editorial post slider
    if ($.fn.owlCarousel) {
        $('.editorial-post-slides').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });
    }

    // Toggle search form visibility
    $('#searchbtn').on('click', function() {
        $('body').toggleClass('search-form-on');
    })

    // Initialize video popup using Magnific Popup
    if ($.fn.magnificPopup) {
        $('.videobtn').magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    }

    // Initialize scroll-to-top functionality
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // Prevent default action for links with '#' as href
    $("a[href='#']").on('click', function($) {
        $.preventDefault();
    });

    // Initialize WOW.js for scroll animations on desktop
    if ($window.width() > 767) {
        new WOW().init();
    }

})(jQuery);
