/** Copyright © 2016 Hominid Software */

var
    kind = require('enyo/kind'),
    Control = require('enyo/Control'),
    Input = require('enyo/Input');

module.exports = kind({
    name: 'InputSearchStretch',
    kind: Control,
    published: {
        type: '',
        placeholder: '',
        disabled: '',
        selectOnFocus: '',
        defaultFocus: '',
        accessibilityRole: '',
        value: ''
    },
    bindings: [
        {from: 'type', to: '$.input.type'},
        {from: 'placeholder', to: '$.input.placeholder'},
        {from: 'disabled', to: '$.input.disabled'},
        {from: 'selectOnFocus', to: '$.input.selectOnFocus'},
        {from: 'defaultFocus', to: '$.input.defaultFocus'},
        {from: 'accessibilityRole', to: '$.input.accessibilityRole'},
        {from: 'value', to: '$.input.value', oneWay: false}
    ],
    events: {
        onAnimateFinish: ''
    },
    classes: 'inputSearchStretch',
    handlers: {
        ontransitionend: 'transitionComplete'
    },
    components: [
        { name: 'label', tag: 'label',
            style: 'position:absolute; box-sizing:border-box; left:0; top:0; height:100%; display:flex; flex-direction:row;',
            components: [
            { name: 'spacer'},
            { name: 'input', kind: Input, onfocus: 'stretch', onblur: 'relax' },
            { name: 'searchIcon', style: '' }
        ]}
    ],

    rendered: function () {
        this.inherited(arguments);
        if (this.get('end')) {
            this.applyStyle('justify-content', 'flex-start');
            this.$.label.applyStyle('left', null);
            this.$.label.applyStyle('right', '0');
        }
        this.adjustMinWidth();
    },
    handleResize: function () {
        this.adjustMinWidth();
    },
    adjustMinWidth: function () {
        var remainingWidthPx = parseFloat(this.getComputedStyleValue('width', '320px'));
        for (var c=1; c<this.children.length; ++c) {
            remainingWidthPx -= parseFloat(this.children[c].getComputedStyleValue('width'))
        }
        remainingWidthPx = Math.max(remainingWidthPx - 10, 48);
        this.$.label.applyStyle('min-width', remainingWidthPx + "px");

        if (this.targetWidth > 0) {
            this.$.label.applyStyle('max-width', Math.max(this.targetWidth, remainingWidthPx) + "px");
        }
    },

    stretch: function (inSender, inEvent) {
        this.$.label.addClass('stretch');
    },
    relax: function (inSender, inEvent) {
        this.$.label.removeClass('stretch');
    },

    transitionComplete: function (inSender, inEvent) {
        // this.log(inEvent.propertyName, inEvent.elapsedTime);
        this.doAnimateFinish();
    },

    focus: function () {
        this.$.input.focus();
    },

    blur: function () {
        this.$.input.blur();
    }
});
