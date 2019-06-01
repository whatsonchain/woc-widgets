#WhatsOnChain.com search widget
> An embeddable widget to do searches on your website with the [WhatsOnChain.com API][https://developers.whatsonchain.com].

Authors: Siggi (@siggi, 1siggi, paymail: siggi@moneybutton.com)

# Intro

There are 2 ways to integrate the API into your website. You can either include a javascript file and render the search widget directly onto a DIV, or you can create an iFrame in a DIV.

## Adding to a div

Include the `div.js` script in your page and run the initialization function.

```
<html>
<head>
    ...
    <script src='https://widgets.whatsonchain.com/search/div.js'></script>
    <script>
        document.addEventListener('DOMContentLoaded', function(){
            var el = document.getElementById('whatsonchain-div');
            WoC_search.init(el);
        }, false);
    </script>
</head>
<body>
    ...
    <div id="whatsonchain-div"></div>
    ...
</body>
</html>
```

## Adding as an iFrame

Include the `iframe.js` script in your page and run the initialization function.

```
<html>
<head>
    ...
    <script src='https://widgets.whatsonchain.com/search/iframe.js'></script>
    <script>
        document.addEventListener('DOMContentLoaded', function(){
            var el = document.getElementById('whatsonchain-iframe');
            WoC_search_iframe.init(el);
        }, false);
    </script>
</head>
<body>
    ...
    <div id="whatsonchain-iframe"></div>
    ...
</body>
</html>
```

# Options

There are currently 2 options supported when initializing the search widget.

Option | Action
--------- | ----------
darkMode | Render the widgets in dark mode
debugging | Turn on debugging in the console

You can pass an option object to the initialization functions as the 2 parameter.
```
    var el = document.getElementById('whatsonchain-iframe');
    WoC_search_iframe.init(el, {
        darkMode: true,
        debugging: true
    });
```

# Testing

You can test the widget at the [online test page][https://widgets.whatsonchain.com/search/test.html].
