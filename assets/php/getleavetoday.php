<?php

include('connector.php');

$sql = "SELECT COUNT(date_start)AS count_date FROM `leave_person` WHERE date_start ='".$_POST['currentdate']."'";

$query = mysqli_query($con,$sql);

if($row=mysqli_fetch_array($query)){
    echo $row['count_date'];
  }


?>