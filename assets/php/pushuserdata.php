<?php
include('connector.php');

$query = "select * from person_human where person_id = '".$_POST['userdata']."' ";

$array = array();
$subArray=array();
$sql_results = mysqli_query($con,$query);
           while($row = mysqli_fetch_array($sql_results))
           {
           
               $subArray['person_id'] = $row['person_id'];
               $subArray['person_sai_id'] = $row['person_sai_id'];
               $subArray['person_prefix_id'] = $row['person_prefix_id'];
               $subArray['person_academic_id'] = $row['person_academic_id'];
               $subArray['person_type_id'] = $row['person_type_id'];
               $subArray['f_name_th'] = $row['f_name_th'];
               $subArray['l_name_th'] = $row['l_name_th'];
               $subArray['birthdate'] = $row['birthdate'];
               $subArray['date_come'] = $row['date_come'];
               $subArray['department_id'] = $row['department_id'];
               $subArray['status_income_id'] = $row['status_income_id'];
               $subArray['status_person'] = $row['status_person'];
               $subArray['side_id'] = $row['side_id'];
               $subArray['listdep_id'] = $row['listdep_id'];
               $subArray['position_id'] = $row['position_id'];
               $array[] =  $subArray ;
           }
           
             echo json_encode($array);





?>