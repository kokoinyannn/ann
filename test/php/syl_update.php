<?php
$dict_path="../dictionary/";
$data=json_decode(file_get_contents('php://input'));

$w=$data->w;
$syl_info=$data->newsyl;

$file=fopen($dict_path.$w,"w") or die("Unable to open the file!");
fwrite($file, $syl_info);
fclose($file);

?>