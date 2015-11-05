/**
 * Created by doug on 10/20/15.
 */
enyo.kind({
    name: "animated.sample.Toasts",
    kind: "FittableRows",
    fit: true,
    components: [
        {
            name: 'mainPane',
            kind: "FittableRows",
            fit: true,
            // required to keep toasts under secondaryPane
            style: 'transform-style: preserve-3d',
            components:[
                {name: 'toastBottom', kind: "animated.Toast", locationV: 'bottom', style: 'width: 12em', components: [
                    {content: "I'm a Toast at the bottom"}
                ]},
                {name: 'toastTopRight', kind: "animated.Toast", locationV: 'top', locationH: 'right', style: 'width: 10em', components: [
                    {content: "I'm a Toast at the top right."}
                ]},
                {name: 'toastCurveBottomLeft', kind: "animated.ToastCurve", locationV: 'bottom', locationH: 'left', style: 'width: 12em', components: [
                    {name: 'question', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?", style: 'margin-bottom: 10px'},
                    {name: 'toasterYesBtn', kind: 'onyx.Button', content: $L('Yes'), ontap: 'toggleToastCurve'},
                    {kind: 'onyx.Button', content: $L('No'), ontap: 'toggleToastCurve', style: 'float: right;'}
                ]},
                {name: 'toastCurveRight', kind: "animated.ToastCurve", locationV: 'middle', locationH: 'right', style: 'width: 12em; height: 8em', components: [
                    {content: "Donec nec nisl felis. Donec aliquet semper est, semper sagittis leo.", style: 'margin-bottom: 10px'},
                    {name: 'toasterOkBtn', kind: 'onyx.Button', content: $L('Ok'), ontap: 'toggleToastCurve'},
                    {kind: 'onyx.Button', content: $L('Cancel'), ontap: 'toggleToastCurve', style: 'float: right;'}
                ]},
                {kind: "onyx.Toolbar", components: [
                    {kind: "onyx.Button", content: "Toasts", ontap: "toggleStraightToasts"},
                    {kind: "onyx.Button", content: "ToastCurve", ontap: "toggleToastCurve"}
                ]},
                {kind: "enyo.Scroller", fit: true, components: [
                    {name: "main", classes: "nice-padding", allowHtml: true}
                ]},
            ]
        },
        {
            name: 'secondaryPane',
            content: "I'm a pane above the toasters, which complicates the logical model.",
            style: 'height: 4em; transform: translateZ(2px); background-color: #eee; padding: 1em'
        }
    ],
    toggleStraightToasts: function(inSender, inEvent) {
        this.$.toastBottom.set('showing', ! this.$.toastBottom.get('showing'));
        this.$.toastTopRight.set('showing', ! this.$.toastTopRight.get('showing'));
    },
    toggleToastCurve: function(inSender, inEvent) {
        this.$.toastCurveBottomLeft.set('showing', ! this.$.toastCurveBottomLeft.get('showing'));
        this.$.toastCurveRight.set('showing', ! this.$.toastCurveRight.get('showing'));
    }
});
