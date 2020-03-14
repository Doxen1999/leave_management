<?php
include('connector.php');
$query = "
INSERT INTO leave_person(leave_id,person_id,leave_p_id,date_start,date_end,total_num,p_status)  
VALUES (?,?,?,?,?,?,?);
";

if($_POST['access']==1){
    $insert = $con -> prepare($query);
    $insert  -> bind_param("ssissii",$_POST['leave_id'],$_POST['userdata'],$_POST['select_leave_type'],$_POST['start_date'],$_POST['end_date'],$_POST['diff'],$_POST['status']);
    $insert ->execute();
    $insert -> close();
    
}else{
    echo 0;
}


?>
