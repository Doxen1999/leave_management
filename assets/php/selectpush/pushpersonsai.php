<?php
include('../connector.php');

$sql = "select * from person_sai";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['sai_discription'] = $row['sai_discription'];
    $array[] =  $subArray ;
}

  echo json_encode($array);



?>