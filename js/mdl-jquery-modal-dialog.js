function showLoading() {
    // remove existing loaders
    $('.loading-container').remove();
    $('<div id="orrsLoader" class="loading-container"><div><div class="mdl-spinner mdl-js-spinner is-active"></div></div></div>').appendTo("body");

    componentHandler.upgradeElements($('.mdl-spinner').get());
    setTimeout(function () {
        $('#orrsLoader').css({opacity: 1});
    }, 1);
}

function hideLoading() {
    $('#orrsLoader').css({opacity: 0});
    setTimeout(function () {
        $('#orrsLoader').remove();
    }, 400);
}

function showDialog(options) {
    options = $.extend({
        // user-input fields
        name: null,
        category: null,
        time: null,
        payment: null,
        budget: null,
        duration: null,
        appreciation: null,
        email: null,

        // toggle state
        neutral: false,
        negative: false,
        positive: false,
        cancelable: true,
        contentStyle: null,
        onLoaded: false,
        hideOther: true
    }, options);

    if (options.hideOther) {
        // remove existing dialogs
        $('.dialog-container').remove();
        $(document).unbind("keyup.dialog");
    }

    $('<div id="' + options.id + '" class="dialog-container"><div class="mdl-card mdl-shadow--16dp" id="' + options.id + '_content"></div></div>').appendTo("body");
    var dialog = $('#' + options.id);
    var content = dialog.find('.mdl-card');
    if (options.contentStyle != null) content.css(options.contentStyle);
    if (options.title != null) {
        $('<div class="mdl-card__title"><div class="mdl-card__title-text">' + options.title + '</div></div>').appendTo(content);
    }
    
    if (options.name != null) {
        $('<div class="mdl-card__supporting-text"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' +
             '<input class="mdl-textfield__input" type="text" id="name">' +
             '<label class="mdl-textfield__label" for="name">' + 
             options.name + 
             '</label></div></div>').appendTo(content);
    }
    if (options.category != null) {
        $('<div class="mdl-card__supporting-text"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' +
             '<input class="mdl-textfield__input" type="text" id="category">' +
             '<label class="mdl-textfield__label" for="category">' + 
             options.category + 
             '</label></div></div>').appendTo(content);
    }
    if (options.time != null) {
        $('<div class="mdl-card__supporting-text"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' +
             '<input class="mdl-textfield__input" type="text" id="time">' +
             '<label class="mdl-textfield__label" for="time">' + 
             options.time + 
             '</label></div></div>').appendTo(content);
    }
    if (options.payment != null) {
        $('<div class="mdl-card__supporting-text"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' +
             '<input class="mdl-textfield__input" type="text" id="payment">' +
             '<label class="mdl-textfield__label" for="payment">' + 
             options.payment + 
             '</label></div></div>').appendTo(content);
    }
    if (options.budget != null) {
        $('<div class="mdl-card__supporting-text"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' +
             '<input class="mdl-textfield__input" type="text" id="budget">' +
             '<label class="mdl-textfield__label" for="budget">' + 
             options.budget + 
             '</label></div></div>').appendTo(content);
    }
    if (options.duration != null) {
        $('<div class="mdl-card__supporting-text"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' +
             '<input class="mdl-textfield__input" type="text" id="duration">' +
             '<label class="mdl-textfield__label" for="duration">' + 
             options.duration + 
             '</label></div></div>').appendTo(content);
    }
    if (options.appreciation != null) {
        $('<div class="mdl-card__supporting-text"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' +
             '<input class="mdl-textfield__input" type="text" id="appreciation">' +
             '<label class="mdl-textfield__label" for="appreciation">' + 
             options.appreciation + 
             '</label></div></div>').appendTo(content);
    }

    if (options.email != null) {
        $('<div class="mdl-card__supporting-text">' + options.email + '</div>').appendTo(content);
    }

    if (options.neutral || options.negative || options.positive) {
        var buttonBar = $('<div class="mdl-card__actions dialog-button-bar"></div>');
        if (options.neutral) {
            options.neutral = $.extend({
                id: 'neutral',
                title: 'Neutral',
                onClick: null
            }, options.neutral);
            var neuButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="' + options.neutral.id + '">' + options.neutral.title + '</button>');
            neuButton.click(function (e) {
                e.preventDefault();
                if (options.neutral.onClick == null || !options.neutral.onClick(e))
                    hideDialog(dialog)
            });
            neuButton.appendTo(buttonBar);
        }
        if (options.negative) {
            options.negative = $.extend({
                id: 'negative',
                title: 'Cancel',
                onClick: null
            }, options.negative);
            var negButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="' + options.negative.id + '">' + options.negative.title + '</button>');
            negButton.click(function (e) {
                e.preventDefault();
                if (options.negative.onClick == null || !options.negative.onClick(e))
                    hideDialog(dialog)
            });
            negButton.appendTo(buttonBar);
        }
        if (options.positive) {
            options.positive = $.extend({
                id: 'positive',
                title: 'OK',
                onClick: null
            }, options.positive);
            var posButton = $('<button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="' + options.positive.id + '">' + options.positive.title + '</button>');
            posButton.click(function (e) {
                e.preventDefault();
                if (options.positive.onClick == null || !options.positive.onClick(e))
                    hideDialog(dialog)
            });
            posButton.appendTo(buttonBar);
        }
        buttonBar.appendTo(content);
    }
    componentHandler.upgradeDom();
    if (options.cancelable) {
        dialog.click(function () {
            hideDialog(dialog);
        });
        $(document).bind("keyup.dialog", function (e) {
            if (e.which == 27)
                hideDialog(dialog);
        });
        content.click(function (e) {
            e.stopPropagation();
        });
    }
    setTimeout(function () {
        dialog.css({opacity: 1});
        if (options.onLoaded)
            options.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({opacity: 0});
    setTimeout(function () {
        dialog.remove();
    }, 400);
}
