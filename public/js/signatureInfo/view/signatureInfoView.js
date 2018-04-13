var signatureInfoView = Backbone.View.extend({
    el: ".backWhite",
    // el: "#meetingsTbody",
    // tagName:"table",
    //className:"backWhite",    
    events:{

    },
    initialize:function(){
        var html = ['<div class="panel panel50">',
        '<button class="btn btn-primary" onclick="forward(&#39;c689339c-e87c-4f57-8b19-4f5f7fc3426a&#39;)">',
        '<span> 新建</span>',
        '</button></div>',
        '<table role="tabpanel" id="tableToFilter" class="table table-striped">',
        '<thead><tr>',            
        '<th style="width:5%">选择</th>',
        '<th style="width:15%">协议编号</th>',
        '<th style="width:10%">保密级别</th>',
        '<th style="width:10%">乙方名称</th>',
        '<th style="width:10%">订购数量</th>',
        '<th style="width:20%">订购日期</th>',
        '<th style="width:30%"></th>',     
        '</tr></thead>',
        '<tbody id="meetingsTbody"></tbody></table>',
        '<nav style="font-size:13px;text-align:right;">',
        '<ul style="margin-right:25px;color:#99a2aa;display:inline" class="pagination">',
        '<li><a onclick="firstPage();" style="float:none;">首 页</a></li>',
        '<li><a onclick="prePage();" style="float:none;">上一页</a></li>',
        '<li><a onclick="nextPage();" style="float:none;">下一页</a></li>',
        '<li><a onclick="lastPage();" style="float:none;">末 页</a></li></ul>',
        '<ul style="color:#99a2aa;display:inline" class="pagination">',
        '<span id="divFood"><divfood display="" float="left">第1页/共4页</divfood></span>',
        '<input id="pageno" class="form-control">',
        '<li style="margin-right:20px;">',
        '<a onclick="aimPage();" style="float:none;border-radius:4px;">GO</a></li></ul></nav>'];
        this.$el.html(html.join('')); 
        this.render();
        return this;
    },
    render:function(){
        var that = this;     
        this.collection.fetchData()
        .then(function(datas){
            _.each(datas.models,function(data){
                return that.renderTr(data);
            })
        })
    },
    renderTr:function(model){
        //this.$el.find("#meetingsTbody").empty();
        // this.$el.append( new signatureInfoItemView({model:model}).el);
        this.$el.find("#meetingsTbody").append( new signatureInfoItemView({model:model}).el);
    } 
})

// $(function () {
//     new signatureInfoView({collection:new signatureInfoCollection()});        
// })