// ==UserScript==
// @name        Criador de Títulos [FW]
// @namespace   PvP
// @version      0.7
// @description  Busca as informações e preenche o postador.
// @author      PvP
// @include     /BZ.php
// @include     /RK.php
// @include     /MF.php
// @include     /BB.php
// @include     /XE.php
// @include     /TMDB.php
// @include     /ST.php
// @include     /EP.php
// @include     /series.php
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=xxx
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=movie
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=game
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=tvshow
// @include     https://filewarez.tv/postador.php
// @updateURL   https://github.com/PersonalScripts/fw/raw/master/Criador_de_Titulos_FW.user.js
// @downloadURL https://github.com/PersonalScripts/fw/raw/master/Criador_de_Titulos_FW.user.js
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_notification
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

var bz = "/BZ.php";
var rk = "/RK.php";
var mf = "/MF.php";
var bb = "/BB.php";
var xe = "/XE.php";
var tmdb = "/TMDB.php";
var st = "/ST.php"
var ep = "/EP.php"
var series = "/series.php";


////////////////////////////////////////////////////////////////////////////////////////GET DE XXX
if (window.location.href.indexOf(bz) != -1 || window.location.href.indexOf(rk) != -1 || window.location.href.indexOf(mf) != -1 || window.location.href.indexOf(bb) != -1 || window.location.href.indexOf(xe) != -1) {// on Google URL
    document.addEventListener('keydown', function(e) {
        // pressed alt+p
        if (e.keyCode == 80 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
            GM_notification ( {
                title: 'PvP diz:', timeout: '9000', text: 'Criando Título XXX!'
            } );
            var Newarray = ['all','other'];
            GM_setValue('titulo', document.getElementById("title").innerText);
            GM_setValue('elenco', document.getElementById("elenco").innerText);
            GM_setValue('genero', Newarray);
            console.log(genero);
            GM_setValue('direcao', document.getElementById("direcao").innerText);
            GM_setValue('ano', document.getElementById("ano").innerText);
            GM_setValue('min', document.getElementById("min").innerText);
            GM_setValue('url', document.getElementById("url").innerText);
            GM_setValue('sinopse', document.getElementById("sinopse").innerText);
            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=xxx");
        }})}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////SET DE XXX
else if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=addtitle&step=2&type=xxx") != -1){
    var title = GM_getValue('titulo');
    var elenco = GM_getValue('elenco');
    var genero = GM_getValue('genero');


    var direcao = GM_getValue('direcao');
    var ano = GM_getValue('ano');
    var min = GM_getValue('min');
    var url = GM_getValue('url');
    var sinopse = GM_getValue('sinopse');
    alert(title);
    document.getElementById('cfield_title').value = title;
    //Genre utiliza JQuery para selecionar mais de um, utilizando array
    $('#cfield_genre').val(genero);
    document.getElementById('cfield_duration').value = min;
    document.getElementById('cfield_year').value = ano;
    document.getElementById('cfield_direction').value = direcao;
    document.getElementById('cfield_site').value = url;
    document.getElementById('cfield_cast').value = elenco;
    document.getElementById('cfield_summary').value = sinopse;

}
///////////////////////////////////////////////////////////////////////////////GET DE FILMES
else if (window.location.href.indexOf(tmdb) != -1){
    document.addEventListener('keydown', function(e) {
        // pressed alt+p
        if (e.keyCode == 80 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
            GM_notification ( {
                title: 'PvP diz:', timeout: '9000', text: 'Criando Título em Filmes!'
            } );

            GM_setValue('o_titulo', document.getElementById("o_titulo").innerText);
            GM_setValue('titulo', document.getElementById("titulo").innerText);
            GM_setValue('genero', document.getElementById("genero").innerText);
            GM_setValue('minutos', document.getElementById("minutos").innerText);
            GM_setValue('ano', document.getElementById("ano").innerText);
            GM_setValue('direcao', document.getElementById("direcao").innerText);
            GM_setValue('imdb', document.getElementById("imdb").innerText);
            GM_setValue('site', document.getElementById("site").innerText);
            GM_setValue('actor', document.getElementById("actor").innerText);
            GM_setValue('sinopse', document.getElementById("sinopse").innerText);
            GM_setValue('yt', document.getElementById("yt").innerText);
            GM_setValue('exinfo', document.getElementById("exinfo").innerText);
            GM_setValue('img', document.getElementById("img").innerText);
            console.log(yt);
            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=movie");

        }})
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////SET DE FILMES
else if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=addtitle&step=2&type=movie") != -1){
    var o_titulo = GM_getValue('o_titulo');
    var titulo = GM_getValue('titulo');
    var genre = GM_getValue('genero');
    var minutos = GM_getValue('minutos');
    var year = GM_getValue('ano');
    var director = GM_getValue('direcao');
    var imdb = GM_getValue('imdb');
    var site = GM_getValue('site');
    var actor = GM_getValue('actor');
    var sumario = GM_getValue('sinopse');
    var yt = GM_getValue('yt');
    var exinfo = GM_getValue('exinfo');

    document.getElementById('cfield_title').value = o_titulo;
    document.getElementById('cfield_title_translated').value = titulo;

    //Genre utiliza JQuery para selecionar mais de um, utilizando array
    genre = genre.replace(/comedy/g, "commedy");
    genre = genre.replace(/mystery/g, "mistery");
    genre = genre.replace(/horror/g, "terror");
    genre = genre.replace(/ /g, ",");
    var genre_array = genre.split(',');
    console.log(genre_array);
    $('#cfield_genre').val(genre_array);

    document.getElementById('cfield_duration').value = minutos;
    document.getElementById('cfield_year').value = year;
    document.getElementById('cfield_direction').value = director;
    document.getElementById('cfield_imdb').value = imdb;
    document.getElementById('cfield_site').value = site;
    document.getElementById('cfield_cast').value = actor;
    document.getElementById('cfield_summary').value = sumario;
    document.getElementById('cfield_trailer').value = yt;
    document.getElementById('cfield_curiosity').value = exinfo;
} ///////////////////////////////////////////////////////////////////////////////GET DE JOGOS
else if (window.location.href.indexOf(st) != -1 || window.location.href.indexOf(ep) != -1){
    document.addEventListener('keydown', function(e) {
        // pressed alt+p
        if (e.keyCode == 80 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
            GM_notification ( {
                title: 'PvP diz:', timeout: '9000', text: 'Criando Título em Jogos!'
            } );


            GM_setValue('titulo', document.getElementById("title").innerText);
            GM_setValue('genero', document.getElementById("genre").innerText);
            GM_setValue('fabricante', document.getElementById("fabricante").innerText);
            GM_setValue('ano', document.getElementById("year").innerText);
            GM_setValue('plataforma', document.getElementById("plataform").innerText);
            GM_setValue('steam', document.getElementById("site").innerText);
            GM_setValue('sinopse', document.getElementById("sinopse").innerText);
            GM_setValue('minimo', document.getElementById("req").innerText);
            if (document.getElementById("video")){
            GM_setValue('video', document.getElementById("video").innerText);
            }else{GM_setValue('video',"");}
            GM_setValue('img', document.getElementById("img").innerText);

            /*if (document.getElementById("req2") == null){
    GM_setValue('recomendado', document.getElementById("req3").innerText);
}else{
      GM_setValue('recomendado', document.getElementById("req2").innerText);
}*/


            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=game");
        }})}
