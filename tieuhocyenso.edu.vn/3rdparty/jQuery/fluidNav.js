/*
fluidNav
Description: Adjust items quantity on navigation fit to navigation width
Author: hungpham.ict@gmail.com
*/

(function ($) {
    $.fn.fluidNav = function (options) {
        var settings = $.extend({
                // These are the defaults.
                navPositiveSelector: '.fluid-nav-positive',
                navBackupSelector: '.fluid-nav-backup',
                navNegativeSelector: '.fluid-nav-negative'
            }, options );

        return this.each(function (i) {
            var nav = this;
            var pureItems = nav.querySelectorAll(settings.navPositiveSelector + " > li");
            var pureItemsWidth = [];
            for(var i = 0; i < pureItems.length; i++) {
                pureItemsWidth.push(pureItems[i].clientWidth);
            }
            var lastIndex = pureItems.length - 1;
            var navPositive = $(settings.navPositiveSelector);
            var navBackup = $(settings.navBackupSelector);
            var navNegative = $(settings.navNegativeSelector);

            function update() {
                var navPositiveChildrenWidth = 0;
                for(var i = 0; i <= lastIndex; i++) {
                    navPositiveChildrenWidth = navPositiveChildrenWidth + pureItemsWidth[i];
                }

                if (navPositive.width() < navPositiveChildrenWidth) {
                    navPositive.children().last().prependTo(navNegative);
                    lastIndex = lastIndex - 1;
                    update();
                } else if (navPositive.width() >= (navPositiveChildrenWidth + pureItemsWidth[lastIndex + 1])) {
                    navNegative.children().first().appendTo(navPositive);
                    if(lastIndex < pureItems.length - 1) {
                        lastIndex = lastIndex + 1;
                        update();
                    }
                }

                if ((lastIndex == pureItems.length - 1)) {
                    navBackup.css('display', 'none');
                } else {
                    navBackup.css('display', '');
                }
            }

            update();
            window.addEventListener("resize", update);
        });  
    };
})(jQuery);