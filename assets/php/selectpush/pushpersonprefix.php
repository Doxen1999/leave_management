<?php
include('../connector.php');

$sql = "select * from person_prefix";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['prefix_description'] = $row['prefix_description'];
    $array[] =  $subArray ;
}

  echo json_encode($array);



?>