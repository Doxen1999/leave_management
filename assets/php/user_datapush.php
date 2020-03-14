<?php
include('getdata.php');
mysqli_set_charset($con,"utf8")or die("cant set charset");
$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$datatablepush);
while($row = mysqli_fetch_array($sql_results))
{

    $subArray['prefix'] = $row['prefix_description'];
    $subArray['person_id'] = $row['person_id'];
    $subArray['f_name'] = $row['f_name_th'];
    $subArray['l_name'] = $row['l_name_th'];
    $subArray['lisdep_dis'] = $row['lisdep_dis'];
    $subArray['dep_discription'] = $row['dep_discription'];
    $subArray['detail'] = $detail = "<center><button class='btn btn-success'  onclick='view_userdata(".$row['person_id'].")' type='button'data-toggle='modal' data-target='#toggle-show-userdata'>จัดการการลา</button></center>";
    $subArray['edituser'] = $edituser = "<center><button class='btn btn-warning'  onclick='edituser(".$row['person_id'].")'>แก้ไขบุคลากร</button></center>";
    $array[] =  $subArray ;
}

  echo json_encode($array);

?>
