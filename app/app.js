(function(angular){
'use strict';
    /*
    * Main module of the application.
    */
angular
    .module('TeamsApp', [
        'ui.router',
        'ngAnimate',
        'ui.bootstrap',     
        'ngSanitize',    
        'ngTouch',
        'ngResource',
        'chart.js',
        'oc.lazyLoad',
        'ngStorage',
        'pascalprecht.translate',
        'angularUtils.directives.dirPagination'        
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',"$translateProvider", "$translatePartialLoaderProvider",
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $translateProvider, $translatePartialLoaderProvider) {
            
            // Application routes
            $stateProvider
                .state('app', {
                    'abstract': true,
                    views:{
                        'main':{
                            templateUrl: 'views/common/layout.html'
                        }
                    },
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', 
                        function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('global');
                            return $translate.refresh();
                        }]
                    }
                    
            });
            // For unmatched routes
            $urlRouterProvider.otherwise('home');

            $translateProvider.useLoader('$translatePartialLoader', {
                  urlTemplate: '/app/assests/languages/{lang}/{part}.json'
            });

            $translateProvider.preferredLanguage('es-ES');            

            $ocLazyLoadProvider.config({
                debug: false,
                events: false
            });
    }])
    .run(['$http', '$window','$rootScope', '$state', 
        function ($http, $window, $rootScope, $state) {
            // add JWT token as default auth header
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
           // $rootScope.$state = $state;
           // $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                window.scrollTo(0, 0);
                $rootScope.activeTab = toState.data.activeTab;
            });

           $http.get('/api/user/session/current').then(function(res){
                $rootScope.user=res.data;
                
            }, function(res){
                console.log("Error",res);
            });
            FastClick.attach(document.body);           
        }
    ]);

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;
            console.log(token);
            angular.bootstrap(document, ['TeamsApp']);
        });
    });


}(window.angular));



