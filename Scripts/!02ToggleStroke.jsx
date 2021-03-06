// ToggleStroke
// Ver 1.1.1
// Liesegang 2020 (yyama0704@gmail.com)
'use strict';

(function () {
  Array.prototype.map = function(func){
    var arr = this;
    var ret = [];
    var len = arr.length;
    for(var i = 0; i < len; i++){
        ret.push(func(arr[i], i));
    }
    return ret;
  };

  Array.prototype.includes = function(x){
    var arr = this;
    var len = arr.length;
    for(var i = 0; i < len; i++){
      if(x === arr[i]) return true;
    }
    return false;
  };

  function mapAllProperties(obj, func){
    if(obj.numProperties !== void 0) {
      var len = obj.numProperties;
      for(var i = 1; i <= len; i++){
        func(obj.property(i));
      }
    }
  };

  function walkObjects(obj, matchName, func, args, only) {
    if (obj.matchName === matchName) func(obj);
    if (only === void 0 || only.includes(obj.matchName)) {
      mapAllProperties(obj, function (x) {
        walkObjects(x, matchName, func, args, only);
      })
    }
  };

  var comp = app.project.activeItem;
  if (comp === null) return;

  var layers = comp.selectedLayers;
  if (layers.length === 0) return;

  app.beginUndoGroup("ToggleStroke");
  layers.map(function (layer, index) {
    switch (true) {
      case (layer instanceof ShapeLayer):
        var contents = layer.property("ADBE Root Vectors Group");
        walkObjects(contents, "ADBE Vector Graphic - Stroke", function (obj) {
          obj.enabled ^= true;
        }, void 0, ["ADBE Vector Group", "ADBE Vectors Group", "ADBE Root Vectors Group"]);
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