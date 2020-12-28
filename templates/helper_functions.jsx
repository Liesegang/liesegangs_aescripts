function map(arr, func){
  var ret = [];
  for(var i = 0; i < arr.length; i++){
      ret.push(func(arr[i], i));
  }
  return ret;
}

function filter(arr, func){
  var ret = [];
  for(var i = 0; i < arr.length; i++){
    if(func(arr[i])){
      ret.push(arr[i]);
    }
  }
  return ret;
}

function acc(arr, func, initial){
  var ret;
  if(func === undefined){
    func = function(x, y){return x + y;};
  }
  if(initial === undefined){
    ret = arr[0];
  }else{
    ret = func(initial, ret[0]);
  }
  for(var i = 1; i < arr.length; i++){
    ret = func(ret, arr[i]);
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
  for(var i = 0; i < arr.length; i++){
    if(x === arr[i]) return true;
  }
  return false;
}

function walkObject(obj, matchName, func, args, only){
  if(obj.matchName === matchName) func(obj);
  if(only === undefined || includes(only, obj.matchName)){
    mapAllProperties(obj, function(x){
      walkObject(x, matchName, func, args, only);
    })
  }
}
