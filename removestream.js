// ==UserScript==
// @name         Fw Portal Block Stream
// @namespace    Bloqueio de stream no Portal Fw
// @version      1.0
// @description  Bloqueia streaming no portal da Fw. (module23)
// @author       CastleFw/FloridaStream
// @match        https://filewarez.tv/portal.php
// @grant        none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL   
// @downloadURL 
// ==/UserScript==
(function() {
$( ".collapse" ).remove( ":contains('FURiOUS está ao vivo agora')" );
})();
