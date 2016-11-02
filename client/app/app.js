// create a angular module named 'app'
angular.module('app', [
    'ui.bootstrap', // load angular-ui.bootstrap
    'ui.router' // load angular-ui-router
  ])
  // router options
  .config(['$urlRouterProvider', '$locationProvider',
    function ($urlRouterProvider, $locationProvider) {
    'use strict';

    $locationProvider.html5Mode(true); // allow html5mode routes (no #)
    $urlRouterProvider.otherwise('/'); // if route not found redirect to /
  }])
  // after the configuration and when app runs the first time we o some more stuff
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    'use strict';
    // this is available from all across the app
    $rootScope.appName = 'app';

    // make $state available from templates
    $rootScope.$state = $state;

  }])

  .filter('unique', function() {
     return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
     };
  })

 // .filter('startFrom',function(){
 //   return function(data,start){ //start is what we give the function data is the dataset using
 //     return data.slice(start);
 //  }
 // })

 .filter('startFrom', function() {
     return function(input, start) {
         if(input) {
             start = +start; //parse to int
             return input.slice(start);
         }
         return [];
     }
 });
