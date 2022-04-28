// ==UserScript==
// @name         Verificador de Uploads Individual[FW]
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatiza a verificação de uploads da Filewarez.
// @author       PvP
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-idle
// @include      https://filewarez.tv/showthread.php*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=filewarez.tv

// ==/UserScript==

var dominios = ['https://gokigenyou','https://pinkm4n','https://pinkmanmirror','https://rkreleasesfw','https://rkzicadosreleases','https://rkzicamirror','https://rkcloud','https://xaulin','https://kenoshy','https://link-direto','https://locao.website','https://linkkdireto','https://crazylouco'];
var freeservers = ['zippyshare.com','1fichier','mediafire.com','pixeldrain.com','uploaded.net','http://ul.to','uptobox.com','wetransfer.com','dowsfile.com','drive.google.com','anonfiles.com','mega.nz','mega.co.nz','turbobit.net','turb.cc','filetransfer.io','krakenfiles.com','rapidgator.net','multiup.org','disk.yandex.com','filecrypt.co','down.fast-down.com','depositfiles.com','depositfiles.org','brfiles.com','uloz.to','megaup.net','4sync.com','onedrive.com','onedrive.live.com','sharepoint.com','siasky.net','userscloud.com','brupload.net','4shared.com','1cloudfile.com','streamtape.com'];
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

else if(url.includes('terabox.com') || url.includes('transferfile.io')){
       console.log('UNK', url);
       $('div.blockrow.upload_link').eq(e).css('background-color', 'rgb(255, 247, 163)');
       stat.push('UNK');
       //updatestatus(e)
}

else if(dominios.some(v => url.includes(v))){
     updatestatus(e);
}

else if(freeservers.some(v => url.includes(v))){
GM_xmlhttpRequest({
  method: "get",
  url: url,
  headers: {
    //"referer":  "https://filewarez.tv/",
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
