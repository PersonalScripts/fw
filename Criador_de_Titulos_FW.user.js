// ==UserScript==
// @name        Criador de Títulos [FW]
// @namespace   PvP
// @version      1.76
// @description  Busca as informações e preenche o postador.
// @author      PvP
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=movie
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=tvshow
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=cartoon
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=anime
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=game
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=xxx
// @include     https://filewarez.tv/postador.php?do=addtitle&step=2&type=show
// @include     https://filewarez.tv/postador.php
// @include     https://filewarez.tv/postador.php?do=addupload*
// @include     https://filewarez.tv/newthread.php?do=newthread&f=14
// @include     https://filewarez.tv/postador.php?do=edittitle*
// @include     https://filewarez.tv/postador.php?do=editupload*
// @include     https://filewarez.tv/postador.php?do=moderatetitle*
// @include     https://www.imdb.com/title*
// @updateURL   https://github.com/PersonalScripts/fw/raw/master/Criador_de_Titulos_FW.user.js
// @downloadURL https://github.com/PersonalScripts/fw/raw/master/Criador_de_Titulos_FW.user.js
// @include     https://pvp2004.000webhostapp.com/*
// @include     http://www.fw.artvetro.com.br/*
// @include     https://www.fw.artvetro.com.br/*
// @include     https://store.steampowered.com/app*
// @include     https://www.epicgames.com/store*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_notification
// @grant       GM_addStyle
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js
// @require     https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js
// @require            https://openuserjs.org/src/libs/sizzle/GM_config.js
// ==/UserScript==

//##############################################################################################//
//CONFIGURAÇÕES PADRÃO
var content_mediainfo;
var frame = document.createElement('div');
document.body.appendChild(frame);
GM_config.init(
{
  'id': 'MyConfig', // The id used for this instance of GM_config
  'title': `<br><h1 style="background-color:white;"><img src="https://i.imgur.com/enqV0yc.png"><br><img src="https://i.imgur.com/RsLynzw.png?1"></h1>`,
  'css': '.config_var, #MyConfig_buttons_holder { margin-top: 20px !important;text-align: center !important;display: block !important; } #MyConfig_field_ComentariosUploader { margin-top: 10px !important; margin-left: auto !important; margin-right: auto !important;display: block !important; } #MyConfig_field_BtPath { margin-left: auto !important; margin-right: auto !important;} #MyConfig{width: 700px !important;}#MyConfig_field_enviando{margin-top:5px !important;}',
  'events':
  {
    'open': function() {
      $("#MyConfig_saveBtn").html("Salvar");
      $("#MyConfig_closeBtn").html("Fechar");
      $("#MyConfig_resetLink").html("Restaurar Padrões");
      $("input[name=Senha]").css({"margin-left":"5px","margin-top":"5px" });
      $("input[name=enviando]").css({"margin-left":"5px","margin-top":"5px" });
      $("input[name=Add_bts]").css({"margin-left":"5px","margin-top":"5px" });

      if(GM_config.get('Senha') == 'Sim'){
      $('#MyConfig_field_SenhaSim').attr("type", 'text');
      }
      else{
      $('#MyConfig_field_SenhaSim').attr("type", 'hidden');
      }

      $("#MyConfig_field_Senha").on('change', "input[name=Senha]", function() {
      //alert($("input[name='Senha']:checked").val());
      console.log(GM_config.get('Senha'));
      if($("input[name='Senha']:checked").val() == 'Sim'){
      $('#MyConfig_field_SenhaSim').attr("type", 'text');
      }
      else if($("input[name='Senha']:checked").val() == 'Não'){
      $('#MyConfig_field_SenhaSim').val('');
      $('#MyConfig_field_SenhaSim').attr("type", 'hidden');
      }
});

      if(GM_config.get('Add_bts') == 'Sim'){
      $('#MyConfig_field_BtPath').show();
      }
      else{
      $('#MyConfig_field_BtPath').hide();
      }

      $("#MyConfig_field_Add_bts").on('change', "input[name=Add_bts]", function() {
      //alert($("input[name='Senha']:checked").val());
      console.log(GM_config.get('Add_bts'));
      if($("input[name='Add_bts']:checked").val() == 'Sim'){
      $('#MyConfig_field_BtPath').val('https://');
      $('#MyConfig_field_BtPath').show();
      }
      else if($("input[name='Add_bts']:checked").val() == 'Não'){
      $('#MyConfig_field_BtPath').val('');
      $('#MyConfig_field_BtPath').hide();
      }
});
    }
  },
    'fields': // Fields object
  {
      'separador': // This is the id of the field
    {
      'section': ['Leitor de MediaInfo', 'Selecione suas preferências e clique em Salvar!'],
      'type': 'hidden', // Makes this setting a text field
      'default': '' // Default value if user doesn't change it
    },
    'Senha': // This is the id of the field
    {
      'options': ['Sim', 'Não'],
      'label': 'Senha: ', // Appears next to field
      'type': 'radio', // Makes this setting a text field
      'title': 'Senha Opcional',
      'default': '' // Default value if user doesn't change it
    },
    'SenhaSim': // This is the id of the field
    {
      //'label': 'Senha: ', // Appears next to field
      'type': 'hidden', // Makes this setting a text field
      'title': 'Preencha apenas se utilizar o campo!',
      'default': '' // Default value if user doesn't change it
    },
    'Compressao':
    {
      'label': 'Compressão: ', // Appears next to field
      'type': 'select', // Makes this setting a dropdown
      'options': ['Nenhuma', 'RAR', 'ZIP'], // Possible choices
      'default': 'Nenhuma' // Default value if user doesn't change it
    },
    'ComentariosUploader': // This is the id of the field
    {
      'label': 'Comentários do Uploader: ', // Appears next to field
      'type': 'textarea', // Makes this setting a text field
      'cols':'80',
      'rows':'10',
      'title': 'Não apagar a linha com o BBCode mediainfo!',
      'default': '[mediainfo]MEDIAINFO[/mediainfo]' // Default value if user doesn't change it
    },
    'separador2': // This is the id of the field
    {
      'section': ['Facilidades em Geral'],
      'type': 'hidden', // Makes this setting a text field
      'default': '' // Default value if user doesn't change it
    },
    'enviando': // This is the id of the field
    {
      'options': ['Sim', 'Não'],
        'label': 'Após carregar o mediainfo, autorizar o script a postar no "Enviando Agora" quando clicar em Prosseguir:',
        'title': 'Abre a janela pra postar no mediainfo e fecha sozinho em seguida.',
        'type': 'radio',
        'default': 'Não'
    },
    'Add_bts': // This is the id of the field
    {
      'options': ['Sim', 'Não'],
        'label': `Permitir que o script adicione botões para formar o link direto com o nome do arquivo:<br>Se 'Sim', adicione o domínio do link direto:`,
        'type': 'radio',
        'default': 'Não'
    },
    'BtPath': // This is the id of the field
    {
      'type': 'textarea', // Makes this setting a text field
      'cols':'35',
      'rows':'3',
      'title': 'Se utilizar mais de um domínio, insira um por linha. Útil apenas para link direto e carregados pelo leitor de mediainfo.',
      'default': '' // Default value if user doesn't change it
    }

  },
     'frame': frame // Element used for the panel
});
//GM_config.open();




