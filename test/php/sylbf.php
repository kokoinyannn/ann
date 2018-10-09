<!DOCTYPE html>
<html>
<head>
<META CHARSET="UTF-8">
<base href="http://gavo.t.u-tokyo.ac.jp/~xinyi/test/" />
<script src="js/jquery.min.js"></script>
<script src="js/sylbf.js"></script>
<link rel="stylesheet" type="text/css" href="css/sylbf.css">
</head>
<body>
<?php
$book=$_GET["book"];
$id=$_GET["id"];

print("<span id=\"initial\" class=\"".$book."|".$id."\"></span>");
?>

<div id="stc"></div>

<div class="result"><table border="1" cellspacing="0" cellpadding="5px"><tr class="words"></tr></table></div>

<div class="next_step"><button>NEXT STEP</button></div>
</body>
</html>