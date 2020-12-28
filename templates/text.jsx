(function(){
  #include "./helper_functions.jsx"

  // Map
  $.writeln("Map");
  assert([1,2,3].map(function(x){return x+1;}), [2,3,4]);
  assert([].map(function(x){return x+1;}), []);
  assert(["a", "b"].map(function(x){return x+"c";}), ["ac", "bc"]);

  //Filter
  $.writeln("Filter");
  assert([1,2,3].filter(function(x){return true;}), [1,2,3]);
  assert([1,2,3,4,5].filter(function(x){return x % 2 != 0;}), [1,3,5]);
  assert([].filter(function(x){return true;}), []);

  //Acc
  $.writeln("Acc");
  assert([1,2,4].acc() === 7);
  assert([1,2,4].acc(void 0, 2) === 9);
  assert([1,2,4].acc(function(a, b){return a * b;}) === 8);
  assert([].acc() === void 0);
  assert([].acc(void 0, 4) === 4);
  assert([].acc(function(a, b){return a + b;}) === void 0);
  assert([].acc(function(a, b){return a + b;}, 4) === 4);

  //Includes
  $.writeln("Includes");
  assert([1,2,3,4].includes(3) === true);
  assert([1,2,3,4].includes(5) === false);
  assert([].includes(2) === false);
  assert([12].includes([12]) === false);
})()