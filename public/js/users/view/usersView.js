var usersView = Backbone.View.extend({
    //el: ".col-sm-10",
    // el: "#meetingsTbody",
    tagName:"div",
    className:"middleContent col-sm-10",    
    events:{
        "click .btn.btn-primary" : "renderCreateUser",
        "click #searchBtn" : "search",
        "click #btnPre" : "goPre",
        "click #btnNext1" : "save1"
    },
    initialize:function(){   
        this.render();             
        this.listenTo(this.collection,"remove",this.renderUsers);
        this.listenTo(this.collection,"afterFetcherUsers",this.renderUsers);        
    },
    render:function(){                
        var html = ['<div class="backWhite"><div class="panel panel50">',
        '<button class="btn btn-primary" >',  //onclick="forward(&#39;\/user\/create&#39;)"
        '<span> 新建</span>',
        '</button>',
        '<div class="col-xs-3 input-group pull-right searchPanel">',
        '<span class="input-group-btn">',
        '<input id="searchInput" type="text" placeholder="请输入搜索条件" class="form-control"/></span>',
        '<span class="input-group-btn">',
        '<button id="searchBtn" class="btn btn-default">搜索</button></span>',
        '</div>',
        '</div>',
        '<table role="tabpanel" id="tableToFilter" class="table table-striped">',
        '<thead><tr>',            
        '<th style="width:5%">选择</th>',
        '<th style="width:15%">姓</th>',
        '<th style="width:10%">名</th>',
        '<th style="width:10%">年龄</th>',
        '<th style="width:10%">级别</th>',
        '<th style="width:20%">注册日期</th>',
        '<th style="width:30%"></th>',     
        '</tr></thead>',
        '<tbody id="meetingsTbody" class="userscssTb"></tbody></table></div>'];      
        this.$el.html(html.join('')); 
    },
    renderUsers:function(){
        var that = this;   
        this.$el.find(".userscssTb").empty();
        this.$el.find(".pagePosition").remove();
        console.log("this.collection:",this.collection)
        this.collection.each(function(one){
            console.log("one:",one)
            that.$el.find('.userscssTb').append(new userItemView({model:one,collection:this.collection}).el);
        })
        this.$el.find(".backWhite").append(new pageView({collection:that.collection}).el);
    },
    search:function(){
        var searchText = $("#searchInput").val().trim();
        if(searchText!=""){
            this.collection.trigger("changeCondition",{pageIndex:1,pageSize:10,condition:searchText});            
        }
        else{
            this.collection.condition = ""
            this.collection.trigger("changeCondition",{pageIndex:1,pageSize:10});
        }
    },
    renderCreateUser:function(){
        this.$el.empty();
        var html = ['<div class="col-sm-12">',
        '<div class="guideHeader row">',
        '<div id="guideCreate" class="col-sm-4 text-center">',
        '<span class="badge">1</span>',
        '<span>基本信息</span>',
        '</div>',
        '<div id="guideAttendees" class="col-sm-4 text-center">',
        '<span class="badge">2</span>',
        '<span>网络信息</span>',
        '</div>',
        '<div id="guideAgenda" class="col-sm-4 text-center">',
        '<span class="badge">3</span>',
        '<span>完成</span>',
        '</div>',
        '</div>',
        '<div class="row text-center">',
        '<div style="display:none" class="errorStatus alert alert-danger"></div>',
        '</div>',
        '<div class="row guideFooter">',
        '<button id="btnPre" class="btn btn-default">上一步</button>',//onclick="forward('/meeting')"
        '<button id="btnNext1" style="float:right" class="btn btn-default">下一步</button>',//onclick="save(0)"
        '</div>',
        '<div class="row backWhite">',
        '<div class="col-sm-offset-3 col-sm-6 minHeight2">',
        '<form role="form" style="margin-top:25%">',
        '<div style="margin-bottom:30px" class="form-group">',
        '<div class="input-group">',
        '<span class="input-group-addon">姓</span>',
        '<input id="firstName" type="text" placeholder="例：John" class="form-control">',
        '</div>',
        '</div>',
        '<div style="margin-bottom:30px" class="form-group">',
        '<div id="DTChk" data-dateformat="yyyy-mm-dd HH:ii" class="input-group date">',
        '<span class="input-group-addon">注册时间</span>',
        '<input id="regDate" type="text" readonly="readonly" class="form-control">',
        '<span class="input-group-addon">',
        '<span class="glyphicon glyphicon-calendar"></span>',
        '</span>',
        '</div>',        
        '</div>',

        '<div style="margin-bottom:30px" class="form-group">',
        '<div class="input-group">',
        '<span class="input-group-addon">钱包</span>',
        '<input id="txtMoney" type="text" class="form-control">',
        '</div>',
        '</div>',

        '</form>',
        '</div></div></div>']; 
        this.$el.html(html.join(''));   

        $('#DTChk').datetimepicker({
            language:  'zh-CN',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startDate:new Date(),
            endDate:null,
            initialDate:new Date(),
            startView: 2,
            minView: 0,
            maxView: 1,
            forceParse: 0
            //pickerPosition:"style:'top:0'"
            //showMeridian: 1
        });
        setGuidHeader('guideCreate');               
        return this;  
    },
    goPre:function(){
        this.$el.empty();
        this.render();
        this.renderUsers();
    },
    save1:function(){
        $(".errorStatus").html("").hide();
        var firstName = $('#firstName').val();
        var regDate = $('#regDate').val();
        var mmoney = $('#txtMoney').val();
        if(firstName === "" || regDate ==="") return $(".errorStatus").errorShow("姓和注册时间不允许为空");
        if(firstName.length>100) return $(".errorStatus").errorShow("姓不能超过100个字符");
        var that = this;   
        $.ajax({
            data:{firstName:firstName,mmoney:mmoney,regDate:new moment(regDate).format("YYYY-MM-DD hh:mm")},
            url:'users/create',
            type:'post',
            dataType:'json',
            async:false,
            success:function(data){
                console.log("data:",data);
                if(data.status=="fail"){
                    $(".errorStatus").errorShow("未知错误");
                }
                else if(data.status=="success"){
                    that.renderTable();
                }
                else{
                    $(".errorStatus").errorShow("无法获取人员信息，请联系系统管理员");
                }
                
                // if(data.code == 500){
                //     $(".errorStatus").errorShow("未知错误");
                // }
                // else if (data.code == 200) {
                //     that.renderTable();
                // }
                // else{
                //     $(".errorStatus").errorShow("无法获取人员信息，请联系系统管理员");
                // }
            }
        })
    }
})