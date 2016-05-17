(function(angular){
	'use strict';


angular.module('TeamsApp')
    .controller('RoleCtrl',['RoleResource','$uibModal',function (RoleResource,$modal) {
        var ctrl = this;
        ctrl.registros = [];
        ctrl.pageno = 1;        
        ctrl.total_count = 0;
        ctrl.itemsPerPage = 5;      

        function loadData(page) {
            RoleResource.query({page: page, per_page: ctrl.itemsPerPage,q:ctrl.filter}, function(result, headers) {                
                ctrl.registros = result;
                ctrl.total_count = headers('X-Total-Count');
            });
        };         

        function _delete(id) {
            RoleResource.get({id: id}, function(result) {
                ctrl.registro = result;
                $('#deleteRegistroConfirmation').modal('show');
            });
        };

       function confirmDelete(id) {
            RoleResource.delete({id: id},
                function () {
                    ctrl.refresh();
                    $('#deleteRegistroConfirmation').modal('hide');                    
                });
        };

        function refresh() {           
            ctrl.loadData(ctrl.pageno);          
        };    

        function showModal(selectedRole) {

                var modalInstance = $modal.open({
                  templateUrl: 'views/role-dialog.html',
                  controller: 'RoleDialogCtrl as ctrl',
                  size: 'md',
                  backdrop: 'static',
                  animation: true,
                  resolve : {
                    entity : function(){
                        return selectedRole;
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'role-dialog',
                                    files: [                                      
                                        'scripts/services/role.service.js',
                                        'scripts/controllers/role-dialog.controller.js'                                        
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