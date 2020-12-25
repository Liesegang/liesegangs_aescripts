// AddNullAndCam
// Ver 1.0.1
// Liesegang 2020 (yyama0704@gmail.com)
'use strict';

(function (){
    function complaydate(){
        comp = app.project.activeItem;
        if(comp != null){
            complay = comp.layers;
            selay = comp.selectedLayers;
            selaylength = selay.length;
            if(selaylength != 0)
                selayindex = selay[0].index;
            else
                selayindex = 1;
            fps = comp.frameRate;
        }else{
            alert("Please access compsiton");
            fps = 30;
        }
    }
    function Addtodur(){
        Din = 0; 
        Dout = comp.duration;
    }
    function Addtoset(){
        selay = comp.selectedLayers;
        selay[0].inPoint = Din;
        selay[0].outPoint = Dout;
        if(selayindex > 1){
            selay[0].moveAfter(comp.layer(selayindex));
        }
    }

    function AddNullCamera(){
        complaydate();
        Addtodur();
        complay.addCamera("camera", [-comp.width/2 ,- comp.height/2]);
        var Camera = comp.selectedLayers[0];
        Addtoset();
        complaydate();
        Addtodur();
        complay.addNull().threeDLayer = true;
        var Null = comp.selectedLayers[0];
        Null.name= "camera_ctrl";
        Addtoset();
        Camera.parent = Null;
    }

    AddNullCamera();
})()