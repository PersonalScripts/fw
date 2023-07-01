// ==UserScript==
// @name         Get_OpenSubtitles [FW]
// @namespace    PvP
// @version      1.2
// @description  Exibe as opções de legendas do OpenSubtitles e adiciona o link ao upload
// @author       PvP
// @include     https://filewarez.tv/showthread.php*
// @include     https://filewarez.tv/postador.php?do=editupload*
// @include     https://filewarez.tv/postador.php*
// @grant       GM_setValue
// @grant       GM_getValue
// @updateURL   https://github.com/PersonalScripts/fw/raw/master/Get_OpenSubtitles%20%5BFW%5D.user.js
// @downloadURL https://github.com/PersonalScripts/fw/raw/master/Get_OpenSubtitles%20%5BFW%5D.user.js
// ==/UserScript==

var select_sub = document.createElement( 'select' );
select_sub.id = "select_sub_id";
select_sub.style ="width: 92%;";
var option = document.createElement("option");
option.id = 'option';
option.text = "Adicione uma legenda ao tópico...";
select_sub.appendChild(option);
var rls_array = [];
var links_array = [];
var id_leg;
var legender;
var add_sub = new Image();
add_sub.src = 'https://i.imgur.com/RREGlJN.png';
add_sub.title ='Adicionar Legenda ao Tópico';
add_sub.style ="margin-bottom:2px;margin-left:7px;height:15px;";
add_sub.id = "add_sub_id";
var referer;
var filme_imdb;
var serie_imdb;
//console.log(referer);
if (window.location.href.indexOf("https://filewarez.tv/showthread.php") != -1 ) {
    if(document.getElementById('uploadfield_subtitles_included').innerText.includes("Não")){
        document.getElementById('uploadfield_subtitles_included').appendChild(select_sub);
        document.getElementById('uploadfield_subtitles_included').appendChild(add_sub);
        select_sub.addEventListener('click', function(e){
            var get_val = this.id;
            var count = this.value;
            console.log(count);
            if(count.includes(',')){
                add_sub.addEventListener('click', function(e){
                    GM_setValue('url_legenda', count.split(',')[0]);
                    GM_setValue('autor_legenda', count.split(',')[1]);
                    if (count.split(',')[1] != ""){
                        document.getElementsByClassName('editpost editupload')[0].click();
                    }
                })
            }

            var imdb_id = document.getElementsByClassName('imdbRatingPlugin imdbRatingStyle4')[0].getAttribute('data-title');
            imdb_id = imdb_id.replace('tt','');
            if (document.getElementById('titlefield_season')){
                var release = document.querySelector('#uploadfield_title').innerText;
                var season = release.match(/\sS\d\d/g);
                season = season[0].replace(' S','season=');
                var episode = release.match(/E\d\d/g);
                episode = episode[0].replace('E','episode=');
                console.log(season);
                console.log(episode);
                imdb_id = 'https://www.opensubtitles.org/pt/search2?MovieName=&id=8&action=search&SubLanguageID=pob&SubLanguageID=pob&'+season+'&'+episode+'&SubSumCD=&Genre=&MovieByteSize=&MovieLanguage=&MovieImdbRatingSign=1&MovieImdbRating=&MovieCountry=&MovieYearSign=1&MovieYear=&MovieFPS=&SubFormat=&SubAddDate=&Uploader=&IDUser=&Translator=&IMDBID='+imdb_id+'&MovieHash=&IDMovie=';
            }else{
                imdb_id = 'https://www.opensubtitles.org/pt/search/sublanguageid-pob/imdbid-'+imdb_id;
            }

            //console.log(imdb_id);
            if($("#select_sub_id option").length==1){
                $.ajax({
                    url : "https://www.fw.artvetro.com.br/subs.php",
                    method: 'POST',
                    data: {
                        copia: imdb_id,
                    },
                    success: function(response) {

                        var doc = new DOMParser().parseFromString(response, 'text/html');
                        if(doc.querySelectorAll("div:not(.logo)[itemscope][itemtype^='http://schema.org/']")[0]){
                            if(doc.querySelectorAll("div:not(.logo)[itemscope][itemtype^='http://schema.org/']")[0].getAttribute('itemtype').includes('Movie')){
                                for (var i = 0; i < (doc.querySelectorAll('td[id^=main]').length); i ++) {
                                    if(doc.querySelectorAll('td[id^=main]')[i].getElementsByTagName('span')[0]){
                                        rls_array.push(doc.querySelectorAll('td[id^=main]')[i].getElementsByTagName('span')[0].getAttribute('title'));
                                    }else{
                                        rls_array.push(doc.querySelectorAll('td[id^=main]')[i].textContent.split(')')[1].split('Assiste')[0]);
                                    }
                                    links_array.push('https://www.opensubtitles.org'+doc.querySelectorAll('td[id^=main]')[i].getElementsByTagName('a')[0].getAttribute('href'));
                                    console.log('https://www.opensubtitles.org'+doc.querySelectorAll('td[id^=main]')[i].getElementsByTagName('a')[0].getAttribute('href'));
                                    console.log(doc.querySelectorAll('tr[id^=name')[i].getElementsByTagName('td')[8].innerText);
                                }

                                console.log(rls_array);
                                if(rls_array.length == 0){
                                    rls_array.push(doc.querySelectorAll('#moviehash a')[0].innerText.split('.srt')[0]);
                                    links_array.push(doc.querySelectorAll('.bt-dwl.bt-th')[0].getAttribute('ret'));
                                }
                                for (var i = 0; i < (rls_array.length); i ++) {
                                    var option = document.createElement("option");
                                    option.id = 'option';
                                    id_leg = 'https://www.opensubtitles.org/pt/subtitleserve/sub/'+parseInt( links_array[i].match(/subtitles\/(\d+)/)[1] );
                                    if (doc.querySelectorAll('tr[id^=name')[0]){
                                        legender = doc.querySelectorAll('tr[id^=name')[i].getElementsByTagName('td')[8].innerText;
                                    }else{
                                        legender = doc.querySelectorAll("[href^='/pt/profile/']")[0].innerText;
                                    }
                                    if (legender == ''){
                                        legender = 'UNK';    
                                    }
                                    option.value = id_leg+','+legender;
                                    option.text = rls_array[i].charAt(0).toUpperCase() + rls_array[i].slice(1) + ' (' + legender + ')';
                                    option.title = rls_array[i].charAt(0).toUpperCase() + rls_array[i].slice(1) + ' (' + legender + ')';
                                    select_sub.appendChild(option);
                                }}else if(doc.querySelectorAll("div:not(.logo)[itemscope][itemtype^='http://schema.org/']")[0].getAttribute('itemtype').includes('TVSeries')){
                                    if (doc.querySelectorAll("a[itemprop^='url'][href^='/pt/search/sublanguageid-pob/imdbid-']").length > 0){
                                        for (var i = 0; i < (doc.querySelectorAll("a[itemprop^='url'][href^='/pt/search/sublanguageid-pob/imdbid-']").length); i ++) {
                                            rls_array.push(doc.querySelectorAll("a[itemprop^='url'][href^='/pt/search/sublanguageid-pob/imdbid-']")[i].previousElementSibling.innerText+'. '+doc.querySelectorAll("a[itemprop^='url'][href^='/pt/search/sublanguageid-pob/imdbid-']")[i].innerText);
                                            console.log(doc.querySelectorAll("a[itemprop^='url'][href^='/pt/search/sublanguageid-pob/imdbid-']")[i].previousElementSibling.innerText+'. '+doc.querySelectorAll("a[itemprop^='url'][href^='/pt/search/sublanguageid-pob/imdbid-']")[i].innerText);
                                            links_array.push('https://www.opensubtitles.org'+doc.querySelectorAll("a[itemprop^='url'][href^='/pt/search/sublanguageid-pob/imdbid-']")[i].getAttribute('href'));
                                            console.log('https://www.opensubtitles.org'+doc.querySelectorAll("a[itemprop^='url'][href^='/pt/search/sublanguageid-pob/imdbid-']")[i].getAttribute('href'));
                                        }
                                        for (var i = 0; i < (rls_array.length); i ++) {
                                            var option = document.createElement("option");
                                            option.id = 'option';
                                            id_leg = 'https://www.opensubtitles.org/download/s/sublanguageid-pob/imdbid-'+parseInt( links_array[i].match(/imdbid-(\d+)/)[1] );
                                            legender = 'UNK';
                                            option.value = id_leg+','+legender;
                                            option.text = rls_array[i].charAt(0).toUpperCase() + rls_array[i].slice(1) + ' (' + legender + ')';
                                            option.title = rls_array[i].charAt(0).toUpperCase() + rls_array[i].slice(1) + ' (' + legender + ')';
                                            select_sub.appendChild(option);
                                        }
                                    }else{
                                        var option = document.createElement("option");
                                        option.id = 'option';
                                        option.value = imdb_id+',';
                                        option.text = "Nenhuma legenda disponível para este episódio.";
                                        select_sub.appendChild(option);
                                    }

                                }
                        }else{
                            var option = document.createElement("option");
                            option.id = 'option';
                            option.value = imdb_id+',';
                            option.text = "IMDB não encontrado no OpenSubtitles";
                            select_sub.appendChild(option);
                        }

                    },
                    error: function(error) {
                        // tratar o erro aqui
                    }
                });}
        })
    }

}

