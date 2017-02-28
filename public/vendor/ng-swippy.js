angular.module('ngSwippy', ['ngTouch'])
	.factory('swipe', [function() {

	  var MOVE_BUFFER_RADIUS = 0;

	  var POINTER_EVENTS = {
	    'mouse': {
	      start: 'mousedown',
	      move: 'mousemove',
	      end: 'mouseup'
	    },
	    'touch': {
	      start: 'touchstart',
	      move: 'touchmove',
	      end: 'touchend',
	      cancel: 'touchcancel'
	    }
	  };

	  function getCoordinates(event) {
	    var originalEvent = event.originalEvent || event;
	    var touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent];
	    var e = (originalEvent.changedTouches && originalEvent.changedTouches[0]) || touches[0];

	    return {
	      x: e.clientX,
	      y: e.clientY
	    };
	  }

	  function getEvents(pointerTypes, eventType) {
	    var res = [];
	    angular.forEach(pointerTypes, function(pointerType) {
	      var eventName = POINTER_EVENTS[pointerType][eventType];
	      if (eventName) {
	        res.push(eventName);
	      }
	    });
	    return res.join(' ');
	  }

	  return {

	    bind: function(element, eventHandlers, pointerTypes) {

	      var totalX, totalY;

	      var startCoords;

	      var lastPos;

	      var active = false;

	      pointerTypes = pointerTypes || ['mouse', 'touch'];
	      element.on(getEvents(pointerTypes, 'start'), function(event) {
	        startCoords = getCoordinates(event);
	        active = true;
	        totalX = 0;
	        totalY = 0;
	        lastPos = startCoords;
	        eventHandlers['start'] && eventHandlers['start'](startCoords, event); // jshint ignore:line
	      });
	      var events = getEvents(pointerTypes, 'cancel');
	      if (events) {
	        element.on(events, function(event) {
	          active = false;
	          eventHandlers['cancel'] && eventHandlers['cancel'](event); // jshint ignore:line
	        });
	      }

	      element.on(getEvents(pointerTypes, 'move'), function(event) {
	        if (!active) return;

	        if (!startCoords) return;
	        var coords = getCoordinates(event);

	        totalX += Math.abs(coords.x - lastPos.x);
	        totalY += Math.abs(coords.y - lastPos.y);

	        lastPos = coords;

	        if (totalX < MOVE_BUFFER_RADIUS && totalY < MOVE_BUFFER_RADIUS) {
	          return;
	        }

	          eventHandlers['move'] && eventHandlers['move'](coords, event); // jshint ignore:line

	      });

	      element.on(getEvents(pointerTypes, 'end'), function(event) {
	        if (!active) return;
	        active = false;
	        eventHandlers['end'] && eventHandlers['end'](getCoordinates(event), event); // jshint ignore:line
	      });
	    }
	  };
	}]).
	directive('ngSwippy', ['swipe', function(swipe){
		return {
			restrict: 'E',
			replace: true,
			template: 	'<div class="ng-swippy noselect" style="width: {{width}}; height: {{height}}">'+
							'<div person="person" swipe-directive="swipe-directive" ng-repeat="person in peopleToShow" class="content-wrapper swipable-card">' +
  								'<div class="card">' +
    								'<div no-repeat 50% 15%" class="photo-item">{{person.thumbnail}}</div>' +
										'<div no-repeat 50% 15%" class="photo-item">{{person.description}}</div>' +
										'<p>{{person}}</p>'+
    								'<div class="know-label">{{labelOk ? labelOk : "YES"}}</div>' +
    								'<div class="dontknow-label">{{labelNegative ? labelNegative : "NO"}}</div>' +
  								'</div>' +
								'<div class="progress-stats" ng-if="data">' +
									'<div class="card-shown">' +
							    	'<div class="card-shown-text">{{person.title}}</div>' +
							    	'<div class="card-shown-number">{{person.subtitle}}</div>' +
								  '</div>' +
								  '<div class="card-number">{{collection.length - (collection.indexOf(person))}}/{{collection.length}}&nbsp;'+
								  '</div>' +
								'</div>' +
							'</div>' +
						'</div>',

			scope: {
				collection: '=',
				width: '@',
				height: '@',
				itemClick: '&',
				data: '=',
				collectionEmpty: '&',
				swipeLeft: '&',
				swipeRight: '&',
				cardsNumber: '@',
				labelOk: '@',
				labelNegative: '@'
			},

			link: function(scope){

				scope.isMoving = false;
				scope.moveBack = false;

				scope.init = function(){
					scope.people = scope.collection.slice(0);
					scope.peopleBuf = scope.people.slice(0);
					var number = Number(scope.cardsNumber);
					var showNumber = 3;
					if (number && number >= 2 && Math.abs(number) <= scope.peopleBuf.length){
						showNumber = Math.abs(number);
					}
					scope.peopleToShow = scope.peopleBuf.splice(-showNumber);
				};

				scope.removeElementFromCollection = function(person, direction){
					var directionHandler;
					switch(direction){
						case 'left':
							directionHandler = scope.swipeLeft();
							break;
						case 'right':
							directionHandler = scope.swipeRight();
							break;
						default:
							directionHandler = undefined;
							break;
					}
					if (direction){
						directionHandler(person);
					}
					scope.people.splice(scope.people.indexOf(person), 1);
					if (scope.people.length === 0){
						var emptyCollectionHandler = scope.collectionEmpty();
						emptyCollectionHandler();
					} else {
						scope.peopleToShow.splice(scope.peopleToShow.indexOf(person), 1);
					}
					if (scope.peopleBuf.length > 0){
						scope.peopleToShow.unshift(scope.peopleBuf.pop());
					}
				};

				scope.init();
			}
		}
	}])
	.value('swipeDirectiveValues', {
	  moveBack: false
	})
	.directive('swipeDirective', ['swipe', '$window', '$timeout', 'swipeDirectiveValues', function(swipe, $window, $timeout, swipeDirectiveValues){
		return {
			restrict: 'A',
			scope: {
				person: '='
			},
			link: function(scope, element, attrs){
				var screenWidth = $window.screen.availWidth;
				var screenHeight = $window.screen.availHeight;
				var moving = false;
				var timeoutStart = 0;
				var $labelunknown = element[0].querySelector('.dontknow-label');
				var $labelknow = element[0].querySelector('.know-label');

				scope.swipeObject = {
					swiping: 0,
					startX: 0,
					startY: 0,
					offsetX: 0,
					offsetY: 0
				};

				var expressionHandler = scope.$parent.itemClick();

				swipe.bind(element, {
					start: function(coordinates, evt) {
						var children = element.parent().children();
						if (swipeDirectiveValues.moveBack){
							return false;
						}
						if (!scope.isSwiping) {
							scope.isSwiping = true;
							scope.$parent.isMoving = true;
							scope.swipeObject.startX = coordinates.x;
							scope.swipeObject.startY = coordinates.y;
						} else {
							return;
						}

						timeoutStart = Date.now();
					},
					move: function(coordinates) {
						if (!scope.isSwiping || swipeDirectiveValues.moveBack) {
							return;
						} else {
							if (!moving){

								element.css({
									'-o-transition': 'none',
									'-moz-transition': 'none',
									'-ms-transition': 'none',
									'-webkit-transition': 'none',
									'transition': 'none'
								});

								moving= true;
							}
							if ((Date.now() - timeoutStart) < 50) {
								return;
							} else {

								scope.swipeObject.offsetX = coordinates.x - scope.swipeObject.startX;
								scope.swipeObject.offsetY = coordinates.y - scope.swipeObject.startY;

								var rotateX = scope.swipeObject.offsetX;
								var opacity = Math.abs(scope.swipeObject.offsetX) / 150;

								if (opacity > 1) {
									opacity = 1;
								}

								var labelx = '15%';

								if (scope.swipeObject.offsetX <= 0){
									labelx = '60%';
								}

								if (scope.swipeObject.offsetX > 0){
									$labelunknown.style['opacity'] = '0';
									$labelknow.style['opacity'] = opacity;
									$labelknow.style['left'] = labelx;
									$labelknow.style['transform'] = 'rotateZ(-45deg)';
								} else {
									$labelknow.style['opacity'] = '0';
									$labelunknown.style['opacity'] = opacity;
									$labelunknown.style['left'] = labelx;
									$labelunknown.style['transform'] = 'rotateZ(45deg)';
								}

								if (scope.swipeObject.offsetY < 0){
									rotateX = -scope.swipeObject.offsetX;
								}

								element.css({
									'-webkit-transform': 'translate3d(' + scope.swipeObject.offsetX + 'px,'+ scope.swipeObject.offsetY + 'px,0)  rotateZ('+  (rotateX * ($window.screen.availWidth/30) /$window.screen.availWidth) * Math.abs(scope.swipeObject.offsetY/80) +'deg)',
									'transform': 'translate3d(' + scope.swipeObject.offsetX + 'px,'+ scope.swipeObject.offsetY + 'px,0)  rotateZ('+  (rotateX * ($window.screen.availWidth/30) /$window.screen.availWidth) * Math.abs(scope.swipeObject.offsetY/80) +'deg)'
								});
							}
						}
					},
					end: function(coordinates) {
						scope.isSwiping = false;
						if (scope.swipeObject.offsetX === 0 && scope.swipeObject.offsetY === 0 || swipeDirectiveValues.moveBack){
							expressionHandler();
							return;
						}

						moving = false;

						element.css({
							'-webkit-transition': 'transform 0.5s',
							'transition': 'transform 0.5s',
						});

						swipeDirectiveValues.moveBack = true;

						if (Math.abs(scope.swipeObject.offsetX / screenWidth) > 0.200 || Math.abs(scope.swipeObject.offsetY / screenHeight) > 0.100) {
							var style;
							var y = 100;

							var x = window.innerWidth / element[0].offsetWidth * 100;

								if (scope.swipeObject.offsetX < 0 && scope.swipeObject.offsetY < 0){
									style = {
										'-webkit-transform': 'translate3d(-' + x + '%,-' + y + '%,0)',
										'transform': 'translate3d(-' + x + '%,-' + y + '%,0)',
									};
								} else if (scope.swipeObject.offsetX < 0 && scope.swipeObject.offsetY >= 0){
									style = {
										'-webkit-transform': 'translate3d(-' + x + '%,' + y + '%,0)',
										'transform': 'translate3d(-' + x + '%,' + y + '%,0)',
									};
								} else if (scope.swipeObject.offsetX > 0 && scope.swipeObject.offsetY <= 0){
									style = {
										'-webkit-transform': 'translate3d(' + x + '%,-' + y + '%,0)',
										'transform': 'translate3d(' + x + '%,-' + y + '%,0)',
									};
								} else {
									style = {
										'-webkit-transform': 'translate3d(' + x + '%,' + y + '%,0)',
										'transform': 'translate3d(' + x + '%, ' + y + '%,0)',
									};
								}

							element.css(style);

							var direction = scope.swipeObject.offsetX < 0 ? 'left' : 'right';

							swipeDirectiveValues.moveBack = false;

							scope.swipeObject.offsetX = 0;
							scope.swipeObject.offsetY = 0;
							console.log('Here we set false');
							scope.$parent.isMoving = false;

							$timeout(function(){
								scope.$parent.removeElementFromCollection(scope.person, direction);
							}, 500);
						} else {

							element.css({
								'-webkit-transform': 'translate3d(' + 0 + 'px,0,0)',
								'transform': 'translate3d(' + 0 + 'px,0,0)'
							});

							$timeout(function(){
								scope.$parent.isMoving = false;
								console.log('Should be true, but: ' + swipeDirectiveValues.moveBack);
								swipeDirectiveValues.moveBack = false;
							}, 500);

							scope.swipeObject.offsetX = 0;
							scope.swipeObject.offsetY = 0;
							$labelunknown.style['opacity'] = '0';
							$labelknow.style['opacity'] = '0';
						}
					}
				});
			}
		}
	}]);
