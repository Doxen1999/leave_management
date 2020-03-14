$(document).ready(function () {
    document.getElementById("start_school_year").value = get_current_date();
    getschool_year();
    check_year_in_table();
});

$( document ).ready(function() {
    select_leave();
    govenor_type();
    province_loop();
    burden_loop();
    select_pushdata();
    $("#cancle_edit_person").hide();
    $("#edit_person").hide();
    get_personleave_today(sessionStorage.getItem("current_date"))
  });

  jQuery('.birthday_insert').datetimepicker(
    {
   lang:'th',
   timepicker:false,
   yearOffset:543,
   format:'Y-m-d'
}
);
jQuery('.start_date_insert').datetimepicker(
    {
   lang:'th',
   timepicker:false,
   yearOffset:543,
   format:'Y-m-d'
}
);
jQuery('.start_school_year').datetimepicker(
    {
   lang:'th',
   timepicker:false,
   yearOffset:543,
   format:'Y-m-d'
}
);
jQuery('.end_school_year').datetimepicker(
    {
   lang:'th',
   timepicker:false,
   yearOffset:543,
   format:'Y-m-d'
}
);

function get_personleave_today(currentdate){
    $.ajax({
        "url":"http://" + host + "/leave_management/assets/php/getleavetoday.php",
        "method" : "POST",
        "data" : {
               currentdate : currentdate
        },
        success:function(result){
  $("#today_leave_count").html(result+"\tคน");
        }

    })
}


function manage_userdata(userid) {
    $.ajax({
        "url": "http://" + host + "/leave_management/assets/php/manage_userdata.php",
        "method": "POST",
        "data": { userid: userid },
        success: function (result) {
            var data = JSON.parse(result);
            var datainformation = data[0]
            $(".prefix_show").html(datainformation.prefix);
            $(".name_show").html(datainformation.f_name + "\t" + datainformation.l_name);
            $(".person_id_show").html(datainformation.person_id);
            $(".lisdep_dis_show").html(datainformation.listdep_dis);
            $(".dep_discription_show").html(datainformation.dep_discription);
            $(".type_description_show").html(datainformation.type_description);
            $(".sai_discription_show").html(datainformation.sai_discription);
            $(".position_dis_show").html(datainformation.position_dis);
            $(".p_discription_show").html(datainformation.p_discription);
            $(".side_dis_show").html(datainformation.side_dis);
        }, error: function (error) {
            console.log(error);
        }
    })
}

function setavartar(prefixs) {

    if (prefixs == 2 || prefixs == 3) {
        document.getElementById("avarimg").src = "http://" + host + "/leave_management/assets/pic/avartar/female.png";
    } else {
        document.getElementById("avarimg").src = "http://" + host + "/leave_management/assets/pic/avartar/male.png";
    }
}

