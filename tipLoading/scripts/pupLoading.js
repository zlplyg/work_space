function Tip(content){
    var pup=$("<div class='pupLoading tip'><span>"+(content||"")+"</span></div>");
    if(window.pupTip==undefined){
        $("body").append(pup);
        window.pupTip=pup;
        setTimeout(function(){
            pup.addClass("in");
            setTimeout(function(){
                pup.removeClass("in");
                setTimeout(function(){
                    pup.remove();
                    window.pupTip=undefined;
                },500);
            },2000);
        },0)
    }
}