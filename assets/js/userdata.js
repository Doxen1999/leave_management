$(document).ready(function () {
    manage_userdata(sessionStorage.getItem("userdata"));
    document.getElementById("start_school_year").value = get_current_date();
    getschool_year();
    check_year_in_table();
});

$( document ).ready(function() {
    select_leave();
    govenor_type();
    province_loop();
    burden_loop();
  });

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
            setavartar(datainformation.prefix_id);
            get_current_leave(userid);
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
    var personid = $("#insert_personid").val();
    var prefix = $("#insert_prefix").val();
    var firstname = $("#insert_f_name").val();
    var lastname = $("#insert_l_name").val();
    var sai = $("#insert_sai").val();
    var academic = $("#insert_academic").val();
    var persontype = $("#insert_person_type").val();
    var birth = $("#insert_birth").val();
    var start_date = $("#insert_stat_date").val();
    var department = $("#insert_department").val();
    var side = $("#insert_side").val();
    var listdepartment = $("#insert_lisdep").val();
    var position = $("#insert_position").val();

    if (personid && prefix && firstname && lastname && sai && academic && persontype && birth && start_date && department && side && listdepartment && position != null) {
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

            },
            success: function (result) {
                alert("เพิ่มคุณ\t" + firstname + "\t" + lastname + "\tเรียบร้อยแล้ว");
                personid = null;
            }, error: function (error) {
                console.log(error);
            }
        })
    } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
}
function insert_school_year() {
    var access = 0;
    var school_year = $("#school_year_insert").val();
    var phase = $("#phase_insert").val();
    var start_school_year = $("#start_school_year").val();
    var end_date = $("#end_school_year").val();
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
                $("#phase_insert").val(null);
                $("#end_school_year").val(null);
            } else if (result == 2) {
                $.notify("มีปีงบประมาณอยู่แล้ว", { position: " bottom right ", className: "error" });
                $("#school_year_insert").val(null);
                $("#phase_insert").val(null);
                $("#end_school_year").val(null);
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
    var value = $("#pick_person_type").val();
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

function update_school_year_active(){
    var active_school_year = $("#getschoolyear").val();
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
             }else if (result == 2){
                $.notify("กำหนดปีงบประมาณไม่สำเร็จ", { position: " bottom right ", className: "error" });
             }
             
         },error : function(error){
             console.log(error);
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
            get_current_leave(userid);
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
        set_leave_manage_page_normal_leave_on();
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
$(".current_leave_status").html('<p class="classinusertext_center_detail datasec current_leave_status">วัน'+leavetype[value]+'สะสม : '+leave_status+'</p>');
$(".date_leave_name").html('<p class="classinusertext_center_detail datasec date_leave_name">ขอ'+leavetype[value]+'ตั้งแต่วันที่ :</p>');

    }else if( value == 0 || value == null){
        set_leave_manage_page_normal_leave_off();
    }else if( value ==7){
        $(".date_leave_name").html('<p class="classinusertext_center_detail datasec date_leave_name">ขอ'+leavetype[value]+'ตั้งแต่วันที่ :</p>');
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
               toastr.success('วันลาเริ่มต้น จนถึง สิ้นสุดควรมีมากกว่า 1 วัน');
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

                    
                    
                }
        }
    })
}

