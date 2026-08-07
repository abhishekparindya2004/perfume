/*
 * Created by Artureanec
*/
( function( jQuery ) {
    "use strict";

    function is_mobile () {
        if ( window.innerWidth < 768 ){
            return true;
        } else {
            return false;
        }
    }
    function is_mobile_device(){
        if ( navigator.userAgent.match( /(Android|iPhone|iPod|iPad|Phone|DROID|webOS|BlackBerry|Windows Phone|ZuneWP7|IEMobile|Tablet|Kindle|Playbook|Nexus|Xoom|SM-N900T|GT-N7100|SAMSUNG-SGH-I717|SM-T330NU)/ ) ) {
            return true;
        } else {
            return false;
        }
    }
    function not_desktop(){
        if( (window.innerWidth < 1367 && is_mobile_device()) || window.innerWidth < 1200 ){
            return true;
        } else {
            return false;
        }
    }

    function product_filters_open() {
        jQuery('.product-filters-trigger').on('click', function() {
            if (jQuery(window).width()< 992) {
                jQuery('.shop-hidden-sidebar, .body-overlay').addClass('active');
            }
        });
        jQuery('.shop-hidden-sidebar-close, .body-overlay').on('click', function() {
            jQuery('.shop-hidden-sidebar, .body-overlay').removeClass('active');
        });
    }
    product_filters_open();

    function custom_quantity() {
        jQuery('.quantity-wrapper').each(function() {
            if ( !jQuery(this).hasClass('styled') ) {
                if (!jQuery('.quantity', this).hasClass('hidden')) {
                    jQuery(this).addClass('styled').prepend('<div class="btn-minus"><i class="icon"></i></div>').append('<div class="btn-plus"><i class="icon"></i></div>');
                } else {
                    jQuery(this).addClass('hidden')
                }
                var spinner = jQuery(this),
                    input = spinner.find('input[type="number"]'),
                    btnUp = spinner.find('.btn-plus'),
                    btnDown = spinner.find('.btn-minus'),
                    min = input.attr('min'),
                    max = input.attr('max');
                if (typeof min !== typeof undefined && min !== false && min !== '' && min >= 1) {
                    min = parseInt(min);
                } else {
                    min = 0;
                }
                if (typeof max !== typeof undefined && max !== false && max !== '' && max > min) {
                    max = parseInt(max);
                } else {
                    max = 0;
                }

                btnUp.on('click', function () {
                    if (input.val() == '') {
                        var oldValue = 0;
                    } else {
                        var oldValue = parseInt(input.val());
                    }
                    if (oldValue >= max && max !== 0) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue + 1;
                    }
                    input.val(newVal);
                    input.trigger('change');
                });

                btnDown.on('click', function () {
                    if (input.val() == '') {
                        var oldValue = 0;
                    } else {
                        var oldValue = parseInt(input.val());
                    }
                    if (oldValue <= min) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue - 1;
                    }
                    input.val(newVal);
                    input.trigger('change');
                });
            }
        });
    }
    custom_quantity();
    jQuery( document.body ).on( 'updated_cart_totals', function(){
        custom_quantity();
    });

// Change display mode
    jQuery('.woocommerce,.woocommerce-page').on('click', '.shop-mode-buttons a', function(e) {
        var mode = jQuery(this).hasClass('woocommerce-grid') ? 'grid' : 'list';
        var mode_old = jQuery(this).siblings('input').val();
        if ( mode != mode_old ) {
            jQuery.cookie('shop_mode', mode, {expires: 365, path: '/'});
            jQuery(this).siblings('input').val(mode).parents('form').get(0).submit();
        }
        e.preventDefault();
        return false;
    });

    /* ===========> Scripts Init <=========== */
    window.addEventListener( "load", function() {
        cosmecos_ajax_add_to_cart();
        cosmecos_trigger_mini_cart();
    });

    function cosmecos_trigger_mini_cart(){
        var cart = jQuery('.mini-cart-panel');
        cart.off();

        if( window.innerWidth >= 992 ){
            jQuery('.header .mini-cart-trigger').on('click', function(e){
                e.preventDefault();
                cart.addClass('active');

                jQuery('.close-mini-cart').off();
                cosmecos_close_mini_cart();
            });
        }
    }
    function cosmecos_close_mini_cart(){
        jQuery('.close-mini-cart').on('click', function(){
            jQuery('.mini-cart').removeClass('active');
        });
    }

    /* ===========> Ajax Add-To-Cart Declaration <=========== */
    function cosmecos_ajax_add_to_cart(){
        if ( typeof wc_add_to_cart_params !== 'undefined' ) {
            jQuery('.single_add_to_cart_button').off().on('click', function (e) {
                if ( !(jQuery(this).hasClass('single_add_to_cart_button') && wc_add_to_cart_params.cart_redirect_after_add === 'yes') ) {
                    e.preventDefault();

                    var button = jQuery(this);
                    var form = button.closest('form.cart');
                    var product_id = form.find('input[name=add-to-cart]').val() || button.val() || form.find('.variation_id').val();

                    if (!product_id)
                        return;
                    if (button.is('.disabled'))
                        return;

                    var data = {
                        action: 'cosmecos_ajax_add_to_cart',
                        'add-to-cart': product_id,
                    };

                    form.serializeArray().forEach(function (element) {
                        data[element.name] = element.value;
                    });

                    jQuery(document.body).trigger('adding_to_cart', [button, data]);

                    jQuery.ajax({
                        type: 'POST',
                        'url': wc_add_to_cart_params.ajax_url,
                        data: data,
                        beforeSend: function (response) {
                            button.removeClass('added').addClass('loading');
                        },
                        complete: function (response) {
                            button.addClass('added').removeClass('loading');
                        },
                        success: function (response) {
                            if (response.error & response.product_url) {
                                window.location = response.product_url;
                                return;
                            } else {
                                jQuery(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, button]);
                            }
                        }
                    });

                    return false;
                }
            });
        }
    }

    // Product Gallery thumbnails slider
    function single_product_thumb_slider() {
        jQuery('.woocommerce-product-gallery--with-images').find('.flex-control-nav').slick({
            mobileFirst:    true,
            prevArrow:      '<div class="slick-button slick-prev"></div>',
            nextArrow:      '<div class="slick-button slick-next"></div>',
            infinite:       false,
            responsive:     [
                {
                    breakpoint: 120,
                    settings: {
                        slidesToShow:    3,
                        vertical:        false,
                        verticalSwiping: false
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow:    4,
                        vertical:        false,
                        verticalSwiping: false
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow:    5,
                        vertical:        false,
                        verticalSwiping: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow:    4,
                        vertical:        false,
                        verticalSwiping: false
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow:    4,
                        vertical:        true,
                        verticalSwiping: true
                    }
                }
            ]
        });
    }
    setTimeout(single_product_thumb_slider, 500);

} ).call( this, jQuery );