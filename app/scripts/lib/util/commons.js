(function(angular){
	'use strict'	
	angular.module('TeamsApp')
	.factory('Commons', function () {		
		return {
			openReport :function (url, title){
				var win = window.open(url, title);
				if(win){
				    //Browser has allowed it to be opened
				    win.focus();
				}else{
				    //Broswer has blocked it
				    alert('Please allow popups for this site');
				}
			}
		}
	});		
	
	
	
}(window.angular));


