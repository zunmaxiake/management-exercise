_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var signatureInfoItemView = Backbone.View.extend({
    //itemTemplate: _.template($("#item-template").html()),
    tagName: "tr",
    events: {

    },
    initialize: function () {
        //this.listenTo(this.collection, "all", this.render);
        var that = this;
        this.getTrTmp()
        .then(function(){
            return that.render(that.model);
        })
    },
    render: function (data) {
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
        this.getData("/template/getting/getSignatureInfoTr")
        .then(function (data) {
            self.trTemplate = _.template(data);
            return def.resolve()
        })
        return promise;
    }
})