/**
 * Created by doug on 11/1/16.
 */

var
    kind = require('enyo/kind'),
    Control = require('enyo/Control'),
    Input = require('enyo/Input');

module.exports = kind({
    name: 'InputStretch',
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
    classes: 'inputStretch',
    handlers: {
        ontransitionend: 'transitionComplete'
    },
    components: [
        {
            name: 'input', kind: Input,
            style: 'position:absolute; box-sizing:border-box; left:0; top:0; height:100%; font-size:16px;'
        }
    ],

    rendered: function () {
        this.log();
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
        this.$.input.applyStyle('min-width', remainingWidthPx + "px");
    },

    transitionComplete: function (inSender, inEvent) {
        this.log(inEvent.propertyName, inEvent.elapsedTime);
        this.doAnimateFinish();
    }
});
