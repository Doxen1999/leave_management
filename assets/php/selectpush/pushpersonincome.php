<?php
include('../connector.php');

$sql = "select * from person_incom";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['in_description'] = $row['in_description'];
    $array[] =  $subArray ;
}

  echo json_encode($array);



?>