//##############################################################################################//
if (window.location.href.indexOf("https://www.fw.artvetro.com.br/") != -1 || window.location.href.indexOf("http://www.fw.artvetro.com.br/") != -1) {

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
    var actor_preview = actor;
    actor_preview = actor_preview.replace(/TABLE\]/gi, "table>");
    actor_preview = actor_preview.replace(/TD\]/gi, "td>");
    actor_preview = actor_preview.replace(/TR\]/gi, "tr>");
    actor_preview = actor_preview.replace(/URL=/gi, 'a href="');
    actor_preview = actor_preview.replace(/\[\/URL]/gi, "</a>");
    actor_preview = actor_preview.replace(/CENTER\]/gi, "center>");
    actor_preview = actor_preview.replace(/B\]/gi, "b>");
    actor_preview = actor_preview.replace(/\[IMG2='120px'\]/gi, '<img width="120" src="');
    actor_preview = actor_preview.replace(/\[\/IMG2\]/gi, '"></img>');
    actor_preview = actor_preview.replace(/\[IMG\]/gi, '<img src="');
    actor_preview = actor_preview.replace(/\[\/IMG\]/gi, '"></img>');
    actor_preview = actor_preview.replace(/\[/gi, "<");
    actor_preview = actor_preview.replace(/\]/gi, '">');
    actor_preview = actor_preview.replace(/\n<b>/gi, '<br><b>');
    actor_preview = actor_preview.replace(/"><img/gi, '" target="_blank"><img');
    console.log(actor_preview);
    document.getElementById('cfield_title').value = o_titulo;
    document.getElementById('cfield_title_translated').value = titulo;
    //Genre utiliza JQuery para selecionar mais de um, utilizando array
    try{
    genre = genre.replace(/comedy/g, "commedy");
    genre = genre.replace(/mystery/g, "mistery");
    genre = genre.replace(/horror/g, "terror");
    genre = genre.replace(/music/g, "musical");
    genre = genre.replace(/ /g, ",");

    var genre_array = genre.split(',');
    console.log(genre_array);
    }catch(e){}

    $("#cfield_genre").next().remove();
    $("#cfield_genre").select2({width: "100%"});
    $('#cfield_genre').val(genre_array).trigger("change");
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
    $('#cfield_genre').next().remove();
    $('#cfield_genre').select2({width: "100%"});
    $('#cfield_genre').val(genero).trigger("change");
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
    $('#cfield_genre').next().remove();
    $('#cfield_genre').select2({width: "100%"});
    $('#cfield_genre').val(genregames_array).trigger("change");
    document.getElementById('cfield_manufactor').value = fabricantegames;
    document.getElementById('cfield_year').value = anogames;
    $('#cfield_os').next().remove();
    $('#cfield_os').select2({width: "100%"});
    $('#cfield_os').val(plataformagames).trigger("change");
    //document.getElementById('cfield_os').value = plataformagames;
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
    genre_series = genre_series.replace(/music/g, "musical");
    genre_series = genre_series.replace(/ /g, ",");
    var genre_array_series = genre_series.split(',');
    console.log(genre_array_series);
    $('#cfield_genre').next().remove();
    $('#cfield_genre').select2({width: "100%"});
    $('#cfield_genre').val(genre_array_series).trigger("change");
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////SET DE DESENHOS
else if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=addtitle&step=2&type=cartoon") != -1){
    var o_titulo_cartoon = GM_getValue('o_titulo');
    var titulo_cartoon = GM_getValue('titulo');
    var genre_cartoon = GM_getValue('genero');
    var minutos_cartoon = GM_getValue('minutos');
    var year_cartoon = GM_getValue('ano');
    var criador_cartoon = GM_getValue('criador');
    var imdb_cartoon = GM_getValue('imdb');
    var site_cartoon = GM_getValue('site');
    var actor_cartoon = GM_getValue('actor');
    var sumario_cartoon = GM_getValue('sinopse');
    var yt_cartoon = GM_getValue('yt');
    var temporada_cartoon = GM_getValue('temp');
    var episodios_cartoon = GM_getValue('episodios');
    document.getElementById('cfield_title').value = o_titulo_cartoon;
    document.getElementById('cfield_title_translated').value = titulo_cartoon;
    //Genre utiliza JQuery para selecionar mais de um, utilizando array
    genre_cartoon = genre_cartoon.replace(/comedy/g, "commedy");
    genre_cartoon = genre_cartoon.replace(/mystery/g, "mistery");
    genre_cartoon = genre_cartoon.replace(/horror/g, "terror");
    genre_cartoon = genre_cartoon.replace(/music/g, "musical");
    genre_cartoon = genre_cartoon.replace(/ /g, ",");
    var genre_array_cartoon = genre_cartoon.split(',');
    console.log(genre_array_cartoon);
    $('#cfield_genre').next().remove();
    $('#cfield_genre').select2({width: "100%"});
    $('#cfield_genre').val(genre_array_cartoon).trigger("change");
    document.getElementById('cfield_duration').value = minutos_cartoon;
    document.getElementById('cfield_year').value = year_cartoon;
    document.getElementById('cfield_creator').value = criador_cartoon;
    document.getElementById('cfield_imdb').value = imdb_cartoon;
    document.getElementById('cfield_site').value = site_cartoon;
    document.getElementById('cfield_cast').value = actor_cartoon;
    document.getElementById('cfield_summary').value = sumario_cartoon;
    document.getElementById('cfield_trailer').value = yt_cartoon;
    document.getElementById('cfield_season').value = temporada_cartoon;
    document.getElementById('cfield_episodes').value = episodios_cartoon;
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////SET DE ANIMES
else if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=addtitle&step=2&type=anime") != -1){
    var o_titulo_anime = GM_getValue('o_titulo');
    var titulo_anime = GM_getValue('titulo');
    var genre_anime = GM_getValue('genero');
    var minutos_anime = GM_getValue('minutos');
    var year_anime = GM_getValue('ano');
    var criador_anime = GM_getValue('criador');
    var imdb_anime = GM_getValue('imdb');
    var site_anime = GM_getValue('site');
    var actor_anime = GM_getValue('actor');
    var sumario_anime = GM_getValue('sinopse');
    var yt_anime = GM_getValue('yt');
    var temporada_anime = GM_getValue('temp');
    var episodios_anime = GM_getValue('episodios');
    document.getElementById('cfield_title').value = o_titulo_anime;
    document.getElementById('cfield_title_translated').value = titulo_anime;
    //Genre utiliza JQuery para selecionar mais de um, utilizando array
    genre_anime = genre_anime.replace(/comedy/g, "commedy");
    genre_anime = genre_anime.replace(/mystery/g, "mistery");
    genre_anime = genre_anime.replace(/horror/g, "terror");
    genre_anime = genre_anime.replace(/music/g, "musical");
    genre_anime = genre_anime.replace(/ /g, ",");
    var genre_array_anime = genre_anime.split(',');
    console.log(genre_array_anime);
    $('#cfield_genre').next().remove();
    $('#cfield_genre').select2({width: "100%"});
    $('#cfield_genre').val(genre_array_anime).trigger("change");
    document.getElementById('cfield_duration').value = minutos_anime;
    document.getElementById('cfield_year').value = year_anime;
    document.getElementById('cfield_creator').value = criador_anime;
    document.getElementById('cfield_imdb').value = imdb_anime;
    //document.getElementById('cfield_site').value = site_anime;
    document.getElementById('cfield_cast').value = actor_anime;
    document.getElementById('cfield_summary').value = sumario_anime;
    document.getElementById('cfield_trailer').value = yt_anime;
    //document.getElementById('cfield_season').value = temporada_anime;
    document.getElementById('cfield_episodes').value = episodios_anime;
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////SET DE SHOWS
else if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=addtitle&step=2&type=show") != -1){
    var o_titulo_show = GM_getValue('o_titulo');
    var titulo_show = GM_getValue('titulo');
    var genre_show = GM_getValue('genero');
    var minutos_show = GM_getValue('minutos');
    var year_show = GM_getValue('ano');
    var director_show = GM_getValue('direcao');
    var imdb_show = GM_getValue('imdb');
    var site_show = GM_getValue('site');
    var actor_show = GM_getValue('actor');
    var sumario_show = GM_getValue('sinopse');
    var yt_show = GM_getValue('yt');
    var exinfo_show = GM_getValue('exinfo');
    var actor_preview_show = actor_show;
    actor_preview_show = actor_preview_show.replace(/TABLE\]/gi, "table>");
    actor_preview_show = actor_preview_show.replace(/TD\]/gi, "td>");
    actor_preview_show = actor_preview_show.replace(/TR\]/gi, "tr>");
    actor_preview_show = actor_preview_show.replace(/URL=/gi, 'a href="');
    actor_preview_show = actor_preview_show.replace(/\[\/URL]/gi, "</a>");
    actor_preview_show = actor_preview_show.replace(/CENTER\]/gi, "center>");
    actor_preview_show = actor_preview_show.replace(/B\]/gi, "b>");
    actor_preview_show = actor_preview_show.replace(/\[IMG2='120px'\]/gi, '<img width="120" src="');
    actor_preview_show = actor_preview_show.replace(/\[\/IMG2\]/gi, '"></img>');
    actor_preview_show = actor_preview_show.replace(/\[IMG\]/gi, '<img src="');
    actor_preview_show = actor_preview_show.replace(/\[\/IMG\]/gi, '"></img>');
    actor_preview_show = actor_preview_show.replace(/\[/gi, "<");
    actor_preview_show = actor_preview_show.replace(/\]/gi, '">');
    actor_preview_show = actor_preview_show.replace(/\n<b>/gi, '<br><b>');
    actor_preview_show = actor_preview_show.replace(/"><img/gi, '" target="_blank"><img');
    console.log(actor_preview_show);
    document.getElementById('cfield_title').value = o_titulo_show;
    document.getElementById('cfield_title_translated').value = titulo_show;
    //Genre utiliza JQuery para selecionar mais de um, utilizando array
    try{
    genre_show = genre_show.replace(/comedy/g, "commedy");
    genre_show = genre_show.replace(/mystery/g, "mistery");
    genre_show = genre_show.replace(/horror/g, "terror");
    //genre_show = genre_show.replace(/music/g, "musical");
    genre_show = genre_show.replace(/ /g, ",");

    var genre_array_show = genre_show.split(',');
    console.log(genre_array_show);
    }catch(e){}

    $("#cfield_genre").next().remove();
    $("#cfield_genre").select2({width: "100%"});
    $('#cfield_genre').val(genre_array_show).trigger("change");
    document.getElementById('cfield_duration').value = minutos_show;
    document.getElementById('cfield_year').value = year_show;
    document.getElementById('cfield_direction').value = director_show;
    document.getElementById('cfield_imdb').value = imdb_show;
    document.getElementById('cfield_site').value = site_show;
    document.getElementById('cfield_components').value = actor_show;
    document.getElementById('cfield_summary').value = sumario_show;
    document.getElementById('cfield_trailer').value = yt_show;
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

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
////////////////////////EDITOR DE TÍTULOS DE FILMES//////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

if (window.location.href.indexOf('https://filewarez.tv/postador.php?do=edittitle') != -1 || window.location.href.indexOf('https://filewarez.tv/postador.php?do=addtitle') != -1 || window.location.href.indexOf('https://filewarez.tv/postador.php?do=moderatetitle') != -1){
if(document.getElementById('cfield_imdb')){
    var img = new Image();
    img.src = 'https://i.imgur.com/jqqCux6.png';
    img.title ='Atualizar Título (Filmes/Séries/Desenhos/Animes)';
    img.style ="float:left;margin-top:5px;";
    img.id = "img_edit";
    img.addEventListener("mouseover", function(){img.src = 'https://i.imgur.com/HLfKSIH.png';});
    img.addEventListener("mouseout", function(){img.src = 'https://i.imgur.com/jqqCux6.png';});
    var local = document.getElementById('cfield_imdb');
    local.after(img);
    var elencoimdb = new Image();
    var elencotmdb = new Image();
    var elencosemfoto = new Image();
    var preview_actors = new Image();
    var preview_trailer = new Image();
    elencoimdb.src = 'https://www.fw.artvetro.com.br/img/imdblogo.png';
    elencotmdb.src = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg';
    elencosemfoto.src = 'https://i.imgur.com/pcTy5ku.png';
    preview_actors.src = 'https://i.imgur.com/hV9FqXR.png';
    preview_trailer.src = 'https://i.imgur.com/hV9FqXR.png';
    elencoimdb.style ="float:left;margin-bottom:5px;margin-right:5px;height:20px;";
    elencotmdb.style ="float:left;margin-bottom:5px;margin-right:5px;height:20px;width:31px;";
    elencosemfoto.style ="float:left;margin-bottom:5px;height:20px;width:23px;";
    preview_actors.style ="float:left;margin-top:5px;margin-left:5px;height:17px;width:27px;";
    preview_trailer.style ="float:left;margin-top:5px;margin-left:5px;height:17px;width:27px;";
    elencoimdb.title ='Atualizar Elenco com IMDB (Com Fotos)';
    elencotmdb.title ='Atualizar Elenco com TMDB (Com Fotos)';
    elencosemfoto.title ='Atualizar Elenco IMDB (Apenas Texto)';
    preview_actors.title ='Preview do Elenco';
    preview_trailer.title ='Preview do Trailer';
    if(document.getElementById("cfield_artist")){
        var localelenco = document.getElementById("cfield_components");
    var localtrailer = document.getElementById("cfield_trailer");
    localelenco.before(elencoimdb);
    localelenco.before(elencotmdb);
    localelenco.before(elencosemfoto);
    localelenco.after(preview_actors);
    localtrailer.after(preview_trailer);
       }else{
    var localelenco = document.getElementById("cfield_cast");
    var localtrailer = document.getElementById("cfield_trailer");
    localelenco.before(elencoimdb);
    localelenco.before(elencotmdb);
    localelenco.before(elencosemfoto);
    localelenco.after(preview_actors);
    localtrailer.after(preview_trailer);}
    if(document.getElementById('cfield_myanimelist')){
        var elencomal = new Image();
        elencomal.src = 'https://i.imgur.com/wAzTPtT.png';
        elencomal.style ="float:left;margin-top:1px;margin-left:5px;height:18px;";
        elencomal.title ='Atualizar Elenco MAL (MyAnimeList)';
        elencomal.id ='myanimelist';
        localelenco.before(elencomal);
        if(document.getElementById('myanimelist')){
        elencomal.addEventListener('click', function () {
            var site = $('#cfield_myanimelist').val();
        $.ajax({
          url : "https://www.fw.artvetro.com.br/filmes2-animes.php",
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
    	var actor = doc.getElementById("actor").innerText;
    	document.getElementById('cfield_cast').value = actor;
        var studio = doc.getElementById("studio").innerText;
    	var epi_anime = doc.getElementById("epi_anime").innerText;
    	document.getElementById('cfield_cast').value = actor;
    	document.getElementById('cfield_studio').value = studio;
            if(epi_anime !='' || epi_anime !='~'){
    	document.getElementById('cfield_episodes').value = epi_anime;
            }	
	})
        .fail(function(jqXHR, textStatus, msg){
	alert('Falhou!');
   	});
    	})
        }
    }
	
var style = document.createElement('style');

function myFunc () {
    'use strict';
    if(document.getElementById('cfield_cast')){
    var actor_preview = document.getElementById('cfield_cast').value;
    actor_preview = actor_preview.replace(/TABLE\]/gi, "table>");
    actor_preview = actor_preview.replace(/TD\]/gi, "td>");
    actor_preview = actor_preview.replace(/TR\]/gi, "tr>");
    actor_preview = actor_preview.replace(/URL=/gi, 'a href="');
    actor_preview = actor_preview.replace(/\[\/URL]/gi, "</a>");
    actor_preview = actor_preview.replace(/CENTER\]/gi, "center>");
    actor_preview = actor_preview.replace(/B\]/gi, "b>");
    actor_preview = actor_preview.replace(/\[IMG2='120px'\]/gi, '<img width="120" src="');
    actor_preview = actor_preview.replace(/\[\/IMG2\]/gi, '"></img>');
    actor_preview = actor_preview.replace(/\[IMG\]/gi, '<img src="');
    actor_preview = actor_preview.replace(/\[\/IMG\]/gi, '"></img>');
    actor_preview = actor_preview.replace(/\[/gi, "<");
    actor_preview = actor_preview.replace(/\]/gi, '">');
    actor_preview = actor_preview.replace(/\n<b>/gi, '<br><b>');
    actor_preview = actor_preview.replace(/"><img/gi, '" target="_blank"><img');
    }
    if(document.getElementById('cfield_components')){
    var actor_preview = document.getElementById('cfield_components').value;
    actor_preview = actor_preview.replace(/TABLE\]/gi, "table>");
    actor_preview = actor_preview.replace(/TD\]/gi, "td>");
    actor_preview = actor_preview.replace(/TR\]/gi, "tr>");
    actor_preview = actor_preview.replace(/URL=/gi, 'a href="');
    actor_preview = actor_preview.replace(/\[\/URL]/gi, "</a>");
    actor_preview = actor_preview.replace(/CENTER\]/gi, "center>");
    actor_preview = actor_preview.replace(/B\]/gi, "b>");
    actor_preview = actor_preview.replace(/\[IMG2='120px'\]/gi, '<img width="120" src="');
    actor_preview = actor_preview.replace(/\[\/IMG2\]/gi, '"></img>');
    actor_preview = actor_preview.replace(/\[IMG\]/gi, '<img src="');
    actor_preview = actor_preview.replace(/\[\/IMG\]/gi, '"></img>');
    actor_preview = actor_preview.replace(/\[/gi, "<");
    actor_preview = actor_preview.replace(/\]/gi, '">');
    actor_preview = actor_preview.replace(/\n<b>/gi, '<br><b>');
    actor_preview = actor_preview.replace(/"><img/gi, '" target="_blank"><img');
    }

    var modalHtml = `
<!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-xl">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Preview</h4>
        </div>
        <div class="modal-body">
`+actor_preview+`
      </div>
      <div class="modal-footer">

        </div>
    </div>
  </div>
</div>
`;

    //--- Add nodes to page
    //$("body").prepend(deleteButtonHtml);
