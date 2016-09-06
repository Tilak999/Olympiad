var main = {
    // logic Constructor

    prevPage : "#flash-screen",

    initialize: function() {
        window.addEventListener("hashchange", main.hashchange);
        location.hash = "home";
        $(".page").addClass("animated fadeInUp");
        $(".button").click(main.buttonClicked);
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

    buttonClicked : function() {
        location.hash = $(this).attr("data-link");
    }
}

setTimeout(main.initialize, 1500);