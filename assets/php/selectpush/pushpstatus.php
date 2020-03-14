<?php
include('../connector.php');

$sql = "select * from p_status";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['p_discription'] = $row['p_discription'];
    $array[] =  $subArray ;
}

  echo json_encode($array);



?>