////////////////////////////////////////////////////////////////////////////////////////////////////////////SET DE JOGOS
else if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=addtitle&step=2&type=game") != -1){

    var titulogames = GM_getValue('titulo');
    var genregames = GM_getValue('genero');
    var fabricantegames = GM_getValue('fabricante');
    var anogames = GM_getValue('ano');
    var plataformagames = GM_getValue('plataforma');
    var steam = GM_getValue('steam');
    var sinopsegames = GM_getValue('sinopse');
    var minimo = GM_getValue('minimo');
    var video = GM_getValue('video');
    //var recomendado = GM_getValue('recomendado');

    document.getElementById('cfield_title').value = titulogames;


    //Genre utiliza JQuery para selecionar mais de um, utilizando array
    //genre = genre.replace(/comedy/g, "commedy");
    //genre = genre.replace(/mystery/g, "mistery");
    //genre = genre.replace(/ /g, ",");
    var genregames_array = genregames.split(',');
    console.log(genregames_array);
    $('#cfield_genre').val(genregames_array);


    document.getElementById('cfield_manufactor').value = fabricantegames;
    document.getElementById('cfield_year').value = anogames;
    document.getElementById('cfield_os').value = plataformagames;
    document.getElementById('cfield_site').value = steam;
    document.getElementById('cfield_summary').value = sinopsegames;
    document.getElementById('cfield_requirements').value = minimo+"\n\n";
    //document.getElementById('cfield_requirements').value += recomendado;
    document.getElementById('cfield_trailer').value = video;

}///////////////////////////////////////////////////////////////////////////////GET DE SERIES
else if (window.location.href.indexOf(series) != -1){
    document.addEventListener('keydown', function(e) {
        // pressed alt+p
        if (e.keyCode == 80 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
            GM_notification ( {
                title: 'PvP diz:', timeout: '9000', text: 'Criando Título em Séries!'
            } );

            GM_setValue('o_titulo', document.getElementById("o_titulo").innerText);
            GM_setValue('titulo', document.getElementById("titulo").innerText);
            GM_setValue('genero', document.getElementById("genero").innerText);
            GM_setValue('minutos', document.getElementById("minutos").innerText);
            GM_setValue('ano', document.getElementById("ano").innerText);
            GM_setValue('criador', document.getElementById("criador").innerText);
            GM_setValue('temp', document.getElementById("temp").innerText);
            GM_setValue('episodios', document.getElementById("episodios").innerText);
            GM_setValue('imdb', document.getElementById("imdb").innerText);
            GM_setValue('site', document.getElementById("site").innerText);
            GM_setValue('actor', document.getElementById("actor").innerText);
            GM_setValue('sinopse', document.getElementById("sinopse").innerText);
            GM_setValue('yt', document.getElementById("yt").innerText);
            GM_setValue('img', document.getElementById("img").innerText);

            console.log(titulo);
            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=tvshow");

        }})
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////SET DE SERIES
else if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=addtitle&step=2&type=tvshow") != -1){
    var o_titulo_series = GM_getValue('o_titulo');
    var titulo_series = GM_getValue('titulo');
    var genre_series = GM_getValue('genero');
    var minutos_series = GM_getValue('minutos');
    var year_series = GM_getValue('ano');
    var criador_series = GM_getValue('criador');
    var imdb_series = GM_getValue('imdb');
    var site_series = GM_getValue('site');
    var actor_series = GM_getValue('actor');
    var sumario_series = GM_getValue('sinopse');
    var yt_series = GM_getValue('yt');
    var temporada = GM_getValue('temp');
    var episodios_series = GM_getValue('episodios');

    document.getElementById('cfield_title').value = o_titulo_series;
    document.getElementById('cfield_title_translated').value = titulo_series;

    //Genre utiliza JQuery para selecionar mais de um, utilizando array
    genre_series = genre_series.replace(/comedy/g, "commedy");
    genre_series = genre_series.replace(/mystery/g, "mistery");
    genre_series = genre_series.replace(/horror/g, "terror");
    genre_series = genre_series.replace(/ /g, ",");
    var genre_array_series = genre_series.split(',');
    console.log(genre_array_series);
    $('#cfield_genre').val(genre_array_series);

    document.getElementById('cfield_duration').value = minutos_series;
    document.getElementById('cfield_year').value = year_series;
    document.getElementById('cfield_creator').value = criador_series;
    document.getElementById('cfield_imdb').value = imdb_series;
    document.getElementById('cfield_site').value = site_series;
    document.getElementById('cfield_cast').value = actor_series;
    document.getElementById('cfield_summary').value = sumario_series;
    document.getElementById('cfield_trailer').value = yt_series;
    document.getElementById('cfield_season').value = temporada;
    document.getElementById('cfield_episodes').value = episodios_series;
}

