"use strict";
function content_slider_start(e) {
    let i = e.find(".cosmecos_video_trigger"), n = e.find(".cosmecos_slider_slick"),
        o = n.data("slider-options"), t = e.find(".cosmecos_slider_counter");
    i.fancybox(), n.on("init afterChange", function (e, i, n, o) {
        var r = (n || 0) + 1;
        t.text(r + "/" + i.slideCount)
    }), n.slick({
        fade: !0,
        pauseOnHover: o.pauseOnHover,
        autoplay: o.autoplay,
        autoplaySpeed: o.autoplaySpeed,
        speed: o.speed,
        infinite: o.infinite,
        cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
        touchThreshold: 100,
        rtl: o.rtl,
        slidesToShow: 1,
        arrows: !0,
        dots: !1,
        appendArrows: '.slick-navigation',
        prevArrow: '.slick-prev',
        nextArrow: '.slick-next',
        adaptiveHeight: !0
    })
}

jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/cosmecos_content_slider.default", function ($scope) {
        setTimeout(content_slider_start, 1000, $scope);
    })
});