var TEMPLETE_FRAME_URL = '/template/getting/getFrameTemplate',
    TEMPLETE_FRAME_NAME = 'frameTemplate';

var frameUtil = {
    getTemplate:function(url){
        var def = $.Deferred();
        var promise = def.promise();
        $.get(url,function(data){
            return def.resolve(data);
        })
        return promise;
    }
}