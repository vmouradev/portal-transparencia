var swiperImage = new Swiper(".swiperImage", {
    autoplay: {
        delay: 5000
    },
    speed: 2000,
    effect: "coverflow",
    initialSlide: 2,
    loop: false,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 4.5,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 0,
        scale: 0.8,
        slideShadows: true
    },
    breakpoints: {
        // when window width is >= 360px
        360: {
            slidesPerView: 1,
            effect: "coverflow",
            coverflowEffect: {
                scale: 1,
                modifier: 2,
                depth: 200,
            }
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 3,
            effect: "coverflow",
            coverflowEffect: {
                scale: 1,
                modifier: 2,
                depth: 200,
            }
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 4,
        }
    },
    pagination: {
        el: ".swiper-pagination"
    }
});

$(function () {
    var swiperTestimonials = new Swiper('.swiperTestimonials', {
        autoplay: {
            delay: 3000
        },
        speed: 2000,
        slidesPerView: 2.5,
        initialSlide: 2.5,
        slidesPerGroup: 2,
        spaceBetween: 10,
        loop: false,
        grabCursor: true,
        breakpoints: {
            // when window width is >= 360px
            360: {
                slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2.5,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 2.5,
            }
        },
        // If we need pagination
        pagination: {
            enabled: true,
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

});

$(function () {
    var swiperTestimonials2 = new Swiper('.swiperTestimonials2', {
        autoplay: {
            delay: 5000
        },
        speed: 2000,
        slidesPerView: 2.5,
        slidesPerGroup: 3,
        spaceBetween: 10,
        loop: false,
        grabCursor: true,
        breakpoints: {
            // when window width is >= 360px
            360: {
                slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2.5,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 2.5,
            }
        },
        // If we need pagination
        pagination: {
            enabled: true,
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

});

$(function () {
    var swiperPartner = new Swiper('.swiper.swiperPartner', {
        autoplay: {
            delay: 3000
        },
        speed: 2000,
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 20,
        initialSlide: 1,
        loop: false,
        grabCursor: true,
        breakpoints: {
            // when window width is >= 360px
            360: {
                slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 3,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
            }
        },
        // If we need pagination
        pagination: {
            enabled: false,
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

});

$(function () {
    var swiperCard = new Swiper(".swiperCard", {
        speed: 1000,
        effect: "cards",
        grabCursor: true,
        initialSlide: 2,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});

const swiper = new Swiper('.custom-swiper', {
    direction: 'vertical',
    slidesPerView: 2,
    spaceBetween: 20,
    scrollbar: {
        el: '.custom-scrollbar',
        draggable: true,
    },
});

const mySwiper = new Swiper('.mySwiper', {
    direction: 'horizontal',
    slidesPerView: 4, // Jumlah slide yang ditampilkan
    spaceBetween: 20, // Jarak antar slide
    breakpoints: {
        // when window width is >= 360px
        360: {
            slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 3,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 4,
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

$(function () {
    var swiperService = new Swiper(".swiperService", {
        speed: 1000,
        effect: "fade",
        grabCursor: true,
        initialSlide: 2,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});

$(function () {
    var swiperService2 = new Swiper(".swiperService2", {
        speed: 1000,
        effect: "fade",
        grabCursor: true,
        initialSlide: 2,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});

var swiperStep = new Swiper(".swiperStep", {
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        // when window width is >= 360px
        360: {
            slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 1,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 3,
        }
    }
});

var swiperStep2 = new Swiper(".swiperStep2", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiperStep,
    },
});