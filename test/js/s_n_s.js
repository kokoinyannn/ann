function gen_table(wd_arr){
    var dict="php/lookup.php?w=";
    var anno="php/annocheck.php?book="+book+"&id="+id;
    var r5=new XMLHttpRequest();
    r5.open("GET",anno,false);
    r5.send();

    if (r5.responseText=="unexist"){
        tk_in_stc=new Array();
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
        $("div.main tr.token").html("");
        for (var j in tk_in_stc){
            //alert(tk_in_stc[j][0].syl);
            for (var k in tk_in_stc[j]){
                //alert(tk_in_stc[j][k].syl);
                $("div.main tr.token").html(function(n,c){
                    return c+"<td>"+tk_in_stc[j][k].syl+"</td>";
                });
            }
        }
        for (var i=0;i<token_row.length;i++){
            //alert(i);
            $("div.main tr").not(".token").html(function(n,c){
                return c+"<td></td>";
            });
        
            if (/[a-zA-Z0-9]/.test(token_row[i].innerHTML)){
                ss_row[i].innerHTML='<input type="checkbox">';
                ps_row[i].innerHTML='<input type="checkbox">';
                ws_row[i].innerHTML='<input type="checkbox">';
                syls_row[i].innerHTML='<input type="checkbox" checked="true">';
            }
            else{
                if (i==token_row.length-1){
                    slash_row[i].innerHTML='<input type="checkbox" checked="true">';
                }
                else{
                    slash_row[i].innerHTML='<input type="checkbox">';
                }
            }
        }
    }
    else{
        tk_in_stc=JSON.parse(r5.responseText);
        var idx=0;
        for (var j in tk_in_stc){
            for (var k in tk_in_stc[j]){
                $("div.main tr.token").html(function(n,c){
                    return c+"<td>"+tk_in_stc[j][k].syl+"</td>";
                });

                $("div.main tr").not(".token").html(function(n,c){
                return c+"<td></td>";
                });
        
                if (/[a-zA-Z0-9]/.test(token_row[idx].innerHTML)){
                    if (tk_in_stc[j][k].lable=="4"){
                        ss_row[idx].innerHTML='<input type="checkbox" checked="true">';
                        ps_row[idx].innerHTML='<input type="checkbox" checked="true">';
                        ws_row[idx].innerHTML='<input type="checkbox" checked="true">';
                        syls_row[idx].innerHTML='<input type="checkbox" checked="true">';
                    }
                    else if (tk_in_stc[j][k].lable=="3"){
                        ss_row[idx].innerHTML='<input type="checkbox" checked="true">';
                        ps_row[idx].innerHTML='<input type="checkbox" checked="true">';
                        ws_row[idx].innerHTML='<input type="checkbox" checked="true">';
                        syls_row[idx].innerHTML='<input type="checkbox" checked="true">';

                    }
                    else if (tk_in_stc[j][k].lable=="2"){
                        ss_row[idx].innerHTML='<input type="checkbox">';
                        ps_row[idx].innerHTML='<input type="checkbox">';
                        ws_row[idx].innerHTML='<input type="checkbox" checked="true">';
                        syls_row[idx].innerHTML='<input type="checkbox" checked="true">';

                    }
                    else{
                        ss_row[idx].innerHTML='<input type="checkbox">';
                        ps_row[idx].innerHTML='<input type="checkbox">';
                        ws_row[idx].innerHTML='<input type="checkbox">';
                        syls_row[idx].innerHTML='<input type="checkbox" checked="true">';
                    }
                }
                else{
                    if (tk_in_stc[j][k].lable=="s"){
                        slash_row[idx].innerHTML='<input type="checkbox" checked="true">';
                    }
                    else{
                        slash_row[idx].innerHTML='<input type="checkbox">';
                    }
                }
                idx+=1;
            }
        }   
    }
}

function get_result(ss_row,ps_row,ws_row,syls_row,token_row,slash_row,tk_in_stc){
    var idx=0;
    for (var j in tk_in_stc){
        for (var k in tk_in_stc[j]){
            if (token_row[idx].innerHTML==tk_in_stc[j][k].syl){
                if (/[a-zA-Z0-9]/.test(tk_in_stc[j][k].syl)){
                //alert(ss_row[idx].firstChild);
                //for (var pro in ss_row[idx]){alert(pro);}
                    if (ss_row[idx].firstChild.checked==true){
                        tk_in_stc[j][k].lable=4;
                        //alert("sentence stress here!"+idx);
                    }
                    else if(ps_row[idx].firstChild.checked==true){
                        tk_in_stc[j][k].lable=3;
                        //alert("phrase stress here!"+idx);
                    }
                    else if(ws_row[idx].firstChild.checked==true){
                        tk_in_stc[j][k].lable=2;
                        //alert("word stress here!"+idx);
                    }
                    else if(syls_row[idx].firstChild.checked==true){
                        tk_in_stc[j][k].lable=1;
                    }
                    else{alert("no stress information on syllable: "+tk_in_stc[j][k].syl+"\non position: "+idx);}
                }
                else{
                    if (slash_row[idx].firstChild.checked==true){
                        tk_in_stc[j][k].lable="s";
                        //alert("pause here!"+idx);
                    }
                }
            }
            else{
                alert("token array: "+tk_in_stc[j][k].syl+"\ntoken row: "+token_row[idx].innerHTML+"\ndon't match! ");
            }
            idx+=1
        }
    }  
    return tk_in_stc;
}

function save(result){
    result_str="[";
    for (var j in result){
        result_str+="[";
        for (var k in result[j]){
            result_str+='{"syl":"'+result[j][k].syl+'","lable":"'+result[j][k].lable+'"},';
        }
        result_str=result_str.substring(0,result_str.length-1);
        result_str+="],";
    }
    result_str=result_str.substring(0,result_str.length-1);
    result_str+="]|"+book+"|"+id;
    var url="php/save.php";
    var r4=new XMLHttpRequest();
    r4.open("POST",url,false);
    r4.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    r4.send(result_str);
    $("div.result").html(r4.responseText);
}

jQuery(document).ready(function(){
    book=$("span#initial").attr("class").split("|")[0];
    id=$("span#initial").attr("class").split("|")[1];

    var url="php/get_data.php?book="+book+"&id="+id;
    var r2=new XMLHttpRequest();    
    r2.open("GET",url,false);
    r2.send();
    stc_info=JSON.parse(r2.responseText);
    
    ss_row=document.getElementById("main_t").rows[0].cells;
    ps_row=document.getElementById("main_t").rows[1].cells;
    ws_row=document.getElementById("main_t").rows[2].cells;
    syls_row=document.getElementById("main_t").rows[3].cells;
    slash_row=document.getElementById("main_t").rows[5].cells;
    token_row=document.getElementById("main_t").rows[4].cells;

    gen_table(stc_info);

    $("div.save button.save").click(function(){
        var result=get_result(ss_row,ps_row,ws_row,syls_row,token_row,slash_row,tk_in_stc);
        
        save(result);
    });

});