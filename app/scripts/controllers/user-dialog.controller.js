(function(angular){
    'use strict';

angular.module('TeamsApp').controller('UserDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserResource','RoleResource',
        function($scope, $stateParams, $modalInstance, entity, UserResource, RoleResource) {

        $scope.confirmPassword=false;   
        $scope.isNew = true;    

        $scope.initData = function(id) {
         
            UserResource.get({id : id}, function(result) {
                $scope.user = result;
            });


        };

        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:userUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.user._id != null) {
                UserResource.update({id:$scope.user._id}, $scope.user, onSaveFinished);
            } else {
                UserResource.save($scope.user, onSaveFinished);
            }
        };      

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };

        if(entity){
            $scope.initData(entity._id);
            $scope.isNew=false;
        };

        
        $scope.loadRoles = function(){
            
            RoleResource.query({},function(result){
                $scope.roles = result;          
            });
        };

        $scope.loadRoles();        
        
        
    }]);
}(window.angular));