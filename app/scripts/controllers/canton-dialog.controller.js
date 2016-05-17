(function(angular){
	'use strict';

angular.module('TeamsApp').controller('CantonDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'ProvinciaCantonResource',
        function($scope, $stateParams, $modalInstance, entity, ProvinciaCantonResource) {



        $scope.initData = function(id) {
            ProvinciaCantonResource.get({id_provincia:$stateParams.id, id : id}, function(result) {
                $scope.canton = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:cantonUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.canton._id != null) {
                ProvinciaCantonResource.update({id_provincia:$stateParams.id,id:$scope.canton._id}, $scope.canton, onSaveFinished);
            } else {
                ProvinciaCantonResource.save({id_provincia:$stateParams.id}, $scope.canton, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };

        if(entity){
            $scope.initData(entity._id);
        }
        
}]);
}(window.angular));