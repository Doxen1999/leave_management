$( document ).ready(function() {
    gettime();
    current_date();
  $("#username_name").html(sessionStorage.getItem("username"));
  console.log(host);
  show_school_year();
});
var hour;
var minute;
var secound;
var host = window.location.hostname;
function getUsercount() {
    $.ajax({
        url: "http://"+host+"/leave_management/assets/php/usercount.php",
        type: "GET",
        success: function (data) {
            var user = JSON.parse(data);
            var usercount = user[0].usercount;
            $("#userdata_count").html(usercount+"\tคน");
            clearconsole(); 
        },
        error: function (error) {
            console.log(error);
        }
    })
}


function gettime(){
     setInterval(()=>{
         hour = new Date().getHours();
         minute = new Date().getMinutes();
         secound = new Date().getSeconds();
         $("#userdata_time").html(formatTime(hour)+":"+formatTime(minute)+":"+formatTime(secound));
  },1000)
}

function formatTime(time) {
    if (time.toString().length < 2) {
        var str = "0" + time.toString();
        return str;
    }
    else {
        return time;
    }
}


function format ( d ) {
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>ชื่อ:</td>'+
            '<td>'+d.f_name+"\t"+d.l_name+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>รหัสบุคลากร:</td>'+
            '<td>'+d.person_id+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
}
 
$(document).ready(function() {
    var table = $('#table_show_leave_today').DataTable( {
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": false,
      "autoWidth": false,
        "ajax": {
            "url": "http://"+host+"/leave_management/assets/php/user_datapush.php",
            "dataSrc": ""
        },
        "columns": [
            { "data": "person_id"},
            { "data": "prefix" },
            { "data": "f_name" },
            { "data": "l_name" },
        ]
    } );
     
    // $('#example tbody').on('click', 'td.details-control', function () {
    //     var tr = $(this).closest('tr');
    //     var row = table.row( tr );
 
    //     if ( row.child.isShown() ) {
    //         row.child.hide();
    //         tr.removeClass('shown');
    //     }
    //     else {
    //         row.child( format(row.data()) ).show();
    //         tr.addClass('shown');
    //     }
    // } );




    var table_leave_page = $('#leave_page_user_selector').DataTable( {
        "paging": true,
      "lengthChange": false,
      "searching": true,
      "ordering": true,
      "info": false,
      "autoWidth": false,
        "ajax": {
            "url": "http://"+host+"/leave_management/assets/php/user_datapush.php",
            "dataSrc": ""
        },
        'columnDefs': [
            {
               'targets': 0,
               'checkboxes': {
                  'selectRow': true
               }
            },
         ],
        "columns": [
            { "data": "person_id" },
            { "data": "person_id" },
            { "data": "prefix" },
            { "data": "f_name" },
            { "data": "l_name" },
        ],
        "select": {
            items: 'multi'
        }
    } );

    // คุมevent
   $('#insert_cher_person').on('submit', function(e){
    var form = this;
    
    var rows_selected = table_leave_page.column(0).checkboxes.selected();
    var count = 0  ;
    // แสดงค่า ที่ เรากด checkbox
    $.each(rows_selected, function(index, rowId){
       // สร้าง element ลอย
       $(form).append(
           $('<input>')
              .attr('type', 'hidden')
              .attr('name', "id[]")
              .val(rowId)
       );

       count = count +1 ;
    });
    if(count<1){
        toastr.error('ต้องเลือกบุคลากรมากกว่า 0');
    } else{
        sessionStorage.setItem("goven_leave_person",$(form).serialize());
    }
    $('input[name="id\[\]"]', form).remove();
    e.preventDefault();
 });   


 var show_user_data = $('#table_show_leave_user').DataTable( {
    "paging": true,
    "lengthChange": false,
    "searching": false,
    "ordering": true,
    "info": false,
    "autoWidth": false,
      "ajax": {
          "url": "http://"+host+"/leave_management/assets/php/user_datapush.php",
          "dataSrc": ""
      },
      "columns": [
          { "data": "person_id"},
          { "data": "prefix" },
          { "data": "f_name" },
          { "data": "l_name" },
          { "data": "dep_discription" },
          { "data": "detail" },
      ]
  } );

  var show_user_data_edit = $('#table_show_edit_user').DataTable( {
    "paging": true,
    "lengthChange": false,
    "searching": false,
    "ordering": true,
    "info": false,
    "autoWidth": false,
      "ajax": {
          "url": "http://"+host+"/leave_management/assets/php/user_datapush.php",
          "dataSrc": ""
      },
      "columns": [
          { "data": "person_id"},
          { "data": "prefix" },
          { "data": "f_name" },
          { "data": "l_name" },
          { "data": "dep_discription" },
          { "data": "edituser" },
      ]
  } );
} );



function popup_data(data){
          sessionStorage.setItem("userdata", data);
          window.location.href = "http://"+host+"/leave_management/user_management_userdata.html";
}

var date;
var month;
var year;
function current_date(){
    date = new Date().getDate();
    month = new Date().getMonth();
    year = new Date().getFullYear();
    var month_arr=["1","2","3","4","5","6","7","8","9","10","11","12"];
    var month_thaiformat=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
    $("#current_date").html(date+"\t"+month_thaiformat[month]+"\t"+(year+543));
    var patterns = (year+543)+"-"+formatTime(month_arr[month])+"-"+formatTime(date);
    sessionStorage.setItem("current_date" , patterns)
}
function get_current_date(){
    date = new Date().getDate();
    month = new Date().getMonth();
    year = new Date().getFullYear();
    var month_arr=["1","2","3","4","5","6","7","8","9","10","11","12"];
    return patterns = year+"-"+formatTime(month_arr[month])+"-"+formatTime(date);
}
function show_school_year(){
    $.ajax({
        "url" : "http://" + host + "/leave_management/assets/php/getschoolyear.php",
        "method" : "GET",
        success :function(result){
            if(result != null){
               localStorage.setItem("school_year", result);
               $(".school_year_status").html("ปีงบประมาณที่\t"+result);
            }
        },error : function(error){
            console.log(error);
        }
    })
}

