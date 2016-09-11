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
        $scope.selector_hide = false;
        $("#test .error-div").addClass("hide");
    };

    $scope.register = function(){
        main.goto('register');
    };

});

app.controller("register", function($scope) {

    $scope.session = "2016-17";
    $scope.board = "CBSE";
    $scope.school = "National Public School";

    $scope.submit= function(){

         var text = "";

         if($scope.name == "" || $scope.name == undefined)
         {
             text +="Name is required\n";
         }
         if($scope.father == "" || $scope.father == undefined)
         {
             text +="Father Name is required\n";
         }
         if($("#register .ng-invalid").val())
         {
            text +="Invalid E-mail id\n";
         }
         if($scope.mobile == "" || (""+$scope.mobile).length<10)
         {
             text +="Invalid Mobile Number\n";
         }
         if($scope.scholar == "" || $scope.scholar == undefined)
         {
             text +="Invalid scholar Number\n";
         }

         if(text.length !=0)
         {
             alert(text);
         }
    };

});

app.controller("test",function($scope,$http) {
    
    $scope.loading = false;

    $scope.pattern = function(type) {
        $scope.type = type;
        $scope.loading = true;
        $scope.$parent.selector_hide = true;

        $http.get("js/notify.json").then(function (response) {
            $scope.test_data = response.data;
            $scope.loading = false;
        },
        function(){
            console.log("error");
            $("#test .error-div").removeClass("hide");
            $scope.loading = false;
        });
    }
})