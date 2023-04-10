// ==UserScript==
// @name         Get_OpenSubtitles Comunidade[FW]
// @namespace    PvP
// @version      0.1
// @description  Exibe as opções de legendas do OpenSubtitles e permite baixá-las diretamente do tópico da FW.
// @author       PvP
// @include     https://filewarez.tv/showthread.php*
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

var select_sub = document.createElement( 'select' );
select_sub.id = "select_sub_id";
select_sub.style ="width: 92%;";
var option = document.createElement("option");
option.id = 'option';
option.text = "Buscar legenda...";
select_sub.appendChild(option);
var rls_array = [];
var links_array = [];
var id_leg;
var legender;
var add_sub = new Image();
add_sub.src = 'https://i.imgur.com/RREGlJN.png';
add_sub.title ='Baixar a legenda selecionada...';
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
                    location.href = count.split(',')[0];
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
                        // outros parâmetros de busca aqui
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
                                    console.log(doc.querySelectorAll('td[id^=main]')[i].textContent.split(')')[1].split('Assiste')[0]);
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
                                    option.value = id_leg+','+legender;
                                    option.text = rls_array[i].charAt(0).toUpperCase() + rls_array[i].slice(1) + ' (' + legender + ')';
                                    option.title = rls_array[i].charAt(0).toUpperCase() + rls_array[i].slice(1) + ' (' + legender + ')';
                                    select_sub.add(option);

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