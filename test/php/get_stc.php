<?php
$book=$_GET["book"];
$data_path="../data/stc/";
$stc_path=$data_path.$book."/";

foreach(glob($stc_path."*.txt") as $fname){
    $file=fopen($fname,"r") or die("Unable to read!");
    $text=fread($file,filesize($fname))."<br/>";
    fclose($file);
    $fname=explode(".",end(explode("/",$fname)))[0];
    $passage=array();
    $passage["f"]=$fname;
    $passage["t"]=$text;
    $output[]=$passage;
}

echo json_encode($output);
?>