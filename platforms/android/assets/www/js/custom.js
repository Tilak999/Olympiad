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

app.controller("Controller", function($scope,$http) {
    
   $scope.notify_data = [];
   $scope.notify_hide = true;
    $scope.notification = function(){
        main.goto('notification');
        
        $http.get("js/notify.json").then(function (response) {
            $scope.notify_data = response.data;
            $scope.notify_hide = false;
        },
        function(){
            console.log("error");
            $("#notification .error-div").removeClass("hide");
            $scope.notify_hide = false;
        });
    };

    $scope.result = function(){
        main.goto('result');
    };

    $scope.syllabus = function(){
        main.goto('syllabus');
    };

    $scope.test = function(){
        main.goto('test');
    };

    $scope.register = function(){
        main.goto('register');
    };

});