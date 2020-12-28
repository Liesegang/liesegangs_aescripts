// ToggleStroke
// Ver 1.1.0
// Liesegang 2020 (yyama0704@gmail.com)
'use strict';

(function () {
  function map(arr, func) {
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
      ret.push(func(arr[i], i));
    }
    return ret;
  }

  function mapAllProperties(obj, func) {
    if (obj.numProperties !== undefined) {
      for (var i = 1; i <= obj.numProperties; i++) {
        func(obj.property(i));
      }
    }
  }

  function includes(arr, x){
    for(var i = 0; i < arr.length; i++){
      if(x === arr[i]) return true;
    }
    return false;
  }

  function walkObjects(obj, matchName, func, args, only) {
    if (obj.matchName === matchName) func(obj);
    if (only === undefined || includes(only, obj.matchName)) {
      mapAllProperties(obj, function (x) {
        walkObjects(x, matchName, func, args, only);
      })
    }
  }

  var comp = app.project.activeItem;
  if (comp === null) return;

  var layers = comp.selectedLayers;
  if (layers.length === 0) return;

  app.beginUndoGroup("ToggleStroke");
  map(layers, function (layer, index) {
    switch (true) {
      case (layer instanceof ShapeLayer):
        var contents = layer.property("ADBE Root Vectors Group");
        walkObjects(contents, "ADBE Vector Graphic - Stroke", function (obj) {
          obj.enabled ^= true;
        }, undefined, ["ADBE Vector Group", "ADBE Vectors Group", "ADBE Root Vectors Group"]);
        break;
      case (layer instanceof TextLayer):
        var textProp = layer.property("Source Text");
        var textDocument = textProp.value;
        textDocument.applyStroke ^= true;
        textProp.setValue(textDocument);
        break;
      default:
        break;
    }
  });
  app.endUndoGroup();
})();