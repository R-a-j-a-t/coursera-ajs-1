(function(){
'use strict';

    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems',foundItemsDirective);

    function foundItemsDirective(){
        var ddo = {
            templateUrl: 'foundItemsShow.html',
            scope: {
                found: '<',
                onRemove: '&'
            }
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){

        var nwc = this;

        nwc.search = "";
        nwc.message = ""

        nwc.found = [];

        nwc.getMenu = function(){

            nwc.found.splice(0,nwc.found.length);

            if(nwc.search == 0){
                nwc.message = "Nothing found!";
                nwc.found.splice(0,nwc.found.length);
            }
            else{
                var promise = MenuSearchService.getMatchedMenuItems(nwc.search);

                promise.then(function(response){
                    
                    nwc.found = response;

                    if(nwc.found.length == 0){
                        nwc.message = "Nothing found!";
                    }
                    else{
                        nwc.message = "";
                    }
                    
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        }

        nwc.removeItem = function(index){
            nwc.found.splice(index,1);
        };
        
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService( $http){

        var service = this;
        var foundItems = [];

        service.getMatchedMenuItems = function(searchTerm){

            return  $http({
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function(response){

                var data = response.data.menu_items;
                searchTerm = searchTerm.toLowerCase();

                for(var i = 0; i < data.length; i++){
                    
                    var desc = data[i].description;
                    
                    if(desc.includes(searchTerm)){
                        foundItems.push(data[i]);
                    }
                }//end of for

                return foundItems;

            },function(error){
                var message = "Oops! Something went wrong. Try Again.";
                return message;
            });  
        };
    }
})();