if (window.location.href.indexOf("https://filewarez.tv/postador.php") != -1 ) {
    document.addEventListener('keydown', function(e) {
  // pressed alt+P
  if (e.keyCode == 80 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {

      var img = GM_getValue('img');
      img = img.replace(/ /g, ",");
      var img_array = img.split(',');

     for (var i=0;i<=50;i++){
postador_upload_image(img_array[i], 'url');


}

                              }})

}

function postador_upload_image(data, type){
	var formdata = new FormData();
	if(requests < 1){
		progress = {files: 0, finished: 0, size_uploaded: 0, size_total: 0};
		postador_upload_totalprogress();
	}
	progress.files++;
	var progressbar = $("#file_progressbase").clone();
	if(type == 'url'){
		formdata.append('url', data);
		file = /\/([^\/]+)$/.exec(data);
		progressbar.data('filename', "URL => " + file[1]);
	} else if(type == 'file'){
		formdata.append('file', data);
		progressbar.data('filename', data.name);
		progressbar.data('filesize', data.size);
		progress.size_total += data.size;
	} else return false;
	progressbar.data('type', type);
	progressbar.insertBefore('.postador_progress .progress');

	requests++;
	postador_editid = $("input[name='editid']").val();
	formdata.append('editid', postador_editid);
	formdata.append('securitytoken', SECURITYTOKEN);
	postador_upload_totalprogress();
	var request = $.ajax({
		xhr: function(){
			xhr2 = $.ajaxSettings.xhr();
			if(xhr2.upload){
				xhr2.upload.addEventListener('progress', function(event, ui){ postador_upload_progress(event, progressbar); }, false);
			} else {
				alert('Browser not supported!\nCheck: http://caniuse.com/xhr2');
			}
			return xhr2;
		},
		url: 'postador.php?do=uploadimage',
		type: 'POST',
		dataType: 'json',
		contentType: false,
		processData: false,
		cache: false,
		data: formdata
	}).done(function(image){
		if(image.error){
			alert(image.error_message);
			progress.files--;
			progress.size_uploaded -= progressbar.data('fileuploaded');
			progress.size_total -= progressbar.data('filesize');
		} else {
			if(type == 'url') progress.size_total += image.filesize;
			progress.size_uploaded += image.filesize;
			progress.finished++;
			postador_image_add(image);
		}
	}).always(function(){
		progressbar.hide('fast').remove();
		postador_upload_totalprogress();
		requests--;
	});

	$(".filename", progressbar).text(progressbar.data('filename'));
	$(".cancel", progressbar).click(function(){
		progress.files--;
		progress.size_uploaded -= progressbar.data('fileuploaded');
		progress.size_total -= progressbar.data('filesize');
		request.abort();
		progressbar.hide('fast').remove();
		postador_upload_totalprogress();
	});
	progressbar.show('fast');
}
