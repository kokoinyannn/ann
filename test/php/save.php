<?php
$result_path="../annotation/";
$str=file_get_contents('php://input');
$result=explode("|",$str)[0];
$book=explode("|",$str)[1];
$id=explode("|",$str)[2];
$result_file= fopen($result_path.$book."/".$id.".json", "w") or die("Unable to open file!");
fwrite($result_file, $result);
fclose($result_file);

print($result);
?>