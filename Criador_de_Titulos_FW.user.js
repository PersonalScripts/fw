// ==UserScript==
// @name        Criador de Títulos [FW]
// @namespace   PvP
// @version      0.8
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
// @include     https://filewarez.tv/postador.php?do=addupload*
// @updateURL   https://github.com/PersonalScripts/fw/raw/master/Criador_de_Titulos_FW.user.js
// @downloadURL https://github.com/PersonalScripts/fw/raw/master/Criador_de_Titulos_FW.user.js
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_notification
// @grant          GM_addStyle
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

//CARREGADOR DE MEDIAINFO

if (window.location.href.indexOf('https://filewarez.tv/postador.php?do=addupload') != -1){
var input = document.createElement('input');
input.type = "file";
input.id = "carregador";
input.accept=".txt";
input.style = "top:0;right:0;position:fixed;z-index:99999;padding:17.5px;background:rgba(0,0,0,0.5) none;cursor:pointer;";
document.body.appendChild(input);

var carregador = document.getElementById('carregador');

carregador.addEventListener('change', function(e) {
    var file = carregador.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var content = reader.result;
            content = content.replace(/ /g, "");
            //content = content.replace(/:/g, ": ");
            content = content.replace(/GiB/g, " GB");
            //NOME DO RELEASE
            var release0 = content.split('Completename:');
            var release = release0[1].split(/\n/);
            var tipodearquivo = release0[1].split('Format:');
            release[0] = release[0].replace(/mp4/g, "");
            release[0] = release[0].replace(/mkv/g, "");
            release[0] = release[0].replace(/\./g, " ");
            if (release[0].indexOf('WEB') > -1 && release[0].indexOf('1080p') > -1 || release[0].indexOf('WEB') > -1 && release[0].indexOf('720p') > -1 || release[0].indexOf('BluRay') > -1 || release[0].indexOf('Bluray') > -1){
                //$('#cfield_forumid').val('623');
                //$('#cfield_forumid').val('375');
                $('#cfield_forumid').val('623');
                var values = $('#cfield_forumid').val();
                if (values == null){
                $('#cfield_forumid').val('375');}
            }
            if (release[0].indexOf('HDRip') > -1 || release[0].indexOf('DVDScr') > -1){
                $('#cfield_forumid').val('310');
            }
            if (release[0].indexOf('CAM') > -1 ){
                $('#cfield_forumid').val('338');
            }
            if (release[0].indexOf('2160p') > -1){
                $('#cfield_forumid').val('1403');
            }if (release[0].indexOf('WEB') > -1 ){
                $('#cfield_sourcetype').val('webdl');
            }if (release[0].indexOf('BluRay') > -1 ){
                $('#cfield_sourcetype').val('bluray');
            }if (release[0].indexOf('Bluray') > -1 ){
                $('#cfield_sourcetype').val('bluray');
            }if (tipodearquivo[0].indexOf('.mkv') > -1 ){
                $('#cfield_format').val('mkv');
            }if (tipodearquivo[0].indexOf('.ts') > -1 || tipodearquivo[0].indexOf('.TS') > -1){
                $('#cfield_format').val('ts');
            }if (tipodearquivo[0].indexOf('.mp4') > -1 || tipodearquivo[0].indexOf('.MP4') > -1){
                $('#cfield_format').val('mp4');
            }
            //TAMANHO DO UPLOAD
            var tam0 = content.split('Filesize:');
            var tam = tam0[1].split('Duration');
            //RESOLUÇÃO
            var width0 = content.split('Width:');
            var width = width0[1].split('pixels');
            var height0 = content.split('Height:');
            var height = height0[1].split('pixels');
            //FPS
            var fps0 = content.split('Framerate:');
            var fps = fps0[1].split('.');
            //library
            var library0 = content.split('Writinglibrary:');
            var library = library0[2];
            if (library){
                if (library.indexOf('264') > -1 ){
                $('#cfield_videocodec').val('h264');
            }if (library.indexOf('265') > -1 ){
                $('#cfield_videocodec').val('h265');
            }
            }else{
            if (release[0].indexOf('264') > -1 ){
                $('#cfield_videocodec').val('h264');
            }if (release[0].indexOf('265') > -1 ){
                $('#cfield_videocodec').val('h265');
            }}
            //audios
            var som = content.split('Format/Info:');
            var audio0 = som[2].split('CodecID:');
            var audio = audio0[1].split('Duration');

            audio[0] = audio[0].toLowerCase();
            var canais0 = content.split('Channel(s):');
            var canais = canais0[1].split('Channel');
            var canais2 = canais0[2];
            var array_audio;
            var linguagem0 = content.split('Language:');
            var linguagem = linguagem0[1].split(/\n/);
            linguagem[0] = linguagem[0].toLowerCase();
            var language_array;
            if (linguagem[0].indexOf('english') > -1){
                language_array = ('english');
            $('#cfield_language').val(language_array);}
            if (linguagem[0].indexOf('portuguese') > -1){
                language_array = ('portuguese');
            $('#cfield_language').val(language_array);}
            if (linguagem[0].indexOf('spanish') > -1){
                language_array = ('spanish');
            $('#cfield_language').val(language_array);}
            if (linguagem[0].indexOf('japanese') > -1){
                language_array = ('japanese');
            $('#cfield_language').val(language_array);}
            if (linguagem[0].indexOf('french') > -1){
                language_array = ('french');
            $('#cfield_language').val(language_array);}
            console.log(linguagem[0]);

            if (canais2){
                canais2 = canais0[2].split('Channel');
                var audio3 = som[3].split('CodecID:');
                var audio2 = audio3[1].split('Duration');
                audio2[0] = audio2[0].toLowerCase();

                var linguagem2 = linguagem0[2].split(/\n/);
                linguagem2[0] = linguagem2[0].toLowerCase();
                if (linguagem2[0].indexOf('english') > -1){
                language_array += (',english');
                language_array = language_array.split(',');
                $('#cfield_language').val(language_array);}
                    if (linguagem2[0].indexOf('portuguese') > -1){
                language_array += (',portuguese');
                    language_array = language_array.split(',');
                    $('#cfield_language').val(language_array);}
                if (linguagem2[0].indexOf('spanish') > -1){
                language_array += (',spanish');
                language_array = language_array.split(',');
                $('#cfield_language').val(language_array);}
                if (linguagem2[0].indexOf('japanese') > -1){
                language_array += (',japanese');
                language_array = language_array.split(',');
                $('#cfield_language').val(language_array);}
                if (linguagem2[0].indexOf('french') > -1){
                language_array += (',french');
                language_array = language_array.split(',');
                $('#cfield_language').val(language_array);}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////PRIMEIRO AUDIO/////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                if (audio2[0].indexOf('truehd') > -1 && canais2[0].indexOf('2') > -1){
                array_audio = ('dolbytruehd');}
                if (audio2[0].indexOf('truehd') > -1 && canais2[0].indexOf('6') > -1){
                array_audio = ('dolbytruehd51');}
                if (audio2[0].indexOf('truehd') > -1 && canais2[0].indexOf('8') > -1){
                array_audio = ('dolbytruehd71');}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                if (audio2[0].indexOf('aac') > -1 && canais2[0].indexOf('2') > -1){
                array_audio = ('aac');}
                if (audio2[0].indexOf('aac') > -1 && canais2[0].indexOf('6') > -1){
                array_audio = ('aac51');}
                if (audio2[0].indexOf('aac') > -1 && canais2[0].indexOf('8') > -1){
                array_audio = ('aac71');}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                if (audio2[0].indexOf('mp4a-40-2') > -1 && canais2[0].indexOf('2') > -1){
                array_audio = ('aac');}
                if (audio2[0].indexOf('mp4a-40-2') > -1 && canais2[0].indexOf('6') > -1){
                array_audio = ('aac51');}
                if (audio2[0].indexOf('mp4a-40-2') > -1 && canais2[0].indexOf('8') > -1){
                array_audio = ('aac71');}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                if (audio2[0].indexOf('a_ac3') > -1 && canais2[0].indexOf('2') > -1){
                array_audio = ('ac3');}
                if (audio2[0].indexOf('a_ac3') > -1 && canais2[0].indexOf('6') > -1){
                array_audio = ('ac351');}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                if (audio2[0].indexOf('a_eac3') > -1 && canais2[0].indexOf('2') > -1){
                array_audio = ('ddp');}
                if (audio2[0].indexOf('a_eac3') > -1 && canais2[0].indexOf('6') > -1){
                array_audio = ('ddp51');}
                if (audio2[0].indexOf('a_eac3') > -1 && canais2[0].indexOf('8') > -1){
                array_audio = ('ddp71');}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                if (release[0].indexOf('DTS-HD') > -1 && tipodearquivo[0].indexOf('5.1') > -1){
                    array_audio = ('dtshdma51');}
                else if (release[0].indexOf('DTS-HD') > -1 && tipodearquivo[0].indexOf('6.1') > -1){
                    array_audio = ('dtshdma61');}
                else if (release[0].indexOf('DTS-HD') > -1 && tipodearquivo[0].indexOf('7.1') > -1){
                    array_audio = ('dtshdma71');}
                else if (audio2[0].indexOf('dts') > -1 && canais2[0].indexOf('6') > -1){
                array_audio = ('dts51');}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                if (audio2[0].indexOf('dts') > -1 && canais2[0].indexOf('2') > -1){
                array_audio = ('dts');}
                if (audio2[0].indexOf('dts') > -1 && canais2[0].indexOf('6') > -1){
                array_audio = ('dts51');}
                if (audio2[0].indexOf('dts') > -1 && canais2[0].indexOf('7') > -1){
                array_audio = ('dts61');}
                if (audio2[0].indexOf('dts') > -1 && canais2[0].indexOf('8') > -1){
                array_audio = ('dts71');}
            }
            else{
                }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////SEGUNDO AUDIO//////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('aac') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',aac');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('aac') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',aac51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('aac') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',aac71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('mp4a-40-2') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',aac');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('mp4a-40-2') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',aac51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('mp4a-40-2') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',aac71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('a_ac3') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',ac3');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('a_ac3') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',ac351');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('a_eac3') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',ddp');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('a_eac3') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',ddp51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('a_eac3') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',ddp71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('truehd') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',dolbytruehd');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('truehd') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',dolbytruehd51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}

            if (audio[0].indexOf('truehd') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',dolbytruehd71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('dts') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',dts');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('dts') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',dts51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('dts') > -1 && canais[0].indexOf('7') > -1){
                array_audio += (',dts61');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
            if (audio[0].indexOf('dts') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',dts71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);}
/////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (release[0].indexOf(' HDR ') > -1){
                $('#cfield_hdr').val('yes');}
            $('#cfield_title').val(release[0]);
            $('#cfield_size').val(tam[0]);
            $('#cfield_resolution').val(width[0]+'x'+height[0]);
            $('#cfield_framerate').val(fps[0]+" fps");
            $('#cfield_compression').val('rar');
$('#cfield_description').val('[mediainfo]'+content+'[/mediainfo]');
            $('#cfield_subtitles_included').val('no');

            alert(release[0]);
            //alert(content);

}


        reader.readAsText(file);
    } else {
        //fileDisplayArea.innerText = "File not supported!"
    }
});}
