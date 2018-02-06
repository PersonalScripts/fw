// ==UserScript==
// @name         Portal Block Stream [FW]
// @namespace    Bloqueio de stream no Portal Fw
// @version      1.0.1
// @description  Bloqueia streaming no portal da Fw. (module23)
// @author       CastleFw/FloridaStream
// @match        https://filewarez.tv/portal.php
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/PersonalScripts/fw/master/removestream.js
// @downloadURL  https://raw.githubusercontent.com/PersonalScripts/fw/master/removestream.js
// ==/UserScript==
(function() {
$( ".collapse" ).remove( ":contains('FURiOUS está ao vivo agora')" );
})();
