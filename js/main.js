// Navbar scroll background
$(window).on("scroll", function () {
    if ($(this).scrollTop() > 10) {
        $(".main-navbar").addClass("scrolled");
    } else {
        $(".main-navbar").removeClass("scrolled");
    }
});

new Swiper('.exp-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 12,
    breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 16 },
        992: { slidesPerView: 3, spaceBetween: 16 }
    }
});

var aiSwiper = null;

function openAiModal() {
    $("#ai-modal").fadeIn(200);
    $("body").addClass("overflow-hidden");
    if (aiSwiper) { aiSwiper.destroy(true, true); }
    aiSwiper = new Swiper('.ai-cards-swiper', {
        slidesPerView: 1.3,
        spaceBetween: 14,
        centeredSlides: true,
        breakpoints: {
            576: { slidesPerView: 2.2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20, centeredSlides: false }
        }
    });
}

function closeAiModal() {
    $("#ai-modal").fadeOut(200);
    $("body").removeClass("overflow-hidden");
}

$(document).ready(function () {
    $(document).on("click", "#aiModalTrigger, .ask-ai-btn", function (e) { e.preventDefault(); openAiModal(); });
    $(document).on("click", "#aiModalClose", closeAiModal);
});

$(document).ready(function () {
    // Seamless ticker
    var $track = $("#tickerTrack");
    if ($track.length) {
        var singleSetWidth = $track[0].scrollWidth;
        $track.append($track.html());
        var speed = window.innerWidth <= 991 ? 80 : 200;
        var duration = singleSetWidth / speed;
        $track.css({
            "animation-duration": duration.toFixed(3) + "s",
            "animation-timing-function": "linear"
        });
        $track[0].style.setProperty("--ticker-width", "-" + singleSetWidth + "px");
    }

    var $defaultActive = $(".nav-item.has-mega .nav-link-item.active").first();

    function openNav($item) {
        clearTimeout($item.data("hideTimer"));
        $item.find(".mega-menu").addClass("open");
        $item.find(".nav-link-item").addClass("active");
    }

    function closeNav($item) {
        $item.data("hideTimer", setTimeout(function () {
            $item.find(".mega-menu").removeClass("open");
            $item.find(".nav-link-item").removeClass("active");
            $defaultActive.addClass("active");
        }, 200));
    }

    // Hover
    $(".nav-item.has-mega").on("mouseenter", function () {
        openNav($(this));
    }).on("mouseleave", function () {
        closeNav($(this));
    });

    // Keep open when mouse inside mega menu
    $(".mega-menu").on("mouseenter", function () {
        openNav($(this).closest(".nav-item.has-mega"));
    }).on("mouseleave", function () {
        closeNav($(this).closest(".nav-item.has-mega"));
    });

    // AI hero button reveal
    $(".ai-hero-btn").on("click", function (e) {
        e.preventDefault();
        $(this).closest(".ai-btns").addClass("revealed");
    });


    $(".close-ads").on("click", function () {
        $(".ads-section").hide();
    });

    // ===== Loan Calculator Panel =====
    function openLoanPanel() {
        $(".content-link, .content-link-overlay").addClass("open");
        $("body").addClass("overflow-hidden");
    }

    function closeLoanPanel() {
        $(".content-link, .content-link-overlay").removeClass("open");
        $("body").removeClass("overflow-hidden");
    }

    $(document).on("click", ".loan-calc-trigger", function (e) { e.preventDefault(); openLoanPanel(); });
    $(document).on("click", ".content-link .close-btn", closeLoanPanel);
    $(document).on("click", "#loanOverlay", closeLoanPanel);

    // ===== Compare Bar =====
    var MAX_COMPARE = 4;
    var compareList = [];

    function updateCheckboxStates() {
        var maxed = compareList.length >= MAX_COMPARE;
        $(".compare-container .form-check-input").each(function () {
            if (!$(this).is(":checked")) {
                $(this).prop("disabled", maxed);
                $(this).closest(".compare-container").toggleClass("compare-disabled", maxed);
            }
        });
    }

    function renderCompareBar() {
        var $slots = $("#compareSlots");
        var $bar = $("#compareBar");
        if (!$bar.length) return;

        $slots.empty();

        for (var i = 0; i < MAX_COMPARE; i++) {
            if (compareList[i]) {
                var item = compareList[i];
                $slots.append(
                    '<div class="compare-slot filled" data-id="' + item.id + '">' +
                    '<img src="' + item.img + '" alt="' + item.name + '">' +
                    '<p class="compare-slot-name">' + item.name + '</p>' +
                    '<button class="compare-slot-remove" data-id="' + item.id + '" aria-label="Remove">' +
                    '<i class="fa-solid fa-xmark"></i>' +
                    '</button>' +
                    '</div>'
                );
            } else {
                $slots.append('<div class="compare-slot empty"></div>');
            }
        }

        if (compareList.length > 0) {
            $bar.addClass("active");
        }
    }

    // Remove single card from compare bar
    $(document).on("click", ".compare-slot-remove", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var id = $(this).data("id");
        compareList = compareList.filter(function (c) { return c.id !== id; });
        $('[data-compare-id="' + id + '"]').prop("checked", false);
        renderCompareBar();
        updateCheckboxStates();
    });

    // Click on compare-container toggles its checkbox
    $(document).on("click", ".compare-container", function (e) {
        if (!$(e.target).is(".form-check-input")) {
            var $cb = $(this).find(".form-check-input");
            if ($cb.prop("disabled")) return;
            $cb.prop("checked", !$cb.prop("checked")).trigger("change");
        }
    });

    // Checkbox handler
    $(document).on("change", ".compare-container .form-check-input", function () {
        var $box = $(this).closest(".credit-box");
        var id = $box.closest('[class*="col-"]').index();
        var name = $box.find("h6").text().trim();
        var img = $box.find("picture img").attr("src");

        $(this).attr("data-compare-id", id);

        if ($(this).is(":checked")) {
            if (compareList.length >= MAX_COMPARE) {
                $(this).prop("checked", false);
                return;
            }
            compareList.push({ id: id, name: name, img: img });
        } else {
            compareList = compareList.filter(function (c) { return c.id !== id; });
        }
        renderCompareBar();
        updateCheckboxStates();
    });

    // Close bar
    $("#compareBarClose").on("click", function () {
        compareList = [];
        $(".compare-container .form-check-input").prop("checked", false).prop("disabled", false);
        $(".compare-container").removeClass("compare-disabled");
        $("#compareBar").removeClass("active");
        renderCompareBar();
    });

    // ===== Mobile Menu =====
    function openMobileMenu() {
        $("#mobileMenuOverlay").addClass("open");
        $("body").addClass("overflow-hidden");
    }

    function closeMobileMenu() {
        $("#mobileMenuOverlay").removeClass("open");
        $("body").removeClass("overflow-hidden");
    }

    $("#mobileMenuOpen").on("click", openMobileMenu);
    $("#mobileMenuClose").on("click", closeMobileMenu);

    // Close when clicking outside the panel
    $("#mobileMenuOverlay").on("click", function (e) {
        if ($(e.target).is("#mobileMenuOverlay")) {
            closeMobileMenu();
        }
    });

    // Level 1 accordion
    $(".mobile-nav-toggle").on("click", function () {
        var $item = $(this).closest(".mobile-nav-item");
        var isOpen = $item.hasClass("open");
        $(".mobile-nav-item").removeClass("open");
        if (!isOpen) $item.addClass("open");
    });

    // Level 2 accordion
    $(".mobile-sub-toggle").on("click", function () {
        var $item = $(this).closest(".mobile-sub-item");
        var isOpen = $item.hasClass("open");
        $(".mobile-sub-item").removeClass("open");
        if (!isOpen) $item.addClass("open");
    });

    // Tooltip 
    $('[data-bs-toggle="tooltip"]').tooltip();

    $('select').niceSelect();

    // Inject images into nice-select options
    $('select option[data-img]').each(function () {
        var val = $(this).val();
        var img = $(this).data('img');
        var text = $(this).text().trim();
        var $li = $(this).closest('select').next('.nice-select').find('.option[data-value="' + val + '"]');
        $li.html('<img src="' + img + '" alt="">' + text);
    });

    // ===== Nice Select Search =====
    $('.nice-searchable').each(function () {
        var $niceSelect = $(this).next('.nice-select');
        $niceSelect.find('.current').replaceWith(
            '<span class="nice-search-wrapper">' +
            '<img src="/assets/icons/magnifying-glass.svg" class="nice-search-icon" alt="">' +
            '<input type="text" class="nice-search-trigger" placeholder="Search...">' +
            '</span>'
        );
        $niceSelect.addClass('nice-has-search');
    });

    // Open dropdown on input focus/click
    $(document).on('focus click', '.nice-search-trigger', function (e) {
        e.stopPropagation();
        var $ns = $(this).closest('.nice-select');
        $('.nice-select').not($ns).removeClass('open');
        $ns.addClass('open');
    });

    // Filter options while typing
    $(document).on('input', '.nice-search-trigger', function () {
        var q = $(this).val().toLowerCase();
        $(this).closest('.nice-select').find('.option').each(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(q) > -1);
        });
    });

    // On option select: put text in input
    $(document).on('click', '.nice-has-search .option', function () {
        $(this).closest('.nice-select').find('.nice-search-trigger').val($(this).text().trim());
    });

    // Outside click: close + reset options visibility
    $(document).on('click', function () {
        $('.nice-has-search .option').show();
    });

    // Update current display when option with image is selected
    $('.nice-img-select').on('change', function () {
        var $opt = $(this).find('option:selected');
        var img = $opt.data('img');
        var $current = $(this).next('.nice-select').find('.current');
        if (img) {
            $current.html('<img src="' + img + '" alt="" >' + $opt.text().trim());
        } else {
            $current.text($opt.text().trim());
        }
    });
});