/**
 * Created by doug on 10/12/15.
 */
enyo.kind({
    name: 'animated.ToastBottomSlide',
    kind: 'Control',
    showing: true,   // true for proper initialization
    classes: 'toastBottomSlide',
    events: {
        onAnimateFinish: ''
    },
    handlers: {
        ontransitionend: 'transitionComplete'
    },

    create: function () {
        this.inherited(arguments);
        this.set('showing', false);   // false to initially hide
    },

    showingChanged: function (inOldValue, inNewValue) {
        //this.log(arguments);
        if (inNewValue) {
            this.applyStyle('transition-timing-function', null);
            this.applyStyle('transform', 'translateY(0)');
            this.applyStyle('box-shadow', '6px -4px 10px rgba(0, 0, 0, 0.2)');
        } else {
            this.applyStyle('transition-timing-function', 'ease-in');
            this.applyStyle('transform', 'translateY(100%)');
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
