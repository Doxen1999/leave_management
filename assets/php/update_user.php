<?php
include('connector.php');

$query = "update person_human set person_sai_id = '".$_POST['sai']."'  ,person_prefix_id='".$_POST['prefix']."',person_academic_id='".$_POST['academic']."',
person_type_id='".$_POST['persontype']."',f_name_th='".$_POST['firstname']."',l_name_th='".$_POST['lastname']."',birthdate='".$_POST['birth']."',date_come='".$_POST['start_date']."',
department_id='".$_POST['department']."',status_income_id='".$_POST['status_income']."',status_person='".$_POST['status']."',
side_id='".$_POST['side']."',listdep_id='".$_POST['listdepartment']."',position_id= '".$_POST['position']."' where person_id= '".$_POST['personid']."' ";

$qurydata = $con -> query($query);


?>