var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.loadAssets("animate.css", "css");
        app.loadAssets("style.css", "css");
        setTimeout(function() {
            $("#flash-screen").hide();
            location.hash = '/home';
        }, 1500);
    },

    loadAssets: function(filename, filetype) {
        if (filetype == "js") {
            var fileref = document.createElement('script')
            fileref.setAttribute("type", "text/javascript")
            fileref.setAttribute("src", "js/" + filename)
        } else if (filetype == "css") {
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", "css/" + filename)
        }

        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)
    }
};

app.initialize();
document.addEventListener('DOMContentLoaded', app.onDeviceReady);