function getdata_insert() {
    var personid = $(".person_id").val();
    var prefix = $(".prefix_id").val();
    var firstname = $(".first_name").val();
    var lastname = $(".last_name").val();
    var sai = $(".person_sai_insert").val();
    var academic = $(".person_academic_insert").val();
    var persontype = $(".person_type_insert").val();
    var birth = $(".birthday_insert").val();
    var start_date = $(".start_date_insert").val();
    var department = $(".local_dep_insert").val();
    var side = $(".side_list_insert").val();
    var listdepartment = $(".list_dep_insert").val();
    var position = $(".position_order_insert").val();
    var status_income = $(".status_incom_insert").val();
    var status = $(".person_status_insert").val();

    if (personid && prefix && firstname && lastname && sai && academic && persontype && birth && start_date && department && side && listdepartment && position && status_income && status != null) {
        $.ajax({
            "url": "http://" + host + "/leave_management/assets/php/insertperson.php",
            "method": "POST",
            "data": {
                personid: personid,
                prefix: prefix,
                firstname: firstname,
                lastname: lastname,
                sai: sai,
                academic: academic,
                persontype: persontype,
                birth: birth,
                start_date: start_date,
                department: department,
                side: side,
                listdepartment: listdepartment,
                position: position,
                status_income : status_income,
                status : status

            },
            success: function (result) {

                toastr.success("เพิ่มคุณ\t" + firstname + "\t" + lastname + "\tเรียบร้อยแล้ว");

                insert_new_user_to_leave_stat(personid,persontype);
                $(".person_id").val(null);
                $(".prefix_id").val(1);
                $(".first_name").val(null);
                $(".last_name").val(null);
                $(".person_sai_insert").val(1);
                $(".person_academic_insert").val(1);
                $(".person_type_insert").val(1);
                $(".birthday_insert").val(null);
                $(".start_date_insert").val(null);
                $(".local_dep_insert").val(1);
                $(".side_list_insert").val(1);
                $(".list_dep_insert").val(1);
                $(".position_order_insert").val(1);
                $(".status_incom_insert").val(1);
                $(".person_status_insert").val(1);
            }, error: function (error) {
                console.log(error);
            }
        })
    } else {
        toastr.error('กรุณากรอกข้อมูลให้ครบ');
    }
}
function insert_school_year() {
    var access = 0;
    var school_year = $("#school_year_insert").val();
    var phase = $("#phase_insert").val();
    var start_school_year = $(".start_school_year").val();
    var end_date = $(".end_school_year").val();
    var strformat = school_year + "/" + phase;
    if ((school_year && phase && start_school_year != null) && (end_date != 0)) {
        access = 1;
    }
    $.ajax({
        "url": "http://" + host + "/leave_management/assets/php/insertschoolyear.php",
        "method": "POST",
        "data": {
            access: access,
            strformat: strformat,
            start_school_year: start_school_year,
            end_date: end_date,
        },
        success: function (result) {
            if (result == 1) {
                $.notify("เพิ่มปีงบประมาณสำเร็จ", { position: " bottom right ", className: "success" });
                $("#school_year_insert").val(null);
                $("#phase_insert").val(0);
                $(".start_school_year").val(null);
                $(".end_school_year").val(null);
                update_school_year_active(strformat);
            } else if (result == 2) {
                $.notify("มีปีงบประมาณอยู่แล้ว", { position: " bottom right ", className: "error" });
                $("#school_year_insert").val(null);
                $("#phase_insert").val(0);
                $(".start_school_year").val(null);
                $(".end_school_year").val(null);
            } else if (result == 0) {
                $.notify("กรุณาใส่ข้อมูลให้ครบถ้วน", { position: " bottom right ", className: "error" });
            }
            getschool_year();
        }, error: function (error) {
            console.log(error);
        }
    })
}


function get_maxleave_date(value) {
    $.ajax({
        "url": "http://" + host + "/leave_management/assets/php/get_maxleave.php",
        "method": "POST",
        "data": {
            value: value,
        },
        success: function (result) {
            if (value == 0) {
                $("#leave_1").val(null);
                $("#leave_2").val(null);
                $("#leave_3").val(null);
                $("#leave_4").val(null);
                $("#leave_5").val(null);
                $("#leave_6").val(null);
            } else {
                var data = JSON.parse(result);
                var datainformation = data[0];
                $("#leave_1").val(datainformation.sick_leave);
                $("#leave_2").val(datainformation.pregnant_leave);
                $("#leave_3").val(datainformation.help_pregnant_leave);
                $("#leave_4").val(datainformation.activity_leave);
                $("#leave_5").val(datainformation.vacation_leave);
                $("#leave_6").val(datainformation.monk_leave);
            }

        }, error: function (error) {
            console.log(error);
        }
    })
}

function update_maxleave_date(){
    var access =1;
    var sick_leave =  $("#leave_1").val();
    var pregnant_leave = $("#leave_2").val();
    var help_pregnant_laeve = $("#leave_3").val();
    var activity_leave = $("#leave_4").val();
    var vacation_leave = $("#leave_5").val();
    var monk_leave = $("#leave_6").val();
    var value = $(".person_type_insert").val();
    $.ajax({
        "url": "http://" + host + "/leave_management/assets/php/updatemaxleave.php",
        "method": "POST",
        "data": {
            value : value,
            access : access,
            sick_leave : sick_leave,
            pregnant_leave : pregnant_leave,
            help_pregnant_laeve : help_pregnant_laeve,
            activity_leave : activity_leave,
            vacation_leave : vacation_leave,
            monk_leave:monk_leave,

        },
        success: function (result) {
           if(result ==1){
            $.notify("อัพเดทวันลาสูงสุดสำเร็จ", { position: " bottom right ", className: "success" });
           }else if(result == 2){
            $.notify("อัพเดทวันลาสูงสุดไม่สำเร็จ", { position: " bottom right ", className: "error" });
           }

        }, error: function (error) {
            console.log(error);
        }
    })
}
function getschool_year(){
    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/pushschoolyear.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $("#getschoolyear option[value='"+(data[i].school_year_id)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $("#getschoolyear").append(`<option class='schoolyear' value= ${data[i].school_year_id} >`+data[i].school_year_id+"</option>");
      }
        },error : function(error){
            console.log(error);
        }

    })
}

