<?php
$book=$_GET["book"];
$id=$_GET["id"];
$anno_path="../annotation/".$book."/";

if (file_exists($anno_path.$id.".json")){
	$file=fopen($anno_path.$id.".json","r") or die("Unable to open file!");
	$ctent=fread($file, filesize($anno_path.$id.".json"));
	fclose($file);
	echo ($ctent);
}
else{
	echo "unexist";
}
?>