// Utility Tools
// Ver 1.0.0
// Liesegang 2021 (yyama0704@gmail.com)
'use strict';

(function (thisObj) {
  function buildUI(thisObj) {
    var windowName = "Utility Tools";
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("window", windowName, undefined, {
      resizeable: true
    });

    // Write UI Code Here
    var buttonSize = [0, 0, 27, 28];
    var margin = 4;

    myPanel.spacing = 0;
    myPanel.margins = 4;

    var mainGroup = myPanel.add("group");
    mainGroup.orientation = "stack";
    mainGroup.alignment = ["center", "center"];

    var rowGroup = mainGroup.add("group");
    rowGroup.orientation = "row";
    rowGroup.alignment = ["center", "center"];
    rowGroup.spacing = margin;
    rowGroup.margins = 0;

    var btn = rowGroup.add("button", undefined, "Disassemble Repeater");
    btn.helpTip = "Disassemble repeater shapes from shape layer";
    btn.onClick = function() {
      disassembleRepeater();
    };

    myPanel.onResizing = myPanel.onResize = function () {
      this.layout.resize();
    };
    if (myPanel instanceof Window) {
      myPanel.center();
      myPanel.show();
    } else {
      myPanel.layout.layout(true);
      myPanel.layout.resize();
    }
  }

  // Write Code Here
  // Library
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

  function copyArray(arr) {
    var ret = [];
    for (var i = 0; i< arr.length; i++) {
      ret.push(arr[i]);
    }
    return ret;
  }

  function findObjectBfs(obj, matchName) {
    var queue = [];
    var ret = [];
    queue.push([obj, []]);
    while(queue.length > 0) {
      var top = queue.shift();
      var q = top[0];
      var path = top[1];
      if(q.numProperties !== void 0) {
        var len = q.numProperties;
        for(var i = 1; i <= len; i++){
          var newPath = copyArray(path);
          newPath.push(i);
          if(q.property(i).matchName === matchName) {
            ret.push([q.property(i), newPath]);
          }
          queue.push([q.property(i), newPath]);
        }
      }
    }
    return ret;
  }

  function printMatchNameTree(obj, depth){
    if(obj.matchName === void 0) return;
  
    if(depth === void 0) depth = 0;
    for(var i = 0; i < depth; i++){
      $.write("\t");
    }
    $.writeln(obj.matchName);
  
    mapAllProperties(obj, function (x){printMatchNameTree(x, depth+1);});
  }

  function getObjectFromPath(obj, path) {
    var ret = obj;
    for(var i = 0; i < path.length; i++) {
      ret = ret.property(path[i]);
    }
    return ret;
  }

  // Main
  function disassembleRepeater() {
    var comp = app.project.activeItem;
    if (comp === null) {
      alert("Select composition.");
      return;
    }
  
    var layers = comp.selectedLayers;
    if (layers.length === 0) {
      alert("Select shape layer.");
      return;
    }

    var count = 0;

    app.beginUndoGroup("DisassembleRepeater");
    layers.map(function (layer, index) {
      switch (true) {
        case (layer instanceof ShapeLayer):
          var root = layer.property("ADBE Root Vectors Group");
          var repeaters = findObjectBfs(root, "ADBE Vector Filter - Repeater");
          for (var i = 0; i < repeaters.length; i++) {
            var repeater = repeaters[i][0];
            var path = repeaters[i][1];
            var numCopie = Math.floor(repeater.property("ADBE Vector Repeater Copies").value);
            if (numCopie >= 2) {
              var layername = layer.name;
              var offset = repeater.property("ADBE Vector Repeater Offset").value;
              count++;
              repeater.property("ADBE Vector Repeater Copies").setValue(1);
              layer.name = layername + " : " + offset;
              for(var j = 1; j < numCopie; j++) {
                layer = layer.duplicate();
                layer.name = layername + " : " + (offset + j);
                var newRepeater = getObjectFromPath(layer.property("ADBE Root Vectors Group"), path);
                newRepeater.property("ADBE Vector Repeater Copies").setValue(1);
                newRepeater.property("ADBE Vector Repeater Offset").setValue(offset + j);
              }
              break;
            }
          }
          break;
        default:s
          break;
      }
    });
    app.endUndoGroup();

    if(count === 0) {
      alert("Cannot found valid repeater (copies must be more than 1)");
    }
  }
  buildUI(thisObj);
})(this);