function update_school_year_active(active_school_year){
     $.ajax({
         "url" : "http://" + host + "/leave_management/assets/php/activeyear.php " ,
         "method" : "POST",
         "data" : {
            active_school_year : active_school_year,
         },
         success  :function(result){
             if (result == 1 ){
                $.notify("กำหนดปีงบประมาณสำเร็จ", { position: " bottom right ", className: "success" });
                show_school_year();
                check_year_in_table();
                setmaxleaveintable();
             }else if (result == 2){
                $.notify("กำหนดปีงบประมาณไม่สำเร็จ", { position: " bottom right ", className: "error" });
             }
             
         },error : function(error){
             console.log(error);
         }
     })
}

function setmaxleaveintable(){
    $.ajax({
        "url" : "http://" + host + "/leave_management/assets/php/setuserallintable.php " ,
        "method" : "POST",
        success  :function(result){
            
               $.notify("กำหนดวันลาสูงสุดในปีงบประมาณสำเร็จ", { position: " bottom right ", className: "success" });
               
           
            
        }
    })
}

function check_year_in_table(){
    var get_current_year = $("#getschoolyear").val();
    console.log(get_current_year);
$.ajax({
    "url" : "http://" + host + "/leave_management/assets/php/yearcheck.php",
    "method" : "POST",
    "data" : {
        get_current_year : get_current_year,
    },
    success : function(result){
        if(result == 0){
            $( "#insert_data_allintable" ).prop( "disabled", false );
        }else if(result == 1){
            $( "#insert_data_allintable" ).prop( "disabled", true );
        }

    },error : function(error){
        console.log(error);
    }
})
}

function get_current_leave(userid){
    var userdata =userid;
    var active_year = localStorage.getItem("school_year");
    $.ajax({
        "url" : "http://" + host + "/leave_management/assets/php/get_current_leave_status.php",
        "method" : "POST",
        "data" : {
              userdata : userdata,
              active_year : active_year,
        },success : function(result){
               data=JSON.parse(result);
               info = data[0];
               $("#current_year_datamangement").html("วันลาคงเหลือ\t(ปีงบประมาณที่\t"+localStorage.getItem("school_year")+")");
               $("#sick_leave_current").html("ลาป่วย :\t"+info.sick_leave+"\tวัน");
               $("#pregnant_leave_current").html("ลาคลอด :\t"+info.pregnant_leave+"\tวัน");
               $("#help_pregnant_leave_current").html("ลาไปช่วยเหลือภริยาคลอดบุตร :\t"+info.help_pregnant_leave+"\tวัน");
               $("#activity_leave_leave_current").html("ลากิจ :\t"+info.activity_leave+"\tวัน");
               $("#vacation_leave_leave_current").html("ลาพักผ่อน :\t"+info.vacation_leave+"\tวัน");
               $("#monk_leave_leave_current").html("ลาอุปสมบท :\t"+info.monk_leave+"\tวัน");
        },error : function(error){
            console.log(error);
        }
    })
}

function select_leave(){
    var leavetype = ["กรุณาเลือก","ลาป่วย","ลาคลอด","ลาไปช่วยเหลือภริยาคลอดบุตร","ลากิจ","ลาพักผ่อน","ลาอุปสมบท","แจ้งไปราชการ"];
    for(var i = 0; i < leavetype.length ; i++){
        $("#select_leave_type").append(`<option class='schoolyear' value= ${i} >`+leavetype[i]+"</option>");
}
}

