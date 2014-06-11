(function (angular) {
    'use strict';

    var module = angular.module('sticky-footer', []);

    module.directive('stickyFooter', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, iElement, iAttrs) {
                    var stickyFooterWrapper = $(iAttrs.stickyFooter);

                    stickyFooterWrapper.parents().css('height', '100%');
                    stickyFooterWrapper.css({
                        'min-height': '100%',
                        'height': 'auto'
                    });

                    // Append a push div to the wrapper above the stickyFooterWrapper
                    var stickyFooterPush = $('<div class="push"></div>');
                    stickyFooterWrapper.append(stickyFooterPush);

                    var setHeights = function () {
                        var height = iElement.outerHeight();
                        stickyFooterPush.height(height);
                        stickyFooterWrapper.css('margin-bottom', -(height));
                    };

                    $timeout(setHeights, 0);
                    $(window).on('resize', setHeights);
                }
            };
        }
    ]);
}(window.angular));
