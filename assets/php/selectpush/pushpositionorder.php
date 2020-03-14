<?php
include('../connector.php');

$sql = "select * from position_order";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['position_dis'] = $row['position_dis'];
    $array[] =  $subArray ;
}

  echo json_encode($array);



?>