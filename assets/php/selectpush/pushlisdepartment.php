<?php
include('../connector.php');

$sql = "select * from list_department";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['listdep_dis'] = $row['listdep_dis'];
    $array[] =  $subArray ;
}

  echo json_encode($array);






?>