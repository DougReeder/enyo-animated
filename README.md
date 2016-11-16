# Enyo-Animated: animated Controls for the Enyo framework

These Controls are designed to
* help the user mentally model the application UI
* not make the user wait
* animate at 60 fps on modern mobile & desktop devices
* be easy for developers to incorporate in apps
* work with Onyx, Mochi or Moonstone widgets (the default styling is usually Onyx).

They are not designed to be showy.  Fallbacks for older browsers have not yet been added.

They are designed around the properties that GPUs can readily animate:
* position: transform: translate(x,y)
* scale: transform: scale(n)
* rotation: transform: rotate(n)
* opacity: opacity: 0..1


## References

[Animation for Attention and Comprehension](http://www.nngroup.com/articles/animation-usability/)

[Motion & Meaning podcast, episode 3](http://motionandmeaning.io/episode03.html)

[High Performance Animations](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)

[Cubic-Bezier design tool](http://cubic-bezier.com/)

[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)


## Using

1. In your app's `.enyoconfig`, 
	- to the `libraries` array add `"enyo-animated"`
	- to the `sources` object add `"enyo-animated": "https://github.com/DougReeder/enyo-animated.git"`
	- to the `targets` object add `"enyo-animated": "master"`
2. Run `enyo init` to copy enyo-animated to your `lib` directory
3. At the beginning of a source file, add `var ToastCurve = require('enyo-animated/ToastCurve');` 
(or whatever Control you need)
4. Add the control, with something like `{name: 'toastCurveBottom', kind: ToastCurve, locationV: 'bottom', locationH: 'middle', style: 'width: 12em', components: [...`

## Toast

A toast, which moves like a CD tray in a straight line.
Set the `locationV` property to `top`, `middle` or `bottom`.
Set the `locationH` property to `left`, `middle` or `right`.
It is not modal.
Show and hide it with the usual `.show()`, `.hide()` and `.set('showing', boolean)`.

Corner toasts are sized to contain their content, unless you style their height or width.

Top and bottom edge toasts are as wide as their parent, by default.
If you set a width, they are centered.

Left and right edge toasts are as tall as their parent, by default.  
If you set a height, they are centered.

Child buttons and inputs should set `attributes: {tabindex: -1}` to avoid tabbing problems.
When the toast is shown, child controls may have a positve tabindex.

Default styling is white text on a dark background.


## ToastCurve

A toast, which moves on a curved path, as if mounted on a mechanical linkage, actuated by servo motors.
Set the `locationV` property to `top`, `middle` or `bottom`.
Set the `locationH` property to `left`, `middle` or `right`.
It is not modal.
Show and hide it with the usual `.show()`, `.hide()` and `.set('showing', boolean)`.

By default, it's sized to contain its children.
Corner toasts don't require a width or height in their style property. 
Top middle and bottom middle toasts will be full width, unless you set a width.
You must set a height for left middle and right middle toasts.

Child buttons and inputs should set `attributes: {tabindex: -1}` to avoid tabbing problems.
When the toast is shown, child controls may have a positve tabindex.

Default styling is white text on a dark background.


## InputStretch

A horizontal flexbox container, with a built-in input field. It allows the user to enter sizeable text, without the input
field always taking up space.

The input is aligned to the row start (left in left-to-right contexts), unless the property `end` is true.
When unfocused, the input field takes up the space not used by the other children.
When focused, the input field stretches to the full width, obscuring the other child controls.
Other child controls may get their size from their contents, or set their width using CSS.

Setting the following properties on InputStretch sets them on the child input: `acessibilityRole`, `defaultFocus`, 
`disabled`, `placeholder`, `selectOnFocus`, `type` and `value`.
Types `url` and `email` are most useful (aside from the default `text`).
Events on the child input bubble up.

Only put a Control in an InputStretch, if the user won't need it when the child input is focused!

As with all Inputs, add a label if the input has a value when the user first sees it.
The placeholder is not sufficient.  The label may be a child of the InputStretch!


## InputSearchStretch

Similar to an InputStretch, but styled as a search field.
A separate label is usually not required.


## Unwritten widgets

Feel free to implement and contribute these.

### Expand-from-control-popup

This Control would expand from a visible control, and contract back into it, like a Menu and its button.


## Other Enyo controls that are animated

Not all of these are optimized to animate smoothly.

* [SvgSpinner](https://github.com/infusionsoft/enyo-svg-spinner) (SVG animation)
* [moonstone/Spinner](http://enyojs.com/docs/latest/index.html#/kind/moonstone/Spinner/Spinner) (CSS keyframe animation)
* [layout/Panels](http://enyojs.com/docs/latest/index.html#/kind/layout/Panels/Panels) 
and its descendants such as [layout/ImageCarousel](http://enyojs.com/docs/latest/index.html#/kind/layout/ImageCarousel/ImageCarousel)
* trees using [layout/Node](http://enyojs.com/docs/latest/index.html#/kind/layout/Node/Node)
* [layout/Slidable](http://enyojs.com/docs/latest/index.html#/kind/layout/Slideable/Slideable) can be configured as toast.
* [layout/PulldownList](http://enyojs.com/docs/latest/index.html#/kind/layout/PulldownList/PulldownList)
* [moonstone/ExpandableInput](http://enyojs.com/docs/latest/index.html#/kind/moonstone/ExpandableInput/ExpandableInput)


## How to contribute

* Develop on a git branch or fork.
* Submit changes as a GitHub pull request to the master branch, that merges cleanly and doesn't break any tests (enyo-animated/test/SpecRunner.html) when running in current versions of Firefox or Chrome.
* Include the following line in the pull request comments, substituting your real name and email address, 
to assert your compliance with [Open webOS Developer Grant and Certificate of Origin 1.0](http://www.openwebosproject.org/community/governance/dco/)
 
	Open-WebOS-DCO-1.0-Signed-Off-By: Joe Smith <joe@myco.com>


## Copyright and License Information

("The MIT License (MIT)")

Copyright © 2015-2016 Hominid Software

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
