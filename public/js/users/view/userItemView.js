_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var userItemView = Backbone.View.extend({
    tagName: "tr",
    events: {
        "click .deleteUser":"deleteUser",
        "mouseenter":"addBackcolor",
        "mouseleave":"removeBackcolor"
    },
    initialize: function () {
        var that = this;
        this.getTrTmp()
        .then(function(){
            return that.render(that.model);
        })
    },
    render: function (data) {
        console.log("data:",data)
        this.$el.append(this.trTemplate(data.attributes));
    },
    getData: function (url) {
        var def = $.Deferred();
        var promise = def.promise();
        $.get(url, function (data) {
            return def.resolve(data);
        });
        return promise
    },
    getTrTmp: function () {
        var def = $.Deferred();
        var promise = def.promise();
        var self = this;
        this.getData("/template/getting/getUserTr")
        .then(function (data) {        
            self.trTemplate = _.template(data);
            return def.resolve()
        })
        return promise;
    },
    deleteUser:function(){
        if(confirm("确认删除该用户吗？")){
            this.model.destroy();
            this.collection.trigger('remove');
        }
    },
    addBackcolor:function(){
        this.$el.css({"background-color":"#eee"});
    },
    removeBackcolor:function(){
        this.$el.css({"background-color":""});
    }
})