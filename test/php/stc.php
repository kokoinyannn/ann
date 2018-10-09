<!DOCTYPE html>
<html>
<head>
<META CHARSET="UTF-8">
<base href="http://gavo.t.u-tokyo.ac.jp/~xinyi/test/" />
<base target="_blank" />
<script src="js/jquery.min.js"></script>
<script src="js/stclist.js"></script>
</head>
<body>
<?php
$book=$_GET["book"];
print("<div id=\"initial\" name=\"".$book."\"></div>");
?>
<div id="passage"></div>
</body>
</html>