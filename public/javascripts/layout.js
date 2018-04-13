/**
 * Created by kpin on 2015/8/7.
 */
function modifyPwd(){
    $('#modifyPwd').show(500);
    $('#btnPwd').addClass('disabled');
}

function cancelPwd(){
    $('#modifyPwd').hide(500);
    $('#btnPwd').removeClass('disabled');
}

function modifyPwdSave(id,_oldPwd){
    var oldPwd = $('#oldPwd').val();
    var newPwd = $('#newPwd').val();
    var confirmPwd = $('#confirmPwd').val();
    if(oldPwd == '' || newPwd == '' || confirmPwd == ''){
        return $("#statusPwd").errorShow("密码不能为空！");
    }
    if(oldPwd != _oldPwd){
        return $("#statusPwd").errorShow("原始密码不正确！");
    }
    if(newPwd != confirmPwd){
        return $("#statusPwd").errorShow("两次输入的密码不一致！");
    }
    var admin = {
        id: id,
        name:"超级管理员",
        unit:"超级管理员",
        position:"超级管理员",
        account:"admin",
        password:newPwd,
        role:"admin"
    };
    $.post("/attendees/update",admin,function(data) {
        if(data == 200){
            alert('密码修改成功！');
        }else if (data.code == 200) {
            alert("密码修改错误，代码："+data);
        }
        cancelPwd();
    });
}