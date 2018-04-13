var indexView = Backbone.View.extend({
    el:".row",
    events:{
        'click #signatureInfoID' : "signatureInfoIDHref"
    },
    initialize:function(){
        var html = ['<div class="logobg logo">',
        '<span style="font-size:35px;color:white;margin:5px 0 0 10px;">GBMANAGEMENT</span>',
        '<span style="font-size:20px;color:white;">管理系统</span>',
        '<ul style="margin-right:50px;" class="navbar-nav nav navbar-left pull-right">',
        '<div data-toggle="modal" data-target="#userModal" data-backdrop="static" style="color:white;cursor:pointer;" class="navbar-brand navbarnav">用户名：xxx</div>',
        '<div onclick="location.href=&#39;/login&#39;" style="color:white;cursor:pointer;" class="navbar-brand navbarn">注销</div></ul></div>',
        '<div class = "col-sm-2 mp0" style="position: fixed;left:0;top:66px;">',
        '<div class="col-sm-9 mp0">',
        '<ul id="contain" class="menu text-center">',
        '<li><a id="signatureInfoID">菜单1</a></li>',
        '<li><a id="meeting" href="/meeting">菜单2</a></li>',
        '<li><a id="meeting" href="/meeting">菜单3</a></li>',
        '<li><a id="meeting" href="/meeting">菜单4</a></li>',
        '</ul></div></div>',
        '<div style="left:14%;top:86px;margin-left:8px;" class="col-sm-10">',
        '<div class="backWhite">',
        '</div></div>',
        '<div><nav class="navbar navbar-default navbar-fixed-bottom footer">',
        'Copyright 上海金桥信息股份有限公司 2010 沪ICP备09095147号</nav></div>'];
        this.$el.html(html.join(''));
        return this;
    },
    signatureInfoIDHref:function(){
        this.$el.find(".backWhite").empty();
        this.$el.find(".backWhite").append(new signatureInfoView({collection:new signatureInfoCollection()}));
    }
})

$(function(){
    new indexView({});
})