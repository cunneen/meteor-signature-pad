# meteor-signature-pad
Meteor wrapper for https://github.com/szimek/signature_pad

## Installation

```
meteor add cunneen:signature-pad
```

## Usage

HTML

```html
<template name="sigpad">
  <div id="signature-pad" class="m-signature-pad">
    <div class="m-signature-pad--body">
      <canvas></canvas>
    </div>
    <div class="m-signature-pad--footer">
      <div class="description">Sign above</div>
      <button class="button clear" data-action="clear">Clear</button>
      <button class="button save" data-action="save">Save</button>
    </div>
  </div>
</template>
```

JavaScript

```js
var wrapper,
    clearButton ,
    saveButton,
    canvas,
    signaturePad;

Template.sigpad.rendered = function() {
  wrapper = document.getElementById("signature-pad");
  canvas = wrapper.querySelector("canvas");

  // Adjust canvas coordinate space taking into account pixel ratio,
  // to make it look crisp on mobile devices.
  // This also causes canvas to be cleared.
  function resizeCanvas() {
      // When zoomed out to less than 100%, for some very strange reason,
      // some browsers report devicePixelRatio as less than 1
      // and only part of the canvas is cleared then.
      var ratio =  Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
  }
  
  window.onresize = resizeCanvas;
  resizeCanvas();
  
  signaturePad = new SignaturePad(canvas);
};

Template.sigpad.events({
  "click [data-action=clear]": function() {
    signaturePad.clear();
  },
  "click [data-action=save]": function() {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        window.open(signaturePad.toDataURL());
    }
  },
});
```
