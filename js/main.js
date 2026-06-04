new Swiper('.exp-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 12,
    breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 16 },
        992: { slidesPerView: 3, spaceBetween: 16 }
    }
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

    // ===== Compare Bar =====
    var MAX_COMPARE = 4;
    var compareList = [];

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
        } else {
            $bar.removeClass("active");
        }

        // Remove button handler
        $(".compare-slot-remove").on("click", function (e) {
            e.preventDefault();
            var id = $(this).data("id");
            compareList = compareList.filter(function (c) { return c.id !== id; });
            $('[data-compare-id="' + id + '"]').prop("checked", false);
            renderCompareBar();
        });
    }

    // Checkbox handler
    $(document).on("change", ".compare-container .form-check-input", function () {
        var $box = $(this).closest(".credit-box");
        var id = $box.index();
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
    });

    // Close bar
    $("#compareBarClose").on("click", function () {
        compareList = [];
        $(".compare-container .form-check-input").prop("checked", false);
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

    // Search
    $(".search-btn").on("click", function (e) {
        e.preventDefault();
        $(".searchBarOpen").addClass("active");
        $("body").addClass("overflow-hidden");
    });

    $(".searchBarOpen--closeBtn").on("click", function () {
        $(".searchBarOpen").removeClass("active");
        $("body").removeClass("overflow-hidden");
    });

    // Notifications
    const notificationsContainer = $(".notifications-container");
    const bell = $(".bell");
    const bellIcon = $(".bell .bell-icon")
    const closed = "./assets/icons/Component 290.svg";
    const opened = "./assets/icons/pink-bell.svg";


    bellIcon.on("click", () => {
        // Close tools menu if open
        if ($('.tools-container').hasClass('open')) {
            $('.tools-container').removeClass('open');
            $(".tools-btn .pen-icon").attr('src', closedTools);
        }
        notificationsContainer.toggleClass("open");
        const current = bellIcon.attr('src');
        bellIcon.attr('src', current === closed ? opened : closed);
    });

    // Tools
    const toolsContainer = $(".tools-container");
    const toolBtn = $(".tools-btn");
    const penIcon = $(".tools-btn .pen-icon")
    const closedTools = "./assets/icons/Component 292.svg";
    const openedTools = "./assets/icons/pink-pen.svg";

    penIcon.on("click", () => {
        // Close notifications menu if open
        if ($('.notifications-container').hasClass('open')) {
            $('.notifications-container').removeClass('open');
            $(".bell .bell-icon").attr('src', closed);
        }
        toolsContainer.toggleClass("open");
        const current = penIcon.attr('src');
        penIcon.attr('src', current === closedTools ? openedTools : closedTools);
    });
});