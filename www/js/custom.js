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

   $scope.about = function(){
        //main.goto('result');
        window.open('pdf/About.pdf','_system');
   };
   
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
        //main.goto('result');
        window.open('pdf/Result.pdf','_system');
    };

    $scope.syllabus = function(){
        //main.goto('syllabus');
        window.open('pdf/Syllabus.pdf','_system');
        console.log("okk");
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
    $scope.test_hide = true;
    
    CurrentAns = 0;
    ansArray = [];
    correctAnsArray = [];

    question_num = 0;
    marks = 0;

    $scope.pattern = function(type) {
        $scope.type = type;
        $scope.loading = true;
        $scope.$parent.selector_hide = true;

        $http.get("js/test.json").then(function (response) {
            $scope.test_data = response.data;
            $scope.loading = false;
            $scope.test_hide = false;
            question_num = 0;
            $scope.next_question();
        },
        function(){
            console.log("error");
            $("#test .error-div").removeClass("hide");
            $("#test .test-area").addClass("hide");
            $scope.loading = false;
        });
    }

    $scope.setAns = function(id)
    {
        CurrentAns = id;
    }

    $scope.next_question = function()
    {
        $scope.prev = true;
        
        if(question_num != 0)
        {
            $scope.prev = false;
            ansArray[question_num-1] = CurrentAns;
            console.log(ansArray);
        }

        $scope.question = $scope.test_data[question_num].question;
        $scope.choices = $scope.test_data[question_num].choices;
        correctAnsArray[question_num] = $scope.test_data[question_num].answer;

        $scope.Qcount = question_num + 1;
        question_num = question_num + 1;

        CurrentAns = 0;

        if(question_num == $scope.test_data.length)
        {
            $scope.next = true;
        }
    }

    $scope.prev_question = function()
    {
        $scope.Qcount = question_num;
        question_num = question_num - 1;
        $scope.prev = true;
        
        if(question_num != 0)
        {
            $scope.prev = false;
        }

        $scope.question = $scope.test_data[question_num].question;
        $scope.choices = $scope.test_data[question_num].choices;

        if(question_num == $scope.test_data.length)
        {
            $scope.next = true;
        }
    }

    $scope.submit_test = function()
    {
        ansArray[question_num-1] = CurrentAns;

        var Val = confirm("Do you want to submit ?");
        
        if(Val == true)
        {
            $scope.test_hide = true;
            $scope.result();
        }
        else
        {
            return;
        }
    }

    
    $scope.result = function()
    {
        var i; var j=0;

        for(i=0; i < ansArray.length; i++)
        {
            if(ansArray[i] == correctAnsArray[i])
            {
                marks = marks + 5;
                j = j+1;
            }
        }

        $scope.result_score = marks;
        $scope.result_correct_ans = j;
        $scope.result_qsn_attempt = i;
    }
})