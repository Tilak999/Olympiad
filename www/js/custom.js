var main = {
    // logic Constructor

    prevPage : "#flash-screen",

    initialize: function() {
        window.addEventListener("hashchange", main.hashchange);
        $(".page").addClass("animated");
        location.hash = "home";
    },

    //hash change handler
    hashchange: function(){
        
        var hash = location.hash;

        if(hash == "")
        {
            console.log("Quit");
            return;
        }

        $(main.prevPage).hide();
        $(hash).show();

        main.prevPage = hash;
    },

    goto: function(hash){
            location.hash = hash;
        }
}

var app = angular.module("myApp", []);

app.controller("homeController", function($scope) {
    $scope.notification = 
        main.goto('notification');

});

setTimeout(main.initialize, 1500);