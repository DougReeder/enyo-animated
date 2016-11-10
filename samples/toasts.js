/**
 * Created by doug on 10/20/15.
 */
var
    kind = require('enyo/kind'),
    FittableRows = require('layout/FittableRows'),
    InputStretch = require('enyo-animated/InputStretch'),
    Toast = require('enyo-animated/Toast'),
    ToastCurve = require('enyo-animated/ToastCurve'),
    Button = require('onyx/Button'),
    Toolbar = require('onyx/Toolbar'),
    Scroller = require('enyo/Scroller'),
    $L = require('enyo/i18n').$L;

module.exports = kind({
    name: "Toasts",
    kind: FittableRows,
    fit: true,
    components: [
        {
            name: 'mainPane',
            kind: FittableRows,
            fit: true,
            // required to keep toasts under secondaryPane
            style: 'transform-style: preserve-3d',
            components:[
                {name: 'toastBottom', kind: Toast, locationV: 'bottom', style: 'width: 12em', components: [
                    {content: "I'm a Toast at the bottom"}
                ]},
                {name: 'toastTopRight', kind: Toast, locationV: 'top', locationH: 'right', style: 'width: 10em', components: [
                    {content: "I'm a Toast at the top right."}
                ]},
                {name: 'toastCurveBottomLeft', kind: ToastCurve, locationV: 'bottom', locationH: 'left', style: 'width: 12em', components: [
                    {name: 'question', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?", style: 'margin-bottom: 10px'},
                    {name: 'toasterYesBtn', kind: Button, content: $L('Yes'), ontap: 'toggleToastCurve'},
                    {kind: Button, content: $L('No'), ontap: 'toggleToastCurve', style: 'float: right;'}
                ]},
                {name: 'toastCurveRight', kind: ToastCurve, locationV: 'middle', locationH: 'right', style: 'width: 13em; height: 8em', components: [
                    {content: "Donec nec nisl felis. Donec aliquet semper est, semper sagittis leo.", style: 'margin-bottom: 10px'},
                    {name: 'toasterOkBtn', kind: Button, content: $L('Ok'), ontap: 'toggleToastCurve'},
                    {kind: Button, content: $L('Cancel'), ontap: 'toggleToastCurve', style: 'float: right;'}
                ]},
                {kind: Toolbar, components: [
                    {kind: InputStretch, placeholder: $L("Enter text"), accessibilityRole: 'search',
                            oninput: 'inputInputOrChange', onchange: 'inputInputOrChange', onkeydown: 'inputKeydown',
                            components: [
                        {kind: Button, content: "Toasts", ontap: "toggleStraightToasts"},
                        {kind: Button, content: "ToastCurve", ontap: "toggleToastCurve"}
                    ]}
                ]},
                {kind: Scroller, fit: true, style: 'background-color: white', components: [
                    {name: "main", classes: "nice-padding", allowHtml: true}
                ]}
            ]
        },
        {
            name: 'secondaryPane',
            style: 'height: 4em; transform: translateZ(2px); background-color: #eee; padding: 1em',
            components: [
                {kind: InputStretch, end: true,
                    oninput: 'inputInputOrChange', onchange: 'inputInputOrChange', onkeydown: 'inputKeydown',
                    components: [
                        {
                            content: "pane above the toasters",
                            style: 'width: 75%'
                        }
                    ]
                }
            ]
        }
    ],
    toggleStraightToasts: function(inSender, inEvent) {
        this.$.toastBottom.set('showing', ! this.$.toastBottom.get('showing'));
        this.$.toastTopRight.set('showing', ! this.$.toastTopRight.get('showing'));
    },
    toggleToastCurve: function(inSender, inEvent) {
        this.$.toastCurveBottomLeft.set('showing', ! this.$.toastCurveBottomLeft.get('showing'));
        this.$.toastCurveRight.set('showing', ! this.$.toastCurveRight.get('showing'));
    },

    inputInputOrChange: function (inSender, inEvent) {
        var value = inSender.get('value');
        this.log(inEvent.type, value);
        this.$.main.set('content', this.$.main.get('content') + inEvent.type + " " + value + "<br>");
        this.$.scroller.scrollToBottom();
    },
    inputKeydown: function (inSender, inEvent) {
        var code = inEvent.charCode || inEvent.keyCode;
        if (code === 13 || code === 38 || code === 40) {
            inEvent.dispatchTarget.node.blur();
        }
    }
});
