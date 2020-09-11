(function(){
    'use strict';

    var items = [{name:"Pens",
                quantity: "5"},
                {name:"Notebooks",
                quantity:"5"},
                {name:"A4 Sheets",
                quantity:"10"},
                {name:"Graphs",
                quantity:"7"},
                {name:"Rulers",
                quantity:"2"}];

    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var buyList = this;

        buyList.buy = ShoppingListCheckOffService.getItems();

        buyList.display = function(){
            return buyList.buy.length === 0;
        };

        buyList.transferItem = function(itemIndex){
            ShoppingListCheckOffService.transferItem(itemIndex, buyList.buy);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var boughtList = this;

        boughtList.bought = ShoppingListCheckOffService.showItems();

        boughtList.display = function(){
            return boughtList.bought.length === 0;
        };
    }

    function ShoppingListCheckOffService(){
        var service = this;

        var buy = items;
        var bought = [];

        service.getItems = function(){
            return buy;
        };

        service.showItems = function(){
            return bought;
        };

        service.transferItem = function(itemIndex, item){
            var boughtItem = {
                name: buy[itemIndex].name,
                quantity: buy[itemIndex].quantity
            };
            bought.push(boughtItem);

            item.splice(itemIndex,1);
        };
    }
})();