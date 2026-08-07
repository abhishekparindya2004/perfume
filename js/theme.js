"use strict";

// ---------------------- //
// --- Portfolio Grid --- //
// ---------------------- //
function portfolio_grid() {
    // Portfolio Filter
    if ( jQuery('.cosmecos-portfolio-listing-widget').length > 0 ) {
        jQuery('.cosmecos-portfolio-listing-widget').each(function (i, el) {
            var wrapper = jQuery(el).find('.isotope-trigger');
            wrapper.isotope({
                itemSelector: '.portfolio-item-wrapper',
                gutter: 0,
                filter: '.all'
            });
            jQuery(el).find('.filter-control-item').off();
            jQuery(el).find('.filter-control-item').on('click', function(){
                var filter = jQuery(this).data('value');

                jQuery(el).find('.filter-control-item').removeClass('active');
                jQuery(this).addClass('active');

                wrapper.isotope({
                    itemSelector: '.portfolio-item-wrapper',
                    gutter: 0,
                    filter: '.' + filter,
                    masonry: {
                        columnWidth: '.grid-sizer'
                    }
                });
            });
        });
    }
}

function side_panel_open() {
    jQuery('.dropdown-trigger').on('click', function() {
        jQuery('.slide-sidebar-wrapper, .body-overlay').addClass('active');
    });
    jQuery('.slide-sidebar-close, .body-overlay').on('click', function() {
        jQuery('.slide-sidebar-wrapper, .body-overlay').removeClass('active');
    });
}

function extra_panel_open() {
    jQuery('.extra-trigger').on('click', function() {
        jQuery('.slide-extra-wrapper, .body-overlay').addClass('active');
    });
    jQuery('.slide-extra-close, .body-overlay').on('click', function() {
        jQuery('.slide-extra-wrapper, .body-overlay').removeClass('active');
    });
}

function search_panel_open() {
    jQuery('.search-trigger').on('click', function() {
        jQuery('.site-search, .body-overlay').addClass('active');
    });
    jQuery('.site-search-close, .body-overlay').on('click', function() {
        jQuery('.site-search, .body-overlay, .mobile-header-menu-container').removeClass('active');
    });
}

function switch_form_columns() {
    jQuery('.tab-columns-switcher').on('click', function() {
        jQuery('.tab-column', jQuery(this).parents('.tab-columns')).toggleClass('hidden');
    });
}

function sticky_menu_active (){
    if ( jQuery('.sticky-header-on').length ) {
        jQuery('.sticky-header-on').each(function(){
            let obj = jQuery(this);
            let el_offset = obj.offset().top;
            let el_height = jQuery('.sticky-wrapper', obj).innerHeight();
            let el_ready = el_offset + el_height;
            let el_not_active = el_offset + el_height + 300;
            el_offset = el_offset + el_height + 200;

            obj.height(el_height);

            jQuery(window).scroll(function(){
                var st = jQuery(this).scrollTop();
                if (st <= el_ready) {
                    obj.removeClass('sticky-ready');
                } else {
                    obj.addClass('sticky-ready');
                }
                if (st <= el_not_active) {
                    obj.removeClass('sticky-active');
                }
                if (st <= el_offset) {
                    obj.removeClass('sticky-active');
                } else {
                    obj.addClass('sticky-active');
                }
            });
        });
    }
}

function footer_widget_menu_columns() {
    jQuery('.footer-widgets .widget_nav_menu').each(function(){
        if (jQuery('.menu > li', this).length > 7) {
            jQuery('.menu', this).addClass('columns-3');
        } else if (jQuery('.menu > li', this).length > 4) {
            jQuery('.menu', this).addClass('columns-2');
        }
    });
}

function mobile_menu_open() {
    jQuery('.menu-trigger').on('click', function() {
        jQuery('.mobile-header-menu-container, .body-overlay').addClass('active');
    });
    jQuery('.menu-close, .body-overlay').on('click', function() {
        jQuery('.mobile-header-menu-container, .body-overlay').removeClass('active');
    });
}

function simple_sidebar_open() {
    jQuery('.simple-sidebar-trigger').on('click', function() {
        if (jQuery(window).width() < 992) {
            jQuery('.simple-sidebar, .body-overlay').addClass('active');
        }
    });
    jQuery('.shop-hidden-sidebar-close, .body-overlay').on('click', function() {
        jQuery('.simple-sidebar, .body-overlay').removeClass('active');
    });
}

function widget_list_hierarchy_init (){
    widget_archives_hierarchy_controller ( '.widget ul li', 'ul.children', 'parent-archive', 'widget-archive-trigger' );
    widget_archives_hierarchy_controller ( '.widget_nav_menu .menu li', 'ul.sub-menu', 'parent-archive', 'widget-menu-trigger' );

    widget_archives_hierarchy_controller ( '.content .wp-block-categories li', '.children', 'parent-archive', 'block-archive-trigger' );
}

function widget_archives_hierarchy_controller ( list_item_selector, sublist_item_selector, parent_class, trigger_class ){
    jQuery( list_item_selector ).has( sublist_item_selector ).each( function (){
        jQuery( this ).addClass( parent_class );
        jQuery(this).append( "<span class='fa fa-angle-right " + trigger_class + "'></span>" );
    });
    jQuery( list_item_selector + ">" + sublist_item_selector ).css( "display", "none" );
    jQuery( list_item_selector + ">.item-wrapper>" + sublist_item_selector ).css( "display", "none" );
    jQuery( document ).on( "click", "." + trigger_class, function (){
        var el = jQuery(this);
        var sublist = el.siblings( sublist_item_selector );
        var sublist_alt = el.siblings('.item-wrapper').children( sublist_item_selector );
        if ( !sublist.length && !sublist_alt.length ) return;
        sublist = sublist.first();
        sublist_alt = sublist_alt.first();
        el.toggleClass('active');
        sublist.slideToggle( 300 );
        sublist_alt.slideToggle( 300 );
    });
}

