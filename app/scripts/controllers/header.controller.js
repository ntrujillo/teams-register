(function(angular){
    'use strict';

angular.module('TeamsApp').controller('HeaderCtrl',
    ['$rootScope','$scope',  
        function($rootScope, $scope ) {

       $scope.user = $rootScope.user; 
        
        
    }]);
}(window.angular));