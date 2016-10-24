// This is the default "main" file, specified from the root package.json file

var
    ready = require('enyo/ready');

if ("jasmine" in window) {
    var
        ToastSpec = require('./test/ToastSpec'),
        ToastCurveSpec = require('./test/ToastCurveSpec');
} else {
    // var Toasts = require('./Toasts');
}

ready(function () {
    if ("jasmine" in window) {
        console.log("running Jasmine tests");
    } else {
        // new Toasts().renderInto(document.body);
    }
});


module.exports = {
    version: '1.1.0'
};
