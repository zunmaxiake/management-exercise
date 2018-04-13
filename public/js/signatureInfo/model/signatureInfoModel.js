var signatureInfoModel = Backbone.Model.extend({
    //urlRoot: "/signatureInfo",
    idAttribute: "_id",
    defaults: {},
    initialize: function () {

    }
})

var signatureInfoCollection = Backbone.Collection.extend({
    model: signatureInfoModel,
    fetchData: function () {
        var def = $.Deferred();
        var promise = def.promise();
        this.fetch({
            url: "/signatureInfo/data",
            success: function (collection, response, options) {
                return def.resolve(collection);
            },
            error: function (collection, response, options) {
                return def.reject("get data failed");
            }
        });
        return promise;
    }
})