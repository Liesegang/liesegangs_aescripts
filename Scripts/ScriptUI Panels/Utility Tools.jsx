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
      app.beginUndoGroup("AddShape");
      disassembleRepeater();
      app.endUndoGroup();
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
  // Main
  function disassembleRepeater() {
    alert("test");
  }

  buildUI(thisObj);
})(this);
