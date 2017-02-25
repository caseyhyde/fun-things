angular.module('app')
.controller('HomeController', ['FunThings', '$http', function(FunThings, $http){
const self = this;
self.currentBlast = FunThings.currentBlast
self.nextBlast = FunThings.nextBlast
self.explain = FunThings.explain;

self.explainButton = function(){
  FunThings.explain.boolean = false;
}

// self.test = function() {
//   $http({
//     method: 'GET',
//     url: '/random',
//   }).then(function(response) {
//     console.log("response: ", response);
//   })
// };
//
// self.addThing = function() {
//   $http({
//     method: 'POST',
//     url: '/things',
//     data: {
//       description: "Go skateaboarding"
//     }
//   }).then(function(response) {
//     console.log("Resposne: ", response);
//   })
// }

}])
