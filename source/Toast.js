/**
 * Created by doug on 10/12/15.
 */
enyo.kind({
    name: 'animated.Toast',
    kind: 'Control',
    showing: true,   // true for proper initialization
    classes: 'toast',
    events: {
        onAnimateFinish: ''
    },
    handlers: {
        ontransitionend: 'transitionComplete'
    },

    create: function () {
        if(/top/i.test(this.locationV)) {
            //this.log(this.name, "top");
            this.applyStyle('bottom', 'auto');
            this.translateY = '-100%';
            this.boxShadowY = '6px';
            if (! /left/i.test(this.locationH)) {
                this.applyStyle('border-bottom-left-radius', '8px');
            }
            if (! /right/i.test(this.locationH)) {
                this.applyStyle('border-bottom-right-radius', '8px');
            }
        } else if (/bottom/i.test(this.locationV)) {
            //this.log(this.name, "bottom");
            this.applyStyle('top', 'auto');
            this.translateY = '100%';
            this.boxShadowY = '-4px';
            if (! /left/i.test(this.locationH)) {
                this.applyStyle('border-top-left-radius', '8px');
            }
            if (! /right/i.test(this.locationH)) {
                this.applyStyle('border-top-right-radius', '8px');
            }
        } else {
            //this.log(this.name, "middle");
            this.translateY = '0';
            this.boxShadowY = '6px';
            if (! /left/i.test(this.locationH)) {
                this.applyStyle('border-top-left-radius', '8px');
                this.applyStyle('border-bottom-left-radius', '8px');
            }
            if (! /right/i.test(this.locationH)) {
                this.applyStyle('border-top-right-radius', '8px');
                this.applyStyle('border-bottom-right-radius', '8px');
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
            this.translateX = '0';
            this.boxShadowX = '6px';
        }

        var div = document.createElement('div');
        if ('transition' in div.style) {
            //this.log("transition supported");
            this.transitionTimingFunction = 'transition-timing-function';
            this.transform = 'transform';
        } else {
            //this.log("transition not supported");
            this.transitionTimingFunction = '-webkit-transition-timing-function';
            this.transform = '-webkit-transform';
        }

        this.inherited(arguments);
        this.set('showing', false);   // false to initially hide
    },

    showingChanged: function (inOldValue, inNewValue) {
        //this.log(arguments);
        if (inNewValue) {
            this.applyStyle(this.transitionTimingFunction, null);
            this.applyStyle(this.transform, 'translate(0,0)');
            this.applyStyle('box-shadow', this.boxShadowX + ' ' + this.boxShadowY + ' 10px rgba(0, 0, 0, 0.2)');
        } else {
            this.applyStyle(this.transitionTimingFunction, 'ease-in');
            this.applyStyle(this.transform, 'translate('+this.translateX+' ,'+this.translateY+')');
        }
    },

    transitionComplete: function (inSender, inEvent) {
        //this.log(inEvent.propertyName, inEvent.elapsedTime, this.get('showing'));
        if (! this.get('showing')) {
            this.applyStyle('box-shadow', 'none');
        }
        this.doAnimateFinish();
    }
});
