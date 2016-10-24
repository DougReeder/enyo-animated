/**
 * Created by doug on 10/20/15.
 */
var
    kind = require('enyo/kind'),
    Control = require('enyo/Control');

module.exports = kind({
    name: 'ToastCurve',
    kind: Control,
    showing: true,   // true for proper initialization
    classes: 'toastCurve',
    events: {
        onAnimateFinish: ''
    },
    handlers: {
        ontransitionend: 'transitionComplete'
    },
    components: [
        {name: 'inner', kind: Control, showing: true}
    ],

    create: function () {
        this.inherited(arguments);

        if(/top/i.test(this.locationV)) {
            //this.log(this.name, "top");
            this.applyStyle('bottom', 'auto');
            this.translateY = '-100%';
            this.boxShadowY = '6px';
            if (! /left/i.test(this.locationH)) {
                this.$.inner.applyStyle('border-bottom-left-radius', '8px');
            }
            if (! /right/i.test(this.locationH)) {
                this.$.inner.applyStyle('border-bottom-right-radius', '8px');
            }
        } else if (/bottom/i.test(this.locationV)) {
            //this.log(this.name, "bottom");
            this.applyStyle('top', 'auto');
            this.translateY = '100%';
            this.boxShadowY = '-4px';
            if (! /left/i.test(this.locationH)) {
                this.$.inner.applyStyle('border-top-left-radius', '8px');
            }
            if (! /right/i.test(this.locationH)) {
                this.$.inner.applyStyle('border-top-right-radius', '8px');
            }
        } else {
            //this.log(this.name, "middle");
            this.translateY = '100%';
            this.boxShadowY = '6px';
            if (! /left/i.test(this.locationH)) {
                this.$.inner.applyStyle('border-top-left-radius', '8px');
                this.$.inner.applyStyle('border-bottom-left-radius', '8px');
            }
            if (! /right/i.test(this.locationH)) {
                this.$.inner.applyStyle('border-top-right-radius', '8px');
                this.$.inner.applyStyle('border-bottom-right-radius', '8px');
            }
        }
        if(/left/i.test(this.locationH)) {
            //this.log(this.name, "left");
            this.applyStyle('right', 'auto');
            this.translateX = '-100%';
            this.boxShadowX = '6px';
        } else if (/right/i.test(this.locationH)) {
            //this.log(this.name, "right");
            this.applyStyle('left', 'auto');
            this.translateX = '100%';
            this.boxShadowX = '-4px';
        } else {
            //this.log(this.name, "middle");
            this.translateX = '-100%';
            this.boxShadowX = '6px';
        }

        var div = document.createElement('div');
        if ('transition' in div.style) {
            //this.log("transition supported (curve)");
            this.transitionTimingFunction = 'transition-timing-function';
            this.transform = 'transform';
        } else {
            //this.log("transition not supported (curve)");
            this.transitionTimingFunction = '-webkit-transition-timing-function';
            this.transform = '-webkit-transform';
        }

        this.set('showing', false);   // false to initially hide
    },

    rendered: function() {
        this.inherited(arguments);

        var inner = this.hasNode().firstElementChild;
        var child;
        while ((child = inner.nextElementSibling)) {
            inner.appendChild(child);
        }
    },

    showingChanged: function (inOldValue, inNewValue) {
        //this.log(arguments);
        if (inNewValue) {
            this.applyStyle(this.transitionTimingFunction, null);
            this.applyStyle(this.transform, 'translateX(0)');
            this.$.inner.applyStyle(this.transitionTimingFunction, null);
            this.$.inner.applyStyle(this.transform, 'translateY(0)');
            this.$.inner.applyStyle('box-shadow', this.boxShadowX + ' ' + this.boxShadowY + ' 10px rgba(0, 0, 0, 0.2)');
        } else {
            this.applyStyle(this.transitionTimingFunction, 'cubic-bezier(.33,.01,.14,.46)');
            this.applyStyle(this.transform, 'translateX('+this.translateX+')');
            this.$.inner.applyStyle(this.transitionTimingFunction, 'cubic-bezier(.45,0,.83,.57)');
            this.$.inner.applyStyle(this.transform, 'translateY('+this.translateY+')');
        }
    },

    transitionComplete: function (inSender, inEvent) {
        //this.log(inEvent.propertyName, inEvent.elapsedTime, this.get('showing'));
        if (! this.get('showing')) {
            this.$.inner.applyStyle('box-shadow', 'none');
        }
        this.doAnimateFinish();
    }
});
