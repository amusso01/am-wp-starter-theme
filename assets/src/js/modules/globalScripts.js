/* ***** ----------------------------------------------- ***** **
** ***** Global Scripts JS
** ***** ----------------------------------------------- ***** */

/* global Main, Modernizr */
(function($){
	'use strict';

	Main.modules.globalScripts = function() {

		var $body = $('.js-body'),
			upgradeMessage = '<div class="c-upgrade_browser_message"><a href="http://outdatedbrowser.com/" class="c-upgrade_browser_message-link" target="_blank">For a better browsing experience, please upgrade your browser to the latest version. Click here to upgrade.</a></div>',
			utilities = Main.modules.utilities(),
			isDevice = utilities.isDevice(),

			modernizrCheck = function() {

				// Display message for user to upgrade if browser does not support flexbox
				if (Modernizr['flexbox'] == false
					|| Modernizr['svg'] == false) {
					$body.append(upgradeMessage);
				}

			},

			addNotDeviceClassToBody = function() {

				if (!isDevice) {
					$body.addClass('l-not_device');
				}

			};

		return {
			init: function() {
				modernizrCheck();
				addNotDeviceClassToBody();
			}
		}
		
	};

})(jQuery);