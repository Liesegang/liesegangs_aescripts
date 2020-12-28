// Array Prototypes
Array.prototype.map = function(func){
  var arr = this;
  var ret = [];
  var len = arr.length;
  for(var i = 0; i < len; i++){
      ret.push(func(arr[i], i));
  }
  return ret;
};

Array.prototype.filter = function(func){
  var arr = this;
  var ret = [];
  var len = arr.length;
  for(var i = 0; i < len; i++){
    if(func(arr[i])) ret.push(arr[i]);
  }
  return ret;
};

Array.prototype.acc = function(func, initial){
  var arr = this;
  var ret;

  if(arr.length === 0){
    if(initial !== void 0){
      return initial;
    }else{
      return void 0;
    }
  }

  if(func === void 0){
    func = function(x, y){return x + y;};
  }

  if(initial === void 0){
    ret = arr[0];
  }else{
    ret = func(initial, arr[0]);
  }

  var len = arr.length;
  for(var i = 1; i < len; i++){
    ret = func(ret, arr[i]);
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


// For AE Objects
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

function assert(a, b){
  if(b === void 0){
    if(a){
      $.writeln("OK");
    }else{
      $.writeln("Error!");
    }
    return;
  }

  if(a instanceof Array){
    assert(a.toString() == b.toString());
    return;
  }
}