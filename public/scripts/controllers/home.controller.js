angular.module('app')
  .controller('HomeController', ['FunThings', '$http', '$timeout', '$scope', function(FunThings, $http, $timeout, $scope){
    const self = this;
    self.isLoaded = false;
    self.itemsCollection =
    [{
			thumbnail: '../../assets/me.jpg',
      description: 'faaab',
			title: 'Matt Smith',
			subtitle: 'matt@gmail.com'
		},{
			thumbnail: '../../assets/me.jpg',
			title: 'Peter Capaldi',
			subtitle: 'peter@gmail.com',
		},{
			thumbnail: '../../assets/me.jpg',
			title: 'Christopher Eccleston',
			subtitle: 'christopher@gmail.com',
		},{
			thumbnail: '../../assets/me.jpg',
			title: 'Arthur Darvill',
			subtitle: 'arthur.darvill@gmail.com',
		},{
			thumbnail: '../../assets/me.jpg',
			title: 'Master',
			subtitle: 'master@gmail.com',
		}, {
			thumbnail: 'http://i.imgur.com/IvGr1XY.jpg',
			title: 'David Tennant is a great boi and i wnat to see what he does if noe one ssa',
      description: 'faaab',
			subtitle: 'david@gmail.com'
		}, ];
    console.log("itemsCollection", self.itemsCollection);

    // FunThings.getThings().then(function(response){
    //   console.log(response);
    //   self.blasts = response;
    //
    // });

    self.size = {
			width: 300,
			height: 200
		};

    self.showinfo = false;

		self.swipeend = function(){
			self.actions.unshift({name: 'Collection Empty'});
		};

		self.clickedTimes = 0;

		self.actions = [];

		self.swipeLeft = function(person){
      console.log("swipe left");
			self.actions.unshift({name: 'Left swipe'});
		};

		self.swipeRight = function(person){
			self.actions.unshift({name: 'Right swipe'});
		};

    self.myCustomFunction = function(){
			$timeout(function(){
				self.clickedTimes = self.clickedTimes + 1;
				self.actions.unshift({name: 'Click on item'});
			});

		};
    $scope.blasts = FunThings.allBlasts;

    $scope.$watchCollection(
      function() {
        return $scope.blasts;
      },
        function(newBlasts){
        console.log("watch collection", newBlasts);
        if (newBlasts.theBlasts.length) {
          self.isLoaded = true;
        }
      }
    )
    self.current = FunThings.current;
    console.log(self.current);
    self.nextBlast = FunThings.nextBlast;

    console.log(self.blasts);
    self.explain = FunThings.explain;

    self.explainButton = function(){
      FunThings.explain.boolean = false;
    }


  }])
