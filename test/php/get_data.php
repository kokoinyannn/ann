<?php
$book=$_GET["book"];
$id=$_GET["id"];

$fname="../data/wrd/".$book."/txt/".$id.".txt";
$file=fopen($fname,"r") or die("Unable to read!");
while(! feof($file)){
    $ctent[]=fgets($file);
}
fclose($file);

for ($i=0;$i<count(explode("'",$ctent[0]));$i++){
    if ($i%2==1){
        $token_list[]=explode("'",$ctent[0])[$i];
    }
}
$judge_list=explode(",",substr($ctent[1],1,-2));

echo json_encode($token_list);
?>