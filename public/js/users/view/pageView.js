var pageView = Backbone.View.extend({
    tagName:"nav",
    className:"pagePosition",
    events:{
        "click #firstPage" : "firstPage",
        "click #prePage" : "prePage",
        "click #nextPage" : "nextPage",
        "click #lastPage" : "lastPage",
        "click #aimPage" : "aimPage",
        "keydown #pageno" : "keyMethod"
    },
    initialize:function(){
        this.listenTo(this.collection,"afterFetcherUsers",this.render);
        this.render();
    },    
    render:function(){
        this.totalPages=this.collection.totalPages;
        this.totalDatas=this.collection.totalDatas;
        this.pageIndex=this.collection.pageIndex;        
        var html = ['<ul style="margin-right:25px;color:#99a2aa;display:inline" class="pagination">',
        this.getFirst(),                
        this.getPre(),
        this.getNext(),
        this.getLast(),
        '</ul>',
        '<ul style="color:#99a2aa;display:inline" class="pagination">',
        this.getPageInfo(),
        this.getAim(),
        '</ul>'];
        var htmlStr = this.totalPages>1?html.join(''):'';
        this.$el.append(htmlStr);
        return this;
    },
    getFirst:function(){
        var firstLi = (this.pageIndex ===1) ? "<li class = 'disabled'>" : "<li>";
        var first = [firstLi,
        '<a id="firstPage" style="float:none;">首 页</a>',
        '</li>'];
        return first.join('');
    },
    getPre:function(){
        var preLi=(this.pageIndex ===1) ? "<li class = 'disabled'>" : "<li>";
        var pre = [preLi,
        '<a id="prePage" style="float:none;">上一页</a>',
        '</li>'];
        return pre.join('');
    },
    getNext:function(){
        var nextLi = (this.pageIndex === this.totalPages) ? "<li class = 'disabled'>" : "<li>";
        var next = [nextLi,
        '<a id="nextPage" style="float:none;">下一页</a>',
        '</li>'];
        return next.join('');
    },
    getLast:function(){
        var lastLi = (this.pageIndex === this.totalPages) ? "<li class = 'disabled'>" : "<li>";
        var last = [lastLi,
        '<a id="lastPage" style="float:none;">末 页</a>',
        '</li>'];
        return last.join('');
    },
    getPageInfo:function(){
        var pageInfo = ['<span id="divFood">',
        '<divfood display="" float="left">第',
        this.pageIndex,
        '页/共',
        this.totalPages,
        '页</divfood>',
        '</span>'];
        return pageInfo.join('');
    },
    getAim:function(){
        var aim = ['<input id="pageno" value=',
        this.pageIndex,
        ' class="form-control">',
        '<li style="margin-right:20px;">',
        '<a id="aimPage" style="float:none;border-radius:4px;">GO</a></li>'];
        return aim.join('');
    },
    firstPage:function(){
        if(this.pageIndex !=1){
            this.collection.trigger("changeCondition",{pageIndex:1});
        }
    },
    prePage:function(){
        if(this.pageIndex !=1){
            this.collection.trigger("changeCondition",{pageIndex:this.pageIndex-1});                
        }        
    },
    nextPage:function(){
        this.collection.trigger("changeCondition",{pageIndex:this.pageIndex+1});
    },
    lastPage:function(){
        this.collection.trigger("changeCondition",{pageIndex:this.totalPages});
    },
    aimPage:function(){
        var reg = new RegExp("^[0-9]*$");
        var pageIndex = $.trim(this.$el.find("#pageno").val());
        if(reg.test(pageIndex)){
            pageIndex = parseInt(pageIndex);
            if(pageIndex <=this.totalPages && pageIndex >=1 && pageIndex !=this.pageIndex){
                return this.collection.trigger("changeCondition",{pageIndex:pageIndex});
            }
        }
        return this.collection.trigger("changeCondition",{pageIndex:this.pageIndex});
    },
    keyMethod:function($event){
        if($event.keyCode==13){
            this.go();
        }
    }
})