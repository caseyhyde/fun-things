angular.module('app')
.factory('FunThings', [createFactory])

function FunThings(){
  var index = 0;
  console.log("index", index);
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
  this.currentBlast = blasts[index]

//next blast
  this.nextBlast = function(){
    // increment index until looping back to position 0
    index = ++index % blasts.length;
    this.currentBlast = blasts[index];
    console.log("currentBlast", this.currentBlast);
  }
//get the blasts

//add a blast
  this.addBlast = function(){
    
  }
//show fun things

  this.explain = {
    boolean: true
  };

}

function createFactory() {

  return new FunThings();
}
