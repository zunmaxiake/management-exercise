$(function() {
    setMenu('meeting');
    CheckBoxInitial("chkAll","chkMeeting");
    $('.dropdown-toggle').dropdown();
    page = new Page(10,'tableToFilter','meetingsTbody');
});

function edit(mid){
    $.post('/meeting/load',{mid: mid}, function (data) {
        if (data == 200) {
            forward('/meeting/edit?meetingid=' + mid);
        } else {
            alert("未知错误！")
        }
    });
}

function meeting(mid,status) {
    var str = '';
    var url = '';
    switch (status) {
        case 'inprogress':
            str = '是否确认开始会议';
            break;
        case 'finish':
            str = '是否确认结束会议';
            break;
        default :
            break;
    }
    if (confirm(str)) {
        $.ajax({
            url: '/meeting/' + mid,
            type: 'patch',
            data: {status: status},
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.code == 500) {
                    alert("未知错误");
                } else if (data.code == 400) {
                    alert("数据错误,请刷新页面重试");
                } else if (data.code == 309) {
                    if(confirm("是否结束正在进行的会议？")){
                        $.ajax({
                            url: '/meeting/' + data.id,
                            type: 'patch',
                            data: {status: 'finish'},
                            dataType: 'json',
                            async: false,
                            success: function (data) {
                                if (data == 500) {
                                    alert("未知错误");
                                } else if (data == 400) {
                                    alert("数据错误,请刷新页面重试");
                                }
                                $.ajax({
                                    url: '/meeting/' + mid,
                                    type: 'patch',
                                    data: {status: 'inprogress'},
                                    dataType: 'json',
                                    async: false,
                                    success: function (data) {
                                        if (data == 500) {
                                            alert("未知错误");
                                        } else if (data == 400) {
                                            alert("数据错误,请刷新页面重试");
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
                window.location.reload();
            }
        });
    }
}

function del(id){
    if (confirm("是否确定删除该项？") == true) {
        $.ajax({
            url: '/meeting/' + id,
            type: 'delete',
            dataType: 'json',
            success: function (data) {
                if(data !== 200) alert(data+",删除会议报错！");
                window.location.reload();
            }
        });
    }
}

function dels(){
    if (confirm("是否确定删除选中项？") == true) {
        var meetings = [];
        var chk = $("input[id^='chk']:checked");
        if (chk.length == 0) {
            return alert("请选中需要操作的项");
        }
        $(chk).each(function () {
            meetings.push($(this).val());
        });
        $.ajax({
            url: '/meeting/' + id,
            type: 'delete',
            dataType: 'json',
            success: function (data) {
                if(data !== 200) alert(data+",删除会议报错！");
                window.location.reload();
            }
        });
    }
}

function download(id){
    if (confirm("是否确定打包下载会议记录？") == true) {
        $.get('/meeting/download/'+id,function(data) {
            if (data.statusCode == 200) {
                window.location.href = "http://" + location.hostname + ":" + data.port + data.nginxDownload + "/" + id + ".zip";
            } else if (data.statusCode == 500) {
                alert(data.error);
            } else {
                alert("zip包正在生成中，请稍后")
            }
        });
    }
}

function copyMeeting(mid){
    if(confirm("是否复制一条会议记录？")){
        $.ajax({
            url: '/meeting/copy',
            type: 'post',
            data:{mid:mid},
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    window.location.reload();
                }else{
                    alert(data.error);
                    window.location.reload();
                }
            }
        });
    }
}