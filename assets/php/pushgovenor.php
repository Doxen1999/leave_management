<?php
include('connector.php');

$sql = "select * from governor_to 
           join governor_type
           on governor_to.goven_id_type = governor_type.goven_type_id
           join province
           on governor_to.goven_province_id = province.province_id
           join burden
           on governor_to.burden_id = burden.burden_id
           WHERE govenor_id = '".$_POST['gorvenor_id']."'         ";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$sql);
$num_rows =mysqli_num_rows($sql_results);

if($num_rows == 1){
    while($row = mysqli_fetch_array($sql_results))
{

    $subArray['govenor_id'] = $row['govenor_id'];
    $subArray['goven_id_type'] = $row['goven_id_type'];
    $subArray['goven_discription'] = $row['goven_discription'];
    $subArray['burden_discription'] = $row['burden_discription'];
    $subArray['goven_type_des'] = $row['goven_type_des'];
    $subArray['pro_discription'] = $row['pro_discription'];
    $subArray['goven_place'] = $row['goven_place'];
    $subArray['date_start'] = $row['date_start'];
    $subArray['date_end'] = $row['date_end'];

    $array[] =  $subArray ;
}

  echo json_encode($array);
} else {
    echo 0;
}

?>

