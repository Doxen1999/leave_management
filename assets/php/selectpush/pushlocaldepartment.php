<?php
include('../connector.php');

$sql = "select * from local_department";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['dep_discription'] = $row['dep_discription'];
    $array[] =  $subArray ;
}

  echo json_encode($array);



?>