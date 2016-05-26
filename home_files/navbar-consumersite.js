(function () { // Navbar and dropdowns
    "use strict";
    var MEDIUM_BREAKPOINT = 768;
    var LARGE_BREAKPOINT = 1280;
    var MAIN_NAVBAR_HEIGHT = 90;

    //Cross browser way to get scrollY.  IE needs the scrollTop.
    function getScrollY() {
        var scrollY = window.scrollY;
        if (scrollY == null)
            scrollY = window.document.documentElement.scrollTop;
        return scrollY;
    }

    //
    // Scroll
    //
    // On up-down scroll lock the feature-navbar to the top of the screen
    //
    function lockfeatureNavbar() {
        var scrollY = getScrollY();
        var featureNavbar = document.getElementsByClassName('feature-navbar')[0];
        if (featureNavbar != null) {
            if (featureNavbar.style.marginTop != "0px") {
                featureNavbar.style.marginTop = "0px";
            }
        }
        var featureNavbarLogo = document.getElementsByClassName('logo-img-feature')[0];
        var featureNavbarLogo2 = document.getElementsByClassName('logo-img-feature')[1];
        if (featureNavbarLogo != null) {
            featureNavbarLogo.style.display = 'block';
            featureNavbarLogo2.style.display = 'block';
        }
    };

    function unlockfeatureNavbar() {
        var featureNavbar = document.getElementsByClassName('feature-navbar')[0];
        if (featureNavbar != null) {
            //Show the logo that is in the feature-navbar
            var featureNavbarLogo = document.getElementsByClassName('logo-img-feature')[0];
            var featureNavbarLogo2 = document.getElementsByClassName('logo-img-feature')[1];
            var scrollY = getScrollY();
            if (featureNavbarLogo != null) {
                if (scrollY > 28) {
                    featureNavbarLogo.style.display = 'block';
                    featureNavbarLogo2.style.display = 'block';
                } else {
                    featureNavbarLogo.style.display = 'none';
                    featureNavbarLogo2.style.display = 'none';
                }
            }
            if (scrollY > 5) {
                var newMarginTop = MAIN_NAVBAR_HEIGHT - scrollY;
                if (newMarginTop <= 0) {
                    newMarginTop = 0;
                    if (featureNavbar.style.marginTop != "0px") {
                        featureNavbar.style.marginTop = "0px";
                    }
                } else {
                    featureNavbar.style.marginTop = newMarginTop + "px";
                }
            } else if (featureNavbar.style.marginTop != MAIN_NAVBAR_HEIGHT + "px") {
                featureNavbar.style.marginTop = MAIN_NAVBAR_HEIGHT + "px";
            }
        }
    }

    function onWindowScroll() {
        if (window.innerWidth < MEDIUM_BREAKPOINT) {
            lockfeatureNavbar();
        } else {
            unlockfeatureNavbar();
        }
    }

    window.addEventListener('scroll', onWindowScroll, false);


    //
    // Resize
    //
    // On resize lock the feature-navbar to the top if the screen is narrow
    //
    function onResize() {
        if (window.innerWidth < MEDIUM_BREAKPOINT) {
            lockfeatureNavbar();
        } else {
            unlockfeatureNavbar();
        }
    }

    // Event listeners
    window.addEventListener('resize', onResize, false);

})();
