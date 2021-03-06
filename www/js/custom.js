var base_url="http://cdgi.edu.in/olympiad_science/app/";

var app = angular.module('myApp', ['ngCordova', 'ngRoute']);

function goto(url) {
    location.hash = "/" + url;
}

function msToTime(duration) {

    var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

// ngRoute config goes here 

app.config(function($routeProvider) {

    $routeProvider

    .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'home'
    })

    .when('/home', {
    templateUrl: 'pages/menu.html',
    controller: 'navigation'
    })

    .when('/notification', {
        templateUrl: 'pages/notification.html',
        controller: 'notification'
    })

    .when('/register', {
        templateUrl: 'pages/register.html',
        controller: 'register'
    })

    .when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'login'
    })

    .when('/syllabus', {
        templateUrl: 'pages/syllabus.html',
        controller: 'syllabus'
    })

    .when('/test', {
        templateUrl: 'pages/test.html',
        controller: 'test'
    });

})

app.controller('home', function($scope,$location) {

    if(localStorage.enrollment && localStorage.enrollment != "null")
    {
        $location.path('/home').replace();
        console.log(localStorage.getItem("enrollment"));
    }

    $scope.register = function() {
        goto('register');
    }

    $scope.login = function() {
        goto('login');
    }

    $scope.about = function() {
        window.open(base_url+'pdf/About.pdf', '_system');
    }
    
});

app.controller('navigation', function($scope) {

    $scope.about = function() {
        window.open(base_url+'pdf/About.pdf', '_system');
    }

    $scope.notification = function() {
        goto('notification');
    }

    $scope.result = function() {
        window.open(base_url+'api/result.php', '_system');
    }

    $scope.syllabus = function() {
        goto('syllabus');
    }

    $scope.test = function() {
        goto('test');
    }

    $scope.logout = function() {
        localStorage.setItem("enrollment","null");
        goto('');
    }

    $scope.offers = function(){
        window.open(base_url+'api/offers.php', '_system');
    }

})

app.controller('syllabus',function($scope){

    $scope.class11 = function(){   
        window.open(base_url+'pdf/class11.pdf', '_system'); 
    };

    $scope.class12 = function(){
        window.open(base_url+'pdf/class12.pdf', '_system'); 
    };

})

app.controller('notification', function($scope, $http) {

    componentHandler.upgradeDom();

    $scope.notify_data = [];
    $scope.notify_hide = true;

    $http.get(base_url+'api/notify.php').then(function(response) {
            $scope.notify_data = response.data;
            $scope.notify_hide = false;
        },

        function() {
            $('#notification .error-div').removeClass('hide');
            $scope.notify_hide = true;
        })

})

app.controller('register', function($scope,$http,$location) {
    
    // this forces mdl library to re-draw DOM for form elements
    componentHandler.upgradeDom();

    $scope.data = {};
    $scope.school_list = [];
    $scope.data.session = '2016-17';
    $scope.data.board = 'CB';
    $scope.data.school = '1';
    $scope.data.standard = '11';
    $scope.data.email = '';
    $scope.data.from_where = 'School';

    $(".popup").show();
    $(".popup .loading").show();

    $http.get(base_url+'api/school_list.php')
            .success(function(data, status, headers, config) {

                if(data.status=='1')
                {
                    $(".popup .loading").hide();
                    $(".popup").hide();
                    $scope.school_list = data.school_list;
                }
                else
                {
                    $(".popup .loading").hide();
                    $(".popup .server_error").show();
                }
            }).
            error(function(data, status, headers, config) {
                $(".popup .loading").hide();
                $(".popup .error button").hide();
                $(".popup .error").show();
               
            });


    $scope.login = function(){
        $location.path('/login').replace();
    }

    $scope.try_again = function(){
       $(".popup").hide();
       $(".popup .error").show();
    }

    $scope.submit = function() {

        var text = '';

        if ($scope.data.name == '' || $scope.data.name == undefined) {
            text += 'Name is required\n';
        }
        if ($scope.data.father == '' || $scope.data.father == undefined) {
            text += 'Father Name is required\n';
        }
        if ($('#register .ng-invalid').val()) {
            text += 'Invalid E-mail id\n';
        }
        if ($scope.data.mobile == '' || ('' + $scope.data.mobile).length != 10) {
            text += 'Invalid Mobile Number\n';
        }
        if ($scope.data.scholar == '' || $scope.data.scholar == undefined) {
            text += 'Invalid scholar Number\n';
        }
        if ($scope.data.address == '' || $scope.data.address == undefined) {
            text += 'Address required\n';
        }

        if (text.length != 0) {
            alert(text);
        }
        else
        {
            $(".popup").show();

            var parameter = JSON.stringify($scope.data);
            var url = base_url+'api/register.php';
            
            $http.post(url,parameter).
            success(function(data, status, headers, config) {
                console.log(data);
                if(data.status=='1')
                {
                    $scope.enroll_id = data.enrollment_no;
                    $(".popup .loading").hide();
                    $(".popup .success").show();
                }
                else if(data.status=='2')
                {
                    $(".popup .loading").hide();
                    $(".popup .already_member").show();
                }
                else
                {
                    $(".popup .loading").hide();
                    $(".popup .server_error").show();
                }
            }).
            error(function(data, status, headers, config) {
                $(".popup .loading").hide();
                $(".popup .error").show();
            });

        }
    
    }
})


