<?php
include('../connector.php');

$sql = "select * from side_list";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['side_dis'] = $row['side_dis'];
    $array[] =  $subArray ;
}

  echo json_encode($array);



?>