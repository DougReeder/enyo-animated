/* unit & functional tests for animated.Toast
 * Copyright © 2015-2016 Hominid Software */
/*jsl:import ../source/Toast.js */

var kind = require('enyo/kind'),
    Toast = require('../src/Toast');

var ToastTestJig = kind({
    name: "ToastTestJig",
    animateFinishResponse: null,
    components: [
        {
            name: 'toast',
            kind: Toast,
            locationV: 'bottom',
            onAnimateFinish: "animateFinish",
            components: [
                {content: "I'm a Toast!"}
            ]
        }
    ],
    animateFinish: function (inSender, inResponse) {
        this.log(inResponse);
        this.animateFinishResponse = inResponse;
    }
});


describe('Toast', function () {
    var div, testJig;

    beforeEach( function () {
        div = document.createElement("div");
        document.body.appendChild(div);
        testJig = new ToastTestJig();
        testJig.renderInto(div);
    });

    afterEach(function () {
        testJig.destroy();
        document.body.removeChild(div);
    });

    it("should send onAnimateFinish in .1 to .5 sec", function (done) {
        var start = Date.now();
        testJig.animateFinish = function (inSender, inResponse) {
            var end = Date.now();
            expect(end - start).toBeGreaterThan(100);
            expect(end - start).toBeLessThan(500);
            done();
        };
        testJig.$.toast.show();
    });
});
