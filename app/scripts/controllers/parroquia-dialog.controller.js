(function(angular){
    'use strict';

angular.module('TeamsApp').controller('ParroquiaDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'CantonParroquiaResource',
        function($scope, $stateParams, $modalInstance, entity, CantonParroquiaResource) {
        $scope.initData = function(id) {
            CantonParroquiaResource.get({id_canton:$stateParams.id, id : id}, function(result) {
                $scope.parroquia = result;
            });
        };
        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:cantonUpdate', result);
            $modalInstance.close(result);
        };
        $scope.save = function () {
            if ($scope.parroquia._id != null) {
                CantonParroquiaResource.update({id_canton:$stateParams.id,id:$scope.parroquia._id}, $scope.parroquia, onSaveFinished);
            } else {
                CantonParroquiaResource.save({id_canton:$stateParams.id}, $scope.parroquia, onSaveFinished);
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