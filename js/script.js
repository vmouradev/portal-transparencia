$(function () {
    $('.nav-btn').on('mouseenter mouseleave', function () {
        $(this).toggleClass('open');
    });
});

$(function () {
    $(window).on('scroll', function () {
        const scroll = $(window).scrollTop();
        if (scroll > 100) {
            $("#header").addClass('glass-effect');
        } else {
            $("#header").removeClass("glass-effect");
        }
    });

    const $tabDuration = $('#tab-duration');

    let $durationActive = $tabDuration.find('.tab.active');
    let dataDurationActive = $durationActive.data('duration');

    filterDuration(dataDurationActive);

    $(document).on('click', '#tab-duration .tab', function (e) {
        e.preventDefault();

        const duration = $(this).data('duration');
        filterDuration(duration);

        $(this).addClass('active').siblings().removeClass('active');
    });

    function filterDuration(duration) {
        $('.class-duration').each(function () {
            const durations = $(this).attr('data-duration') || '';

            if (durations === duration) {
                $(this).addClass('active').show();
            } else {
                $(this).removeClass('active').hide();
            }
        });
    }

});

$(function () {

    $(window).on('scroll', function () {
        const scroll = $(window).scrollTop();
        if (scroll > 100) {
            $("#header").addClass('glass-effect');
        } else {
            $("#header").removeClass("glass-effect");
        }
    });


    const $tabTeam = $('#team-tab');
    const $tabDuration = $('#tab-duration');

    const dataTeamActive = $tabTeam.find('.tab.active').data('team');
    const dataDurationActive = $tabDuration.find('.tab.active').data('duration');

    filterClasses(dataTeamActive);
    filterDuration(dataDurationActive);


    $(document).on('click', '#team-tab .tab', function (e) {
        e.preventDefault();

        const team = $(this).data('team');
        filterClasses(team);

        $(this).addClass('active').siblings().removeClass('active');
    });


    $(document).on('click', '#tab-duration .tab', function (e) {
        e.preventDefault();

        const duration = $(this).data('duration');
        filterDuration(duration);

        $(this).addClass('active').siblings().removeClass('active');
    });


    function filterClasses(team) {
        if (team === 'all') {
            $('.class-team').addClass('active');
        } else {
            $('.class-team').each(function () {
                const teams = $(this).attr('data-teams') || '';
                $(this).toggleClass('active', teams.includes(team));
            });
        }
    }

    function filterDuration(duration) {
        if (duration === 'all') {
            $('.class-duration').addClass('active');
        } else {
            $('.class-duration').each(function () {
                const durations = $(this).attr('data-duration') || '';
                $(this).toggleClass('active', durations.includes(duration));
            });
        }
    }

});

$(function () {
    $(window).on('scroll', function () {
        const scroll = $(window).scrollTop();
        $('#header').toggleClass('glass-effect', scroll > 100);
    });

    const tabGallery = $('#gallery-tab');
    const tabDuration = $('#tab-duration');

    let galleryActive = tabGallery.find('.tab.active').data('gallery') || 'all';
    let durationActive = tabDuration.find('.tab.active').data('duration') || 'all';

    filterGallery(galleryActive);
    filterDuration(durationActive);

    tabGallery.on('click', '.tab', function (e) {
        e.preventDefault();
        const gallery = $(this).data('gallery');
        filterGallery(gallery);
        $(this).addClass('active').siblings().removeClass('active');
    });

    tabDuration.on('click', '.tab', function (e) {
        e.preventDefault();
        const duration = $(this).data('duration');
        filterDuration(duration);
        $(this).addClass('active').siblings().removeClass('active');
    });

    function filterGallery(gallery) {
        $('.class-gallery').each(function () {
            const galleries = ($(this).attr('data-gallerys') || '').split(',');
            if (gallery === 'all' || galleries.includes(gallery)) {
                $(this).addClass('active').show();
            } else {
                $(this).removeClass('active').hide();
            }
        });
    }

    function filterDuration(duration) {
        $('.class-duration').each(function () {
            const durations = ($(this).attr('data-duration') || '').split(',');
            if (duration === 'all' || durations.includes(duration)) {
                $(this).addClass('active').show();
            } else {
                $(this).removeClass('active').hide();
            }
        });
    }
});

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function animateNumber(element, targetNumber, duration) {
    const startTime = performance.now();
    const startNumber = 0;

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentNumber = Math.floor(startNumber + progress * (targetNumber - startNumber));

        element.innerText = formatNumber(currentNumber);

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

function checkScroll() {
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach(element => {
        // Periksa jika elemen sudah dianimasikan
        if (!element.classList.contains('animated')) {
            const targetValue = parseInt(element.getAttribute("data-target"), 10);
            const durationValue = parseInt(element.getAttribute("data-duration"), 10);

            // Memeriksa apakah elemen muncul di viewport
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                animateNumber(element, targetValue, durationValue);
                element.classList.add('animated'); // Tandai elemen sudah dianimasikan
            }
        }
    });
}

// Menambah event listener untuk scroll
window.addEventListener('scroll', checkScroll);

$(function () {
    $('.marquee-container').each(function () {
        const cont = $(this); // Mengambil marquee-container saat ini
        const content = cont.find('.marquee-content');
        const clone = content.clone();
        const clone2 = clone.clone();
        cont.append(clone);
        cont.append(clone2); // Clone hanya untuk container ini

        cont.find('.marquee-content').addClass('marquee'); // Tambahkan class marquee pada konten yang di-clone
    });
});

$(function () {
    const $rows = $('.offer');

    const closeAll = () => {
        $rows.removeClass('active');
    };

    // reset dulu, lalu aktifkan baris pertama
    closeAll();
    $rows.eq(0).addClass('active');

    // event handler
    $rows.on('mouseenter', function () {
        if ($(this).hasClass('active')) return;

        closeAll();
        $(this).addClass('active');
    });
});

// Ambil semua elemen h3.text
$(".text").each(function () {
    var $this = $(this);
    var contents = $this.contents(); // ambil node: bisa teks / elemen

    $this.empty();

    contents.each(function () {
        if (this.nodeType === 3) {
            // Node teks → pecah per karakter
            var chars = this.nodeValue.trim().split("");
            $.each(chars, function (i, char) {
                $this.append($("<span>").text(char));
            });
        } else {
            // Node elemen (misal <img>) → masukkan langsung
            $this.append(this);
        }
    });
});

// Scroll detection
$(window).on("scroll", function () {
    $(".text").each(function () {
        var $textElement = $(this);
        var $spans = $textElement.find("span");

        var windowBottom = $(window).scrollTop() + $(window).height();
        var elementTop = $textElement.offset().top;
        var elementHeight = $textElement.outerHeight();

        // Kalau elemen masuk viewport
        if (windowBottom >= elementTop) {
            var visiblePart = Math.min(windowBottom - elementTop, elementHeight);
            var progress = visiblePart / elementHeight;
            var totalChars = $spans.length;
            var activeChars = Math.floor(progress * totalChars);

            $spans.each(function (index) {
                if (index < activeChars) {
                    $(this).addClass("active").removeClass("active_");
                } else {
                    $(this).removeClass("active").addClass("active_");
                }
            });
        }
    });
});