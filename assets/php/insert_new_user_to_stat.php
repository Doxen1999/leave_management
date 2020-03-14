<?php
include('connector.php');

$querysetting = "select * from leave_p_setting where person_type_id = '".$_POST['persontype']."' ";

$querysettingque = mysqli_query($con,$querysetting);

if($row = mysqli_fetch_array($querysettingque)){
    $queryintostat = "insert into leave_person_status values('".$_POST['personid']."','".$_POST['current_year']."','".$row['sick_leave']."','".$row['pregnant_leave']."','".$row['help_pregnant_leave']."','".$row['activity_leave']."','".$row['vacation_leave']."','".$row['monk_leave']."') ";

    $querysettingque = mysqli_query($con,$queryintostat);
}
?>