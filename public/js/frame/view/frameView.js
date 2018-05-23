var frameView = Backbone.View.extend({
    el: ".row",
    events: {
        'click #userManage': "userManageGo"
    },
    initialize: function () {
        this.usersCollection = new usersCollection();               
        var initTemplatesBind = this.initTemplates.bind(this);//??
        var that = this; 
        initTemplatesBind()
            .then(function () {
                that.render();
            })
    },
    initTemplates: function () {
        var initFrame = this.initTemplate.bind(this, TEMPLETE_FRAME_URL, TEMPLETE_FRAME_NAME);
        return $.when(initFrame());//??
    },
    initTemplate: function (url, name) {
        var getTemplateBind = frameUtil.getTemplate.bind(this, url);
        var setFrameTemplateBind = this.setFrameTemplate.bind(this, name);
        return getTemplateBind().then(setFrameTemplateBind);
    },
    setFrameTemplate: function (templateName, myTemplate) {
        var def = $.Deferred();
        var promise = def.promise();
        this[templateName] = _.template(myTemplate);
        def.resolve(this[templateName]);
        return promise;
    },
    render: function () {
        this.renderFrame();
    },
    renderFrame: function () {
        this.$el.append(this[TEMPLETE_FRAME_NAME]());
    },
    userManageGo: function () {  
        setMenu('userManage');       
        this.$el.find(".middleContent").remove();
        this.usersCollection.trigger("changeCondition",{pageIndex:1,pageSize:10});
        this.$el.append(new usersView({ collection: this.usersCollection }).el);
    }
})

$(function () {
    new frameView({});
})