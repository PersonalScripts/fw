// ==UserScript==
// @name         Verificador de Uploads Individual[FW]
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  Realiza a verificação de uploads da Filewarez.
// @author       PvP
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-idle
// @include      https://filewarez.tv/showthread.php*
// @updateURL    https://github.com/PersonalScripts/fw/raw/master/Verificador_PvP_FW_Individual.user.js
// @downloadURL  https://github.com/PersonalScripts/fw/raw/master/Verificador_PvP_FW_Individual.user.js
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @icon         data:image/png;base64,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

// ==/UserScript==

var dominios = ['https://gokigenyou','https://pinkm4n','https://pinkmanmirror','https://rkreleasesfw','https://rkzicadosreleases','https://rkzicamirror','https://rkcloud','https://xaulin','https://kenoshy','https://link-direto','https://locao.website','https://linkkdireto','https://crazylouco'];
var freeservers = ['zippyshare.com','1fichier','mediafire.com','pixeldrain.com','uploaded.net','http://ul.to','uptobox.com','wetransfer.com','dowsfile.com','drive.google.com','anonfiles.com','mega.nz','mega.co.nz','turbobit.net','turb.cc','filetransfer.io','krakenfiles.com','rapidgator.net','multiup.org','disk.yandex.com','filecrypt.co','down.fast-down.com','depositfiles.com','depositfiles.org','brfiles.com','uloz.to','megaup.net','4sync.com','onedrive.com','onedrive.live.com','sharepoint.com','siasky.net','userscloud.com','brupload.net','4shared.com','1cloudfile.com','streamtape.com','katfile.com'];
var depositfiles = 'Este arquivo não existir, o acesso ao seguinte arquivo é limitada ou foi removido devido a violação de direitos autorais';
var filecrypt = 'Unfortunately we could not find what you are searching for, we are sorry!';
var filetransferIO = 'The data package cannot be downloaded anymore, it was deleted from the server.';
var rapidgator = '404 Ficheiro não encontrado';
var wetransfer = "Transferência expirada";
var yandex = "The owner either removed the files or restricted access, or there's a typo in the link";
var foursync = "4sync.com/web/linkerror";
var siasky = 'unable to create data source for skylink';
var megaup = '<meta name="description" content="Upload, share, track, manage your files in one simple to use file host';
var userscloud = 'The file you are trying to download is no longer available';
var brupload = 'Arquivo Não Encontrado';
var terabox = 'Error(404)';
var fourshared = '<meta name="Description" content="Online file sharing and storage - 15 GB free web space.';
var onecloudfile = 'https://1cloudfile.com/error?e=File+has+been+removed';

var stat=[];
var id_dows=0;
function updatestatus(e){
var status_btn = $("span.link_status").eq(e).addClass("loading");
	var status = status_btn.hasClass("online");
         var SECURITYTOKEN = $("input[name='securitytoken']:first").val();
         $.post('https://filewarez.tv/postador.php', {
                                linkid: $('div.blockrow.upload_link').eq(e).children().last().attr('id'),
                                status: true,
                                automatic: false,
                                securitytoken: SECURITYTOKEN,
                                'do': 'updatestatus'
                            }, function(data){
                                status_btn.removeClass("offline loading online");
                                if(!data.success){
                                    alert(data.message);
                                }
                                status_btn.addClass("online");
                            }, 'json');
    stat.push('online');
}

function updatestatus_down(e){
var status_btn = $("span.link_status").eq(e).addClass("loading");
	var status = status_btn.hasClass("online");
         var SECURITYTOKEN = $("input[name='securitytoken']:first").val();
         $.post('https://filewarez.tv/postador.php', {
                                linkid: $('div.blockrow.upload_link').eq(e).children().last().attr('id'),
                                status: false,
                                automatic: false,
                                securitytoken: SECURITYTOKEN,
                                'do': 'updatestatus'
                            }, function(data){
                                status_btn.removeClass("online loading offline");
                                if(!data.success){
                                    alert(data.message);
                                }
                                status_btn.addClass("offline");
                            }, 'json');
    stat.push('offline');
}

function changeico(i) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://raw.githubusercontent.com/PersonalScripts/fw/master/'+i+'.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
  }


