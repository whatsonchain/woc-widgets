(function() {
    var WoC_search = {};
    var logo = 'https://whatsonchain.com/img/logo/WOC-GY-10.png';
    var poweredByImg = 'https://whatsonchain.com/img/logo/PW-WOC-1.png';

    WoC_search.init = function(divElement, options) {
        options = options || {};

        WoC_search.options = Object.assign({
            debugging: false,
            addressIcon: 'https://whatsonchain.com/img/logo/bsv.png',
            blockIcon: '<svg style="margin-top: 6px;" aria-hidden="true" data-prefix="fas" data-icon="cubes" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"></path></svg>',
            transactionIcon: '<svg style="margin-top: 6px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exchange" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-exchange fa-w-16"><path fill="currentColor" d="M0 168v-16c0-13.255 10.745-24 24-24h381.97l-30.467-27.728c-9.815-9.289-10.03-24.846-.474-34.402l10.84-10.84c9.373-9.373 24.568-9.373 33.941 0l82.817 82.343c12.497 12.497 12.497 32.758 0 45.255l-82.817 82.343c-9.373 9.373-24.569 9.373-33.941 0l-10.84-10.84c-9.556-9.556-9.341-25.114.474-34.402L405.97 192H24c-13.255 0-24-10.745-24-24zm488 152H106.03l30.467-27.728c9.815-9.289 10.03-24.846.474-34.402l-10.84-10.84c-9.373-9.373-24.568-9.373-33.941 0L9.373 329.373c-12.497 12.497-12.497 32.758 0 45.255l82.817 82.343c9.373 9.373 24.569 9.373 33.941 0l10.84-10.84c9.556-9.556 9.341-25.113-.474-34.402L106.03 384H488c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z" class=""></path></svg>',
        }, options);

        var el;
        if (typeof divElement === 'string') {
            el = document.getElementById(divElement);
        } else {
            el = divElement;
        }
        if (WoC_search.options.debugging) {
            console.log('Using', el, 'for Whatsonchain search');
        }

        if (!document.body.contains(el)) {
            console.error('Could not find element given', el);
            return;
        }

        WoC_search.injectCss();
        WoC_search.createSearchFields(el);
    };

    WoC_search.injectCss = function() {
        var node = document.createElement('style');
        node.innerHTML = '#WoCsearch { position: relative; width: 100%; height: 100%; font-family: Ubuntu, sans-serif; }';

        node.innerHTML += '#WoCsearch .WoCsearch_input_container { position: absolute; width: 100%; }';

        node.innerHTML += '#WoCsearch #WoCsearch_input { box-sizing:border-box; width: 100%; border: 0; font-size: 16px; background-color: #282828; line-height: 24px; color: #fff; padding: 4px 8px; }';

        node.innerHTML += '#WoCsearch #WoCsearch_input::placeholder { color: rgba(255, 255, 255, 0.5); }';

        node.innerHTML += '#WoCsearch #WoCsearch_input:focus { outline-width: 0; }';

        node.innerHTML += '#WoCsearch #WoCsearch_logo { position: absolute; top:0 ; right: 0; height: 32px; background-color: #282828; cursor: pointer; padding: 0 4px; }';

        node.innerHTML += '#WoCsearch .WoCsearch_results_poweredby { position: absolute; color: #fff; font-size: 10px; background-color: #282828; width: 100%; margin-top: 33px; line-height: 22px; overflow: hidden; }';

        node.innerHTML += '#WoCsearch .WoCsearch_results_poweredby > a { color: #fff; padding: 0 6px; }';

        node.innerHTML += '#WoCsearch .WoCsearch_results_poweredby a > img { height: 20px; margin-bottom: -6px; margin-right: 5px; }';

        node.innerHTML += '#WoCsearch #WoCsearch_results { width: 100%; height: -webkit-fill-available; padding-top: 58px; }';

        node.innerHTML += '#WoCsearch #WoCsearch_results .WoCsearch_results_container { width: 100%; height: -webkit-fill-available; overflow: scroll;  }';

        node.innerHTML += '#WoCsearch #WoCsearch_results .WoCsearch_results_noresults {  font-style: italic; color: #343a40; margin-top: 12px; padding-left: 6px; }';

        node.innerHTML += '#WoCsearch #WoCsearch_results .WoCsearch_results_line { position: relative; margin-left: 26px; line-height: 26px; }';

        node.innerHTML += '#WoCsearch #WoCsearch_results .WoCsearch_results_error { color: #c00; padding: 6px; }';

        node.innerHTML += '#WoCsearch .WoCsearch_results_line > img.WoCsearch_results_icon { position: absolute; top: 3px; left: -23px;	height: 20px; }';

        node.innerHTML += '#WoCsearch .WoCsearch_results_line > svg { color: #fff; position: absolute; 	top: -2px; left: -21px; height: 18px; }';

        node.innerHTML += '#WoCsearch .WoCsearch_results_line > a { font-size: 16px; }';

        // ' + (WoC_search.options.darkMode ? 'background-color: #1E2224; ' : '') + '

        if (WoC_search.options.darkMode) {
            node.innerHTML += '#WoCsearch { background-color: #333; }';
            node.innerHTML += '#WoCsearch .WoCsearch_results_line > a { color: #fff; }';
            node.innerHTML += '#WoCsearch #WoCsearch_results .WoCsearch_results_noresults { color: #999; }';
        } else {
            node.innerHTML += '#WoCsearch { background-color: #F3F7F9; }';
            node.innerHTML += '#WoCsearch .WoCsearch_results_line > a { color: #333; }';
            node.innerHTML += '#WoCsearch .WoCsearch_results_line > svg { color: #999; }';
        }
        document.body.appendChild(node);
    };

    WoC_search.createSearchFields = function(el) {
        // write search fields
        el.innerHTML = '<div id="WoCsearch">' +
            '<div class="WoCsearch_input_container">' +
            '<input type="text" id="WoCsearch_input" placeholder="Search the bsv blockchain ..."/>' +
            '<img src="' + logo + '" id="WoCsearch_logo">' +
            '</div>' +
            '<div class="WoCsearch_results_poweredby">' +
            '<a href="https://whatsonchain.com/" target="_blank">' +
            '<img src="' + poweredByImg + '"><span>WhatsOnChain.com</span>' +
            '</a>' +
            '</div>' +
            '<div id="WoCsearch_results">' +
            '</div>' +
            '</div>';

        var searchLogo = document.getElementById('WoCsearch_logo');
        searchLogo.addEventListener('click', function(e) {
            WoC_search.search(inputField.value);
        });

        var inputField = document.getElementById('WoCsearch_input');
        inputField.addEventListener('keyup', function(e) {
            if (e.keyCode === 13) {
                WoC_search.search(inputField.value);
            }
        });
    };

    WoC_search.search = function(searchTerm) {
        const url = 'https://api.whatsonchain.com/v1/bsv/main/search/links';

        if (WoC_search.options.debugging) {
            console.log('doing search', searchTerm, url);
        }

        try {
            var Http = new XMLHttpRequest();
            Http.open("POST", url);
            Http.setRequestHeader("Content-Type", "application/json");
            Http.send(JSON.stringify({
                "query": searchTerm
            }));
            Http.onreadystatechange = function(e) {
                if (WoC_search.options.debugging) {
                    console.log(e);
                }
                if (WoC_search.options.debugging) {
                    console.log('responseText', this);
                }
                if (this.readyState === 4 && this.status === 200) {
                    var result = JSON.parse(this.responseText);
                    if (result && result.results) {
                        WoC_search.renderResults(result.results);
                    } else {
                        WoC_search.renderResults([]);
                    }
                }
            }
            Http.onerror = function(e) {
                console.error('ERROR', this);
                WoC_search.renderError("An error occurred. Could not complete the request.");
            }
        } catch (e) {
            console.error('ERROR', e);
        }
    };

    WoC_search.renderError = function(message) {
        var resultsEl = document.getElementById('WoCsearch_results');
        resultsEl.innerHTML = '<div class="WoCsearch_results_error">' + message + '</div>';
    };

    WoC_search.renderResults = function(results) {
        if (WoC_search.options.debugging) {
            console.log('Results', results);
        }

        var resultsEl = document.getElementById('WoCsearch_results');
        if (!document.body.contains(resultsEl)) {
            console.error('Could not find element given', resultsEl);
            return;
        }

        var renderedResult = '<div class="WoCsearch_results_container">';

        if (results.length > 0) {
            results.forEach(function(result) {
                renderedResult += WoC_search.renderLine(result);
            });
        } else {
            renderedResult += '<div class="WoCsearch_results_noresults">Nothing found. Adjust your search and try again.</div>';
        }

        renderedResult += '</div>';
        resultsEl.innerHTML = renderedResult;
    };

    WoC_search.renderLine = function(result) {
        var line = '<div class="WoCsearch_results_line">';

        var icon = WoC_search.options.addressIcon;
        if (result.type === 'tx') {
            icon = WoC_search.options.transactionIcon;
        } else if (result.type === 'block') {
            icon = WoC_search.options.blockIcon;
        }

        if (icon.indexOf('svg') === 1) {
            line += icon;
        } else {
            line += '<img src="' + icon + '" class="WoCsearch_results_icon">';
        }
        line += '<a href="' + result.url + '" target="_blank">' + result.url + '</a>';
        line += '</div>';

        return line;
    };

    window.WoC_search = WoC_search;
})(window);
