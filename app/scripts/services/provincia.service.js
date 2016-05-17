(function(angular){
	'use strict';

angular.module('TeamsApp')
    .factory('ProvinciaResource', function ($resource) {
        return $resource('/api/provincia/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
}(window.angular));