function govenor_type(){
   var type_goven_arr = ["กรุณาเลือประเภท","ประชุม","สัมมนา","อบรม","ศึกษาดูงาน","อื่นๆ"];
   for(var i = 0; i < type_goven_arr.length ; i++){
    $("#govenor_type").append(`<option class='schoolyear' value= ${i} >`+type_goven_arr[i]+"</option>");
}

}

function show_select_leave_respond(){
    var value  = $("#select_leave_type").val();
    var leavetype = ["กรุณาเลือก","ลาป่วย","ลาคลอด","ลาไปช่วยเหลือภริยาคลอดบุตร","ลากิจ","ลาพักผ่อน","ลาอุปสมบท","แจ้งไปราชการ"];
    var userid = sessionStorage.getItem("userdata");
    var active_year = localStorage.getItem("school_year");
    $.ajax({
        "url": "http://" + host + "/leave_management/assets/php/manage_userdata.php",
        "method": "POST",
        "data": { userid: userid },
        success: function (result) {
            sessionStorage.setItem("infomation",result);
        }, error: function (error) {
            console.log(error);
        }
    })
    $.ajax({
        "url" : "http://" + host + "/leave_management/assets/php/get_current_leave_status.php",
        "method" : "POST",
        "data" : {
              userdata : userid,
              active_year : active_year,
        },success : function(result){
            sessionStorage.setItem("curr_leave",result);
        },error : function(error){
            console.log(error);
        }
    })
      
    if( value== 1 || value== 2 || value== 3 || value== 4 || value== 5 || value== 6){
        var data = JSON.parse(sessionStorage.getItem("infomation"));
        var datainformation = data[0];
        var leave=JSON.parse(sessionStorage.getItem("curr_leave"));
        var info = leave[0];
        var leave_status;


        if(value == 1){
            leave_status = info.sick_leave;
        }else if(value == 2){
            leave_status = info.pregnant_leave;
        }else if(value == 3){
            leave_status = info.help_pregnant_leave;
        }else if(value == 4){
            leave_status = info.activity_leave;
        }else if(value == 5){
            leave_status = info.vacation_leave;
        }else if(value == 6){
            leave_status = info.monk_leave;
        }
$(".current_leave_status").html('<p class="d-inline-block current_leave_status">วัน'+leavetype[value]+'สะสม : '+leave_status+'\tวัน</p>');

    }else if( value == 0 || value == null){
        $(".current_leave_status").html('<p class="d-inline-block current_leave_status">วันลาสะสม : 0 วัน</p>');
        toastr.error('กรุณาเลือกประเภทการลา');
    }
}

jQuery('#start_leave_date').datetimepicker(
    {
        lang:'th',
        timepicker:false,
        yearOffset:543,
        format:'Y-m-d'
    }
);
jQuery('#end_leave_date').datetimepicker(
     {
    lang:'th',
    timepicker:false,
    yearOffset:543,
    format:'Y-m-d'
}
);

jQuery('#start_leave_date_normal').datetimepicker(
    {
        lang:'th',
        timepicker:false,
        yearOffset:543,
        format:'Y-m-d'
    }
);
jQuery('#end_leave_date_normal').datetimepicker(
     {
    lang:'th',
    timepicker:false,
    yearOffset:543,
    format:'Y-m-d'
}
);


var moment = require('moment-business-days');

function date_calculator(){
    var date1 = new Date ($("#start_leave_date").val()); 
    var date2 = new Date ($("#end_leave_date").val()); 

    var Difference_In_Time = date2.getTime() - date1.getTime(); 
  
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
      
    var diff = moment($("#end_leave_date").val(), 'YYYY-MM-DD').businessDiff(moment($("#start_leave_date").val(),'YYYY-MM-DD'));
    
      $(".date_calc").html('<p class="classinusertext_center_detail datasec date_calc">มีกำหนด : '+Difference_In_Days+' วัน <br>ไม่รวมวันหยุด : '+diff+' วัน</p>');
   
}

function province_loop(){
    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/pushprovince.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $("#getprovince option[value='"+i+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $("#getprovince").append(`<option value= ${i+1} >`+data[i].pro_discription+"</option>");
      }
        },error : function(error){
            console.log(error);
        }

    })
}

