angular.module('app')
  .controller('AboutCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.fruit = [];
    $scope.newItem = {};

    function getFruit() {
      $http.get('/api/questions')
        .success(function (fruit) {
          $scope.fruit = fruit;

        })
        .error(handleError);
    }

    function handleError() {
      console.log('there was an error accessing the api');
    }

    $scope.add = function () {

      $scope.saving = true;

      if (!$scope.newItem.subject) {
        console.log($scope.newItem.subject);
        return;
      }
      if (!$scope.newItem.question) {
        return;
      }
      if (!$scope.newItem.answer) {
        return;
      }

      $http.post('/api/questions', angular.copy($scope.newItem))
        .success(function (fruit) {
          $scope.fruit.push(fruit);
          $scope.newItem = {};
          $scope.saving = false;
        })
        .error(function () {
          handleError();
          $scope.saving = false;
        });

    };

    $scope.remove = function (id) {
      var index = this.$index;
      $http.delete('/api/questions/' + id)
        .success(function () {
          $scope.fruit.splice(index, 1);
        })
        .error(handleError);
    };

    $scope.startEdit = function (fruit) {
      $scope.currentEdit = angular.copy(fruit);
    };

    $scope.update = function (fruit, event, name) {
      if (!fruit.subject) {
        fruit.subject = $scope.currentEdit.subject;
      }
      // submit also triggers blur, prevent double saving
      if (event === 'blur' && $scope.saveEvent === 'submit') {
        $scope.saveEvent = null;
        return;
      }

      $scope.saveEvent = event;
      $scope.currentEdit = null;

      $http.put('/api/questions/' + fruit._id, fruit).error(handleError);
    };

    // Get initial data from api
    getFruit();

}]);
