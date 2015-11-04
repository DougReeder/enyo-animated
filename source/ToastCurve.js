/**
 * Created by doug on 10/20/15.
 */
enyo.kind({
    name: 'animated.ToastCurve',
    kind: 'Control',
    showing: true,   // true for proper initialization
    classes: 'toastCurve',
    events: {
        onAnimateFinish: ''
    },
    handlers: {
        ontransitionend: 'transitionComplete'
    },
    components: [
        {name: 'inner', kind: 'Control', showing: true}
    ],

    create: function () {
        this.inherited(arguments);

        if(/top/i.test(this.locationV)) {
            this.log(this.name, "top");
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
            this.log(this.name, "bottom");
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
            this.log(this.name, "middle");
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
            this.log(this.name, "left");
            this.applyStyle('right', 'auto');
            this.translateX = '-100%';
            this.boxShadowX = '6px';
        } else if (/right/i.test(this.locationH)) {
            this.log(this.name, "right");
            this.applyStyle('left', 'auto');
            this.translateX = '100%';
            this.boxShadowX = '-4px';
        } else {
            this.log(this.name, "middle");
            this.translateX = '-100%';
            this.boxShadowX = '6px';
        }

        //this.applyStyle('transform', 'translateX(-100%)');
        //this.$.inner.applyStyle('transform', 'translateY(100%)');
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
            this.applyStyle('transition-timing-function', null);
            this.applyStyle('transform', 'translateX(0)');
            this.$.inner.applyStyle('transition-timing-function', null);
            this.$.inner.applyStyle('transform', 'translateY(0)');
            this.$.inner.applyStyle('box-shadow', this.boxShadowX + ' ' + this.boxShadowY + ' 10px rgba(0, 0, 0, 0.2)');
        } else {
            this.applyStyle('transition-timing-function', 'cubic-bezier(.33,.01,.14,.46)');
            this.applyStyle('transform', 'translateX('+this.translateX+')');
            this.$.inner.applyStyle('transition-timing-function', 'cubic-bezier(.45,0,.83,.57)');
            this.$.inner.applyStyle('transform', 'translateY('+this.translateY+')');
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