function burden_loop(){
    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/burdenpush.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $("#getburden option[value='"+i+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $("#getburden").append(`<option value= ${i+1} >`+data[i].burden_discription+"</option>");
      }
        },error : function(error){
            console.log(error);
        }

    })
}

function add_governor_leave(){
    var start_date = $("#start_leave_date").val();
    var end_date = $("#end_leave_date").val();
    var govenor_id = $("#govenore_id").val();
    var govenor_type = $("#govenor_type").val();
    var govenor_title = $("#govenor_title").val();
    var govenore_where = $("#govenore_where").val();
    var govenore_province = $("#getprovince").val();
    var govenore_burden = $("#getburden").val();
      
    var diff = moment($("#end_leave_date").val(), 'YYYY-MM-DD').businessDiff(moment($("#start_leave_date").val(),'YYYY-MM-DD'));       

    if( govenor_id == 0  ||start_date ==0 || end_date == 0 || govenor_type == 0 || govenor_title == 0 || govenore_where == 0 || diff <=0  ){
        
            if(govenor_id == 0){
                $("#govenore_id").addClass("is-invalid");
            }else{
                $("#govenore_id").removeClass("is-invalid");
            }

            if(start_date == 0){
                $("#start_leave_date").addClass("is-invalid");
            }else{
                $("#start_leave_date").removeClass("is-invalid");
            }

            if(end_date == 0){
                $("#end_leave_date").addClass("is-invalid");
            }else{
                $("#end_leave_date").removeClass("is-invalid");
            }

            if(govenor_title == 0){
                $("#govenor_title").addClass("is-invalid");
            }else{
                $("#govenor_title").removeClass("is-invalid");
            }

            if(govenore_where == 0){
                $("#govenore_where").addClass("is-invalid");
            }else{
                $("#govenore_where").removeClass("is-invalid");
            }

            if(govenor_type == 0){
                $("#govenor_type").addClass("is-invalid");
            }else{
                $("#govenor_type").removeClass("is-invalid");
            }

            if(diff <= 0){
                toastr.error('วันลาเริ่มต้น จนถึง สิ้นสุดควรมีมากกว่า 1 วัน');
            }
        
    }else{
        $("#govenore_id").removeClass("is-invalid");
        $("#start_leave_date").removeClass("is-invalid");
        $("#end_leave_date").removeClass("is-invalid");
        $("#govenor_title").removeClass("is-invalid");
        $("#govenore_where").removeClass("is-invalid");
        $("#govenor_type").removeClass("is-invalid");
        var access = 1;
        $.ajax({
            "url": "http://" + host + "/leave_management/assets/php/insertgovernore.php",
            "method": "POST",
            "data": {
                
                start_date : start_date,
                end_date : end_date,
                govenor_id : govenor_id,
                govenor_type : govenor_type,
                govenor_title :  govenor_title,
                govenore_where : govenore_where,
                govenore_province : govenore_province,
                govenore_burden : govenore_burden,
                access : access


            },
            success: function (result) {
               $("#start_leave_date").val(null);
               $("#end_leave_date").val(null);
               $("#govenore_id").val(null);
               $("#govenor_type").val(0);
               $("#govenor_title").val(null);
               $("#govenore_where").val(null);
               $("#getprovince").val(1);
               $("#getburden").val(1);
               toastr.success('เพิ่มข้อมูลสำเร็จ');
               $('#modal-add-govenore-leave').modal('hide');
            }, error: function (error) {
                console.log(error);
            }
        })

    }
}


    
function check_govenor_id(){
    var gorvenor_id = $("#input_govenor_id").val();
    $.ajax({
        "url" : "http://" + host + "/leave_management/assets/php/pushgovenor.php",
        "method" : "POST",
        "data" : {
            gorvenor_id : gorvenor_id
        },success : function(result){
                if (result == 0){
                    $("#input_govenor_id").addClass("is-invalid");
                }else{
                    $("#input_govenor_id").removeClass("is-invalid");
                    var data=JSON.parse(result);
                    var info = data[0];
                    console.log(info);
                    sessionStorage.setItem("goven_id" , info.govenor_id);
                    $("#govenor_type_name").val(info.goven_type_des);
                    $("#govenor_title_des").val(info.goven_discription);
                    $("#govenore_where_des").val(info.goven_place);
                    $("#province_name").val(info.pro_discription);
                    $("#burden_name").val(info.burden_discription);
                    $("#start_leave_date_des").val(info.date_start);
                    $("#end_leave_date_des").val(info.date_end);
                   
                    
                }
        }
    })
}

