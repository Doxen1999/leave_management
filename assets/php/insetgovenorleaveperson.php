<?php
include('connector.php');
$query = "
INSERT INTO govenor_transaction  
VALUES (?, ?,?);
";


for($count = 0; $count<count($_GET['id']); $count++)
{
$insert = $con -> prepare($query);
$insert  -> bind_param("sss",$_POST['govenor_id'], $_GET['id'][$count],$_POST['current_date']);
$insert -> execute();
$insert -> close();

}



?>
