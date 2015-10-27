/* unit & functional tests for animated.ToastBottomLeftCurve
 * Copyright © 2015 Hominid Software */
/*jsl:import ../source/ToastBottomLeftCurve.js */

var ToastBottomLeftCurveTestJig = enyo.kind({
    name: "ToastBottomLeftCurveTestJig",
    animateFinishResponse: null,
    components: [
        {
            kind: "animated.ToastBottomLeftCurve",
            onAnimateFinish: "animateFinish",
            components: [
                {content: "I'm a ToastBottomLeftCurve!"}
            ]
        }
    ],
    animateFinish: function (inSender, inResponse) {
        this.log(inResponse);
        this.animateFinishResponse = inResponse;
    }
});


describe('ToastBottomLeftCurve', function () {
    var div, testJig;

    beforeEach( function () {
        div = document.createElement("div");
        document.body.appendChild(div);
        testJig = new ToastBottomLeftCurveTestJig();
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
        testJig.$.toastBottomLeftCurve.show();
    });
});
