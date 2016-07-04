(function(angular){
    'use strict';


angular.module('TeamsApp')
    .controller('UserCtrl',['UserResource','RoleResource','$scope','$uibModal', '$filter' ,
        function (UserResource, RoleResource, $scope, $modal , $filter) {
        var ctrl = this;      

        var gridDataSource = new kendo.data.DataSource({
            pageSize: 5,
            serverPaging:true,       
            transport: {
            read: function(options) {
                if (angular.isDefined(options.data)) {                 
                    var promise = UserResource.query({page: (options.data.skip/options.data.pageSize)+1, per_page: options.data.pageSize},
                        function(result, headers){                          
                            options.success({"data":result,"total":headers('X-Total-Count')}); 
                    }); 

                    if (promise === false) {
                        options.error({                        
                            xhr: {}
                        });
                    };                                             
                   
                };
                
            }, 
            create: function(options) {
                var model = options.data;  
                delete model._id;
                UserResource.save(model, function(response) {                       
                    if(response){                                                                       
                         options.success(model);                                    
                    }else{
                         options.error(model);
                    }
                },function(error){
                    console.log("Save error ",error);
                });
            },           
            destroy: function(options) {
                var model = options.data;               
                var promise = UserResource.delete({id: model._id},function(response) {    
                    if(response){                                                                       
                         options.success(model);                                    
                    }else{
                         options.error(new Error('DeletingError'));
                    }
                });                   
            },
            update: function(options) {
                var model = options.data;             
                var promise = UserResource.update({id:model._id}, model, function(response) {    
                    if(response){                                                                       
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
                    firstName:{nullable:false, editable:true,validation:{required:true}},
                    lastName:{editable:true},
                    email:{editable:true,type:'email'},
                    username:{nullable:false, editable:true,validation:{required:true}},
                    active:{editable:true},
                    role:{nullable:false,editable:true,validation:{required:true}},
                    password:{nullable:false, editable:true,validation:{required:true}}
                }
            }
            
        },
        error: function(e) {
                    if (e.xhr.message && e.xhr.message == 'DeletingError') {
                        console.log("Error",e);
                    }
        }
    });

    var catalogRole = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        var promise = RoleResource.query({},function(data){
                            
                                if (angular.isDefined(data) && !$.isEmptyObject(data)) {
                                    options.success(data);
                                } else {
                                    options.success([]);
                                }
                           
                        });                                         
                    }
                },
                serverFiltering: false,
                schema: {
                    model: {
                        id: "_id",
                        fields:{
                            name:{},
                            descripion:{},
                            active:{}
                        }
                    }
                }
    });

    catalogRole.read();
    
    var grid = {
                control: function(container, options) {
                    var controlInput = $('<input />', {
                        name: options.field,
                        'data-bind': "value:" + options.field,
                        'ng-disabled': "false",
                        'ng-show': "true",
                        'ng-readonly': "false",
                        'id': "VA_LEMYPOUTIW4503_DIOT879",
                        'kendo-combo-box': "",
                        'ng-class': '',
                        'k-data-source': "ctrl.catalogRole",
                        'k-data-text-field': "'name'",
                        'k-data-value-field': "'_id'",
                        'k-template': "",                                              
                        'data-value-primitive': "true"
                    });
                    controlInput.appendTo(container);
                }
    };

    var gridColumns = [  
            {
                field: "firstName",
                title: 'First Name',
                width: "20%"                                     
            },{
                field: "lastName",
                title: 'Last Name',
                width: "20%"                                     
            },{
                field: "email",
                title: 'Email',
                width: "15%"                                     
            },{
                field: "username",
                title: 'Username',
                width: "10%"                                     
            },{
                field: "active",
                title: 'Active',
                width: "10%"                                     
            },{
                field: "role",
                title: 'Role',
                width: "20%",
                editor: grid.control,
                template: "<span ng-class='' ng-bind='ctrl.catalogRole.get(dataItem.role._id).name'></span>"                                     
            },{ command: [{
                id: "edit",
                name: "edit",
                template: "<a class='k-button k-grid-edit' href='' style='min-width:16px;'><span class='k-icon k-edit'></span></a>"
                },
                {
                id: "destroy",
                name: "destroy",
                template: "<a class='k-button k-grid-delete' href='' style='min-width:16px;'><span class='k-icon k-delete'></span></a>"
                }], title: "&nbsp;", width: "15%" }];
             
    var toolbar = [ /*{ name: "create", text: $filter('translate')('user.home.createLabel')},*/
            { template: "<button type='button' class='k-button' ng-click='ctrl.showDetails($event)'><span translate='user.home.createLabel'></span></button>",
              imageclass: "k-icon k-i-pencil",
              text: $filter('translate')('user.home.createLabel'),
              click:showDetails }]

    var gridOptions = {
         editable: {
            mode: "inline"         
          }
    };

    var wnd = $("#user-dialog")
                        .kendoWindow({
                            title: $filter('translate')('user.home.createLabel'),
                            modal: true,
                            visible: false,
                            resizable: false,
                            width: 300
                        }).data("kendoWindow");

    var detailsTemplate = kendo.template($("#template").html());

    var showDetails = function(e) {
                    e.preventDefault();
                    /*var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                    wnd.content(detailsTemplate(dataItem));*/
                    wnd.content(detailsTemplate({}));
                    wnd.center().open();
                }


    ctrl.toolbar = toolbar;
    ctrl.gridDataSource = gridDataSource;
    ctrl.gridColumns = gridColumns;    
    ctrl.catalogRole = catalogRole;      
    ctrl.gridOptions = gridOptions;
    ctrl.showDetails = showDetails;
  
    }]);
}(window.angular));