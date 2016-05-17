(function(angular) {
  'use strict';

  angular.module('TeamsApp')
    .controller('ModalPhotoController', ['$scope', '$uibModalInstance', function($scope, $modalInstance) {
        
        	var vm = this;

        	vm.picture = false; // Initial state
     
	      	$scope.clear = function () {
	        	$modalInstance.dismiss('cancel');
	        };
    }]);
}(window.angular));
