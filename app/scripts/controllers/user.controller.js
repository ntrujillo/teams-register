(function(angular){
	'use strict';


angular.module('TeamsApp')
    .controller('UserCtrl',['UserResource','$uibModal',function (UserResource,$modal) {
        var ctrl = this;
        ctrl.registros = [];
        ctrl.pageno = 1;        
        ctrl.total_count = 0;
        ctrl.itemsPerPage = 5;  
         

        function loadData(page) {
            UserResource.query({page: page, per_page: ctrl.itemsPerPage,q:ctrl.filter}, function(result, headers) {                
                ctrl.registros = result;
                ctrl.total_count = headers('X-Total-Count');
            });
        };         

        function _delete(id) {
            UserResource.get({id: id}, function(result) {
                ctrl.registro = result;
                $('#deleteRegistroConfirmation').modal('show');
            });
        };

       function confirmDelete(id) {
            UserResource.delete({id: id},
                function () {
                    ctrl.refresh();
                    $('#deleteRegistroConfirmation').modal('hide');                    
                });
        };

        function refresh() {           
            ctrl.loadData(ctrl.pageno);          
        };    

        function showModal(selectedUser) {

                var modalInstance = $modal.open({
                  templateUrl: 'views/user-dialog.html',
                  controller: 'UserDialogCtrl as ctrl',
                  size: 'md',
                  backdrop: 'static',
                  animation: true,
                  resolve : {
                    entity : function(){
                        return selectedUser;
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'user-dialog',
                                    files: [                                      
                                        'scripts/services/user.service.js',
                                        'scripts/services/role.service.js',
                                        'scripts/controllers/user-dialog.controller.js'                                        
                                    ]
                                }])
                        }]
                  }
                });

                modalInstance.result.then(function(obj) {
                  ctrl.result = obj;
                  ctrl.refresh()
                });
        };  
        ctrl.refresh = refresh;       
        ctrl.confirmDelete = confirmDelete;
        ctrl.deleteRegistro = _delete;     
        ctrl.showModal = showModal;
        ctrl.loadData = loadData;        
        ctrl.refresh();
    }]);
}(window.angular));