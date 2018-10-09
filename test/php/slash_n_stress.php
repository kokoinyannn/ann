<!DOCTYPE html>
<html>
<head>
<META CHARSET="UTF-8">
<base href="http://gavo.t.u-tokyo.ac.jp/~xinyi/test/" />
<script src="js/jquery.min.js"></script>
<script src="js/s_n_s_2.js"></script>
<link rel="stylesheet" type="text/css" href="css/s_n_s.css">
</head>
<body>
<?php

print("<div class=\"invi\">");
include './get_data.php';
print("</div>");

print("<span id=\"initial\" class=\"".$book."|".$id."\"></span>");

?>

<div class="main">
	<table id="main_t" border="1" cellspacing="0" cellpadding="5px">
		<tr class="s_s"></tr>
		<tr class="p_s"></tr>
		<tr class="w_s"></tr>
		<tr class="syl_s"></tr>
		<tr class="token"></tr>
		<tr class="slash"></tr>
	</table>
</div>

<div class="save"><button class="save">SAVE</button></div>

<div class="save_info"></div>
<div class="result"></div>

</body>
</html>
