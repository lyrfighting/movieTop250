/*
	Author       :	Themesbazer
	Template Name:	Dusting - Cleaning & Maintenance HTML Website Template
	Version      :	1.0
	
/***************************************************
==================== JS ======================
****************************************************
01. PRELOADER JS
02.	STICKY HEADER JS
03. MOBILE MENU 
04. SCROLL MENU
05. BACK TO TOP
06. LIGHTCASE JS 
07. COUNTER JS
08. SWIPER SLIDER 
09. CLIENT JS 
10. MAILCHAMP JS 
11. WOW SCROLL
12.	GSAP JS

****************************************************/

(function ($) {
    "use strict";

    /*--------------------------------------------------------------
		0.1	START PRELOADER JS
		--------------------------------------------------------------*/
    $(window).on("load", function () {
        $(".loader").fadeOut();
        $(".atf-preloader").delay(350).fadeOut("slow");
    });
    /*--------------------------------------------------------------
			END	PRELOADER JS
		--------------------------------------------------------------*/
    /*--------------------------------------------------------------
		02.	STICKY HEADER JS
		--------------------------------------------------------------*/
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll < 400) {
            $(".atf-sticky-header").removeClass("atf-sticky-active");
        } else {
            $(".atf-sticky-header").addClass("atf-sticky-active");
        }
    });
	
    /*--------------------------------------------------------------
		03.	MOBILE MENU 
		--------------------------------------------------------------*/
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".atf-nav");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".atf-nav-link").forEach((n) =>
        n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        })
    );

    /*--------------------------------------------------------------
	04.	SCROLL MENU
		--------------------------------------------------------------*/
    function scrollPage() {
        $(".atf-onepage-menu li a").click(function () {
            $(".atf-onepage-menu li a.active").removeClass("active");
            $(this).addClass("active");

            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $($(this).attr("href")).offset().top - 100,
                    },
                    300
                );
            return false;
        });
    }
    scrollPage();

    /*--------------------------------------------------------------
		05.	BACK TO TOP
		--------------------------------------------------------------*/

    $(window).on("scroll", function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 400) $(".back-to-top").addClass("active");
        if (scrolled < 400) $(".back-to-top").removeClass("active");
    });

    $(".back-to-top").on("click", function () {
        $("html, body").animate(
            {
                scrollTop: "0",
            },
            50
        );
    });

    /* --------------------------------------------------------
		06.	LIGHTCASE JS
		--------------------------------------------------------- */
    $("a[data-rel^=lightcase]").lightcase({
        transition: "elastic" /* none, fade, fadeInline, elastic, scrollTop, scrollRight, scrollBottom, scrollLeft, scrollHorizontal and scrollVertical */,
        swipe: true,
        maxWidth: 1170,
        maxHeight: 600,
    });

    /* --------------------------------------------------------
		07.	COUNTER JS
		--------------------------------------------------------- */

    $(".counter-number").counterUp({
        delay: 15,
        time: 2000,
    });
	
	/* --------------------------------------------------------
		08.	SWIPER SLIDER
		--------------------------------------------------------- */
    var slider1Swiper = new Swiper(".atf_swiper_slider", {
        speed: 1000,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: false,
        effect: "fade",
        breakpoints: {
            "1400": {
                slidesPerView: 1,
            },
            "1200": {
                slidesPerView: 1,
            },
            "992": {
                slidesPerView: 1,
            },
            "768": {
                slidesPerView: 1,
            },
            "576": {
                slidesPerView: 1,
            },
            "0": {
                slidesPerView: 1,
            },
        },
        pagination: {
            el: ".swiper-pagination, .atf-pagination-number",
            type: "fraction",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },

        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
    });
    /* --------------------------------------------------------
		09.	CLIENT JS
		--------------------------------------------------------- */
    $("#atf-testimonial-slider").owlCarousel({
        margin: 3,
        autoplay: false,
        items: 1,
        loop: true,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            767: {
                items: 1,
            },
            768: {
                items: 1,
            },
            992: {
                items: 1,
            },
        },
    });
   
    /* --------------------------------------------------------
		10. MAILCHAMP JS
		--------------------------------------------------------- */
    $("#mc-form").ajaxChimp({
        url: "https://themesfamily.us22.list-manage.com/subscribe/post?u=e056d9c3aeb53b20aff997467&amp;id=e307d7e1b8&amp;f_id=0012cee1f0",
        /* Replace Your AjaxChimp Subscription Link */
    });

    /* --------------------------------------------------------
		11. WOW SCROLL
		--------------------------------------------------------- */
    var wow = new WOW({
        //disabled for mobile
        mobile: false,
    });

    wow.init();

	/* --------------------------------------------------------
		11. GSAP JS
		--------------------------------------------------------- */
    document.addEventListener("DOMContentLoaded", function () {
        // Split Content animation
        if ($(".split-content").length > 0) {
            let st = $(".split-content");
            if (st.length == 0) return;
            gsap.registerPlugin(SplitText);
            st.each(function (index, el) {
                el.split = new SplitText(el, {
                    type: "lines,words,chars",
                    linesClass: "atf-split-line",
                });
                gsap.set(el, {
                    perspective: 400,
                });
                if ($(el).hasClass("end")) {
                    gsap.set(el.split.chars, {
                        opacity: 0,
                        x: "50",
                        ease: "Back.easeOut",
                    });
                }
                if ($(el).hasClass("start")) {
                    gsap.set(el.split.chars, {
                        opacity: 0,
                        x: "-50",
                        ease: "circ.out",
                    });
                }
                if ($(el).hasClass("up")) {
                    gsap.set(el.split.chars, {
                        opacity: 0,
                        y: "80",
                        ease: "circ.out",
                    });
                }
                if ($(el).hasClass("down")) {
                    gsap.set(el.split.chars, {
                        opacity: 0,
                        y: "-80",
                        ease: "circ.out",
                    });
                }
                el.anim = gsap.to(el.split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                    },
                    x: "0",
                    y: "0",
                    rotateX: "0",
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.04,
                });
            });
        }

        // Image spread js
        let revealContainers = document.querySelectorAll(".spread");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none",
                },
            });

            tl.set(container, {
                autoAlpha: 1,
            });

            if (container.classList.contains("zoom-out")) {
                // Zoom-out effect
                tl.from(image, 1.5, {
                    scale: 1.4,
                    ease: Power2.out,
                });
            } else if (container.classList.contains("start") || container.classList.contains("end")) {
                let xPercent = container.classList.contains("start") ? -100 : 100;
                tl.from(container, 1.5, {
                    xPercent,
                    ease: Power2.out,
                });
                tl.from(image, 1.5, {
                    xPercent: -xPercent,
                    scale: 1,
                    delay: -1.5,
                    ease: Power2.out,
                });
            }
        });
    });
})(jQuery);
