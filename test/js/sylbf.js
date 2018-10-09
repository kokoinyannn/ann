function gen_stc(wd_arr){
    for (var i in wd_arr){
        if (/[a-zA-Z0-9]/.test(wd_arr[i])){
            $("div#stc").html(function(n,c){
                return c+'<div class="wd"><span class="wd" id="wd_'+i+'">'+wd_arr[i]+"</span>"+'<div class="sylbf" id="sbf_'+i+'">Syllabification Section</div></div>';
            });
        }
        else{
            $("div#stc").html(function(n,c){
                return c+'<span class="space" id="sp_'+i+'">&nbsp</span>';
            });
        }
    }
}

function gen_result(wd_arr){
    var dict="php/lookup.php?w=";
    var tk_in_stc=new Array();
    for (var i in wd_arr){
        var syl_in_wd=new Array();
        if (/[a-zA-Z0-9]/.test(wd_arr[i])){
            var r3=new XMLHttpRequest();
            var w=wd_arr[i].toLowerCase();
            r3.open("GET",dict+w,false);
            r3.send();
            var s_info=JSON.parse(r3.responseText);
            for (n in s_info){
                var tmp=new Object();
                tmp.syl=s_info[n];
                tmp.lable=0;
                syl_in_wd.push(tmp);
                //alert(tmp.syl);
                //alert(syl_in_wd[0].syl);
            }
            tk_in_stc.push(syl_in_wd);
        }
        else{
            var tmp=new Object();
            tmp.syl=wd_arr[i];
            tmp.lable="n";
            syl_in_wd.push(tmp);
            tk_in_stc.push(syl_in_wd);
        }
    }
    $("div.result tr.words").html("");
    for (j in tk_in_stc){
        //alert(tk_in_stc[j][0].syl);
        for (k in tk_in_stc[j]){
            //alert(tk_in_stc[j][k].syl);
            $("div.result tr.words").html(function(n,c){
                return c+"<td>"+tk_in_stc[j][k].syl+"</td>";
            });
        }
    }
}

jQuery(document).ready(function(){
    var str=$("span#initial").attr("class");
    book=str.split("|")[0];
    id=str.split("|")[1];
    //得到book和stc_id

    var url="php/get_data.php?book="+book+"&id="+id;
    var r=new XMLHttpRequest();    
    r.open("GET",url,false);
    r.send();
    stc_info=JSON.parse(r.responseText);
    //得到stc中所有wd

    gen_stc(stc_info);
    //根据stc_info打印出完整stc

    gen_result(stc_info);
    //每个wd查syl信息，生成底部表格
});

$(document).ready(function(){

    $("span.wd").click(function(){
        syl_info=new Array();
        w=$(this).text().toLowerCase();
        w_letter=w.split("");
        s_id="sbf_"+$(this).attr("id").split("_")[1];

        division=new Array();
        new_syl_info=new Array();
        new_syl_info.push(w);
        
        var dict="php/lookup.php?w=";
        var r2=new XMLHttpRequest();
        r2.open("GET",dict+w,false);
        r2.send();
        
        syl_info=JSON.parse(r2.responseText);

        $("div.sylbf#"+s_id).html('<span class="lts"></span><br><table><tr></tr></table><br><div class="btn"><div>');
        for (var indx=0;indx<w_letter.length;indx++){
            $("div.sylbf#"+s_id+" span.lts").html(function(n,c){
            return c+'<span class="letter" id="'+indx+'">'+w_letter[indx]+"</span>&nbsp";
            });
        }
        for (i in syl_info){
            $("div.sylbf#"+s_id+" tr").html(function(n,c){
                return c+"<td>"+syl_info[i]+"</td>";
            });
        }
        $("div.sylbf#"+s_id+" div.btn").html(
            "<button class='back'>Don't Change</button><button class='save'>Update</button>"
        );

        $("div.sylbf").not("#"+s_id).hide();
        $("div.sylbf#"+s_id).toggle();
    });


$("div.sylbf").on('click','span.letter',function(){
        var l=$(this).text();
        var l_id=$(this).attr("id");
        new_syl_info=new Array();
        var st_indx=0;

        if(l_id>division[division.length-1] || division.length==0){
            division.push(l_id);
        }
        else{
            for(var indx=0;indx<division.length;indx++){
                if(l_id==division[indx]){
                    break;
                }
                else if(l_id<division[indx]){
                    for(var n=division.length;n>indx;n--){
                        division[n]=division[n-1];
                    }
                    division[indx]=l_id;
                    break;
                }
            }
        }

        //alert(division);
        $("div.sylbf#"+s_id+" tr").html("");
        for(var indx=0;indx<division.length;indx++){
            var tmp="";
            for(var n=st_indx;n<=division[indx];n++){
                tmp+=w_letter[n];
            }
            $("div.sylbf#"+s_id+" tr").html(function(n,c){
                    return c+"<td>"+tmp+"</td>";
            });
            new_syl_info.push(tmp);
            st_indx=Number(division[indx])+1;
            //alert(st_indx);
        }
        if(st_indx<w_letter.length){
            tmp="";
            for(var n=st_indx;n<w_letter.length;n++){
                tmp+=w_letter[n];
            }
            $("div.sylbf#"+s_id+" tr").html(function(n,c){
                    return c+"<td>"+tmp+"</td>";
            });
            new_syl_info.push(tmp);
        }
        //alert(new_syl_info);

});

$("div.sylbf").on('click','button.back',function(){
    $("div.sylbf#"+s_id+" tr").html("");
    for (i in syl_info){
            $("div.sylbf#"+s_id+" tr").html(function(n,c){
                return c+"<td>"+syl_info[i]+"</td>";
            });
        }
    division=[];
});

$("div.sylbf").on('click','button.save',function(){
    var updt="php/syl_update.php";
    var str='{"w":"'+w+'","newsyl":"'+new_syl_info.join("|")+'"}';
    var r=new XMLHttpRequest();
    r.open("POST",updt,false);
    r.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    r.send(str);

    gen_result(stc_info);
});

$("div.next_step").click(function(){
    var url="php/slash_n_stress.php?";
    window.open(url+"book="+book+"&id="+id,'_self');
});

});