$('div.blockrow.upload_link').find('a').each(function(e) {
    var url = $(this).attr('href');

function megacall(check){
    GM_xmlhttpRequest({
  method: "POST",
  url: 'https://eu.api.mega.co.nz/cs?id=0&n='+check[2],
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload  : function(response) {
    var responseXML = null;
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response.responseXML) {
      responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

    console.log([
      response.status,
      response.statusText,
      response.responseHeaders,
      response.responseText
    ].join("\n"));

      if(response.responseText == '-16' || response.responseText == '-9'){
         console.log('OFFLINE', url);
         $('div.blockrow.upload_link').eq(e).css('background-color', 'rgba(231, 76, 60, 0.2)');
         updatestatus_down(e)
     }else if (response.responseText == '-2') {
         console.log('ONLINE', url);
         $('div.blockrow.upload_link').eq(e).css('background-color', 'rgb(203 235 217)');
         updatestatus(e)
     }else{
         console.log('UNK');
     }
  }})
}

function siasky(url){
    GM_xmlhttpRequest({
  method: "head",
  url: url,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.

  },
  onload  : function(response) {
    var responseXML = null;
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response.responseXML) {
      responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

    console.log([
      response.status,
      response.statusText,
      response.responseHeaders,
      response.responseText
    ].join("\n"));

      if(response.status == '200' && response.responseHeaders.includes('filename="')){
      console.log('ONLINE', url);
         $('div.blockrow.upload_link').eq(e).css('background-color', 'rgb(203 235 217)');
         updatestatus(e)
      }else{
       console.log('OFFLINE', url);
         $('div.blockrow.upload_link').eq(e).css('background-color', 'rgba(231, 76, 60, 0.2)');
          updatestatus_down(e)
      }
  }})
}

function dowsfile(url){

    GM_xmlhttpRequest({
  method: "get",
  url: url,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload  : function(response) {
    var responseXML = null;
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response.responseXML) {
      responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

    console.log([
      response.status,
      response.statusText,
      response.responseHeaders,
      //response.responseText
    ].join("\n"));

if(response.responseText.includes("files: [{")){
      var site = response.responseText.split('files: [');
      var json = site[1].split(']');
      console.log(json[0]);
      var id = json[0].split('{"id":"');
    id_dows += id.length - 2;
var token = json[0].split('"token":"');
for(var i=1;i<id.length;i++){
var df=[];
var id2 = id[i].split('"');
var token2 = token[i].split('"');
console.log(id2[0]);
console.log(token2[0]);

      GM_xmlhttpRequest({
  method: "head",
    url: 'https://www.googleapis.com/drive/v3/files/'+id2[0]+'?alt=media&source=downloadUrl',
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml",            // If not specified, browser defaults will be used.
      'Authorization': 'Bearer '+token2[0]
  },
  onload  : function(response2) {
    var responseXML = null;
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response2.responseXML) {
      responseXML = new DOMParser()
        .parseFromString(response2.responseText, "text/xml");
    }

    console.log([
      response2.status,
      response2.statusText,
      response2.responseHeaders,
      //response.responseText,
        response2.finalURL
    ].join("\n"));

///////////////////////////////////////////////
      df.push(response2.status);
      console.log(url, df);


      var num = df.length; console.log(df.length, id.length);
      if(num+1 == id.length){
  switch(response2.status) {
  case 200:
    updatestatus(e);
              $('div.blockrow.upload_link').eq(e).css('background-color', 'rgb(203 235 217)');
              console.log('foi');
    break;
  case 403:
    updatestatus(e);
              $('div.blockrow.upload_link').eq(e).css('background-color', 'rgb(203 235 217)');
              console.log('foi com ressalvas');
    break;
   default:
    $('div.blockrow.upload_link').eq(e).css('background-color', 'rgba(231, 76, 60, 0.2)');
    updatestatus_down(e);
}}

//////////////////////////////////////////////////

  }
});

}

}else{
    console.log('OFFLINE', e);
       $('div.blockrow.upload_link').eq(e).css('background-color', 'rgba(231, 76, 60, 0.2)');
    updatestatus_down(e);
      }
  }})
}

