// ==UserScript==
// @name        Criador de Títulos [FW]
// @namespace   PvP
// @version      1.12
// @description  Busca as informações e preenche o postador.
// @author      PvP
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=movie
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=tvshow
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=game
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=xxx
// @include     https://filewarez.tv/postador.php
// @include     https://filewarez.tv/postador.php?do=addupload*
// @include     https://filewarez.tv/newthread.php?do=newthread&f=14
// @include     https://filewarez.tv/postador.php?do=edittitle*
// @include     https://www.imdb.com/title*
// @updateURL   https://github.com/PersonalScripts/fw/raw/master/Criador_de_Titulos_FW.user.js
// @downloadURL https://github.com/PersonalScripts/fw/raw/master/Criador_de_Titulos_FW.user.js
// @include     https://pvp2004.000webhostapp.com/*
// @include     http://www.fw.artvetro.com.br/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_notification
// @grant       GM_addStyle
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

if (window.location.href.indexOf("https://pvp2004.000webhostapp.com/") != -1 || window.location.href.indexOf("http://www.fw.artvetro.com.br/") != -1) {

    document.addEventListener('keydown', function(e) {
        // pressed alt+p
        if (e.keyCode == 80 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {

            var escolha = document.getElementById("escolha");
            var type = escolha.options[escolha.selectedIndex].text;
            if (type == ""){
                type = "Filmes";
            }
            console.log(type);

            if(type == "Filmes"){

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
            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=movie");

        }
        else if (type == "XXX Nacional"){

            GM_notification ( {
                title: 'PvP diz:', timeout: '9000', text: 'Criando Título XXX!'
            } );

            var Newarray = ['all','other'];
            GM_setValue('titulo', document.getElementById("title").innerText);
            GM_setValue('elenco', document.getElementById("elenco").innerText);
            GM_setValue('genero', Newarray);
            GM_setValue('direcao', document.getElementById("direcao").innerText);
            GM_setValue('ano', document.getElementById("ano").innerText);
            GM_setValue('min', document.getElementById("min").innerText);
            GM_setValue('url', document.getElementById("url").innerText);
            GM_setValue('sinopse', document.getElementById("sinopse").innerText);
            GM_setValue('img', document.getElementById("img").innerText);
            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=xxx");
        }
        else if (type == "Jogos"){

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
            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=game");

        }
        else if (type == "Séries"){

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
            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=tvshow");

        }

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
        GM_setValue('o_titulo', "");
        GM_setValue('titulo', "");
        GM_setValue('genero', "");
        GM_setValue('minutos', "");
        GM_setValue('ano', "");
        GM_setValue('direcao', "");
        GM_setValue('imdb', "");
        GM_setValue('site', "");
        GM_setValue('actor', "");
        GM_setValue('sinopse', "");
        GM_setValue('yt', "");
        GM_setValue('exinfo', "");

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////SET DE XXX
else if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=addtitle&step=2&type=xxx") != -1){
    var title = GM_getValue('titulo');
    var elenco = GM_getValue('elenco');
    var genero = GM_getValue('genero');
    title = title.replace(/Piroca/g,'P*roca');
    title = title.replace(/Buceta/g,'B*ceta');
    title = title.replace(/Boceta/g,'B*ceta');
    title = title.replace(/Cú/g,'C*');
    title = title.replace(/Cuzinho/g,'C*');
    title = title.replace(/Fudeu/g,'F*deu');
    title = title.replace(/Fodeu/g,'F*deu');
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
            GM_setValue('titulo', "");
            GM_setValue('elenco', "");
            GM_setValue('genero', "");
            console.log(genero);
            GM_setValue('direcao', "");
            GM_setValue('ano', "");
            GM_setValue('min', "");
            GM_setValue('url', "");
            GM_setValue('sinopse', "");
            $('#fresco').val('');

}

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
    document.getElementById('cfield_title').value = titulogames;
    var genregames_array = genregames.split(',');
    console.log(genregames_array);
    $('#cfield_genre').val(genregames_array);
    document.getElementById('cfield_manufactor').value = fabricantegames;
    document.getElementById('cfield_year').value = anogames;
    document.getElementById('cfield_os').value = plataformagames;
    document.getElementById('cfield_site').value = steam;
    document.getElementById('cfield_summary').value = sinopsegames;
    document.getElementById('cfield_requirements').value = minimo+"\n\n";
    document.getElementById('cfield_trailer').value = video;
            GM_setValue('titulo', "");
            GM_setValue('genero', "");
            GM_setValue('fabricante', "");
            GM_setValue('ano', "");
            GM_setValue('plataforma', "");
            GM_setValue('steam', "");
            GM_setValue('sinopse', "");
            GM_setValue('minimo', "");
            GM_setValue('video', "");

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
            GM_setValue('o_titulo', "");
            GM_setValue('titulo', "");
            GM_setValue('genero', "");
            GM_setValue('minutos', "");
            GM_setValue('ano', "");
            GM_setValue('criador', "");
            GM_setValue('temp', "");
            GM_setValue('episodios', "");
            GM_setValue('imdb', "");
            GM_setValue('site', "");
            GM_setValue('actor', "");
            GM_setValue('sinopse', "");
            GM_setValue('yt', "");

}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
////////////////////////EDITOR DE TÍTULOS DE FILMES//////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

if (window.location.href.indexOf('https://filewarez.tv/postador.php?do=edittitle') != -1){
if(document.getElementById('cfield_imdb')){
    var img = new Image();
    img.src = 'https://i.imgur.com/jqqCux6.png';
    img.title ='Atualizar Título (Filmes e Séries)';
    img.style ="float:left;margin-top:5px;";
    img.addEventListener("mouseover", function(){img.src = 'https://i.imgur.com/HLfKSIH.png';});
    img.addEventListener("mouseout", function(){img.src = 'https://i.imgur.com/jqqCux6.png';});
    var local = document.getElementsByClassName('input')[2];
    local.appendChild(img);
}

  img.addEventListener('click', function () {
    // create a new keyboard event
    var event = new KeyboardEvent('keydown', {
      keyCode: '79',
      altKey: true

    });
      if($('#cfield_imdb').val() != ""){
      document.dispatchEvent(event);}
      else{alert('Você não pode fazer uma pesquisa em branco!');}

  });
}

if (window.location.href.indexOf('https://filewarez.tv/postador.php?do=edittitle') != -1){
document.addEventListener('keydown', function(e) {
         //alt+o

    if (e.keyCode == 79 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
        var site = $('#cfield_imdb').val();
        site = site.replace(/imdb/g, "www.imdb");
        $.ajax({
          url : "https://pvp2004.000webhostapp.com/filmes.php",
          type : 'post',

          data : {
               copia:site
          },
          beforeSend : function(){
               GM_notification ( {
                title: 'PvP diz:', timeout: '1700', text: 'Buscando Informações!'
            } );
          }
     })
     .done(function(msg){
 GM_notification ( {
                title: 'PvP diz:', timeout: '1700', text: 'Informações Atualizadas!'
            } );
            console.log(msg);
    var doc = new DOMParser().parseFromString(msg, 'text/html');
    var o_titulo = doc.getElementById("o_titulo").innerText;
    var titulo = doc.getElementById("titulo").innerText;
    var genre = doc.getElementById("genero").innerText;
    var minutos = doc.getElementById("minutos").innerText;
    var year = doc.getElementById("ano").innerText;
		
    //if para editar séries
    if (doc.getElementById("criador").innerText){
    var criador = doc.getElementById("criador").innerText;
    var episodios = doc.getElementById("episodios").innerText;
    var temp = doc.getElementById("temp").innerText;
    document.getElementById('cfield_creator').value = criador;
    document.getElementById('cfield_episodes').value = episodios;
    document.getElementById('cfield_season').value = temp;
    }else{
    var sumario = doc.getElementById("sinopse").innerText;
    if (sumario != ""){
    document.getElementById('cfield_summary').value = sumario;}
    var yt = doc.getElementById("yt").innerText;
    if (yt != ""){
    document.getElementById('cfield_trailer').value = yt;}
    }
		
    var director = doc.getElementById("direcao").innerText;
    var imdb = doc.getElementById("imdb").innerText;
    var site = doc.getElementById("site").innerText;
    var actor = doc.getElementById("actor").innerText;
    var exinfo = doc.getElementById("exinfo").innerText;
    GM_setValue('img', doc.getElementById("img").innerText);
    var curiosidades = document.getElementById('cfield_curiosity').value;


    document.getElementById('cfield_title').value = o_titulo;
    if (titulo != ""){
    document.getElementById('cfield_title_translated').value = titulo;}

    //Genre utiliza JQuery para selecionar mais de um, utilizando array
    genre = genre.replace(/comedy/g, "commedy");
    genre = genre.replace(/mystery/g, "mistery");
    genre = genre.replace(/horror/g, "terror");
    genre = genre.replace(/\n/g, ",");
            console.log(genre);
    var genre_array = genre.split(',');
    console.log(genre_array);
    $('#cfield_genre').val(genre_array);

    document.getElementById('cfield_duration').value = minutos;
    document.getElementById('cfield_year').value = year;
    if (director != ""){
    document.getElementById('cfield_direction').value = director;}
    document.getElementById('cfield_imdb').value = imdb;
    document.getElementById('cfield_site').value = site;
    document.getElementById('cfield_cast').value = actor;
		
if (curiosidades == "" || curiosidades.indexOf('[b]Produtora') > -1 || curiosidades.indexOf('[b]Orçamento') > -1  || curiosidades.indexOf('[b]Receita') > -1){
        if (curiosidades == "" ){
        document.getElementById('cfield_curiosity').value = exinfo;
    }
    if (curiosidades.indexOf('[b]Produtora') > -1){
        // break the textblock into an array of lines
       curiosidades = curiosidades.split('\n');
        // remove one line, starting at the first position
       curiosidades.splice(0,1);
        // join the array back into a single string
       curiosidades = curiosidades.join('\n');
       document.getElementById('cfield_curiosity').value = exinfo + '\n' + curiosidades;
    }if(curiosidades.indexOf('[b]Orçamento') > -1){
       curiosidades = curiosidades.split('\n');
       curiosidades.splice(0,1);
       curiosidades = curiosidades.join('\n');
       document.getElementById('cfield_curiosity').value = exinfo + '\n' + curiosidades;
    }if(curiosidades.indexOf('[b]Receita') > -1){
       curiosidades = curiosidades.split('\n');
       curiosidades.splice(0,2);
       curiosidades = curiosidades.join('\n');
       document.getElementById('cfield_curiosity').value = exinfo + '\n' + curiosidades;
    }
}else{
    document.getElementById('cfield_curiosity').value = exinfo + '\n' + curiosidades;}
})
        .fail(function(jqXHR, textStatus, msg){
 alert(msg);
   });

    }
})
}


///////////////////////////////////////////////////////////////////////////////// ADD IMAGENS NO POSTADOR COM ALT + P
if (window.location.href.indexOf("https://filewarez.tv/postador.php") != -1 ) {
    var up_img = new Image();
    up_img.src = 'https://i.imgur.com/jqqCux6.png';
    up_img.title ='Carregar Imagens!';
    var local_up_img = document.getElementById('upload_url');
    if(local_up_img){
    (local_up_img).after(up_img);}
    up_img.addEventListener("mouseover", function(){up_img.src = 'https://i.imgur.com/CzXhVLj.png';});
    up_img.addEventListener("mouseout", function(){up_img.src = 'https://i.imgur.com/jqqCux6.png';});
    up_img.addEventListener('click', function () {
    // create a new keyboard event
    var event = new KeyboardEvent('keydown', {
      keyCode: '80',
      altKey: true
    });
        document.dispatchEvent(event);
  });

    document.addEventListener('keydown', function(e) {
  // pressed alt+P
  if (e.keyCode == 80 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
      var img = GM_getValue('img');
      img = img.replace(/ /g, ",");
      GM_setValue('img', "");
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

///////////////////////////////////////////////////////////////////////////////////////////// COPIA O TITULO DO UPLOAD E ABRE ENVIANDO AGORA

if (window.location.href.indexOf('https://filewarez.tv/postador.php?do=addupload') != -1){
document.addEventListener('keydown', function(e) {
    //alt + y
if (e.keyCode == 89 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
    GM_setValue('enviando_agora', $('#cfield_title').val());
    console.log($('#cfield_title').val());
var myWindow = window.open ("https://filewarez.tv/newthread.php?do=newthread&f=14");
    setTimeout(function(){ myWindow.close() }, 7000);
}})}else if (window.location.href.indexOf("https://filewarez.tv/newthread.php?do=newthread&f=14") != -1){
    var envia = GM_getValue('enviando_agora');
    //GM_setValue('enviando_agora', "");
    envia = envia.replace(/\./g, " ");
    GM_setValue('enviando_agora', "");
    //document.getElementsByClassName("cke_source cke_enable_context_menu")[0].value = envia;
    document.getElementById('vB_Editor_001_editor').value = envia;
    $('#subject').val(envia);
    if(envia){
    document.getElementById("vB_Editor_001_save").click();

    }
    }

var enviando_titulo = document.getElementById("cfield_title");


    var img_title = new Image();
    img_title.src = 'https://i.imgur.com/jqqCux6.png';
    img_title.title ='Postar Upload no Enviando Agora!';
    img_title.style ="margin-top:5px;";
    img_title.id = "img_title";
    img_title.addEventListener("mouseover", function(){img_title.src = 'https://i.imgur.com/SVEClsJ.png';});
    img_title.addEventListener("mouseout", function(){img_title.src = 'https://i.imgur.com/jqqCux6.png';});

   $("#cfield_title").keyup(function () {
   if ($(this).val()) {
    $("#img_title").show();
    var local = document.getElementById('cfield_title');
    local.after(img_title);
   }
   else {
    $("#img_title").hide();
   }
   });

   img_title.addEventListener('click', function () {
    // create a new keyboard event
    var event = new KeyboardEvent('keydown', {
      keyCode: '89',
      altKey: true
    });
        document.dispatchEvent(event);
   });


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CARREGADOR DE MEDIAINFO /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

if (window.location.href.indexOf('https://filewarez.tv/postador.php?do=addupload') != -1){

var input = document.createElement('input');
var brazzers = document.createElement('button');
brazzers.innerHTML = "Do Something";
brazzers.id = "bz";
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
            var content_mediainfo = content;
            content = content.replace(/ /g, "");
            //content = content.replace(/:/g, ": ");
            content = content.replace(/GiB/g, " GB");
            content = content.replace(/MiB/g, " MB");
            //NOME DO RELEASE
            var release0 = content.split('Completename:');
            var release = release0[1].split(/\n/);
            var tipodearquivo = release0[1].split('Format:');
            release[0] = release[0].replace(/mp4/g, "");
            release[0] = release[0].replace(/mkv/g, "");
            release[0] = release[0].replace(/\./g, " ");
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// DVD-R ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
            if (tipodearquivo[0].indexOf('VIDEO_TS') > -1){
                $('#cfield_subtitles_included').val('yes');
                $('#cfield_description').val('[mediainfo]'+content+'[/mediainfo]');
                $('#cfield_forumid').val('622');
                $('#cfield_sourcetype').val('dvdr');
                $('#cfield_format').val('iso');
                var width0_dvd = content.split('Width:');
            var width_dvd = width0_dvd[1].split('pixels');
            var height0_dvd = content.split('Height:');
            var height_dvd = height0_dvd[1].split('pixels');
                $('#cfield_resolution').val(width_dvd[0]+'x'+height_dvd[0]);
                var fps0_dvd = content.split('Framerate:');
            var fps_dvd = fps0_dvd[1].split('.');
                $('#cfield_framerate').val(fps_dvd[0]+" fps");
                var library_dvd = tipodearquivo[2];
                var audio_dvd_array;
                var language_dvd_array;
                if (library_dvd.indexOf('MPEG') > -1 ){
                $('#cfield_videocodec').val('mpeg');}
                if (tipodearquivo[3]){
                    var canais0_dvd = tipodearquivo[3].split('Channel(s):');
                    var canais1_dvd = canais0_dvd[1].split('channels');

                    var language0_dvd = tipodearquivo[3].split('Language:');
                    var language1_dvd = language0_dvd[1].split(/\n/);
                    language1_dvd[0] = language1_dvd[0].toLowerCase();
            if (language1_dvd[0].indexOf('english') > -1){
                language_dvd_array = ('english');
            $('#cfield_language').val(language_dvd_array);}
            if (language1_dvd[0].indexOf('portuguese') > -1){
                language_dvd_array = ('portuguese');
            $('#cfield_language').val(language_dvd_array);}
            if (language1_dvd[0].indexOf('spanish') > -1){
                language_dvd_array = ('spanish');
            $('#cfield_language').val(language_dvd_array);}
            if (language1_dvd[0].indexOf('japanese') > -1){
                language_dvd_array = ('japanese');
            $('#cfield_language').val(language_dvd_array);}
            if (language1_dvd[0].indexOf('french') > -1){
                language_dvd_array = ('french');
            $('#cfield_language').val(language_dvd_array);}

                    var audio1_dvd = tipodearquivo[3].split(/\n/);
                    if (audio1_dvd[0].indexOf('AC-3') > -1 && canais1_dvd[0].indexOf('6') > -1){
                        audio_dvd_array = 'ac351';
                        $('#cfield_audiocodec').val(audio_dvd_array);
                    }
                    if (audio1_dvd[0].indexOf('AC-3') > -1 && canais1_dvd[0].indexOf('2') > -1){
                        audio_dvd_array = 'ac3';
                        $('#cfield_audiocodec').val(audio_dvd_array);
                    }

                }
                if (tipodearquivo[4]){
                    var canais00_dvd = tipodearquivo[4].split('Channel(s):');
                    var canais2_dvd = canais00_dvd[1].split('channels');
                    var audio2_dvd = tipodearquivo[4].split(/\n/);
                    var language00_dvd = tipodearquivo[4].split('Language:');
                    var language2_dvd = language00_dvd[1].split(/\n/);
                    language2_dvd[0] = language2_dvd[0].toLowerCase();
            if (language2_dvd[0].indexOf('english') > -1){
                language_dvd_array += (',english');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language2_dvd[0].indexOf('portuguese') > -1){
                language_dvd_array += (',portuguese');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language2_dvd[0].indexOf('spanish') > -1){
                language_dvd_array += (',spanish');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language2_dvd[0].indexOf('japanese') > -1){
                language_dvd_array += (',japanese');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language2_dvd[0].indexOf('french') > -1){
                language_dvd_array += (',french');
                language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
                    if (audio2_dvd[0].indexOf('AC-3') > -1 && canais2_dvd[0].indexOf('2') > -1){
                        audio_dvd_array += (',ac3');
                        audio_dvd_array = audio_dvd_array.split(',');
                        $('#cfield_audiocodec').val(audio_dvd_array);
                    }
                    if (audio2_dvd[0].indexOf('AC-3') > -1 && canais2_dvd[0].indexOf('6') > -1){
                        audio_dvd_array += (',ac351');
                        audio_dvd_array = audio_dvd_array.split(',');
                        $('#cfield_audiocodec').val(audio_dvd_array);
                    }
                }
                if (tipodearquivo[5]){
                    var canais000_dvd = tipodearquivo[5].split('Channel(s):');
                    var canais3_dvd = canais000_dvd[1].split('channels');
                    var audio3_dvd = tipodearquivo[5].split(/\n/);
                    var language000_dvd = tipodearquivo[5].split('Language:');
                    var language3_dvd = language000_dvd[1].split(/\n/);
                    language3_dvd[0] = language3_dvd[0].toLowerCase();
            if (language3_dvd[0].indexOf('english') > -1){
                language_dvd_array += (',english');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language3_dvd[0].indexOf('portuguese') > -1){
                language_dvd_array += (',portuguese');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language3_dvd[0].indexOf('spanish') > -1){
                language_dvd_array += (',spanish');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language3_dvd[0].indexOf('japanese') > -1){
                language_dvd_array += (',japanese');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language3_dvd[0].indexOf('french') > -1){
                language_dvd_array += (',french');
                language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
                    if (audio3_dvd[0].indexOf('AC-3') > -1 && canais3_dvd[0].indexOf('2') > -1){
                        audio_dvd_array += (',ac3');
                        audio_dvd_array = audio_dvd_array.split(',');
                        $('#cfield_audiocodec').val(audio_dvd_array);
                    }
                    if (audio3_dvd[0].indexOf('AC-3') > -1 && canais3_dvd[0].indexOf('6') > -1){
                        audio_dvd_array += (',ac351');
                        audio_dvd_array = audio_dvd_array.split(',');
                        $('#cfield_audiocodec').val(audio_dvd_array);
                    }
                }
                if (tipodearquivo[6]){
                    var canais0000_dvd = tipodearquivo[6].split('Channel(s):');
                    var canais4_dvd = canais0000_dvd[1].split('channels');
                    var audio4_dvd = tipodearquivo[6].split(/\n/);
                    var language0000_dvd = tipodearquivo[6].split('Language:');
                    var language4_dvd = language0000_dvd[1].split(/\n/);
                    language4_dvd[0] = language4_dvd[0].toLowerCase();
            if (language4_dvd[0].indexOf('english') > -1){
                language_dvd_array += (',english');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language4_dvd[0].indexOf('portuguese') > -1){
                language_dvd_array += (',portuguese');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language4_dvd[0].indexOf('spanish') > -1){
                language_dvd_array += (',spanish');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language4_dvd[0].indexOf('japanese') > -1){
                language_dvd_array += (',japanese');
                 language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
            if (language4_dvd[0].indexOf('french') > -1){
                language_dvd_array += (',french');
                language_dvd_array = language_dvd_array.split(',');
            $('#cfield_language').val(language_dvd_array);}
                    if (audio4_dvd[0].indexOf('AC-3') > -1 && canais4_dvd[0].indexOf('2') > -1){
                        audio_dvd_array += (',ac3');
                        audio_dvd_array = audio_dvd_array.split(',');
                        $('#cfield_audiocodec').val(audio_dvd_array);
                    }
                    if (audio4_dvd[0].indexOf('AC-3') > -1 && canais4_dvd[0].indexOf('6') > -1){
                        audio_dvd_array += (',ac351');
                        audio_dvd_array = audio_dvd_array.split(',');
                        $('#cfield_audiocodec').val(audio_dvd_array);
                    }
                }
            }else{
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// SE NÃO FOR DVD-R ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
            if (release[0].indexOf(' WEB') > -1 && release[0].indexOf('1080p') > -1 || release[0].indexOf(' WEB') > -1 && release[0].indexOf('720p') > -1 || release[0].indexOf('BluRay ') > -1 || release[0].indexOf('Bluray ') > -1 || release[0].indexOf('bluray ') > -1){
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
            if (release[0].indexOf('BDRip') > -1 || release[0].indexOf('BRRip') > -1 || release[0].indexOf('bdrip') > -1 || release[0].indexOf('brrip') > -1){
                $('#cfield_forumid').val('336');
            }
            if (release[0].indexOf('CAM ') > -1 ){
                $('#cfield_forumid').val('338');
            }
            if (release[0].indexOf('2160p') > -1){
                $('#cfield_forumid').val('1403');
            }if (release[0].indexOf('WEB') > -1 ){
                $('#cfield_sourcetype').val('webdl');
            }if (release[0].indexOf('BluRay') > -1 || release[0].indexOf('Bluray') > -1 || release[0].indexOf('bluray') > -1){
                $('#cfield_sourcetype').val('bluray');
            }if (release[0].indexOf('BRRip') > -1 || release[0].indexOf('brrip') > -1){
                $('#cfield_sourcetype').val('brrip');
            }if (release[0].indexOf('BDRip') > -1 || release[0].indexOf('bdrip') > -1){
                $('#cfield_sourcetype').val('bdrip');
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
            //var canais = canais0[1].split('Channel');
                var canais = canais0[1].split(/\n/);
            var canais2 = canais0[2];
            var array_audio;
            var linguagem0 = canais0[1].split('Language:');
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
                var linguagem02 = canais2[1].split('Language:');
                console.log(canais2[1]);
                var linguagem2 = linguagem02[1].split(/\n/);
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
                if (release[0].indexOf('DTS-HD') > -1 && tipodearquivo[0].indexOf('2.0') > -1){
                    array_audio = ('dtshdma');}
                else if (release[0].indexOf('DTS-HD') > -1 && tipodearquivo[0].indexOf('5.1') > -1){
                    array_audio = ('dtshdma51');}
                else if (release[0].indexOf('DTS-HD') > -1 && tipodearquivo[0].indexOf('6.1') > -1){
                    array_audio = ('dtshdma61');}
                else if (release[0].indexOf('DTS-HD') > -1 && tipodearquivo[0].indexOf('7.1') > -1){
                    array_audio = ('dtshdma71');}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                else if (audio2[0].indexOf('dts') > -1 && canais2[0].indexOf('2') > -1){
                array_audio = ('dts');}
                else if (audio2[0].indexOf('dts') > -1 && canais2[0].indexOf('6') > -1){
                array_audio = ('dts51');}
                else if (audio2[0].indexOf('dts') > -1 && canais2[0].indexOf('7') > -1){
                array_audio = ('dts61');}
                else if (audio2[0].indexOf('dts') > -1 && canais2[0].indexOf('8') > -1){
                array_audio = ('dts71');}
            }
            else{
                }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////SEGUNDO AUDIO//////////////////////////////////////////////////////////////
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

function capitalize(s){//FUNÇÃO PRIMEIRA LETRA DE CADA PALAVRA EM MAIUSCULO
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};
                //////////////////////////////////

            if (release[0].indexOf(' HDR ') > -1){
                $('#cfield_hdr').val('yes');}
            if (release[0].indexOf('/') > -1){
            var excl_path = release[0].split('/');
            excl_path.reverse();
            release[0] = excl_path[0];
            }
            if(release[0] == release[0].toLowerCase()){
              var release_lowercase = release[0].split('-');
              release_lowercase[1] = release_lowercase[1].toUpperCase();
              release_lowercase[0] = capitalize(release_lowercase[0]);
              release[0] = release_lowercase[0].concat('-',release_lowercase[1]);
            }

            release[0] = release[0].replace(/5 1 /g, "5.1 ");
            release[0] = release[0].replace(/2 0 /g, "2.0 ");
            release[0] = release[0].replace(/7 1 /g, "7.1 ");
            release[0] = release[0].replace(/ H 264/g, " H264");
            release[0] = release[0].replace(/ X264/g, " x264");
            release[0] = release[0].replace(/Bdrip/g, "BDRip");
            release[0] = release[0].replace(/Brrip/g, "BRRip");
            release[0] = release[0].replace(/Unrated/g, "UNRATED");
            $('#cfield_title').val(release[0]);
            $('#cfield_size').val(tam[0]);
            $('#cfield_resolution').val(width[0]+'x'+height[0]);
            $('#cfield_framerate').val(fps[0]+" fps");
            $('#cfield_compression').val('rar');
            $('#cfield_description').val('[mediainfo]'+content_mediainfo+'[/mediainfo]');
            $('#cfield_subtitles_included').val('no');

            alert(release[0]);
            //alert(content);

}
        }

        reader.readAsText(file);
    } else {
        //fileDisplayArea.innerText = "File not supported!"
    }
});}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ADICIONA UM LOGO DA FW NA PÁGINA DO IMDB PARA FAZER BUSCA DE UPLOADS

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (window.location.href.indexOf("https://www.imdb.com/title") != -1 ) {
if(document.getElementById('titleYear')){
    var img = new Image();
    img.src = 'https://i.imgur.com/jqqCux6.png';
    img.title ='Buscar Uploads';
    var criar = new Image();
    criar.src = 'https://i.imgur.com/jqqCux6.png';
    criar.title ='Criar Título';
    criar.addEventListener("mouseover", function(){criar.src = 'https://i.imgur.com/EKlG285.png';});
    criar.addEventListener("mouseout", function(){criar.src = 'https://i.imgur.com/jqqCux6.png';});
    img.addEventListener("mouseover", function(){img.src = 'https://i.imgur.com/DZ2twAY.png';});
    img.addEventListener("mouseout", function(){img.src = 'https://i.imgur.com/jqqCux6.png';});


if(document.getElementsByClassName('originalTitle')[0]){
var titulo_secundario = document.getElementsByClassName('originalTitle')[0].innerText;
titulo_secundario = titulo_secundario.split('(');
titulo_secundario[0] = titulo_secundario[0].substring(0,(titulo_secundario[0].length - 1));
console.log(titulo_secundario[0]);
var ano_principal = document.getElementById('titleYear').innerText;
ano_principal = ano_principal.split('(');
ano_principal = ano_principal[1].split(')');
console.log(ano_principal[0]);
img.onclick = function() {
    window.open('https://filewarez.tv/postador.php?do=searchupload&title_title='+titulo_secundario[0]+'&title='+ano_principal+'&status=1&type=movie');
};
}
else{

var titulo_principal = document.getElementsByTagName('h1')[0].innerText;
titulo_principal = titulo_principal.split('(');
titulo_principal[0] = titulo_principal[0].substring(0,(titulo_principal[0].length - 1));
console.log(titulo_principal[0]);
var ano_principal = document.getElementById('titleYear').innerText;
ano_principal = ano_principal.split('(');
ano_principal = ano_principal[1].split(')');
console.log(ano_principal[0]);
img.onclick = function() {
window.open('https://filewarez.tv/postador.php?do=searchupload&title_title='+titulo_principal[0]+'&title='+ano_principal+'&status=1&type=movie');
};
}
criar.addEventListener('click', function () {
var page= document.documentElement.innerHTML;
var doc1 = page.split('"url": "/title/');
var id = doc1[1].split('/');


        $.ajax({
          url : "https://pvp2004.000webhostapp.com/filmes.php",
          type : 'post',

          data : {
               copia:id[0]
          },
          beforeSend : function(){
               GM_notification ( {
                title: 'PvP diz:', timeout: '2300', text: 'Buscando Informações!'
            } );
          }
     })
     .done(function(msg){
 GM_notification ( {
                title: 'PvP diz:', timeout: '1700', text: 'Informações Inseridas!'
            } );
            //console.log(msg);
    var doc = new DOMParser().parseFromString(msg, 'text/html');
            GM_setValue('o_titulo', doc.getElementById("o_titulo").innerText);
            GM_setValue('titulo', doc.getElementById("titulo").innerText);
            var genero_imdb = doc.getElementById("genero").innerText;
            genero_imdb = genero_imdb.replace(/\n/g, " ");
            GM_setValue('genero', genero_imdb);
            GM_setValue('minutos', doc.getElementById("minutos").innerText);
            GM_setValue('ano', doc.getElementById("ano").innerText);
            GM_setValue('direcao', doc.getElementById("direcao").innerText);
            GM_setValue('imdb', doc.getElementById("imdb").innerText);
            GM_setValue('site', doc.getElementById("site").innerText);
            GM_setValue('actor', doc.getElementById("actor").innerText);
            GM_setValue('sinopse', doc.getElementById("sinopse").innerText);
            GM_setValue('yt', doc.getElementById("yt").innerText);
            GM_setValue('exinfo', doc.getElementById("exinfo").innerText);
            console.log(doc.getElementById("img").innerText);
            GM_setValue('img', doc.getElementById("img").innerText);
            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=movie");

})
        .fail(function(jqXHR, textStatus, msg){
 alert(msg);
   });

})
 var local = document.getElementById('titleYear');
 local.appendChild(criar);
 local.appendChild(img);
}
//se for série
if(document.getElementById('titleYear') == null){
var img = new Image();
img.src = 'https://i.imgur.com/jqqCux6.png';
img.alt ='Clique no Ícone para Buscar';
img.addEventListener("mouseover", function(){img.src = 'https://i.imgur.com/DZ2twAY.png';});
img.addEventListener("mouseout", function(){img.src = 'https://i.imgur.com/jqqCux6.png';});


if(document.getElementsByClassName('originalTitle')[0]){

var titulo_secundario = document.getElementsByClassName('originalTitle')[0].innerText;
titulo_secundario = titulo_secundario.split('(');
titulo_secundario[0] = titulo_secundario[0].substring(0,(titulo_secundario[0].length - 1));
console.log(titulo_secundario[0]);

img.onclick = function() {
window.open('https://filewarez.tv/postador.php?do=searchupload&title_title='+titulo_secundario[0]+'&status=1&type=tvshow');
};

}
else{

var titulo_principal = document.getElementsByTagName('h1')[0].innerText;
titulo_principal = titulo_principal.split('(');
titulo_principal[0] = titulo_principal[0].substring(0,(titulo_principal[0].length - 1));
console.log(titulo_principal[0]);

img.onclick = function() {
window.open('https://filewarez.tv/postador.php?do=searchupload&title_title='+titulo_principal[0]+'&status=1&type=tvshow');
};

}

var local = document.getElementsByTagName('h1')[0];
 local.appendChild(img);
}
}