function fix_responsive_iframe () {
    jQuery('.video-embed > div').each(function() {
        jQuery(this).unwrap('.video-embed');
    });
}

function gallery_post_carousel_init () {
    jQuery('.post-gallery-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        dots: false,
        nav: true,
        navText: ['', ''],
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoHeight: true,
        rtl: (jQuery('body').hasClass('rtl') ? true : false)
    });
}

function testimonials_carousel_init () {
    jQuery('.testimonials-slider').each( function() {
        let slider =  jQuery(this),
            slider_options = slider.data('slider-options');
        if ( jQuery('.testimonial-item', slider).length > 1 ) {
            slider.owlCarousel({
                items:              slider_options['items'],
                // lazyLoad:           true,
                loop:               slider_options['loop'],
                navSpeed:           slider_options['speed'],
                dotsSpeed:          slider_options['speed'],
                dragEndSpeed:       slider_options['speed'],
                dots:               true,
                nav:                true,
                navText:            ['', ''],
                autoplay:           slider_options['autoplay'],
                autoplayTimeout:    slider_options['autoplayTimeout'],
                autoplayHoverPause: slider_options['autoplayHoverPause'],
                autoplaySpeed:      slider_options['autoplaySpeed'],
                autoHeight:         true,
                singleItem:         true,
                rtl:                slider_options['rtl'],
            });
        }
    });
}

// Mobile Menu
function mobile_menu(){
    jQuery('.mobile-header-menu-container .main-menu, .extra-menu').find('.menu-item').each(function(i, el){
        if( jQuery(el).find('.sub-menu').length != 0 && jQuery(el).find('.sub-menu-trigger').length == 0 ){
            jQuery(el).append('<span class="sub-menu-trigger"></span>');
        }
    });

    jQuery('.sub-menu-trigger').off();
    jQuery('.sub-menu-trigger').on('click', function() {
        if( jQuery(this).parent().hasClass('active') ){
            jQuery(this).prev().slideUp();
            jQuery(this).parent().removeClass('active');
        } else {
            var currentParents = jQuery(this).parents('.menu-item');
            jQuery('.sub-menu-trigger').parent().not(currentParents).removeClass('active');
            jQuery('.sub-menu-trigger').parent().not(currentParents).find('.sub-menu').slideUp(300);

            jQuery(this).prev().slideDown();
            jQuery(this).parent().addClass('active');
        }
    });
    jQuery('.mobile-header-menu-container .main-menu a').on('click', function() {
        jQuery('.site-search, .body-overlay, .mobile-header-menu-container').removeClass('active');
    });
}

// Scroll to Anchor
function scroll_to_anchor() {
    jQuery('.pwb-az-listing-header a').on('click', function(){
        var target = jQuery(this).attr('href');
        jQuery('body, html').animate({scrollTop: jQuery(target).offset().top - 200 +'px'}, 600);
        return false;
    });
}

// Page Preloader
function page_loader_controller(){
    var page_loader, interval, timeLaps ;
    page_loader = jQuery('.page-loader');
    timeLaps = 0;
    interval = setInterval( function(){
        var page_loaded = check_if_page_loaded();
        timeLaps ++;
        if ( page_loaded ||  timeLaps === 12) {
            clearInterval ( interval );
            page_loader.stop_loader ();
        }
    }, 10);
}
function check_if_page_loaded(){
    var keys, key, i, r;
    if ( window.modules_state === undefined ) return false;
    r = true;
    keys = Object.keys( window.modules_state );
    for ( i = 0; i < keys.length; i++ ){
        key = keys[i];
        if ( !window.modules_state[key] ){
            r = false;
            break;
        }
    }
    return r;
}
function start_loader(){
    let loader = jQuery(this);
    if ( !loader.length ) return;
    let loader_container = loader[0].parentNode;
    if ( loader_container != null ){
        loader_container.style.opacity = 1;
        setTimeout( function (){
            loader_container.style.display = "block";
        }, 10);
    }
}
function stop_loader(){
    let loader = jQuery(this);
    if ( !loader.length ) return;
    let loader_container = loader[0].parentNode;
    if ( loader_container != null ){
        setTimeout( function(){
            loader_container.style.opacity = 0;
            setTimeout( function(){
                loader_container.style.display = "none";
            }, 300);
        }, 500);
    }
}

// ---------------------- //
// --- Document Ready --- //
// ---------------------- //
jQuery(document).ready(function () {

    side_panel_open();
    extra_panel_open();
    search_panel_open();
    switch_form_columns();
    setTimeout(sticky_menu_active, 300);
    footer_widget_menu_columns();
    mobile_menu_open();
    simple_sidebar_open();

    mobile_menu();

    scroll_to_anchor();

    widget_list_hierarchy_init();
    setTimeout(portfolio_grid, 500);
    setTimeout(fix_responsive_iframe, 800);

});

jQuery(window).on('load', function() {

    // Page Preloader
    jQuery.fn.start_loader = start_loader;
    jQuery.fn.stop_loader = stop_loader;
    page_loader_controller();

    // Sliders
    gallery_post_carousel_init();
    testimonials_carousel_init();

});

// --------------------- //
// --- Window Resize --- //
// --------------------- //
jQuery(window).on('resize', function () {
    setTimeout(sticky_menu_active, 300);
    mobile_menu_open();
});
