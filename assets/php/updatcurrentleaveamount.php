<?php

include('connector.php');

$leave_type = $_POST['leave_type_var'];
$diff_date = $_POST['diff'];
$sumation = 0 ;

$pushcurrentleave = "select ".$_POST['leave_type_var']." from leave_person_status where person_id = '".$_POST['userdata']."' and school_year_id = '".$_POST['currrent_school_year']."'";

$pushcurrentleave_query = $con->query($pushcurrentleave);

 if($rowpushleave = $pushcurrentleave_query->fetch_array(MYSQLI_NUM)){
    $sumation = $rowpushleave[0] - $diff_date;

    $updatetodb = "update leave_person_status set $leave_type = $sumation where person_id = '".$_POST['userdata']."' and school_year_id = '".$_POST['currrent_school_year']."'";

    $updatetodb_query = $con->query($updatetodb);

    echo $sumation;
 }






?>