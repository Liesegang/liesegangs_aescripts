// Add Shape Layers
// Liesegang 2020 (yyama0704@gmail.com)
'use strict';

function add_shape_layers_script(thisObj) {
  var add_shape_layers = {};

  add_shape_layers.FileCheck = function(){
    var ret = true;
    for(var i = 0; i < add_shape_layers.resourceFileList.length; i++) {
      if(!(new File(add_shape_layers.resourcePath + "/" + add_shape_layers.resourceFileList[i]).exists)){
        alert("error -- " + add_shape_layers.resourceFileList[i] + " does not exist.");
        ret = false;
      }
    }
    return ret;
  }

  add_shape_layers.GetIconPath = function(fileName) {
    return add_shape_layers.resourcePath + "/" + fileName  + ".png";
  }

  add_shape_layers.GetFFX = function(shape) {
    return new File(add_shape_layers.resourcePath + "/" + shape + " Control.ffx");
  }

  add_shape_layers.addStrokeAndFill = function(group) {
    // Stroke
    var stroke = group.addProperty("ADBE Vector Graphic - Stroke");
    var strokeOpacity = stroke.property("ADBE Vector Stroke Opacity");
    strokeOpacity.expression = 'effect("Control")("Stroke")>0?value:0';
    var strokeWidth = stroke.property("ADBE Vector Stroke Width");
    strokeWidth.expression = 'effect("Control")("Stroke Width")';
    var strokeColor = stroke.property("ADBE Vector Stroke Color");
    strokeColor.expression = 'effect("Control")("Stroke Color")';

    // Fill
    var fill = group.addProperty("ADBE Vector Graphic - Fill");
    var fillOpacity = fill.property("ADBE Vector Fill Opacity");
    fillOpacity.expression = 'effect("Control")("Fill")>0?value:0';
    var fillColor = fill.property("ADBE Vector Fill Color");
    fillColor.expression = 'effect("Control")("Fill Color")';
  }

  add_shape_layers.AddShape = function(shapeType) {
    var currentComp = app.project.activeItem;
    if(currentComp === null) {
      alert("Select composition!");
      return;
    }

    var currentLayers = currentComp.selectedLayers;
    var adaptable = false;
    // if(currentLayers.length == 0) adaptable = false;
    // for(var i = 0; i < currentLayers.length; i++) {
    //   if(!(currentLayers[i] instanceof ShapeLayer)) adaptable = false;
    // }
    if(!adaptable){
      currentLayers = [currentComp.layers.addShape()];
    }

    for(var i = 0; i < currentLayers.length; i++) {
      var currentLayer = currentLayers[i];
      currentLayer.name = shapeType;
      currentLayer.applyPreset(new File(add_shape_layers.GetFFX(shapeType)));

      var group = currentLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group");
      group.parentProperty.name = shapeType;

      switch(shapeType){
        case "Circle":
          var shape = group.addProperty("ADBE Vector Shape - Ellipse");
          var size = shape.property("ADBE Vector Ellipse Size");
          size.expression = 'r=effect("Control")("Radius")*2;[r,r]';
          size.enableExpression = true;
          add_shape_layers.addStrokeAndFill(group);
          break;
        case "Ellipse":
          var shape = group.addProperty("ADBE Vector Shape - Ellipse");
          var size = shape.property("ADBE Vector Ellipse Size");
          size.expression = 'effect("Control")("Size");';
          size.enableExpression = true;
          add_shape_layers.addStrokeAndFill(group);
          break;
        case "Square":
          var shape = group.addProperty("ADBE Vector Shape - Rect");
          var size = shape.property("ADBE Vector Rect Size");
          size.expression = 't=effect("Control")("Size");[t,t]';
          size.enableExpression = true;
          add_shape_layers.addStrokeAndFill(group);
          break;
        case "Rectangle":
          var shape = group.addProperty("ADBE Vector Shape - Rect");
          var size = shape.property("ADBE Vector Rect Size");
          size.expression = 'effect("Control")("Size");';
          size.enableExpression = true;
          add_shape_layers.addStrokeAndFill(group);
          break;
        case "Triangle":
          var shape = group.addProperty("ADBE Vector Shape - Star");
          shape.property("ADBE Vector Star Type").setValue(2);
          shape.property("ADBE Vector Star Points").setValue(3);
          var size = shape.property("ADBE Vector Star Outer Radius");
          size.expression = 'effect("Control")("Radius");';
          size.enableExpression = true;
          add_shape_layers.addStrokeAndFill(group);
          break;
        case "Star":
          var shape = group.addProperty("ADBE Vector Shape - Star");
          shape.property("ADBE Vector Star Type").setValue(1);
          shape.property("ADBE Vector Star Points").setValue(5);
          var innserSize = shape.property("ADBE Vector Star Inner Radius");
          innserSize.expression = 'effect("Control")("Radius")*0.383;';
          innserSize.enableExpression = true;
          var outerSize = shape.property("ADBE Vector Star Outer Radius");
          outerSize.expression = 'effect("Control")("Radius");';
          outerSize.enableExpression = true;
          add_shape_layers.addStrokeAndFill(group);
          break;
        case "Star6":
          var shape = group.addProperty("ADBE Vector Shape - Star");
          shape.property("ADBE Vector Star Type").setValue(1);
          shape.property("ADBE Vector Star Points").setValue(6);
          var innserSize = shape.property("ADBE Vector Star Inner Radius");
          innserSize.expression = 'effect("Control")("Radius")*0.5775;';
          innserSize.enableExpression = true;
          var outerSize = shape.property("ADBE Vector Star Outer Radius");
          outerSize.expression = 'effect("Control")("Radius");';
          outerSize.enableExpression = true;
          add_shape_layers.addStrokeAndFill(group);
          break;
        case "Fan":
          var shape = group.addProperty("ADBE Vector Shape - Ellipse");
          var size = shape.property("ADBE Vector Ellipse Size");
          size.expression = 'r=effect("Control")("Radius");[r,r]';
          size.enableExpression = true;
          var trimPath = group.addProperty("ADBE Vector Filter - Trim");
          var start = trimPath.property("ADBE Vector Trim Start");
          var end = trimPath.property("ADBE Vector Trim End");
          start.expression = 'effect("Control")("Start Angle")/3.6;'
          start.enableExpression = true;
          end.expression = 'effect("Control")("End Angle")/3.6;'
          end.enableExpression = true;
          var stroke = group.addProperty("ADBE Vector Graphic - Stroke");
          var strokeWidth = stroke.property("ADBE Vector Stroke Width");
          strokeWidth.expression = 'effect("Control")("Radius")';
          var strokeColor = stroke.property("ADBE Vector Stroke Color");
          strokeColor.expression = 'effect("Control")("Color")';
          break;
        case "Annular Sector":
          var shape = group.addProperty("ADBE Vector Shape - Ellipse");
          var size = shape.property("ADBE Vector Ellipse Size");
          size.expression = 't=effect("Control")("Inner Radius")+effect("Control")("Outer Radius");[t,t]';
          size.enableExpression = true;
          var trimPath = group.addProperty("ADBE Vector Filter - Trim");
          var start = trimPath.property("ADBE Vector Trim Start");
          var end = trimPath.property("ADBE Vector Trim End");
          start.expression = 'effect("Control")("Start Angle")/3.6;'
          start.enableExpression = true;
          end.expression = 'effect("Control")("End Angle")/3.6;'
          end.enableExpression = true;
          var stroke = group.addProperty("ADBE Vector Graphic - Stroke");
          var strokeWidth = stroke.property("ADBE Vector Stroke Width");
          strokeWidth.expression = 't=effect("Control")("Outer Radius")-effect("Control")("Inner Radius");t>=0?t:0';
          var strokeColor = stroke.property("ADBE Vector Stroke Color");
          strokeColor.expression = 'effect("Control")("Color")';
          break;
        default:
          alert("Unknown shape!");
          break;
      }
    }
  }

  add_shape_layers.BuildUI = function(thisObj) {
    add_shape_layers.scriptName = "Add Shape Layers";
    add_shape_layers.version = "1.0.0";
    add_shape_layers.ms = 4; // margin size
    add_shape_layers.bs = [0, 0, 27, 28];  // button size

    add_shape_layers.palette = (thisObj instanceof Panel) ? thisObj : new Window("palette" , add_shape_layers.scriptName + " " + add_shape_layers.version, undefined , {resizeable:true});
    add_shape_layers.palette.spacing = 0;
    add_shape_layers.palette.margins = 4;

    var mainGroup = add_shape_layers.palette.add("group");
    mainGroup.orientation = "stack";
    mainGroup.alignment = ["center", "center"];

    var rowGroup = mainGroup.add("group");
    rowGroup.orientation = "row";
    rowGroup.alignment = ["center", "center"];
    rowGroup.spacing = add_shape_layers.ms;
    rowGroup.margins = 0;

    for(var i = 0; i < add_shape_layers.shapes.length; i++){
      var shape = add_shape_layers.shapes[i];
      var btn = rowGroup.add("iconbutton", add_shape_layers.bs, add_shape_layers.GetIconPath(shape));
      btn.helpTip = "Add " + shape;
      (function() {
        var localShape = shape;
        btn.onClick = function() {
          app.beginUndoGroup("AddShape");
          add_shape_layers.AddShape(localShape);
          app.endUndoGroup();
        };
      })();
    }

    add_shape_layers.palette.layout.layout(true);
    add_shape_layers.palette.onResizing = function(){
      add_shape_layers.palette.layout.resize();
    };
    add_shape_layers.palette.onResize = function(){
      add_shape_layers.palette.layout.resize();
    };
  }

  add_shape_layers.rootPath = new File(new File($.fileName).parent);
  add_shape_layers.resourcePath = add_shape_layers.rootPath.fullName + "/Liesegang/AddShapeLayers";
  add_shape_layers.resourceFileList = [];
  add_shape_layers.shapes = ["Circle", "Ellipse", "Square", "Rectangle", "Triangle", "Star", "Star6", "Fan", "Annular Sector"];

  if(!add_shape_layers.FileCheck()){
    return;
  }

  add_shape_layers.BuildUI(thisObj);
  if(!(add_shape_layers.palette instanceof Panel)) {
    add_shape_layers.palette.show();
  }
};

add_shape_layers_script(this);