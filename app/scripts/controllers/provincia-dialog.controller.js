(function(angular){
    'use strict';

angular.module('TeamsApp').controller('ProvinciaDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'ProvinciaResource',
        function($scope, $stateParams, $modalInstance, entity, ProvinciaResource) {



        $scope.initData = function(id) {
            ProvinciaResource.get({id : id}, function(result) {
                $scope.provincia = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:provinciaUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.provincia._id != null) {
                ProvinciaResource.update({id:$scope.provincia._id}, $scope.provincia, onSaveFinished);
            } else {
                ProvinciaResource.save($scope.provincia, onSaveFinished);
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