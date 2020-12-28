// ScriptName
// Ver 1.0.1
// Liesegang 2020 (yyama0704@gmail.com)
'use strict';

(function (thisObj) {
  function buildUI(thisObj) {
    var windowName = "ScriptName";
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("window", windowName, undefined, {
      resizeable: true
    });

    // Write UI Code Here

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

  buildUI(thisObj);
})(this);
