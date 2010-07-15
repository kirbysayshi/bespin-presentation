/*
    FireSlides!

    They might be on fire. Maybe.

    Up/Down arrow goes Next/Prev slide

*/
    
(function($){

var FS = function(options){
    var defaults = {
         vSelector: "#fire-view"
        ,srSelector: "#fire-slider"
        ,sSelector: ".fire-slide"
        ,vWidth: 1024
        ,vHeight: 768
        ,sWidth: 1024
        ,sHeight: 768
        ,tDuration: 400
    };

    // setup private members
    var  self = this
        ,ings = $.extend({}, defaults, options);

    // setup refs
    var $lider = $(ings.vSelector).find(ings.srSelector);

    // need this for later
    ings.maxX = ($lider.height() - $lider.find(ings.sSelector + ":eq(0)").height()) * -1;
    ings.sPos = [0,0];

    // setup keybindings
    $(document).bind("keydown", onKeyDown);

    // control callbacks, only kill event if key does something
    function onKeyDown(e){
        switch(e.keyCode){
            case 38: // up arrow
                e.preventDefault();
                prevSlide();
                break;
            case 40: // down arrow
                e.preventDefault();
                nextSlide();
                break;
            case 27: // escape
                e.preventDefault();
                gotoStart();
                break;
        }
    }

    // movement
    function nextSlide(){
        //var p = tup($lider.position());
        if( ings.sPos[0] - ings.sHeight < ings.maxX ) return;
        else {
            //$lider.css({"top": (ings.sPos[0] - ings.sHeight) + "px" });
            //$lider.animate( {"top": (ings.sPos[0] - ings.sHeight)}, ings.tDuration );
            $lider
                //.animate({}, ings.tDuration/2)
                .animate( {
                    "top": (ings.sPos[0] - ings.sHeight)
                    //, "opacity": 0
                }, ings.tDuration );
            ings.sPos[0] -= ings.sHeight;
        }
    }

    function prevSlide(){
        //var p = tup($lider.position());
        if( ings.sPos[0] + ings.sHeight > 0 ) return;
        else {
            //$lider.css({"top": (ings.sPos[0] + ings.sHeight) + "px" });
            $lider
                //.animate({"opacity": 0}, ings.tDuration/2)
                .animate( {
                    "top": (ings.sPos[0] + ings.sHeight)
                    //, "opacity": 1
                }, ings.tDuration );
            ings.sPos[0] += ings.sHeight;
        }
    }

    function gotoStart(){
        $lider
            .animate( {
                "top": 0
            }, ings.tDuration*3 );
        ings.sPos[0] = 0;
    }

    // util
    function tup(obj){
        var a = [];
        for(var i in obj){
            if(obj.hasOwnProperty(i)) a.push(obj[i]);
        }
        return a;
    }
}

// expose to the world!
window.FS = FS;

})(jQuery);
