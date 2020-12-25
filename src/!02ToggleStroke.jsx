// ToggleStroke
// Ver 1.0.0
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

    function mapAllProperties(contents, func){
        if(contents.numProperties !== undefined) {
            for(var i = 1; i <= contents.numProperties; i++){
                func(contents.property(i));
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

    function walkObjects(contents, matchName, func, args, only){
        $.writeln(contents.matchName);
        if(contents.matchName == matchName) func(contents);
        if(only === undefined || includes(only, contents.matchName)){
            mapAllProperties(contents, function(x){
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
    app.endUndoGroup("ToggleStroke");
})();