<?php
$dict_path="../dictionary/";
$w=$_GET["w"];
if (file_exists($dict_path.$w)){
    $file=fopen($dict_path.$w,"r") or die("Unable to open file!");
    $ctent=fread($file,filesize($dict_path.$w));
    fclose($file);
    $syl_info=explode("|",$ctent);
    echo json_encode($syl_info);    
}
else {
	$file=fopen($dict_path.$w,"w") or die("Unable to open the file!");
    fwrite($file,$w);
    fclose($file);
    echo("[\"".$w."\"]");
}
?>