function insert_govenore_person(){
    var current_date = sessionStorage.getItem("current_date");
    var govenor_id = sessionStorage.getItem("goven_id");
    $.ajax({
        "url" : "http://" + host + "/leave_management/assets/php/insetgovenorleaveperson.php?"+sessionStorage.getItem("goven_leave_person"),
        "method" : "POST",
        "data" : {
            
            current_date : current_date,
            govenor_id : govenor_id
        },success : function(result){
               console.log(result);
               sessionStorage.removeItem("goven_leave_person");
        }
    })
}

function view_userdata(userid_data){
    sessionStorage.setItem("userdata",userid_data);
    manage_userdata(userid_data);
}

function insert_leave_normal(){
    var start_date = $("#start_leave_date_normal").val();
    var end_date = $("#end_leave_date_normal").val();
    var leave_id = $("#leve_id").val();
    var leve_title = $("#leve_title").val();
    var select_leave_type = $("#select_leave_type").val();
      
    var diff = moment($("#end_leave_date_normal").val(), 'YYYY-MM-DD').businessDiff(moment($("#start_leave_date_normal").val(),'YYYY-MM-DD'));       

    if( leave_id == 0  ||start_date ==0 || end_date == 0 || leve_title == 0 || select_leave_type == 0 || diff <=0  ){
        
            if(leave_id == 0){
                $("#leve_id").addClass("is-invalid");
            }else{
                $("#leve_id").removeClass("is-invalid");
            }
            if(leve_title == 0){
                $("#leve_title").addClass("is-invalid");
            }else{
                $("#leve_title").removeClass("is-invalid");
            }

            if(start_date == 0){
                $("#start_leave_date_normal").addClass("is-invalid");
            }else{
                $("#start_leave_date_normal").removeClass("is-invalid");
            }

            if(end_date == 0){
                $("#end_leave_date_normal").addClass("is-invalid");
            }else{
                $("#end_leave_date_normal").removeClass("is-invalid");
            }

            if(select_leave_type == 0){
                $("#select_leave_type").addClass("is-invalid");
            }else{
                $("#select_leave_type").removeClass("is-invalid");
            }

            if(diff <= 0){
                toastr.error('วันลาเริ่มต้น จนถึง สิ้นสุดควรมีมากกว่า 1 วัน');
            }
        
    }else{
        $("#leve_id").removeClass("is-invalid");
        $("#leve_title").removeClass("is-invalid");
        $("#start_leave_date_normal").removeClass("is-invalid");
        $("#end_leave_date_normal").removeClass("is-invalid");
        $("#select_leave_type").removeClass("is-invalid");
        var access = 1;
        var userdata = sessionStorage.getItem("userdata");
        var status = 1;
        $.ajax({
            "url": "http://" + host + "/leave_management/assets/php/insert_leave_normal.php",
            "method": "POST",
            "data": {
                userdata  : userdata,
                start_date :start_date,
                end_date :end_date,
                leave_id : leave_id,
                diff : diff,
                leve_title : leve_title,
                select_leave_type : select_leave_type,
                status : status,
                access : access


            },
            success: function (result) {
            $("#start_leave_date_normal").val(null);
             $("#end_leave_date_normal").val(null);
             $("#leve_id").val(null);
             $("#leve_title").val(null);
             $("#end_leave_date").val(null);
             $("#select_leave_type").val(0);
             $(".current_leave_status").html('<p class="d-inline-block current_leave_status">วันลาสะสม : 0 วัน</p>');
             decrese_leave_day(userdata , diff , select_leave_type);
               toastr.success('เพิ่มข้อมูลสำเร็จ');
               $('#toggle-show-userdata').modal('hide');
            }, error: function (error) {
                console.log(error);
            }
        })

    }
}