$("body").prepend(modalHtml);
    style.innerHTML = `
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #FDCB74;
  width: 645px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
overflow: auto;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: black;
  float: right;
  font-size: 15px;
  font-weight: bold;
  width: 30px;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.modal-title{font-size: 15px;font:   bold 12px Tahoma, Helvetica, Geneva;margin:0;line-height:1.42857143}
.btn-default{width: 30px;float: center;font-size: 15px;color:#333;background-color:#fff;border-color:#ccc}

.modal-header {
  padding: 2px 16px;
  background-color: #E19B38;
    border-bottom: 1px solid #FDCB74;
  color: white;
height:25px;
}

.modal-body {padding: 10px 16px;overflow-x: auto;}


div.modal-body {
    max-width: 100%;
    overflow-x: auto;
}`;
    document.head.appendChild(style);
}
    preview_actors.onclick = function() {
         myFunc();
         $('#myModal').modal("show");
};
	
function myFunc2 () {
    'use strict';
    if(document.getElementById('cfield_trailer')){
    var id_trailer = document.getElementById('cfield_trailer').value;
var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var match = id_trailer.match(regExp);
if (match && match[2].length == 11) {
  id_trailer = match[2];
} else {
  //error
}
    var trailer_preview ='<center><iframe width="640" height="360" src="https://www.youtube.com/embed/'+id_trailer+'" frameborder="0" allowfullscreen></iframe></center>';
    }

    var modalHtml = `
<!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-xl">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Preview</h4>
        </div>
        <div class="modal-body">
`+trailer_preview+`
      </div>
      <div class="modal-footer">

        </div>
    </div>
  </div>
</div>
`;

    //--- Add nodes to page
    //$("body").prepend(deleteButtonHtml);
$("body").prepend(modalHtml);
    style.innerHTML = `
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #FDCB74;
  width: 665px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
overflow: auto;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: black;
  float: right;
  font-size: 15px;
  font-weight: bold;
  width: 30px;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.modal-title{font-size: 15px;font:   bold 12px Tahoma, Helvetica, Geneva;margin:0;line-height:1.42857143}
.btn-default{width: 30px;float: center;font-size: 15px;color:#333;background-color:#fff;border-color:#ccc}

.modal-header {
  padding: 2px 16px;
  background-color: #E19B38;
    border-bottom: 1px solid #FDCB74;
  color: white;
height:25px;
}

.modal-body {padding: 10px 16px;overflow-x: auto;}


div.modal-body {
    max-width: 100%;
    overflow-x: auto;
}`;
    document.head.appendChild(style);
}

    preview_trailer.onclick = function() {
         myFunc2();
         $('#myModal').modal("show");
};	

  img.addEventListener('click', function () {
    
      if($('#cfield_imdb').val() == "https://imdb.com/title/"){
      alert('IMDB ID não preenchido!');}
      else if($('#cfield_imdb').val() == ""){
      alert('Você não pode fazer uma pesquisa em branco!');}
      else{
  

        var site = $('#cfield_imdb').val();
        site = site.replace(/imdb/g, "www.imdb");
        $.ajax({
          url : "https://www.fw.artvetro.com.br/filmes2.php",
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
    
    

    //if para editar séries
    if (doc.getElementById("criador")){
    var criador = doc.getElementById("criador").innerText;
    var episodios = doc.getElementById("episodios").innerText;
    var temp = doc.getElementById("temp").innerText;
	    if (criador != ""){
    document.getElementById('cfield_creator').value = criador;
	    }
    document.getElementById('cfield_episodes').value = episodios;
	    if (document.getElementById('cfield_season')){
    document.getElementById('cfield_season').value = temp;
	    }
    //document.getElementById('cfield_summary').value ="";
    }else{
    var sumario = doc.getElementById("sinopse").innerText;
    if (sumario != ""){
    document.getElementById('cfield_summary').value = sumario;}
    var yt = doc.getElementById("yt").innerText;
    if (yt != ""){
    document.getElementById('cfield_trailer').value = yt;}
    var year = doc.getElementById("ano").innerText;
    document.getElementById('cfield_year').value = year;
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
    genre = genre.replace(/music/g, "musical");
    genre = genre.replace(/\n/g, ",");
            console.log(genre);
    var genre_array = genre.split(',');
    console.log(genre_array);
    $('#cfield_genre').next().remove();
    $('#cfield_genre').select2({width: "100%"});
    $('#cfield_genre').val(genre_array).trigger("change");

    document.getElementById('cfield_duration').value = minutos;
    
    if (document.getElementById('cfield_direction') && director != ""){
    document.getElementById('cfield_direction').value = director;}
    document.getElementById('cfield_imdb').value = imdb;
	if(document.getElementById('cfield_site')){
    document.getElementById('cfield_site').value = site;
	}
    document.getElementById('cfield_cast').value = actor;
    

if (curiosidades == "" || curiosidades.indexOf('[b]Produ') > -1 || curiosidades.indexOf('[b]Orçamento') > -1  || curiosidades.indexOf('[b]Receita') > -1){
        if (curiosidades == "" ){
        document.getElementById('cfield_curiosity').value = exinfo;
    }
    if (curiosidades.indexOf('[b]Produ') > -1){
        // break the textblock into an array of lines
       curiosidades = curiosidades.split('\n');
        // remove one line, starting at the first position
       curiosidades.splice(0,1);
        // join the array back into a single string
       curiosidades = curiosidades.join('\n');
       curiosidades = curiosidades.replace(/^\s+|\s+$/g, '');
       document.getElementById('cfield_curiosity').value = exinfo + '\n' + curiosidades;
    }if(curiosidades.indexOf('[b]Orçamento') > -1){
       curiosidades = curiosidades.split('\n');
       curiosidades.splice(0,2);
       curiosidades = curiosidades.join('\n');
       curiosidades = curiosidades.replace(/^\s+|\s+$/g, '');
       document.getElementById('cfield_curiosity').value = exinfo + '\n' + curiosidades;
    }if(curiosidades.indexOf('[b]Receita') > -1){
       curiosidades = curiosidades.split('\n');
       curiosidades.splice(0,2);
       curiosidades = curiosidades.join('\n');
       curiosidades = curiosidades.replace(/^\s+|\s+$/g, '');
       document.getElementById('cfield_curiosity').value = exinfo + '\n' + curiosidades;
    }
}else{
    document.getElementById('cfield_curiosity').value = exinfo + '\n' + curiosidades;}
})
        .fail(function(jqXHR, textStatus, msg){
 alert('Falhou!');
   });
      }
});

elencoimdb.addEventListener('click', function () {
   var site = $('#cfield_imdb').val();
        site = site.replace(/imdb/g, "www.imdb");
        $.ajax({
          url : "https://www.fw.artvetro.com.br/filmes2-imdb.php",
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
    var actor = doc.getElementById("actor").innerText;
    document.getElementById('cfield_cast').value = actor;
    GM_setValue('img', doc.getElementById("img").innerText);
})
        .fail(function(jqXHR, textStatus, msg){
 alert('Falhou!');
   });
    })

elencotmdb.addEventListener('click', function () {
   var site = $('#cfield_imdb').val();
        site = site.replace(/imdb/g, "www.imdb");
        $.ajax({
          url : "https://www.fw.artvetro.com.br/filmes2-tmdb.php",
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
    var actor = doc.getElementById("actor").innerText;
    document.getElementById('cfield_cast').value = actor;
    GM_setValue('img', doc.getElementById("img").innerText);
})
        .fail(function(jqXHR, textStatus, msg){
 alert('Falhou!');
   });
    })

elencosemfoto.addEventListener('click', function () {
   var site = $('#cfield_imdb').val();
        site = site.replace(/imdb/g, "www.imdb");
        $.ajax({
          url : "https://www.fw.artvetro.com.br/filmes.php",
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
    var actor = doc.getElementById("actor").innerText;
    document.getElementById('cfield_cast').value = actor;
    GM_setValue('img', doc.getElementById("img").innerText);
})
        .fail(function(jqXHR, textStatus, msg){
 alert('Falhou!');
   });
    })

}
}


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/////////////////////////FIM DO EDITOR DE TÍTULOS//////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////// ADD IMAGENS NO POSTADOR COM ALT + P
if (window.location.href.indexOf("https://filewarez.tv/postador.php") != -1 ) {
//###############################################################################################################################
    $(".isuser").prepend('<li style=margin-left:1em; id="config_script"><a href="javascript:void(0);">Script Config</a></li>');
    $("#config_script").on('click', function() {
    GM_config.open();
    })
    if(GM_config.get('Add_bts') == "Sim"){
    if (document.getElementById("postador_importlinks_process")){
    var finalizar_upload= document.createElement('span');
        finalizar_upload.style = `background: none;
	color: inherit;
	border: none;
	padding-top: 20px;
    padding-right: 10px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    float:right;font-size: 120%;font-weight: bold;`;
    finalizar_upload.innerHTML = `
    <img id="finalizar" src="https://i.imgur.com/e4NzCPn.png" style=" vertical-align: bottom; margin-right: 5px;width:17px;">Finalizar
    <span class="seperator">&nbsp;</span>
`;

    $('#postador_importlinks').css("height", "120px");
        var addlinks_geral = document.createElement('span');
        addlinks_geral.style = `background: none;
	color: inherit;
	border: none;
	padding-top: 20px;
    padding-right: 10px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    float:left;font-size: 120%;font-weight: bold;`;
    addlinks_geral.innerHTML = `
    <img id="addlinks_geral" src="https://i.imgur.com/CdhJ4EW.png" style=" vertical-align: bottom; margin-right: 5px;width:17px;">Link Geral
    <span class="seperator">&nbsp;</span>
`;
   var get_mkv = document.createElement('span');
        get_mkv.style = `background: none;
	color: inherit;
	border: none;
	padding-top: 20px;
    padding-right: 10px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    float:left;font-size: 120%;font-weight: bold;`;
    get_mkv.innerHTML = `
    <img id="get_mkv" src="https://i.imgur.com/Zz7io6W.png" style=" vertical-align: bottom; margin-right: 5px;width:17px;">Get MKV
    <span class="seperator">&nbsp;</span>
`;


    var local_finalizador = document.getElementsByClassName('blockrow postador_field')[0];
    local_finalizador.appendChild(finalizar_upload);
    local_finalizador.appendChild(addlinks_geral);
    local_finalizador.appendChild(get_mkv);
    var dominios = GM_config.get('BtPath');
    dominios = dominios.split('\n');
        console.log(dominios.length);
    for(var i=0;i<dominios.length;i++){
       console.log(GM_getValue('nomedoarquivo'));
       if(dominios[i].includes("https")){
       dominios[i] = (dominios[i]+GM_getValue('nomedoarquivo'));
    }
    }


    addlinks_geral.addEventListener('click', function(e){
        document.getElementsByClassName('primary textbox tinymce')[0].value = GM_config.get('BtPath');
        //document.getElementsByClassName('primary textbox tinymce')[0].value = '-480P - \n\n-720P - \n\n-1080P - \n\n';
        })
    get_mkv.addEventListener('click', function(e){
        document.getElementsByClassName('primary textbox tinymce')[0].value = dominios.join('\n');
        //document.getElementsByClassName('primary textbox tinymce')[0].value = '-480P - \n\n-720P - \n\n-1080P - \n\n';
        })
    finalizar_upload.addEventListener('click', function(e){
        var testando = document.getElementsByClassName('primary textbox tinymce')[0].value;
        testando = testando.replace(/\/a\/cloudfileguard.com/g,'');
        document.getElementsByClassName('primary textbox tinymce')[0].value = testando;
        document.getElementById('postador_importlinks_process').click();
        console.log('finalizado');
        document.getElementsByName("next")[0].click();
        })
}
    }
//###############################################################################################################################
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
    window.addEventListener("unload", function() {
      window.close();
    });
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

   $("#cfield_title").change(function () {
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

if ((window.location.href.indexOf('https://filewarez.tv/postador.php?do=addupload') != -1) || (window.location.href.indexOf('https://filewarez.tv/postador.php?do=editupload') != -1)){
function capitalize(s){//FUNÇÃO PRIMEIRA LETRA DE CADA PALAVRA EM MAIUSCULO
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};
function parse_mediainfo(content){
        content_mediainfo = content;
	    var release_espaco0 = content.split('Complete name');
            var release_espaco = release_espaco0[1].split(/\n/);
            release_espaco[0] = release_espaco[0].trim();
            release_espaco[0] = release_espaco[0].replace(/: /, "");
            //console.log(release_espaco[0]);
            var nomedoarquivo = release_espaco[0];
            GM_setValue('nomedoarquivo',nomedoarquivo);
            release_espaco[0] = release_espaco[0].substring(0, release_espaco[0].lastIndexOf('\\')) + "\\";
            content = content.replace(/ /g, "");
            //content = content.replace(/:/g, ": ");
            content = content.replace(/GiB/g, " GB");
            content = content.replace(/MiB/g, " MB");
            //NOME DO RELEASE
            var release0 = content.split('Completename:');
            var release = release0[1].split(/\n/);
	    var pathOut = release[0].substring(0, release[0].lastIndexOf('\\')) + "\\";
            content_mediainfo = content_mediainfo.replace(pathOut, "", "g");
	    content_mediainfo = content_mediainfo.replace(release_espaco[0], "", "g");
            release[0] = release[0].split("\\").pop();
            var tipodearquivo = release0[1].split('Format:');
            release[0] = release[0].replace(/mp4/g, "");
            release[0] = release[0].replace(/mkv/g, "");
            release[0] = release[0].replace(/\./g, " ");
	    if(release[0] == release[0].toLowerCase()){
              var release_lowercase = release[0].split('-');
              release_lowercase[1] = release_lowercase[1].toUpperCase();
              release_lowercase[0] = capitalize(release_lowercase[0]);
              release[0] = release_lowercase[0].concat('-',release_lowercase[1]);
              release[0] = release[0].replace(/Web/g, "WEB");
            }
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
                if(release[0].indexOf('REMUX') > -1){
                $('#cfield_forumid').val('1016');
                document.getElementById('cfield_forumid').dispatchEvent(new Event('change'));
                }else{
                $('#cfield_forumid').val('623');
                document.getElementById('cfield_forumid').dispatchEvent(new Event('change'));
                }
                var values = $('#cfield_forumid').val();
                if (values == null){
                $('#cfield_forumid').val('375');
                document.getElementById('cfield_forumid').dispatchEvent(new Event('change'));}
            }
            if (release[0].indexOf('HDRip') > -1 || release[0].indexOf('DVDScr') > -1){
                $('#cfield_forumid').val('310');
                document.getElementById('cfield_forumid').dispatchEvent(new Event('change'));
            }
            if (release[0].indexOf('BDRip') > -1 || release[0].indexOf('BRRip') > -1 || release[0].indexOf('bdrip') > -1 || release[0].indexOf('brrip') > -1){
                $('#cfield_forumid').val('336');
                document.getElementById('cfield_forumid').dispatchEvent(new Event('change'));
            }
            if (release[0].indexOf('CAM ') > -1 ){
                $('#cfield_forumid').val('338');
                document.getElementById('cfield_forumid').dispatchEvent(new Event('change'));
            }
            if (release[0].indexOf('2160p') > -1){
                $('#cfield_forumid').val('1403');
                document.getElementById('cfield_forumid').dispatchEvent(new Event('change'));
            var values = $('#cfield_forumid').val();
                if (values == null){
                $('#cfield_forumid').val('375');
                document.getElementById('cfield_forumid').dispatchEvent(new Event('change'));}
            }if (release[0].indexOf('WEB-') > -1 ){
                $('#cfield_sourcetype').val('webdl');
                document.getElementById('cfield_sourcetype').dispatchEvent(new Event('change'));
            }if (release[0].indexOf(' WEB ') > -1 ){
                $('#cfield_sourcetype').val('web');
                document.getElementById('cfield_sourcetype').dispatchEvent(new Event('change'));
            }if (release[0].indexOf('WEBRip') > -1 ){
                $('#cfield_sourcetype').val('webrip');
                document.getElementById('cfield_sourcetype').dispatchEvent(new Event('change'));
            }if (release[0].indexOf('BluRay') > -1 || release[0].indexOf('Bluray') > -1 || release[0].indexOf('bluray') > -1){
                $('#cfield_sourcetype').val('bluray');
                document.getElementById('cfield_sourcetype').dispatchEvent(new Event('change'));
            }if (release[0].indexOf('BRRip') > -1 || release[0].indexOf('brrip') > -1){
                $('#cfield_sourcetype').val('brrip');
                document.getElementById('cfield_sourcetype').dispatchEvent(new Event('change'));
            }if (release[0].indexOf('BDRip') > -1 || release[0].indexOf('bdrip') > -1){
                $('#cfield_sourcetype').val('bdrip');
                document.getElementById('cfield_sourcetype').dispatchEvent(new Event('change'));
            }if (tipodearquivo[0].indexOf('.mkv') > -1 ){
                $('#cfield_format').val('mkv');
                document.getElementById('cfield_format').dispatchEvent(new Event('change'));
            }if (tipodearquivo[0].indexOf('.ts') > -1 || tipodearquivo[0].indexOf('.TS') > -1){
                $('#cfield_format').val('ts');
                document.getElementById('cfield_format').dispatchEvent(new Event('change'));
            }if (tipodearquivo[0].indexOf('.mp4') > -1 || tipodearquivo[0].indexOf('.MP4') > -1){
                $('#cfield_format').val('mp4');
                document.getElementById('cfield_format').dispatchEvent(new Event('change'));
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
            var fps = fps0[1].split('FPS');
            var fps_final;
            if(fps[0].includes('(')){
               var fps_final0 = fps[0].split('(');
                fps_final = fps_final0[0];
            }else{
                fps_final = fps[0];
            }

            //library
            var library0 = content.split('Writinglibrary:');
            var library = library0[2];
            if (library){
                if (library.indexOf('264') > -1 ){
                $('#cfield_videocodec').val('h264');
                document.getElementById('cfield_videocodec').dispatchEvent(new Event('change'));
            }if (library.indexOf('265') > -1 ){
                $('#cfield_videocodec').val('h265');
                document.getElementById('cfield_videocodec').dispatchEvent(new Event('change'));
            }
            }else{
            if (release[0].indexOf('264') > -1 ){
                $('#cfield_videocodec').val('h264');
                document.getElementById('cfield_videocodec').dispatchEvent(new Event('change'));
            }if (release[0].indexOf('HEVC') > -1 ){
                $('#cfield_videocodec').val('h265');
                document.getElementById('cfield_videocodec').dispatchEvent(new Event('change'));
            }if (release[0].indexOf('H265') > -1 || release[0].indexOf('H 265') > -1){
                $('#cfield_videocodec').val('h265');
                document.getElementById('cfield_videocodec').dispatchEvent(new Event('change'));
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
            if(linguagem0[1]){
            var linguagem = linguagem0[1].split(/\n/);
            linguagem[0] = linguagem[0].toLowerCase();
            var language_array;
            if (linguagem[0].indexOf('english') > -1){
                language_array = ('english');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
            if (linguagem[0].indexOf('portuguese') > -1){
                language_array = ('portuguese');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
            if (linguagem[0].indexOf('spanish') > -1){
                language_array = ('spanish');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
            if (linguagem[0].indexOf('japanese') > -1){
                language_array = ('japanese');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
            if (linguagem[0].indexOf('french') > -1){
                language_array = ('french');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
            			if (linguagem[0].indexOf('italian') > -1){
                language_array = ('italian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('german') > -1){
                language_array = ('german');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('chinese') > -1){
                language_array = ('chinese');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('korean') > -1){
                language_array = ('korean');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('danish') > -1){
                language_array = ('danish');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('hindi') > -1){
                language_array = ('hindi');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('polish') > -1){
                language_array = ('polish');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('russian') > -1){
                language_array = ('russian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('arabic') > -1){
                language_array = ('arabic');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('bulgarian') > -1){
                language_array = ('bulgarian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('croatian') > -1){
                language_array = ('croatian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('slovak') > -1){
                language_array = ('slovak');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('slovenian') > -1){
                language_array = ('slovenian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('estonian') > -1){
                language_array = ('estonian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('finnish') > -1){
                language_array = ('finnish');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('greek') > -1){
                language_array = ('greek');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('hebrew') > -1){
                language_array = ('hebrew');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('dutch') > -1){
                language_array = ('dutch');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('hungarian') > -1){
                language_array = ('hungarian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('indonesian') > -1){
                language_array = ('indonesian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('icelandic') > -1){
                language_array = ('icelandic');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('latvian') > -1){
                language_array = ('latvian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('lithuanian') > -1){
                language_array = ('lithuanian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('norwegian') > -1){
                language_array = ('norwegian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('persian') > -1){
                language_array = ('persian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('romanian') > -1){
                language_array = ('romanian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('serbian') > -1){
                language_array = ('serbian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('swedish') > -1){
                language_array = ('swedish');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('thai') > -1){
                language_array = ('thai');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('czech') > -1){
                language_array = ('czech');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('turkish') > -1){
                language_array = ('turkish');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('ukrainian') > -1){
                language_array = ('ukrainian');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem[0].indexOf('vietnamese') > -1){
                language_array = ('vietnamese');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
            //console.log(linguagem);
            }

            if (canais2){
                canais2 = canais0[2].split('Channel');

                var audio3 = som[3].split('CodecID:');
                var audio2 = audio3[1].split('Duration');
                audio2[0] = audio2[0].toLowerCase();
                var linguagem02 = canais2[1].split('Language:');
                //console.log(canais2[1]);
                var linguagem2 = linguagem02[1].split(/\n/);
                linguagem2[0] = linguagem2[0].toLowerCase();
                if (linguagem2[0].indexOf('english') > -1){
                language_array += (',english');
                language_array = language_array.split(',');
                $('#cfield_language').val(language_array);
                document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
                if (linguagem2[0].indexOf('portuguese') > -1){
                language_array += (',portuguese');
                language_array = language_array.split(',');
                $('#cfield_language').val(language_array);
                document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
                if (linguagem2[0].indexOf('spanish') > -1){
                language_array += (',spanish');
                language_array = language_array.split(',');
                $('#cfield_language').val(language_array);
                document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
                if (linguagem2[0].indexOf('japanese') > -1){
                language_array += (',japanese');
                language_array = language_array.split(',');
                $('#cfield_language').val(language_array);
                document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
                if (linguagem2[0].indexOf('french') > -1){
                language_array += (',french');
                language_array = language_array.split(',');
                $('#cfield_language').val(language_array);
                document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
                if (linguagem2[0].indexOf('italian') > -1){
                language_array += (',italian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('german') > -1){
                language_array += (',german');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('chinese') > -1){
                language_array += (',chinese');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('korean') > -1){
                language_array += (',korean');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('danish') > -1){
                language_array += (',danish');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('hindi') > -1){
                language_array += (',hindi');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('polish') > -1){
                language_array += (',polish');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('russian') > -1){
                language_array += (',russian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('arabic') > -1){
                language_array += (',arabic');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('bulgarian') > -1){
                language_array += (',bulgarian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('croatian') > -1){
                language_array += (',croatian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('slovak') > -1){
                language_array += (',slovak');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('slovenian') > -1){
                language_array += (',slovenian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('estonian') > -1){
                language_array += (',estonian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('finnish') > -1){
                language_array += (',finnish');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('greek') > -1){
                language_array += (',greek');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('hebrew') > -1){
                language_array += (',hebrew');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('dutch') > -1){
                language_array += (',dutch');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('hungarian') > -1){
                language_array += (',hungarian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('indonesian') > -1){
                language_array += (',indonesian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('icelandic') > -1){
                language_array += (',icelandic');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('latvian') > -1){
                language_array += (',latvian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('lithuanian') > -1){
                language_array += (',lithuanian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('norwegian') > -1){
                language_array += (',norwegian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('persian') > -1){
                language_array += (',persian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('romanian') > -1){
                language_array += (',romanian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('serbian') > -1){
                language_array += (',serbian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('swedish') > -1){
                language_array += (',swedish');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('thai') > -1){
                language_array += (',thai');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('czech') > -1){
                language_array += (',czech');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('turkish') > -1){
                language_array += (',turkish');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('ukrainian') > -1){
                language_array += (',ukrainian');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
			if (linguagem2[0].indexOf('vietnamese') > -1){
                language_array += (',vietnamese');
				language_array = language_array.split(',');
            $('#cfield_language').val(language_array);
            document.getElementById('cfield_language').dispatchEvent(new Event('change'));}
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
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('aac') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',aac51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('aac') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',aac71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('mp4a-40-2') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',aac');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('mp4a-40-2') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',aac51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('mp4a-40-2') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',aac71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('a_ac3') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',ac3');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('a_ac3') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',ac351');
                array_audio = array_audio.split(',');
                console.log(array_audio);
                $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('a_eac3') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',ddp');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('a_eac3') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',ddp51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('a_eac3') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',ddp71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('truehd') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',dolbytruehd');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('truehd') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',dolbytruehd51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('truehd') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',dolbytruehd71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (audio[0].indexOf('dts') > -1 && canais[0].indexOf('2') > -1){
                array_audio += (',dts');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('dts') > -1 && canais[0].indexOf('6') > -1){
                array_audio += (',dts51');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('dts') > -1 && canais[0].indexOf('7') > -1){
                array_audio += (',dts61');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
            if (audio[0].indexOf('dts') > -1 && canais[0].indexOf('8') > -1){
                array_audio += (',dts71');
                array_audio = array_audio.split(',');
                console.log(array_audio);
            $('#cfield_audiocodec').val(array_audio);
                document.getElementById('cfield_audiocodec').dispatchEvent(new Event('change'));}
/////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (release[0].indexOf(' HDR ') > -1){
                $('#cfield_hdr').val('yes');
                document.getElementById('cfield_hdr').dispatchEvent(new Event('change'));
            }


            release[0] = release[0].replace(/5 1 /g, "5.1 ");
            release[0] = release[0].replace(/5 1-/g, "5.1-");
            release[0] = release[0].replace(/2 0 /g, "2.0 ");
            release[0] = release[0].replace(/2 0-/g, "2.0-");
            release[0] = release[0].replace(/7 1 /g, "7.1 ");
            release[0] = release[0].replace(/7 1-/g, "7.1-");
            release[0] = release[0].replace(/ H 264/g, " H264");
	        release[0] = release[0].replace(/ H 265/g, " H265");
            release[0] = release[0].replace(/ X264/g, " x264");
            release[0] = release[0].replace(/Bdrip/g, "BDRip");
            release[0] = release[0].replace(/Brrip/g, "BRRip");
            release[0] = release[0].replace(/Bluray/g, "BluRay");
            release[0] = release[0].replace(/Unrated/g, "UNRATED");
            release[0] = release[0].replace(/Repack/g, "REPACK");
            release[0] = release[0].replace(/PIGNUS/g, "PiGNUS");
            release[0] = release[0].replace(/WOAT/g, "WoAT");
            if(language_array.length == "2"){
                if(!(release[0].includes('DUAL'))){
                release[0] = release[0].replace(/-SiGLA/g, "-DUAL-SiGLA");
                }
            }
            //release[0] = release[0].replace(/Web/g, "WEB");
            if (release[0].match(/\sS\d\de\d\d\s/g)) {
                var regexseries = release[0].match(/\sS\d\de\d\d\s/g);
                var regexseries_uppercase = regexseries[0].toUpperCase();
                release[0] = release[0].replace(regexseries[0], regexseries_uppercase);
            } else {
                console.log('nao é série');
            }

            $('#cfield_title').val(release[0]);
            document.getElementById('cfield_title').dispatchEvent(new Event('change'));
            $('#cfield_size').val(tam[0]);
            $('#cfield_password').val(GM_config.get('SenhaSim'));
	        document.getElementById('cfield_password').dispatchEvent(new Event('change'));
            $('#cfield_resolution').val(width[0]+'x'+height[0]);
            $('#cfield_framerate').val(fps_final+" fps");
            $('#cfield_compression').val(GM_config.get('Compressao').toLowerCase());
            document.getElementById('cfield_compression').dispatchEvent(new Event('change'));
            console.log(GM_config.get('Compressao').toLowerCase());
            var comentariosUploader = GM_config.get('ComentariosUploader').replace(/MEDIAINFO/g, content_mediainfo);
            $('#cfield_description').val(comentariosUploader);
            if(GM_config.get('enviando') == "Sim"){
                document.getElementsByName("next")[0].addEventListener('click', function(e) {
                img_title.click();
            })
            }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////LEGENDA/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var sub00 = content.split('\nText');
                console.log("Legendas: "+(sub00.length-1));
                var ptbr = false;
                var count_legendas = 0;
                if(sub00[1]){
            for(var i=1;i<sub00.length;i++){
            if(sub00[i].includes("Portuguese")){
            //console.log(ptbr);
            ptbr = true;
            if(ptbr == true){
            count_legendas++;
            }
            document.getElementById('cfield_subtitles_included').value = 'yes';
            document.getElementById('cfield_subtitles_included').dispatchEvent(new Event('change'));

/////////////////////////////////////////////////////////////////
            function getMatch(a, b) {
                var matches = [];
                for ( var i = 0; i < a.length; i++ ) {
                    for ( var e = 0; e < b.length; e++ ) {
                        if ( a[i] === b[e] ) matches.push( a[i] );
                    }
                }
                return matches;
            }

                var name_release = release[0].split(' ');
                var streamings = ["GLBO", "TC", "TPLY", "DSCP", "PLAY", "FUNI", "CLRO", "DTV", "KNPY", "CRIT", "PMTP", "TNT", "VIX", "DSNP", "ATVP", "AMZN", "NF", "PLTO", "HMAX"];
                var result = getMatch(name_release, streamings);

                switch(result[0]){
                    case 'GLBO':
                        $('#cfield_subtitles_author').val('Globo Play');
                        break;
                    case 'TC':
                        $('#cfield_subtitles_author').val('Telecine Play');
                        break;
                    case 'TPLY':
                        $('#cfield_subtitles_author').val('Telecine Play');
                        break;
                    case 'DSCP':
                        $('#cfield_subtitles_author').val('Discovery Plus');
                        break;
                    case 'PLAY':
                        $('#cfield_subtitles_author').val('Google Play');
                        break;
                    case 'FUNI':
                        $('#cfield_subtitles_author').val('Funimation');
                        break;
                    case 'CLRO':
                        $('#cfield_subtitles_author').val('Claro Video');
                        break;
                    case 'DTV':
                        $('#cfield_subtitles_author').val('DirectTV GO');
                        break;
                    case 'KNPY':
                        $('#cfield_subtitles_author').val('Kanopy');
                        break;
                    case 'CRIT':
                        $('#cfield_subtitles_author').val('Criterion Channel');
                        break;
                    case 'PMTP':
                        $('#cfield_subtitles_author').val('Paramount Plus');
                        break;
                    case 'TNT':
                        $('#cfield_subtitles_author').val('TNT GO TV');
                        break;
                    case 'VIX':
                        $('#cfield_subtitles_author').val('VIX');
                        break;
                    case 'DSNP':
                        $('#cfield_subtitles_author').val('Disney+');
                        break;
                    case 'ATVP':
                        $('#cfield_subtitles_author').val('AppleTV+');
                        break;
                    case 'PLTO':
                        $('#cfield_subtitles_author').val('PlutoTV');
                        break;
                    case 'HMAX':
                        $('#cfield_subtitles_author').val('HBOMAX');
                        break;
                    case 'AMZN':
                        $('#cfield_subtitles_author').val('Amazon Prime Video');
                        break;
                    case 'NF':
                        $('#cfield_subtitles_author').val('Netflix');
                        break;
                    default:
                        $('#cfield_subtitles_author').val('Subpack');
                }
            }}console.log("Legenda(s) PT-BR: "+count_legendas);
            if(ptbr == false){
            document.getElementById('cfield_subtitles_included').value = 'no';
            document.getElementById('cfield_subtitles_included').dispatchEvent(new Event('change'));
            }
            }else{
            document.getElementById('cfield_subtitles_included').value = 'no';
            document.getElementById('cfield_subtitles_included').dispatchEvent(new Event('change'));
            }


//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

            alert(release[0]);
            //alert(content);

}
}

var input = document.createElement('input');
var ler_mediainfo = document.createElement('span');
ler_mediainfo.innerHTML = "<img src='https://i.imgur.com/Iga9vd2.png?1' width='20'/>";
ler_mediainfo.id = "MI";
ler_mediainfo.style = "background: none;color: inherit;border: none;padding: 0;font: inherit;cursor: pointer;outline: inherit;float:left;margin-right:20px;";
ler_mediainfo.title = "Ler Mediainfo dos Comentários do Uploader";
input.type = "file";
input.id = "carregador";
input.accept=".txt";
input.style = "top:0;right:0;position:fixed;z-index:99999;padding:17.5px;background:rgba(0,0,0,0.5) none;cursor:pointer;";
document.body.appendChild(input);
document.getElementById('cfield_description').before(ler_mediainfo);

var carregador = document.getElementById('carregador');

ler_mediainfo.addEventListener('click', function(e) {
    var content = document.getElementById('cfield_description').value;
    if(content != ""){
    parse_mediainfo(content);
    }else{
    navigator.clipboard.readText().then(
    clipText => parse_mediainfo(clipText));
    }
});
carregador.addEventListener('change', function(e) {
    var file = carregador.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var content = reader.result;
            parse_mediainfo(content);
        }

        reader.readAsText(file);
    } else {
        //fileDisplayArea.innerText = "File not supported!"
    }
});}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ADICIONA UM LOGO DA FW NA PÁGINA DO IMDB PARA FAZER BUSCA DE UPLOADS

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
//PARA FILMES
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

if (window.location.href.indexOf("https://www.imdb.com/title") != -1 ) {
    $("head").append (
    '<link href="//stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" '
  + 'rel="stylesheet" type="text/css">'
);
    $("head").append (
    '<link href="//cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css" '
  + 'rel="stylesheet" type="text/css">'
);
                $("head").append (
    '<link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" '
  + 'rel="stylesheet" type="text/css">'
);
                $("head").append (
    '<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" '
  + 'rel="stylesheet" type="text/css">'
);
$("head").append (
    '<link href="//cdn.rawgit.com/raphaelfabeni/css-loader/7090f306bff5627b5b94c3607306838db7df7396/dist/css-loader.css" '
  + 'rel="stylesheet" type="text/css">'
);
var divwait = `<div class="loader loader-bouncing is-active"></div>`;
    var movieOrSeries = 'movie';
    if(document.getElementsByClassName('ipc-inline-list__item')[0].innerText.toLowerCase().includes("série") || document.getElementsByClassName('ipc-inline-list__item')[0].innerText.includes("Series")){
    movieOrSeries = 'serie';
    }else{movieOrSeries = 'movie';}
    console.log(movieOrSeries);
if(document.getElementById('titleYear') || movieOrSeries == 'movie' && document.getElementsByClassName('ipc-inline-list__item')[0].innerText != ''){
    var img = new Image();
    img.src = 'https://i.imgur.com/jqqCux6.png';
    img.title ='Buscar Títulos/Uploads';
    var criar = new Image();
    criar.src = 'https://i.imgur.com/jqqCux6.png';
    criar.title ='Criar Título';
    criar.addEventListener("mouseover", function(){criar.src = 'https://i.imgur.com/EKlG285.png';});
    criar.addEventListener("mouseout", function(){criar.src = 'https://i.imgur.com/jqqCux6.png';});
    img.addEventListener("mouseover", function(){img.src = 'https://i.imgur.com/DZ2twAY.png';});
    img.addEventListener("mouseout", function(){img.src = 'https://i.imgur.com/jqqCux6.png';});


img.onclick = function() {
    var imdbId = window.location.href;
    //imdbId = imdbId.match(/tt[0-9]+/);
    imdbId = imdbId.replace(/https:\/\/www.imdb.com\/title\//g, "");
    imdbId = imdbId.replace(/\//g, " ");
    var chooseTTorUP = $.confirm({
               theme: 'dark',
               title: 'Escolha para continuar...',
               content: 'Estou buscando por:',
               columnClass: 'xsmall',
               closeIcon: true,
               type: 'orange',
               backgroundDismiss: true,
               icon: 'fa fa-spinner fa-spin',
               draggable: false,
               animation: 'scaleY',
               animationBounce: 1.5,
               animationSpeed: 500,
               closeAnimation: 'scale',
                    useBootstrap: false,
                    boxWidth: '18%',
               buttons: {
                "Títulos": {btnClass: 'btn-orange text-dark',action: function() {window.open("https://filewarez.tv/postador.php?do=searchtitle&title_imdb="+imdbId+"&status=online&type=movie");}},
                "Uploads":  {btnClass: 'btn-orange text-dark',action: function() {window.open("https://filewarez.tv/postador.php?do=searchupload&title_imdb="+imdbId+"&status=online&type=movie");}}
               }
        });
};


///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

criar.addEventListener('click', function () {
$("body").prepend(divwait);
var page= window.location.href;
var doc1 = page.split('/title/');
var id = doc1[1].split('/');


        $.ajax({
          url : "https://www.fw.artvetro.com.br/filmes2.php",
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
            console.log(msg);
            document.getElementsByClassName("loader loader-bouncing is-active")[0].remove();
            var doc = new DOMParser().parseFromString(msg, 'text/html');
            console.log(doc.getElementById("direcao").innerText);
            GM_setValue('o_titulo', doc.getElementById("o_titulo").innerText);
            GM_setValue('titulo', doc.getElementById("titulo").innerText);
            var genero_imdb = doc.getElementById("genero").innerText;
            genero_imdb = genero_imdb.replace(/\n/g, " ");
            console.log(genero_imdb);
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
            console.log(doc.getElementById("award").innerText);
            GM_setValue('award', doc.getElementById("award").innerText);
            GM_setValue('img', doc.getElementById("img").innerText);
            if(genero_imdb.includes('music')){

                var a = $.confirm({
               theme: 'dark',
               title: 'Escolha para continuar...',
               content: 'Um musical foi detectado. Escolha a área adequada a qual deseja criar o título:',
               columnClass: 'small',
               closeIcon: true,
               type: 'orange',
               backgroundDismiss: true,
               icon: 'fa fa-spinner fa-spin',
               draggable: false,
               animation: 'scaleY',
               animationBounce: 2.5,
               animationSpeed: 1000,
               closeAnimation: 'scale',
                    useBootstrap: false,
                    boxWidth: '20%',
               buttons: {
                "Shows": {btnClass: 'btn-orange text-dark',action: function() {window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=show");}},
                "Filmes":  {btnClass: 'btn-orange text-dark',action: function() {window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=movie");}}
               }
        });
        }else{
            window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=movie");
        }

})
        .fail(function(jqXHR, textStatus, msg){
alert('Falhou!');
   });

})

    var local=document.getElementsByClassName('sc-b73cd867-0 ')[0];
    if(local){
      local.appendChild(criar);
      local.appendChild(img);
  }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
//PARA SÉRIES
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

if(document.getElementsByClassName('bp_item np_episode_guide np_right_arrow')[0] || movieOrSeries == 'serie'){
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

img.onclick = function() {
   var imdbId = window.location.href;
    imdbId = imdbId.replace(/https:\/\/www.imdb.com\/title\//g, "");
    imdbId = imdbId.replace(/\//g, " ");
    var chooseTTorUP = $.confirm({
               theme: 'dark',
               title: 'Escolha para continuar...',
               content: 'Estou buscando por:',
               columnClass: 'xsmall',
               closeIcon: true,
               type: 'orange',
               backgroundDismiss: true,
               icon: 'fa fa-spinner fa-spin',
               draggable: false,
               animation: 'scaleY',
               animationBounce: 1.5,
               animationSpeed: 500,
               closeAnimation: 'scale',
                    useBootstrap: false,
                    boxWidth: '18%',
               buttons: {
                "Títulos": {btnClass: 'btn-orange text-dark',action: function() {window.open("https://filewarez.tv/postador.php?do=searchtitle&title_imdb="+imdbId+"&status=online");}},
                "Uploads":  {btnClass: 'btn-orange text-dark',action: function() {window.open("https://filewarez.tv/postador.php?do=searchupload&title_imdb="+imdbId+"&status=online");}}
               }
        });
};

criar.addEventListener('click', function () {
$("body").prepend(divwait);
var page= window.location.href;
var doc1 = page.split('/title/');
var id = doc1[1].split('/');


        $.ajax({
          url : "https://www.fw.artvetro.com.br/filmes2.php",
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
            console.log(msg);
            document.getElementsByClassName("loader loader-bouncing is-active")[0].remove();
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
            GM_setValue('episodios', doc.getElementById("episodios").innerText);
            GM_setValue('criador', doc.getElementById("criador").innerText);
            GM_setValue('temp', doc.getElementById("temp").innerText);
            GM_setValue('yt', doc.getElementById("yt").innerText);
            GM_setValue('exinfo', doc.getElementById("exinfo").innerText);
            console.log(doc.getElementById("img").innerText);
            GM_setValue('img', doc.getElementById("img").innerText);
            if(genero_imdb.includes('animation')){
                
                var a = $.confirm({
               theme: 'dark',
               title: 'Escolha para continuar...',
               content: 'Uma animação foi detectada. Escolha a área adequada a qual deseja criar o título:',
               columnClass: 'small',
               closeIcon: true,
               type: 'orange',
               backgroundDismiss: true,
               icon: 'fa fa-spinner fa-spin',
               draggable: false,
               animation: 'scaleY',
               animationBounce: 2.5,
               animationSpeed: 1000,
               closeAnimation: 'scale',
                    useBootstrap: false,
                    boxWidth: '20%',
               buttons: {
                "Desenhos": {btnClass: 'btn-orange text-dark',action: function() {window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=cartoon");}},
                "Animes":  {btnClass: 'btn-orange text-dark',action: function() {window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=anime");}},
                "Séries":  {btnClass: 'btn-orange text-dark',action: function() {window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=tvshow");}}
               }
        });
        }else{
           window.open("https://filewarez.tv/postador.php?do=addtitle&step=2&type=tvshow");
}
            

})
        .fail(function(jqXHR, textStatus, msg){
            alert('Falhou!');
   });

})


    var local=document.getElementsByClassName('sc-b73cd867-0 ')[0];
    if(local){
        local.appendChild(criar);
        local.appendChild(img);
    }
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (window.location.href.indexOf("https://store.steampowered.com/app") != -1) {
    var img_games = new Image();
    img_games.src = 'https://i.imgur.com/jqqCux6.png';
    img_games.style ="vertical-align: middle;margin-bottom:5px;";
    img_games.title ='Buscar Uploads';
    var criar_games = new Image();
    criar_games.src = 'https://i.imgur.com/jqqCux6.png';
    criar_games.style ="vertical-align: middle;margin-bottom:5px;";
    criar_games.title ='Criar Título';
    criar_games.addEventListener("mouseover", function(){criar_games.src = 'https://i.imgur.com/EKlG285.png';});
    criar_games.addEventListener("mouseout", function(){criar_games.src = 'https://i.imgur.com/jqqCux6.png';});
    img_games.addEventListener("mouseover", function(){img_games.src = 'https://i.imgur.com/DZ2twAY.png';});
    img_games.addEventListener("mouseout", function(){img_games.src = 'https://i.imgur.com/jqqCux6.png';});
    if (window.location.href.indexOf("https://store.steampowered.com/app") != -1){
    var local_games = document.getElementsByClassName('apphub_AppName')[0];
    local_games.appendChild(criar_games);
    local_games.appendChild(img_games);
    }

criar_games.addEventListener('click', function () {
var page= window.location.href;
GM_setValue('page', page);
console.log(page);
var myWindow = window.open('https://filewarez.tv/postador.php?do=addtitle&step=2&type=game');
})

img_games.onclick = function() {
var titulo_game = document.getElementById('appHubAppName').innerText;
    titulo_game = titulo_game.replace(/™/g, '');
    titulo_game = titulo_game.replace(/:/g, '');
window.open('https://filewarez.tv/postador.php?do=searchupload&title_title='+titulo_game+'&status=online&type=game');
};
}

if(window.location.href.indexOf("https://www.epicgames.com/store/pt-BR/p/") != -1) {
window.addEventListener("load", function() {
console.log(window.location.href);

    if(document.getElementsByClassName('css-1vtep46-Headline1__headline1')[0]){
    local_games = document.getElementsByClassName('css-1vtep46-Headline1__headline1')[0];
    }else if(document.getElementsByClassName('css-16yws1f-Headline1__headline1')[0]){
    local_games = document.getElementsByClassName('css-16yws1f-Headline1__headline1')[0];
    }
    var criar_games = document.createElement("button");
    criar_games.innerHTML = "<img src='https://i.imgur.com/jqqCux6.png'/>";
    criar_games.id = 'criar_games';
    var img_games = document.createElement("button");
    img_games.innerHTML = "<img src='https://i.imgur.com/jqqCux6.png'/>";
    img_games.id = 'img_games';
    criar_games.addEventListener("mouseover", function(){criar_games.innerHTML = "<img src='https://i.imgur.com/EKlG285.png'/>";});
    criar_games.addEventListener("mouseout", function(){criar_games.innerHTML = "<img src='https://i.imgur.com/jqqCux6.png'/>";});
    img_games.addEventListener("mouseover", function(){img_games.innerHTML = "<img src='https://i.imgur.com/DZ2twAY.png'/>";});
    img_games.addEventListener("mouseout", function(){img_games.innerHTML = "<img src='https://i.imgur.com/jqqCux6.png'/>";});
    local_games.appendChild(criar_games);
    local_games.appendChild(img_games);

criar_games.addEventListener('click', function () {
var page= window.location.href;
GM_setValue('page', page);
console.log(page);
var myWindow = window.open('https://filewarez.tv/postador.php?do=addtitle&step=2&type=game');
})

img_games.onclick = function() {
var titulo_game = local_games.innerText;
titulo_game = titulo_game.replace(/™/g, '');
titulo_game = titulo_game.replace(/:/g, '');
window.open('https://filewarez.tv/postador.php?do=searchupload&title_title='+titulo_game+'&status=online&type=game');
};
});
}

if(window.location.href.indexOf("https://www.epicgames.com/store") != -1){
    window.addEventListener("click", () => {
    var local_games;
    console.log(window.location.href);
    if((window.location.href.indexOf("https://www.epicgames.com/store/pt-BR/p/") != -1)){
    var contador = setInterval(function(){
    if(!(document.getElementById('criar_games')) && !(document.getElementById('img_games'))){
    console.log('começou');
    if(document.getElementsByClassName('css-1vtep46-Headline1__headline1')[0]){
    local_games = document.getElementsByClassName('css-1vtep46-Headline1__headline1')[0];
    }else if(document.getElementsByClassName('css-16yws1f-Headline1__headline1')[0]){
    local_games = document.getElementsByClassName('css-16yws1f-Headline1__headline1')[0];
    }
    var criar_games = document.createElement("button");
    criar_games.innerHTML = "<img src='https://i.imgur.com/jqqCux6.png'/>";
    criar_games.id = 'criar_games';
    var img_games = document.createElement("button");
    img_games.innerHTML = "<img src='https://i.imgur.com/jqqCux6.png'/>";
    img_games.id = 'img_games';
    criar_games.addEventListener("mouseover", function(){criar_games.innerHTML = "<img src='https://i.imgur.com/EKlG285.png'/>";});
    criar_games.addEventListener("mouseout", function(){criar_games.innerHTML = "<img src='https://i.imgur.com/jqqCux6.png'/>";});
    img_games.addEventListener("mouseover", function(){img_games.innerHTML = "<img src='https://i.imgur.com/DZ2twAY.png'/>";});
    img_games.addEventListener("mouseout", function(){img_games.innerHTML = "<img src='https://i.imgur.com/jqqCux6.png'/>";});
    if(local_games){
    local_games.appendChild(criar_games);
    local_games.appendChild(img_games);

criar_games.addEventListener('click', function () {
var page= window.location.href;
GM_setValue('page', page);
console.log(page);
var myWindow = window.open('https://filewarez.tv/postador.php?do=addtitle&step=2&type=game');
})


img_games.onclick = function() {
var titulo_game = local_games.innerText;
titulo_game = titulo_game.replace(/™/g, '');
titulo_game = titulo_game.replace(/:/g, '');
window.open('https://filewarez.tv/postador.php?do=searchupload&title_title='+titulo_game+'&status=online&type=game');
};

}
}else{
    console.log('fechou');
    clearInterval(contador);
}},1000);
}
})
}

if (window.location.href.indexOf("https://filewarez.tv/postador.php?do=addtitle&step=2&type=game") != -1){
window.addEventListener("load", function() {
    var page = GM_getValue('page');
    GM_setValue('page', '');
    console.log(page);
if(page.includes('steampowered') || page.includes('epicgames')){
$.ajax({
          url : "https://www.fw.artvetro.com.br/jogo.php",
          type : 'post',

          data : {
               copia:page
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
console.log(msg);
    var doc = new DOMParser().parseFromString(msg, 'text/html');
    var sinopse_games = doc.getElementById("sinopse").innerText;
    var req_games = doc.getElementById("req").innerText;
    sinopse_games = $.trim(sinopse_games);
    req_games = $.trim(req_games);
    sinopse_games = sinopse_games.replace(/\n\n*/g,'\r\n\n');
    sinopse_games = sinopse_games.replace(/^\s*[\r\n]/gm, '\n\n');
    sinopse_games = sinopse_games.replace(/\[\/b\]\[\/b\]/gm, '[/b]');
    sinopse_games = sinopse_games.replace(/\[\/b\]\n\n\[\/b\]/gm, '[/b]');
    sinopse_games = sinopse_games.replace(/\[\/b\]\W\[\/b\]/gm, '[/b]');
    req_games = req_games.replace(/\n\n*/g,'\n');
    req_games = req_games.replace(/  +/g, '');
    req_games = req_games.replace(/	+/g, '');

    document.getElementById('cfield_title').value = doc.getElementById("title").innerText;
    var genregames_array = doc.getElementById("genre").innerText.split(',');
    console.log(genregames_array);
    $('#cfield_genre').next().remove();
    $('#cfield_genre').select2({width: "100%"});
    $('#cfield_genre').val(genregames_array).trigger("change");
    document.getElementById('cfield_manufactor').value = doc.getElementById("fabricante").innerText;
    document.getElementById('cfield_year').value = doc.getElementById("year").innerText;
    $('#cfield_os').next().remove();
    $('#cfield_os').select2({width: "100%"});
    $('#cfield_os').val(doc.getElementById("plataform").innerText).trigger("change");
    //document.getElementById('cfield_os').value = plataformagames;
    document.getElementById('cfield_site').value = doc.getElementById("site").innerText;
    document.getElementById('cfield_summary').value = sinopse_games;
    document.getElementById('cfield_requirements').value = req_games+"\n\n";
    document.getElementById('cfield_trailer').value = doc.getElementById("video").innerText;
    GM_setValue('img', doc.getElementById("img").innerText);
})
        .fail(function(jqXHR, textStatus, msg){
 alert('Falhou!');
   });
   }
})
}
