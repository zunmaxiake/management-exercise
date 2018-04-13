/**
 * Created by yy on 2015/1/26.
 */
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.trimAll=function(){
    return this.replace(/(\s)/g, "");
};

$.fn.errorShow = function(message){
    var t = $(this).html(message);
    t.fadeIn();
    setTimeout(function(){
        t.fadeOut();
    },5000);
};


$(function(){
    //var height = window.innerHeight;//document.body.offsetHeight;
    //$("#contain").css("height",'1080');
    //window.innerHeight
    $('.tabWhite').css('min-height',$(window).height()*.65);
    $('.backWhite').css('min-height',$(window).height()*.70);
    $(window).resize(function(){
        $('.tabWhite').css('min-height',$(window).height()*.65);
        $('.backWhite').css('min-height',$(window).height()*.70);
    })
});
function setMenu(id){
    $("#"+id).addClass("bg-color");
}
function CheckBoxInitial(allId,subId) {
    var chklist = $("input[id^='" + subId + "']");
//    var checkfault = $("input[id^='" + subId + "']:checkbox");
    var checkfault = $("input:checkbox");
    checkfault.each(function () {
        $(this).prop("checked", false);
    });
    $("#" + allId).click(function () {
        var value = $("#" + allId).prop("checked");
        value = value == undefined ? false : value;
        chklist.each(function () { $(this).prop("checked", value); });
    });

    chklist.each(function () {
        $(this).click(function () {
            $("#" + allId).prop("checked", $(this).prop("checked"));
            chklist.each(function (index) {
                $("#" + allId).prop("checked", ($("#" + allId).prop("checked") && chklist.eq(index).prop("checked")) ? true : false);
            });
        });
    });
}

function CheckBoxInitial2(allId,subId) {
    var chklist = $("input[id^='" + subId + "']");
//    var checkfault = $("input[id^='" + subId + "']:checkbox");
//    var checkfault = $("input:checkbox");
//    checkfault.each(function () {
//        $(this).prop("checked", false);
//    });
    $("#" + allId).click(function () {
        var value = $("#" + allId).prop("checked");
        value = value == undefined ? false : value;
        chklist.each(function () { $(this).prop("checked", value); });
    });

    chklist.each(function () {
        $(this).click(function () {
            $("#" + allId).prop("checked", $(this).prop("checked"));
            chklist.each(function (index) {
                $("#" + allId).prop("checked", ($("#" + allId).prop("checked") && chklist.eq(index).prop("checked")) ? true : false);
            });
        });
    });
}

function forward(url){
    window.location.href=url;
}

function setGuidHeader(name){
    $(".guideHeader").find("div[id^='guide']").removeClass('active');
    $(".guideHeader").find("div[id="+name+"]").addClass('active');
}
function d(config,cb){
    $.ajax({
        url:config.url,
        data:config.data,
        type:'delete',
        dataType:'json',
        async:false,
        success:function(data){
            if(config.mid){cb(config.mid,data);}
            else cb(data);
        }
    })
}

function liCheckBoxInitial(str) {
    var chklist = $("ul."+str+" input[id^='member']");
//    var checkfault = $("input[id^='" + subId + "']:checkbox");
    var checkfault = $("input:checkbox");
    checkfault.each(function () {
        $(this).prop("checked", false);

    });
    var allchk = "#" + str + "Chk";
    $(allchk).click(function () {
        var value = $(allchk).prop("checked");
        value = value == undefined ? false : value;
        var chklist1 = $("ul."+str+" input[id^='member']");
        chklist1.each(function () { $(this).prop("checked", value); });
    });

    chklist.each(function () {
        $(this).unbind('click').bind('click',function () {
            $(allchk).prop("checked", $(this).prop("checked"));
            chklist.each(function (index) {
                $(allchk).prop("checked", ($(allchk).prop("checked") && chklist.eq(index).prop("checked")) ? true : false);
            });
        });
    });
}

function liCheckBoxInitial2(str) {
    var chklist = $("ul."+str+" input[id^='unit']");
//    var checkfault = $("input[id^='" + subId + "']:checkbox");
    var checkfault = $("input:checkbox");
    checkfault.each(function () {
        $(this).prop("checked", false);

    });
    var allchk = "#" + str + "Chk";
    $(allchk).click(function () {
        var value = $(allchk).prop("checked");
        value = value == undefined ? false : value;
        var chklist1 = $("ul."+str+" input[id^='unit']");
        chklist1.each(function () { $(this).prop("checked", value); });
    });

    chklist.each(function () {
        $(this).unbind('click').bind('click',function () {
            $(allchk).prop("checked", $(this).prop("checked"));
            chklist.each(function (index) {
                $(allchk).prop("checked", ($(allchk).prop("checked") && chklist.eq(index).prop("checked")) ? true : false);
            });
        });
    });
}

//验证网址
function isUrl(str_url){
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
      + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
      + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
      + "[a-z]{2,6})" // first level domain- .com or .museum
      + "(:[0-9]{1,4})?" // 端口- :80
      + "((/?)|" // a slash isn't required if there is no file name
      + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re=new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)){
        return (true);
    }else{
        return (false);
    }
}