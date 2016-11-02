angular.module('app')
  .controller('MainCtrl', ['$scope', '$http','filterFilter',function ($scope, $http, filterFilter) {

    $scope.fruit = [];
    $scope.newItem = {};
    $scope.pageSize = 5;    //rows per page
    $scope.currentPage = 1; //current page

    /* init pagination with $scope.list */
    $scope.noOfPages = Math.ceil($scope.fruit.length/$scope.pageSize);

    $scope.$watch('selectFilter', function(term) {
        // Create $scope.filtered and then calculat $scope.noOfPages, no racing!
        $scope.filtered = filterFilter($scope.fruit, {subject:term.subject});
        $scope.noOfPages = Math.ceil($scope.filtered.length/$scope.pageSize);
        console.log($scope.filtered);

        // for (var i = 1; i <= $scope.filtered.length; i++) {
        //   $scope.filtered.push(i);
        // }
        console.log($scope.filtered);
        $scope.currentPage=1;

    });


    function getFruit() {
      $http.get('/api/questions')
        .success(function (fruit) {
          $scope.fruit = fruit;
          console.log(fruit);
        })
        .error(handleError);
    }


    function handleError() {
      console.log('there was an error accessing the api');
    }


    $scope.add = function () {

      $scope.saving = true;

      if (!$scope.newItem.subject) {
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
      //submit also triggers blur, prevent double saving
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
