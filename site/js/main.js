$(document).ready(function () {
    // Seamless ticker
    var $track = $("#tickerTrack");
    if ($track.length) {
        var singleSetWidth = $track[0].scrollWidth;
        $track.append($track.html());
        var speed = 200;
        var duration = singleSetWidth / speed;
        $track.css({
            "animation-duration": duration.toFixed(3) + "s",
            "animation-timing-function": "linear"
        });
        $track[0].style.setProperty("--ticker-width", "-" + singleSetWidth + "px");
    }

    function openNav($item) {
        clearTimeout($item.data("hideTimer"));
        $item.find(".mega-menu").addClass("open");
        $item.find(".nav-link-item").addClass("active");
    }

    function closeNav($item) {
        $item.data("hideTimer", setTimeout(function () {
            $item.find(".mega-menu").removeClass("open");
            $item.find(".nav-link-item").removeClass("active");
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