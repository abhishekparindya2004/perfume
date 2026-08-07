'use strict';

jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/cosmecos_blog_listing.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(gallery_post_carousel_init, 100);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cosmecos_portfolio_listing.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(portfolio_grid, 1000);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/cosmecos_testimonial_carousel.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout( testimonials_carousel_init, 100 );
        }
    });
    elementorFrontend.hooks.addAction("frontend/element_ready/cosmecos_video.default", function (e) {
        let i,o,r=e.find(".video-trigger-button"),n=e.find(".video-container"),t=e.find(".video-wrapper"),a=e.find(".close-popup-layer"),u=jQuery(t).attr("data-src");jQuery(r).on("click",function(){jQuery(n).addClass("active"),setTimeout(function(){i=jQuery(t).height(),o=i*(16/9),jQuery(t).width(o),jQuery(t).append('<iframe allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="100%" height="100%" src="'+u+'?iv_load_policy=3&amp;enablejsapi=1&amp;disablekb=1&amp;autoplay=1&amp;controls=1&amp;showinfo=0&amp;rel=0&amp;loop=0&amp;wmode=transparent"></iframe>');},100),setTimeout(function(){jQuery(n).addClass("visible");},500);}),jQuery(a).on("click",function(){jQuery(n).removeClass("visible"),setTimeout(function(){jQuery(t).html(""),jQuery(n).removeClass("active");},500);}),jQuery(window).on("resize",function(){i=jQuery(t).height(),o=i*(16/9),jQuery(t).width(o);});
    });

});

// Customize Elementor Editor DOM
jQuery( function( $ ) {
    if ( window.elementorFrontend ) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
                $('.elementor-container').each(function(){
                    $(this).children('.elementor-row').children('.elementor-column').unwrap();
                    $(this).children('.elementor-column').wrapAll('<div class="elementor-row ui-sortable" />');
                });
            } );
        } else {
            $('.elementor-container').each(function(){
                $(this).children('.elementor-row').children('.elementor-column').unwrap();
                $(this).children('.elementor-column').wrapAll('<div class="elementor-row ui-sortable" />');
            });
        }
    }
});