if(url.includes('https://mega.')){
    var check;
    if(url.match(/(#!)(\w+)/)){
    check = url.match(/(#!)(\w+)/);
    megacall(check);
    }else if(url.match(/(\/file\/)(\w+)/)){
    check = url.match(/(\/file\/)(\w+)/);
    megacall(check);
    }else if(url.match(/(#F!)(\w+)/)){
    check = url.match(/(#F!)(\w+)/);
    megacall(check);
    }else if(url.match(/(\/folder\/)(\w+)/)){
    check = url.match(/(\/folder\/)(\w+)/);
    megacall(check);
    }

}else if(url.includes('siasky.net')){
    siasky(url);
}

else if(url.includes('dowsfile.com')){
     dowsfile(url);
}

else if(url.includes('terabox.com') || url.includes('transferfile.io') || url.includes('cdn.bunkr.is')){
       console.log('UNK', url);
       $('div.blockrow.upload_link').eq(e).css('background-color', 'rgb(255, 247, 163)');
       stat.push('UNK');
       //updatestatus(e)
}

else if(dominios.some(v => url.includes(v))){
     updatestatus(e);
    $('div.blockrow.upload_link').eq(e).css('background-color', 'rgb(203 235 217)');
}

else if(freeservers.some(v => url.includes(v))){
GM_xmlhttpRequest({
  method: "get",
  url: url,
  headers: {
    //"referer":  "https://filewarez.tv/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload  : function(response) {
    var responseXML = null;
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response.responseXML) {
      responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

    console.log([
      response.status,
      response.statusText,
      response.responseHeaders,
      response.responseText,
        response.finalURL
    ].join("\n"));


   if(response.responseText.includes("File has expired") || response.responseText.includes("The file expired") || response.responseText.includes("O arquivo não foi encontrado. Ele pode ter sido excluído.") || response.finalUrl.includes(foursync) || response.finalUrl.includes(onecloudfile) || response.responseText.includes(fourshared) || response.responseText.includes(userscloud) || response.responseText.includes(terabox) || response.responseText.includes(brupload) || response.responseText.includes(megaup) || response.responseText.includes(depositfiles) || response.responseText.includes(siasky) || response.responseText.includes(filecrypt) || response.responseText.includes(filetransferIO) || response.responseText.includes(rapidgator) || response.responseText.includes("The requested ressource does not exist") || response.responseText.includes(wetransfer) || response.responseText.includes(yandex) || response.status == "403" || response.status == ('404') || response.status == ('406') || response.status == ('410') || response.status == ('301') || response.status == ('302')){
       console.log('OFFLINE', url);
       $('div.blockrow.upload_link').eq(e).css('background-color', 'rgba(231, 76, 60, 0.2)');
       updatestatus_down(e)
          }else{
      
       console.log('ONLINE', url);
              $('div.blockrow.upload_link').eq(e).css('background-color', 'rgb(203 235 217)');
       updatestatus(e)
}

  },onerror :function(response) {
      console.log(response);
  }

});
}else{
    console.log('UNK', url);
       stat.push('UNK');
}

var myInterval = setInterval(function () {
    console.log($('div.blockrow.upload_link').length, id_dows, stat);

   console.log('conta: '+$('div.blockrow.upload_link').length == stat.length);
   if($('div.blockrow.upload_link').length == stat.length){
       if(stat.includes('online') && !stat.includes('offline') && !stat.includes('UNK')){
          document.title = 'ON';
          changeico('green');
       clearInterval(myInterval);
   }else if(!stat.includes('online') && stat.includes('offline') && !stat.includes('UNK')){
       document.title = 'OFF';
       changeico('red');
       clearInterval(myInterval);
   }else if(stat.includes('online') && stat.includes('offline') && !stat.includes('UNK')){
       document.title = 'ON/OFF';
       changeico('red_green');
       clearInterval(myInterval);
   }else if(stat.includes('UNK')){
       document.title = 'UNK';
       changeico('yellow');
       clearInterval(myInterval);
   }else{
       console.log(' que merda deu ? ');
   }
   }

}, 2000);
})
