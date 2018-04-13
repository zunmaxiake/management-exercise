var bool = false;
$(function(){
  $(".spanDown").click(meetingTimeSort)
});

function meetingTimeSort(){
  var table = document.getElementById('tableToFilter');
  var len = table.rows.length;
  if(bool == false) {
    for (var i = 2; i < len; i++) {
      for (var j = 1; j < i; j++) {
        var tt1 = table.rows[i].cells[1].innerText;
        var tt2 = table.rows[j].cells[1].innerText;
        var dd1 = new Date(tt1).getTime();
        var dd2 = new Date(tt2).getTime();
        if (dd1 < dd2) {
          var per = table.rows[i].innerHTML;
          table.rows[i].innerHTML = table.rows[j].innerHTML;
          table.rows[j].innerHTML = per;
        }
      }
    }
    $(".spanDown").css({"transform": "rotate(180deg)"});
    bool = true;
  }else{
    for (var ii = 2; ii < len; ii++) {
      for (var jj = 1; jj < ii; jj++) {
        var tt3 = table.rows[ii].cells[1].innerText;
        var tt4 = table.rows[jj].cells[1].innerText;
        var dd3 = new Date(tt3).getTime();
        var dd4 = new Date(tt4).getTime();
        if (dd3 > dd4) {
          var bar = table.rows[ii].innerHTML;
          table.rows[ii].innerHTML = table.rows[jj].innerHTML;
          table.rows[jj].innerHTML = bar;
        }
      }
    }
    $(".spanDown").css({"transform": "rotate(360deg)"});
    bool = false;
  }
}

function filterStatus(obj){
  var table = document.getElementById('tableToFilter');
  var len = table.rows.length;
  var selectedStatus = $(obj).text();
  for (var i = 1; i < len; i++) {
    table.rows[i].style.display = "";
    if(selectedStatus !== '全部') {
      var status = table.rows[i].cells[2].innerText;
      if (status.indexOf(selectedStatus) == -1) {
        table.rows[i].style.display = "none"
      }
    }
  }
}