function decrese_leave_day(userdata , diif , select_leave_type){
    
    var currrent_school_year = localStorage.getItem("school_year");
    var leave_type_var;
    if (select_leave_type == 1 ){
        leave_type_var = "sick_leave";
    }else if(select_leave_type = 2){
        leave_type_var = "pregnant_leave";
    }else if(select_leave_type = 3){
        leave_type_var = "help_pregnant_leave";
    }else if(select_leave_type = 4){
        leave_type_var = "activity_leave";
    }else if(select_leave_type = 5){
        leave_type_var = "vacation_leave";
    }else if(select_leave_type = 6){
        leave_type_var = "monk_leave";
    }
$.ajax({
    "url": "http://" + host + "/leave_management/assets/php/updatcurrentleaveamount.php",
            "method": "POST",
            "data": {
                userdata  : userdata,
                currrent_school_year :currrent_school_year,
                diff : diif,
                leave_type_var : leave_type_var,
  },success : function(result){
      console.log(result);
  }
});

}

function modal_close(){
             $("#start_leave_date_normal").val(null);
             $("#end_leave_date_normal").val(null);
             $("#leve_id").val(null);
             $("#leve_title").val(null);
             $("#end_leave_date").val(null);
             $("#select_leave_type").val(0);
             $("#start_leave_date").val(null);
             $("#end_leave_date").val(null);
             $("#govenore_id").val(null);
             $("#govenor_type").val(0);
             $("#govenor_title").val(null);
             $("#govenore_where").val(null);
             $("#getprovince").val(1);
             $("#getburden").val(1);
             $(".current_leave_status").html('<p class="d-inline-block current_leave_status">วันลาสะสม : 0 วัน</p>');
}

function select_pushdata(){
    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushpersonprefix.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".prefix_id option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".prefix_id").append(`<option value= ${i+1} >`+data[i].prefix_description+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })

    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushpersonacademic.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".person_academic_insert option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".person_academic_insert").append(`<option value= ${i+1} >`+data[i].academic_discription+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })

    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushpersonsai.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".person_sai_insert option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".person_sai_insert").append(`<option value= ${i+1} >`+data[i].sai_discription+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })

    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushsidelist.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".side_list_insert option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".side_list_insert").append(`<option value= ${i+1} >`+data[i].side_dis+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })

    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushpositionorder.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".position_order_insert option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".position_order_insert").append(`<option value= ${i+1} >`+data[i].position_dis+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })

    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushlocaldepartment.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".local_dep_insert option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".local_dep_insert").append(`<option value= ${i+1} >`+data[i].dep_discription+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })

    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushlisdepartment.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".list_dep_insert option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".list_dep_insert").append(`<option value= ${i+1} >`+data[i].listdep_dis+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })

    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushpersontype.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".person_type_insert option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".person_type_insert").append(`<option value= ${i+1} >`+data[i].type_description+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })

    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushpersonincome.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".status_incom_insert option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".status_incom_insert").append(`<option value= ${i+1} >`+data[i].in_description+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })

    $.ajax({
        "url" :"http://" + host + "/leave_management/assets/php/selectpush/pushpstatus.php",
        "method" : "GET",
        success : function(result){
          var data = JSON.parse(result);
          for(var i = 0; i < data.length ; i++){
            $(".person_status_insert option[value='"+(i+1)+"']").remove();
    }
          for(var i = 0; i < data.length ; i++){
              $(".person_status_insert").append(`<option value= ${i+1} >`+data[i].p_discription+"</option>");
      }
        },error : function(error){
            console.log(error);
        }
    })
}

function edituser(userdata){
    $.ajax({
        "url" : "http://" + host + "/leave_management/assets/php/pushuserdata.php",
        "method" : "POST",
        "data" : {
            userdata : userdata
        },success : function (result){
            var data = JSON.parse(result);
            var data_p = data[0];
            console.log(data);
            $(".person_id").prop('disabled',true);
            $("#add_person").hide();
            $("#cancle_edit_person").show();
            $("#edit_person").show();
            $(".person_id").val(data_p.person_id);
            $(".prefix_id").val(data_p.person_prefix_id);
            $(".first_name").val(data_p.f_name_th);
            $(".last_name").val(data_p.l_name_th);
            $(".person_sai_insert").val(data_p.person_sai_id);
            $(".person_academic_insert").val(data_p.person_academic_id);
            $(".person_type_insert").val(data_p.person_type_id);
            $(".birthday_insert").val(data_p.birthdate);
            $(".start_date_insert").val(data_p.date_come);
            $(".local_dep_insert").val(data_p.department_id);
            $(".side_list_insert").val(data_p.side_id);
            $(".list_dep_insert").val(data_p.listdep_id);
            $(".position_order_insert").val(data_p.position_id);
            $(".status_incom_insert").val(data_p.status_income_id);
            $(".person_status_insert").val(data_p.status_person);
        }
    })
}

