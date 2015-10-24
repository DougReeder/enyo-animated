/**
 * Created by doug on 10/20/15.
 */
enyo.kind({
    name: 'ToastBottomLeftCurve',
    kind: 'Control',
    showing: true,   // true for proper initialization
    classes: 'toastBottomLeftCurve',
    components: [
        {name: 'inner', kind: 'Control', showing: true}
    ],
    handlers: {
        ontransitionend: 'transitionComplete'
    },

    create: function () {
        this.inherited(arguments);

        this.applyStyle('transform', 'translateX(-100%)');
        this.$.inner.applyStyle('transform', 'translateY(100%)');
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
            this.$.inner.applyStyle('box-shadow', '6px -4px 10px rgba(0, 0, 0, 0.2)');
        } else {
            this.applyStyle('transition-timing-function', 'cubic-bezier(.33,.01,.14,.46)');
            this.applyStyle('transform', 'translateX(-100%)');
            this.$.inner.applyStyle('transition-timing-function', 'cubic-bezier(.45,0,.83,.57)');
            this.$.inner.applyStyle('transform', 'translateY(100%)');
        }
    },

    transitionComplete: function (inSender, inEvent) {
        //this.log(inEvent.propertyName, inEvent.elapsedTime, this.get('showing'));
        if (! this.get('showing')) {
            this.$.inner.applyStyle('box-shadow', 'none');
        }
    }
});