angular.module('chat', ['firebase','ui.router'])
  .controller('Chat', ['$scope', '$timeout', 'angularFireCollection',
    function($scope, $timeout, angularFireCollection) {
      var url = 'https://realtimechat.firebaseio.com/';
      $scope.messages = angularFireCollection(new Firebase(url).limit(20));
      $scope.username = 'Guest' + Math.floor(Math.random()*101);
      $scope.addMessage = function() {
        $scope.messages.add({from: $scope.username, content: $scope.message});
        $scope.message = "";
      }
    }
  ])
  .directive('autoScroll', function($timeout) {
    return function(scope, elements, attrs) {
      scope.$watch("messages.length", function() {
        $timeout(function() {
          elements[0].scrollTop = elements[0].scrollHeight
        });
      });
    }
  })
  .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('chat', {
                url: '/chat',
                templateUrl: 'partials/chat.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html'
            })
            .state("otherwise", { url : '/login'
            });
  });