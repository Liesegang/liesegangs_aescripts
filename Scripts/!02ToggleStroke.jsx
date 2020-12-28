// ToggleStroke
// Ver 1.1.0
// Liesegang 2020 (yyama0704@gmail.com)
'use strict';

(function (){
    function map(arr, func){
        var ret = [];
        for(var i = 0; i < arr.length; i++){
            ret.push(func(arr[i], i));
        }
        return ret;
    }

    function mapAllProperties(obj, func){
        if(obj.numProperties !== undefined) {
            for(var i = 1; i <= obj.numProperties; i++){
                func(obj.property(i));
            }
        }
    }

    function includes(arr, x){
        var ret = false;
        map(arr, function (xx){
            if(xx == x){
                ret = true;
            }
        })
        return ret;
    }

    function walkObjects(obj, matchName, func, args, only){
        if(obj.matchName == matchName) func(obj);
        if(only === undefined || includes(only, obj.matchName)){
            mapAllProperties(obj, function(x){
                walkObjects(x, matchName, func, args, only);
            })
        }
    }

    comp = app.project.activeItem;
    if(comp == null) return;

    selay = comp.selectedLayers;
    if(selay.length == 0) return;

    app.beginUndoGroup("ToggleStroke");
    map(selay, function(layer, index){
        if(!(layer instanceof ShapeLayer)) return;
        var contents = layer.property("ADBE Root Vectors Group");
        walkObjects(contents, "ADBE Vector Graphic - Stroke", function(obj){
            obj.enabled ^= true;
        }, undefined, ["ADBE Vector Group", "ADBE Vectors Group", "ADBE Root Vectors Group"]);
    });
    map(selay, function(layer, index){
        if(!(layer instanceof TextLayer)) return;
        var textProp = layer.property("Source Text"); 
        var textDocument = textProp.value;
        textDocument.applyStroke ^= true;
        textProp.setValue(textDocument);
    })
    app.endUndoGroup();
})();