if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=editupload") != -1 ) {
    var url_legenda = GM_getValue('url_legenda');
    var autor_legenda = GM_getValue('autor_legenda');
    if(GM_getValue('autor_legenda') == ''){}else{
        document.getElementById('cfield_subtitles_included').value = 'yes';
        document.getElementById('cfield_subtitles_included').dispatchEvent(new Event('change'));
        document.getElementById('cfield_subtitles_author').value = autor_legenda;
        document.getElementsByName("next")[0].click();
        GM_setValue('autor_legenda', '');

    }
}

if (window.location.href.indexOf("https://filewarez.tv/postador.php") != -1 ) {
    if(document.querySelector('#redirect_button')){//IF QUE AVANÇA OS REDIRECIONAMENTOS
        var page = document.getElementById('redirect_button').getElementsByTagName('a')[0].getAttribute('href');
        window.location.href = page;
    }
    referer = document.referrer;
    if(referer.includes('https://filewarez.tv/postador.php?do=editupload')){
        if(GM_getValue('url_legenda') == ''){}else{
            document.getElementsByName("next")[0].click();
        }
    }
    if(referer.includes('https://filewarez.tv/postador.php')){
        var url_legenda = GM_getValue('url_legenda');
        if(GM_getValue('url_legenda') == ''){}else{
            document.getElementById('postador_importlinks').value = '-Legenda\n'+url_legenda;
            document.getElementById("postador_importlinks_process").click();
            GM_setValue('url_legenda', '');
            GM_setValue('autor_legenda', '');
            document.getElementsByName("next")[0].click();
        }
    }
}
