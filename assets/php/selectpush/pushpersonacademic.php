<?php
include('../connector.php');

$sql = "select * from person_academic";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['academic_discription'] = $row['academic_discription'];
    $array[] =  $subArray ;
}

  echo json_encode($array);



?>