function cancle_edit_user(){
                $(".person_id").prop('disabled',false);
                $(".person_id").val(null);
                $("#add_person").show();
                $("#cancle_edit_person").hide();
                $("#edit_person").hide();
                $(".prefix_id").val(1);
                $(".first_name").val(null);
                $(".last_name").val(null);
                $(".person_sai_insert").val(1);
                $(".person_academic_insert").val(1);
                $(".person_type_insert").val(1);
                $(".birthday_insert").val(null);
                $(".start_date_insert").val(null);
                $(".local_dep_insert").val(1);
                $(".side_list_insert").val(1);
                $(".list_dep_insert").val(1);
                $(".position_order_insert").val(1);
                $(".status_incom_insert").val(1);
                $(".person_status_insert").val(1);
}

function update_edit_user(){
    var personid = $(".person_id").val();
    var prefix = $(".prefix_id").val();
    var firstname = $(".first_name").val();
    var lastname = $(".last_name").val();
    var sai = $(".person_sai_insert").val();
    var academic = $(".person_academic_insert").val();
    var persontype = $(".person_type_insert").val();
    var birth = $(".birthday_insert").val();
    var start_date = $(".start_date_insert").val();
    var department = $(".local_dep_insert").val();
    var side = $(".side_list_insert").val();
    var listdepartment = $(".list_dep_insert").val();
    var position = $(".position_order_insert").val();
    var status_income = $(".status_incom_insert").val();
    var status = $(".person_status_insert").val();

    if (personid && prefix && firstname && lastname && sai && academic && persontype && birth && start_date && department && side && listdepartment && position && status_income && status != null) {
        $.ajax({
            "url": "http://" + host + "/leave_management/assets/php/update_user.php",
            "method": "POST",
            "data": {
                personid: personid,
                prefix: prefix,
                firstname: firstname,
                lastname: lastname,
                sai: sai,
                academic: academic,
                persontype: persontype,
                birth: birth,
                start_date: start_date,
                department: department,
                side: side,
                listdepartment: listdepartment,
                position: position,
                status_income : status_income,
                status : status

            },
            success: function (result) {

                toastr.info("แก้ไข\t" + firstname + "\t" + lastname + "\tเรียบร้อยแล้ว");
                personid = null;
                $(".person_id").prop('disabled',false);
                $(".person_id").val(null);
                $("#add_person").show();
                $("#cancle_edit_person").hide();
                $("#edit_person").hide();
                $(".person_id").val(null);
                $(".prefix_id").val(1);
                $(".first_name").val(null);
                $(".last_name").val(null);
                $(".person_sai_insert").val(1);
                $(".person_academic_insert").val(1);
                $(".person_type_insert").val(1);
                $(".birthday_insert").val(null);
                $(".start_date_insert").val(null);
                $(".local_dep_insert").val(1);
                $(".side_list_insert").val(1);
                $(".list_dep_insert").val(1);
                $(".position_order_insert").val(1);
                $(".status_incom_insert").val(1);
                $(".person_status_insert").val(1);
            }, error: function (error) {
                console.log(error);
            }
        })
    } else {
        toastr.error('กรุณากรอกข้อมูลให้ครบ');
    }
}

function insert_new_user_to_leave_stat(personid,persontype){
   var current_year = localStorage.getItem("school_year");

   $.ajax({
       "url" : "http://" + host + "/leave_management/assets/php/insert_new_user_to_stat.php",
       "method" : "POST",
       "data" : {
        persontype:persontype,
        personid : personid,
        current_year:current_year
       },success : function(result){

       }
   })
}

function logout(){
    window.sessionStorage.clear();
    window.location.href = "http://"+host+"/leave_management/index.html";
}