$(document).ready(function(){

var book=$("div#initial").attr("name");
var r=new XMLHttpRequest();
var url="php/get_stc.php?book=";
r.open("GET",url+book,false);
r.send();
input_str=r.responseText;
var stcarray=JSON.parse(input_str);

for (ele in stcarray){
	var ctent= '<span class="stc" id="'+String(stcarray[ele].f)+'">'+String(stcarray[ele].t)+"</span>";
	$("div#passage").html(function(n,c){
		return c+ctent+"<br>";
	})
}

$("span.stc").hover(function(){
    $(this).css("background-color","grey");
},function(){
    $(this).css("background-color","");
});

$("span.stc").click(function(){
	var book=$("div#initial").attr("name");
    var id=$(this).attr("id");
    var url="php/sylbf.php?";
    window.open(url+"book="+book+"&id="+id);
});

});