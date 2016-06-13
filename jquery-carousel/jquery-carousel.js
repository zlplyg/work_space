(function($,window,document,undefined){
    $.fn.tab = function(options){
        var defaults = {
            color:"red",
            backgroundColor: '#55ccb4',
            mark : true,
            prevButton : "",
            nextButton : "",
            times : "3000",
            mouseover : false,
            click : true
        };
        var str = $.extend({},defaults,options);
        $this.each(function(){
            var $this = $(this);
            $this.find("li").eq(0).css({
                "color" :str.color,
                "backgroundColor" : str.backgroundColor
            });
            if(str.click == "true"){
                $this.find("li").bind("click",Move);
            }
            if(str.mouseover = "true"){
                $this.find("li").bind("mouseover",Move);
            }
            function Move(){
                var oindex = $(this).index();
                $(this).css({
                    "color":str.color,
                    "backgroundColor":str.backgroundColor
                }).siblings("li").css({
                    "color":"",
                    "backgroundColor":""
                });
                $this.find(".pj-tab").eq(oindex).show().siblings(".pj-tab").hide();
                num = oindex;
            }

            if(str.mark == "true"){
                var num = 0;
                setInterval(paly,str.times);
            }

            function paly(){
                num ++;
                if(num > $($this).find("li").size()){
                    num = 0;
                }
                publicFn();
            }

            function publicFn(){
                $this.find("li").eq(num).css({
                    "color":str.color,
                    "backgroundColor":str.backgroundColor
                }).sibling({
                    "color":"",
                    "backgroundColor":""
                });
                $this.find(".pj-tab").eq(num).show().sibling(".pj-tab").hide();
            }
            if(str.prevButton != ""){
                var oPrev = str.prevButton;
                $(oPrev).on("click",function(){
                    if(num == 0){
                        num = $this.find("li").size();
                    }
                    num --;
                    publicFn();
                });
            }
            if(str.nextButton != ""){
                var oNext = str.nextButton;
                $(oNext).on("click",function(){
                    pay();
                });
            }

        });
        return this;
    };

    $.fn.CutString = function(options) {
        var defaults = {
            "numbers": "200",
            "lastStr": "..."
        };
        var str = $.extend({}, defaults, options);
        this.each(function() {
            var oThis = $(this);
            oThis.each(function() {
                var oText = $(this).text().substring(1, str.numbers) + str.lastStr;
                $(this).text(oText)
            })
        });
        return this
    };

    $.fn.Carousel = function(options){
        var defaults = {
            "backgroundColor": "red",
            "play": "true",
            "auto": "true",
            "prevButton": "",
            "nextButton": "",
            "AnTimer": "800",
            "playTimer": "5000",
            "WidthMax": "false",
            "fade": "false",
            "eventClick": "false"
        };
        var str = $.extend({}, defaults, options);
        this.each(function(){
            var $this = $(this);
            $this.each(function(){
                if(str.WidthMax == "true"){
                    $this.find(".pj-Carousel").css("width",$(document).width());
                    var oboxWidth  = $(document).width();
                }else{
                    var oboxWidth = $this.find(".pj-Carousel").width();
                }
                var oCarouseL = $this.find(".pj-Carousel-box");
                var oItemSize = $this.find(".pj-Carousel-item").size();
                var oActive = $this.find(".pj-Carousel-active");
                var oItem = $this.find(".pj-Carousel-item");
                oCarouseL.css({"width":oboxWidth * oItemSize + "px"});
                var color = "";
                for(var i = 0;i<oItemSize;i++){
                    color += "<div class ='pj-Carousel-color'> </div>"
                }
                oActive.append(color);
                var colorBg = $this.find(".pj-Carousel-color").css("background");
                console.log(colorBg);
                $this.find(".pj-Carousel-color").eq(0).addClass("active");
                oActive.css("marginLeft",(oboxWidth-oActive.width())  / 2 + "px");
                oItem.css("width",oboxWidth);
                if(str.eventClick == "true"){
                    $this.find(".pj-Carousel-color").on("click",Toevent);
                }else{
                    $this.find(".pj-Carousel-color").on("mouseover",Toevent);
                }

                function Toevent(){
                    var oIndex = $(this).index();
                    $(this).addClass("active").siblings(".pj-Carousel-color").removeClass("active");
                    if(str.fade == "true"){
                        $this.find(".pj-Carousel-item").eq(oIndex).fadeIn(str.WidthMax).siblings(".pj-Carousel-item").fadeOut(str.WidthMax);
                    }else{
                        oCarouseL.animate({
                            "left" : -oboxWidth * oIndex + "px"
                        },str.AnTimer);
                    }
                    num = oIndex;
                }
                var num = 0;
                var timer = null;
                if(str.fade == "true"){
                    oItem.css({
                        "clear": "both",
                        "position": "absolute",
                        "left": "0",
                        "top": "0"
                    });
                    oItem.eq(0).show().siblings(".pj-Carousel-item").hide();
                }
                if(str.auto == "true"){
                    timer = setInterval(plays,str.playTimer);
                }

                function plays(){
                    if(str.play == "true"){
                        num ++;
                        if(num >= oItemSize){
                            num  = 0;
                        }
                        publicFn();
                    }else if (str.play == "false") {
                        if (num >= 0 && num < oItemSize - 1) {
                            num++;
                            publicFn();
                        }
                    }
                }

                function publicFn(){
                    $this.find(".pj-Carousel-color").eq(num).addClass("active").siblings(".pj-Carousel-color").removeClass("active");
                    if (str.fade == "true") {
                        $this.find(".pj-Carousel-item").eq(num).fadeIn(str.AnTimer).siblings(".pj-Carousel-item").fadeOut(str.AnTimer)
                    } else {
                        oCarouseL.animate({
                                "left": -oboxWidth * num + "px"
                            },
                            str.AnTimer)
                    }
                    if (str.prevButton != "") {
                        var oPrev = str.prevButton;
                        $($this.find(oPrev)).bind("click",
                            function() {
                                oCarouseL.stop(true, true);
                                if (str.play == "true") {
                                    if (num == 0) {
                                        num = oItemSize;
                                    }
                                    num--;
                                    publicFn();
                                }
                                if (str.play == "false") {
                                    if (num > 0 && num < oItemSize) {
                                        num--;
                                        publicFn();
                                    }
                                }
                            });
                    }
                    if (str.nextButton != "") {
                        var oNext = str.nextButton;
                        $($this.find(oNext)).bind("click",
                            function() {
                                oCarouseL.stop(true, true);
                                if (str.play == "true") {
                                    num++;
                                    if (num >= oItemSize) {
                                        num = 0
                                    }
                                    publicFn();
                                }
                                if (str.play == "false") {
                                    if (num >= 0 && num < oItemSize - 1) {
                                        num++;
                                        publicFn();
                                    }
                                }
                            });
                    }

                }

                $this.find(".pj-Carousel").bind("mouseover",
                    function() {
                        clearInterval(timer);
                    });
                $this.find(".pj-Carousel").bind("mouseout",
                    function() {
                        timer = setInterval(plays, str.playTimer);
                    })

            });
        });
        return this;
    }
})(jQuery, window, document);