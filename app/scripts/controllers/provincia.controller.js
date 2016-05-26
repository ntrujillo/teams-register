(function(angular){
	'use strict';


angular.module('TeamsApp')
    .controller('ProvinciaCtrl',['ProvinciaResource','$uibModal', function (ProvinciaResource,$modal) {
        var ctrl = this;
        ctrl.registros = [];
        ctrl.pageno = 1;        
        ctrl.total_count = 0;
        ctrl.itemsPerPage = 5;      

        function loadData(page) {
            ProvinciaResource.query({page: page, per_page: ctrl.itemsPerPage,q:ctrl.filter}, function(result, headers) {                
                ctrl.registros = result;
                ctrl.total_count = headers('X-Total-Count');
            });
        };         

        function _delete(id) {
            ProvinciaResource.get({id: id}, function(result) {
                ctrl.registro = result;
                $('#deleteRegistroConfirmation').modal('show');
            });
        };

       function confirmDelete(id) {
            ProvinciaResource.delete({id: id},
                function () {
                    ctrl.refresh();
                    $('#deleteRegistroConfirmation').modal('hide');                    
                });
        };

        function refresh() {           
            ctrl.loadData(ctrl.pageno);          
        }; 

        function showModal(selectedProvincia) {

                var modalInstance = $modal.open({
                  templateUrl: 'views/provincia-dialog.html',
                  controller: 'ProvinciaDialogCtrl as ctrl',
                  size: 'sm',
                  backdrop: 'static',
                  animation: true,
                  resolve : {
                    entity : function(){
                        return selectedProvincia;
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia-dialog',
                                    files: [                                      
                                        'scripts/services/provincia.service.js',
                                        'scripts/controllers/provincia-dialog.controller.js'                                        
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

        var gridProvincias = {};

        var gridDataSource = new kendo.data.DataSource({
            pageSize: 5,
            serverPaging:true,       
            transport: {
            read: function(options) {
                if (angular.isDefined(options.data)) {
                    console.log("page: "+options.data.skip +" per_page: "+options.data.pageSize);
                    var promise = ProvinciaResource.query({page: (options.data.skip/options.data.pageSize)+1, per_page: options.data.pageSize},
                        function(result, headers){                          
                            options.success({"data":result,"total":headers('X-Total-Count')}); 
                    });                                              
                   
                };
                if (promise === false) {
                    options.error({                        
                        xhr: {}
                    });
                };
            },
            destroy: function(options) {
                var model = options.data;     
                
                var promise = ProvinciaResource.delete({id: ctrl.id});
                                               
                promise.then(function(response) {    
                    if(response.result){                                                                       
                         options.success(model);                                    
                    }else{
                         options.error(new Error('DeletingError'));
                    }
                });
               
            },
            update: function(options) { 

                var model = options.data;  
              
                var promise = ProvinciaResource.update();
                                               
                promise.then(function(response) {    
                    if(response.result){                                                                       
                         options.success(model);                                    
                    }else{
                         options.error(model);
                    }
                });

            }    
                                           
        },
        schema: {
            total: function(response){
                return response.total;
            },
            data:function(response){
                
                return response.data;
            },
            model:{
                id:"_id",
                fields: {
                    code:{nullable:true},
                    name:{editable:false}
                }
            }
            
        },
        error: function(e) {
                    if (e.xhr.message && e.xhr.message == 'DeletingError') {
                        console.log("Error",e);
                    }
        }
    });

        var gridColumns = [  
            {
                field: "code",
                title: 'Codigo',
                width: "15%"                                     
            }, 
            {
                field: "name",
                title: 'Name',
                width: "15%"                                     
            }];
             


        ctrl.gridDataSource = gridDataSource;
        ctrl.gridColumns = gridColumns;
        ctrl.gridProvincias = gridProvincias;
        ctrl.refresh = refresh;       
        ctrl.confirmDelete = confirmDelete;
        ctrl.deleteRegistro = _delete;     
        ctrl.showModal = showModal;
        ctrl.loadData = loadData;
        ctrl.refresh();
    }]);
}(window.angular));