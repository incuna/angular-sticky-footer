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

                    // Quite often you will occur a few wrapping `<div>`s in the
                    // top level of your DOM, so we need to set the height
                    // to be 100% on each of those. This will also set it on
                    // the `<html>` and `<body>`.
                    stickyFooterWrapper.parents().css('height', '100%');
                    stickyFooterWrapper.css({
                        'min-height': '100%',
                        'height': 'auto'
                    });

                    // Append a pushing div to the stickyFooterWrapper.
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
