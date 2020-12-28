// Array Prototypes
Array.prototype.map = function(func){
  var arr = this;
  var ret = [];
  for(var i = 0; i < arr.length; i++){
      ret.push(func(arr[i], i));
  }
  return ret;
};

Array.prototype.filter = function(func){
  var arr = this;
  var ret = [];
  for(var i = 0; i < arr.length; i++){
    if(func(arr[i])) ret.push(arr[i]);
  }
  return ret;
};

Array.prototype.acc = function(func, initial){
  var arr = this;
  var ret;

  if(func === void 0){
    func = function(x, y){return x + y;};
  }

  if(initial === void 0){
    ret = arr[0];
  }else{
    ret = func(initial, ret[0]);
  }

  for(var i = 1; i < arr.length; i++){
    ret = func(ret, arr[i]);
  }
  return ret;
};

Array.prototype.includes = function(x){
  var arr = this;
  for(var i = 0; i < arr.length; i++){
    if(x === arr[i]) return true;
  }
  return false;
};


// For AE Objects
function mapAllProperties(obj, func){
  if(obj.numProperties !== void 0) {
    for(var i = 1; i <= obj.numProperties; i++){
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


// For Development
function printMatchNameTree(obj, depth){
  if(obj.matchName === void 0) return;

  if(depth === void 0) depth = 0;
  for(var i = 0; i < depth; i++){
    $.write("  ");
  }
  $.writeln(obj.matchName);

  mapAllProperties(obj, function (x){printMatchNameTree(x, depth+1);});
}