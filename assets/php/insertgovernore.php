<?php
include('connector.php');

$insert = "insert into governor_to values('".$_POST['govenor_id']."','".$_POST['govenor_type']."','".$_POST['govenor_title']."','".$_POST['govenore_where']."','".$_POST['govenore_province']."','".$_POST['govenore_burden']."','".$_POST['start_date']."','".$_POST['end_date']."','1')";

if($_POST['access']==1){
    if(mysqli_query($con,$insert)){
        echo 1;
    }else{
       echo 2;
    }
} else{
    echo 0; 
}
?>