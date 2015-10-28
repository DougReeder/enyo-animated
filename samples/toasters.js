/**
 * Created by doug on 10/20/15.
 */
enyo.kind({
    name: "animated.sample.Toasters",
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
                {kind: "animated.ToastBottomSlide", style: 'width: 12em', components: [
                    {content: "I'm a ToastBottomSlide!"}
                ]},
                {kind: "animated.ToastBottomLeftCurve", style: 'width: 13em', components: [
                    {name: 'question', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?", style: 'margin-bottom: 10px'},
                    {name: 'toasterYesBtn', kind: 'onyx.Button', content: $L('Yes'), ontap: 'toggleToastBottomLeftCurve'},
                    {kind: 'onyx.Button', content: $L('No'), ontap: 'toggleToastBottomLeftCurve', style: 'float: right;'}
                ]},
                {kind: "onyx.Toolbar", components: [
                    {kind: "onyx.Button", content: "ToastBottomSlide", ontap: "toggleToastBottomSlide"},
                    {kind: "onyx.Button", content: "ToastBottomLeftCurve", ontap: "toggleToastBottomLeftCurve"}
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
    toggleToastBottomSlide: function(inSender, inEvent) {
        this.$.toastBottomSlide.set('showing', ! this.$.toastBottomSlide.get('showing'));
    },
    toggleToastBottomLeftCurve: function(inSender, inEvent) {
        this.$.toastBottomLeftCurve.set('showing', ! this.$.toastBottomLeftCurve.get('showing'));
    }
});
