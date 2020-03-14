<<?php
include('connector.php');

$insert = "insert into person_human values('".$_POST['personid']."','".$_POST['sai']."','".$_POST['prefix']."','".$_POST['academic']."','".$_POST['persontype'].
"','".$_POST['firstname']."','".$_POST['lastname']."','".$_POST['birth']."','".$_POST['start_date']."','".$_POST['department']."','".$_POST['status_income']."','".$_POST['status']."','".$_POST['side']."','".$_POST['listdepartment']."','".$_POST['position']."')";

if($_POST['personid']!=0){

 if(mysqli_query($con,$insert)){
     echo "Insert complete";
 }else{
    echo "Cant complete";
 }
}
?>
