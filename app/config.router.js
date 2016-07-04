(function(angular){
'use strict';

angular.module('TeamsApp')
    .config(['$stateProvider', 
        function ($stateProvider) {       
            // Application routes
            $stateProvider               
                .state('home', {
                    url: '/home',
                    parent:'app',
                    views:{
                        'content':{
                             templateUrl: 'views/dashboard.html'
                        }
                    },                   
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: [
                                        'styles/themes/default/climacons-font.css',
                                        'styles/themes/default/rickshaw.min.css'
                                    ]
                                },
                                {
                                    serie: true,
                                    files: [
                                        'bower_components/d3/d3.min.js',
                                        'scripts/lib/rickshaw/rickshaw.min.js',
                                        'scripts/lib/flot/jquery.flot.js',
                                        'scripts/lib/flot/jquery.flot.resize.js',
                                        'scripts/lib/flot/jquery.flot.pie.js',
                                        'scripts/lib/flot/jquery.flot.categories.js',
                                    ]
                                },
                                {
                                    name: 'angular-flot',
                                    files: [
                                        'bower_components/angular-flot/angular-flot.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('scripts/controllers/dashboard.js');
                            });
                        }]
                    },
                    data: {
                        title: 'Dashboard',
                    }
                }).state('app.player', {
                    url: '/player',
                    parent:'app',
                    views:{
                        'content':{
                            templateUrl: 'views/players.html',
                            controller: 'PlayerCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'player',
                                    files: [
                                        'scripts/services/player.service.js',
                                        'scripts/controllers/player.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('player');
                            return $translate.refresh();
                        }]
                    },
                    data: {
                        title: 'Players',
                    }
                }).state('app.player.new', {
                    url: '/player/new',
                    parent:'app',
                    views:{
                        'content':{
                            templateUrl: 'views/player-dialog.html',
                            controller: 'PlayerDialogCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'player-new',
                                    files: [
                                        'scripts/services/player.service.js',
                                        'scripts/controllers/player-dialog.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('player');
                            return $translate.refresh();
                        }],
                        entity : [function () {
                            return null;
                        }]
                    },
                    data: {
                        title: 'Players',
                    }
                }).state('app.team', {
                    url: '/team',
                    parent:'app',
                    views:{
                        'content':{
                            templateUrl: 'views/teams.html',
                            controller: 'TeamCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'team',
                                    files: [
                                        'scripts/services/team.service.js',
                                        'scripts/controllers/team.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('team');
                            return $translate.refresh();
                        }],
                        entity : [function () {
                            return null;
                        }]
                    },
                    data: {
                        title: 'Teams',
                    }
                })
                .state('app.provincia', {
                    parent:'app',
                    url: '/provincia',                    
                    views:{
                        'content':{
                            templateUrl: 'views/provincias.html',
                            controller: 'ProvinciaCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia',
                                    files: [                                      
                                        'scripts/services/provincia.service.js',
                                        'scripts/controllers/provincia.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('provincia');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                })
                .state('app.provincia-detail', {
                    parent:'app',
                    url: '/provincia/{id}/canton',                   
                    views:{
                        'content':{
                            templateUrl: 'views/provincia-detail.html',
                            controller: 'ProvinciaDetailCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia-detail',
                                    files: [   
                                      'scripts/services/provincia.service.js',                                    
                                      'scripts/services/provincia.canton.service.js',                                                                            
                                      'scripts/controllers/provincia-detail.controller.js'                                        
                                    ]
                                }])
                        }],
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('canton');
                            return $translate.refresh();
                        }]
                    }, data :{

                    }
                })
                .state('app.canton', {
                    parent:'app',
                    url: '/canton',                    
                    views:{
                        'content':{
                            templateUrl: 'views/cantones.html',
                            controller: 'CantonCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'canton',
                                    files: [                                      
                                        'scripts/services/canton.service.js',
                                        'scripts/controllers/canton.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('canton');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                })
                .state('app.canton-detail', {
                    parent:'app',
                    url: '/canton/{id}/parroquia',                   
                    views:{
                        'content':{
                            templateUrl: 'views/canton-detail.html',
                            controller: 'CantonDetailCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'provincia-detail',
                                    files: [   
                                      'scripts/services/canton.service.js',                                    
                                      'scripts/services/canton.parroquia.service.js',                                                                            
                                      'scripts/controllers/canton-detail.controller.js'                                        
                                    ]
                                }])
                        }],
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('parroquia');
                            return $translate.refresh();
                        }]
                    }, data :{

                    }
                }).state('app.parroquia', {
                    parent:'app',
                    url: '/parroquia',                    
                    views:{
                        'content':{
                            templateUrl: 'views/parroquias.html',
                            controller: 'ParroquiaCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'parroquia',
                                    files: [                                      
                                        'scripts/services/parroquia.service.js',
                                        'scripts/controllers/parroquia.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('parroquia');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                })
                .state('app.role', {
                    parent:'app',
                    url: '/role',                    
                    views:{
                        'content':{
                            templateUrl: 'views/roles.html',
                            controller: 'RoleCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'role',
                                    files: [                                      
                                        'scripts/services/role.service.js',
                                        'scripts/controllers/role.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('role');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                }).state('app.user', {
                    parent:'app',
                    url: '/user',                    
                    views:{
                        'content':{
                            templateUrl: 'views/users.html',
                            controller: 'UserCtrl as ctrl'
                        }
                    },                    
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'role',
                                    files: [                                      
                                        'scripts/services/user.service.js',
                                        'scripts/services/role.service.js',
                                        'scripts/controllers/user.controller.js'                                        
                                    ]
                                }])
                        }],
                         translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('user');
                            return $translate.refresh();
                        }]
                    },
                    data : {

                    }
                });               
    }]);
}(window.angular));