app.controller('test', function($scope, $http, $timeout) {

    componentHandler.upgradeDom();

    ansArray = [];
    correctAnsArray = [];

    // keep selected ans marked
    $scope.selected = 0;

    //variable to keep track of timer
    var time = 3600000;

    question_num = 0;
    marks = 0;

    $(".loading-div").show();

    $http.get(base_url+'api/test_list.json').then(function(response) {
        
        $scope.papers = response.data;
        $(".test-list").show();
        $(".loading-div").hide();

    },
    function() {

        componentHandler.upgradeDom();

        $(".loading-div").hide();
        $(".error-div").show();
    })

    $scope.mock_test = function(i) {
        
        var std = (localStorage.enrollment).substring(5,7);

        $(".test-list").hide();
        $(".loading-div").show();

        $http.get(base_url+'api/test/'+std+'/Test-'+i+'.json').then(function(response) {
                $scope.test_data = response.data;
                $(".loading-div").hide();
                $(".test-area").show();
                
                //question_num = -1; 
                $scope.init_test();
                
                $timeout(function(){
                    $scope.timer();
                },1000)
            },
            function() {
                componentHandler.upgradeDom();

                $(".loading-div").hide();
                $(".error-div").show();
            })
    }

    $scope.setAns = function(id) {
        
        // Double click to de-select
        if(id == $scope.selected)
        {
            $scope.selected = 0;
        }
        else
        {
            ansArray[question_num] = id;
            $scope.selected = id;
        }

        ansArray[question_num] =  $scope.selected;
        console.log(ansArray);
    }

    $scope.init_test = function(){

        // this disable prev-btn
        $scope.prev = true;

        $scope.question = $scope.test_data[question_num].question;
        $scope.choices = $scope.test_data[question_num].choices;

        correctAnsArray[question_num] = $scope.test_data[question_num].answer;

        $scope.Qcount = question_num + 1;

        $scope.selected = ansArray[question_num];

        if (question_num == $scope.test_data.length) {
            $scope.next = true;
        }
    }

    $scope.next_question = function() {
        
        question_num = question_num + 1;

        // this disable prev-btn
        $scope.prev = true;

        // if qsn_ctn != 0 then enable prev-btn
        if (question_num != 0) {
            $scope.prev = false;
        }

        $scope.question = $scope.test_data[question_num].question;
        $scope.choices = $scope.test_data[question_num].choices;

        correctAnsArray[question_num] = $scope.test_data[question_num].answer;

        $scope.Qcount = question_num+1;

        $scope.selected = ansArray[question_num];

        if (question_num == $scope.test_data.length) {
            $scope.next = true;
        }
    }

    $scope.prev_question = function() {
        
        question_num = question_num - 1;
        
        $scope.Qcount = question_num+1;
        $scope.prev = true;

        if (question_num != 0) {
            $scope.prev = false;
        }

        $scope.question = $scope.test_data[question_num].question;
        $scope.choices = $scope.test_data[question_num].choices;
        
        $scope.selected = ansArray[question_num];

        if (question_num == $scope.test_data.length) {
            $scope.next = true;
        }
    }

    $scope.submit_test = function() {

        var Val = confirm('Do you want to submit ?');

        if (Val == true) {
            $(".test-div").hide();
            $(".result-div").show();

            $scope.result();
        } else {
            return;
        }
    }

    $scope.timer = function(){

        if(location.hash == "#/test")
        {
            time=time-1000;

            if(time<600000)
            {
                 $(".timer h3").addClass("red");
            }
            
            if(time == 0)
            {
                console.log(time);
                $(".test-div").hide();
                $(".result-div").show();
                $scope.result();
                return;
            }

            $(".timer h3").text(msToTime(time));

            $timeout(function()
            {
                if($scope.result_score == undefined) $scope.timer();
            },1000)
        }
    }

    $scope.result = function() {
        var attempted_num = 0;
        var correct_num = 0;

        for (var i = 0; i < ansArray.length; i++) {
            if (ansArray[i] == correctAnsArray[i]) {
                marks = marks + 5;
                correct_num = correct_num + 1;
            }
        }

        for (var i = 0; i < ansArray.length; i++) {
            if (ansArray[i] != 0) {
                attempted_num++;
            }
        }

        $scope.result_score = marks;
        $scope.result_correct_ans = correct_num;
        $scope.result_qsn_attempt = attempted_num;
    }
})

app.controller('login', function($scope,$http,$location){

    componentHandler.upgradeDom();

    $scope.data = {enrollment:"",password:""};

    $scope.login = function(){

        if($scope.data.enrollment!="" && $scope.data.password!="")
        {
            console.log($scope.data.enrollment);
            
            url =base_url+'api/login.php';
            
            var parameter = JSON.stringify($scope.data);
            $http.post(url,parameter).
            success(function(data, status, headers, config) {

                if(data.status=='1')
                {
                    $location.path('/home').replace();
                    localStorage.setItem("enrollment",$scope.data.enrollment);
                }
                else if(data.status=='2')
                {
                    alert("Invalid Enrollment or Password\nTry again");
                }
                else
                {
                    alert("Internal Error occured.\nTry again later");
                }
            }).
            error(function(data, status, headers, config) {
               alert("Opps! No Internet\nCheck WIFI or Mobile Network");
            });
        }
    }

})
