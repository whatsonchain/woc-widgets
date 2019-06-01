(function() {
    var WoC_search_iframe = {};
    WoC_search_iframe.serverUrl = 'https://widgets.whatsonchain.com';

    WoC_search_iframe.init = function(divElement, options) {
        options = options || {};

        var el;
        if (typeof divElement === 'string') {
            el = document.getElementById(divElement);
        } else {
            el = divElement;
        }
        if (options.debugging) {
            console.log('Using', el, 'for Whatsonchain search');
        }

        if (!document.body.contains(el)) {
            console.error('Could not find element given', el);
            return;
        }

        WoC_search_iframe.createIFrame(el, options);
    };

    WoC_search_iframe.createIFrame = function(el, options) {
        var query = "";
        for (var key in options) {
            query += key + '=' + options[key] + '&';
        }
        el.innerHTML = '<iframe src="' + WoC_search_iframe.serverUrl + '/search/iframe.html?' + query + '" style="border: none; height: 100%; width: 100%; "></iframe>';
    };

    window.WoC_search_iframe = WoC_search_iframe;
})(window);
