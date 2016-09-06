var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        app.loadAssets("animate.css","css");
        app.loadAssets("style.css","css");
        app.loadAssets("jquery-2.1.4.min.js","js");
        app.loadAssets("main.html","html");
        app.loadAssets("custom.js","js");
    },

    loadAssets: function(filename,filetype){
        if (filetype=="js"){
            var fileref=document.createElement('script')
            fileref.setAttribute("type","text/javascript")
            fileref.setAttribute("src", "js/"+filename)
        }
        else if (filetype=="css"){
            var fileref=document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", "css/"+filename)
        }
        else if (filetype=="html")
        {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementsByTagName("body")[0].innerHTML+=xhttp.responseText;
                }
            };
            xhttp.open("GET",filename, true);
            xhttp.send();
        }

        if (typeof fileref!="undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)
    }
};

app.initialize();
document.addEventListener('DOMContentLoaded',app.onDeviceReady);
