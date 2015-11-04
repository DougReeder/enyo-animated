/* unit & functional tests for animated.ToastCurve
 * Copyright © 2015 Hominid Software */
/*jsl:import ../source/ToastCurve.js */

var ToastCurveTestJig = enyo.kind({
    name: "ToastCurveTestJig",
    animateFinishResponse: null,
    components: [
        {
            kind: "animated.ToastCurve",
            locationV: 'bottom',
            locationH: 'right',
            onAnimateFinish: "animateFinish",
            components: [
                {content: "I'm a ToastCurve!"}
            ]
        }
    ],
    animateFinish: function (inSender, inResponse) {
        this.log(inResponse);
        this.animateFinishResponse = inResponse;
    }
});


describe('ToastCurve', function () {
    var div, testJig;

    beforeEach( function () {
        div = document.createElement("div");
        document.body.appendChild(div);
        testJig = new ToastCurveTestJig();
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
        testJig.$.toastCurve.show();
    });
});
