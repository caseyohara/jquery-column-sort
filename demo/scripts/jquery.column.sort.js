/*
 * jQuery Column Sort 0.1 Beta
 *
 * Copyright 2011, Taylor Smith
 * http://taylorsmith.net
 *
 * Dual licensed under the MIT and GPL Version 2 licenses
 * http://jquery.org/license
 *
 */

(function($) {

	// outerHTML by Brandon Aaron: http://github.com/brandonaaron/jquery-outerhtml

	var div;
	$.fn.outerHTML = function() {
		var elem = this[0], tmp;
		return !elem ? null : typeof ( tmp = elem.outerHTML ) === 'string' ? tmp : ( div = div || $('<div/>') ).html( this.eq(0).clone() ).html();
	};


	$.fn.columnsort = function(settings) {
		var config = {
			'children' : 'li',
			'columns'	 : 3
		};

		if (settings) $.extend(config, settings);

		var listToSort = [];

		$(this).children(config.children).each(function() {
			listToSort.push($(this).outerHTML());
		});

		var iteration = -1,
			perColumn = Math.ceil(listToSort.length / config.columns),
			roundDown = Math.floor(listToSort.length / config.columns),
			remainder = listToSort.length % config.columns,
			extrasFix = ((perColumn * remainder) + roundDown) - 1,
			fixedHTML = "",
			destination;

		for (var i = 0; i < listToSort.length; i++) {
			if (i % config.columns == 0) {
				iteration++;
				destination = iteration;
			}

			fixedHTML = fixedHTML + '\n' + listToSort[destination];

			destination = destination + perColumn;

			if (remainder != 0) {
				if (destination > extrasFix) {
					destination = destination - 1;
				}
			}
		};

		$(this).html(fixedHTML);

		return this;
	};

})(jQuery);
