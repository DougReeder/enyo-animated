/* unit & functional tests for animated.ToastBottomSlide
 * Copyright © 2015 Hominid Software */
/*jsl:import ../source/ToastBottomSlide.js */

var ToastBottomSlideTestJig = enyo.kind({
    name: "ToastBottomSlideTestJig",
    animateFinishResponse: null,
    components: [
        {
            kind: "animated.ToastBottomSlide",
            onAnimateFinish: "animateFinish",
            components: [
                {content: "I'm a ToastBottomSlide!"}
            ]
        }
    ],
    animateFinish: function (inSender, inResponse) {
        this.log(inResponse);
        this.animateFinishResponse = inResponse;
    }
});


describe('ToastBottomSlide', function () {
    var div, testJig;

    beforeEach( function () {
        div = document.createElement("div");
        document.body.appendChild(div);
        testJig = new ToastBottomSlideTestJig();
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
        testJig.$.toastBottomSlide.show();
    });
});
