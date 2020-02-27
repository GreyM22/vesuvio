(function () {
    function getScrollBarWidth() {
        var outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

        document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth; // force scrollbars

        outer.style.overflow = 'scroll'; // add innerdiv

        var inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth; // remove divs

        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    }


    var button = $('.header__menu-button');
    var panel = $('.header__menu');
    var overlay = $('.header__overlay');

    function openMenu() {
        var scrollBarWidth = window.innerWidth > document.querySelector('body').offsetWidth ? getScrollBarWidth() : 0;
        $('body').css({
            overflow: 'hidden',
            paddingRight: "".concat(scrollBarWidth, "px")
        });
        button.css({
            marginRight: "".concat(scrollBarWidth, "px")
        });
        $(overlay).fadeIn(300);
    };

    function hideMenu() {
        $('body').css({
            overflow: '',
            paddingRight: ''
        });
        button.css({
            marginRight: ''
        });
        $(overlay).fadeOut(300);
    };

    button.on('click', function () {
        button.toggleClass('header__menu-button_cross');
        button.toggleClass('header__menu-button_burger', !button.hasClass('header__menu-button_cross'));
        panel.toggleClass('header__menu_opened');

        if (button.hasClass('header__menu-button_cross')) {
            openMenu();
        } else {
            hideMenu();
        }
    });

    overlay.on('click', function () {
        button.toggleClass('header__menu-button_cross');
        button.toggleClass('header__menu-button_burger', !button.hasClass('header__menu-button_cross'));
        panel.toggleClass('header__menu_opened');

        if (button.hasClass('header__menu-button_cross')) {
            openMenu();
        } else {
            hideMenu();
        }
    });

    if ($('.header_fixed').length) {
        var headerElement = document.querySelector('.header');
        var nav_offset_top = headerElement.classList.contains('header_offset') ? window.innerHeight : headerElement.offsetHeight + 30;
        var headerContainer = document.querySelector('.header__container');
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= nav_offset_top) {
                $('.header_fixed').addClass('header_is_fixed');
                headerContainer.style.top = "-".concat(headerContainer.offsetHeight, "px");
            } else {
                $('.header_fixed').removeClass('header_is_fixed');
                headerContainer.style.top = '';
            }
        });
    }
})();

