angular.module('app')
.factory('FunThings', [createFactory])

function FunThings(){
  var index = 0;
  var blasts = [
    {
      description: 'Bowling'
    },
    {
      description: 'Ice Skating'
    },
    {
      description: 'Drugs'
    },
    {
      description: 'Opposite-handed Bowling'
    },
  ];

//current blast
  this.currentBlast = blasts[index];

//next blast
  this.nextBlast = function(){
    // increment index until looping back to position 0
    index = ++index % blasts.length;
    this.currentBlast = blasts[index];
  };
//get the blasts

//add a blast

}

function createFactory() {
  console.log(new FunThings());

  return new FunThings();
}
