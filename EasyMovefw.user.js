// ==UserScript==
// @name         Easy Move-Topic [FW]
// @namespace    https://filewarez.tv
// @version      1.4
// @encoding     utf-8
// @copyright    2018, FloridaStream (CastleFw)
// @author       Castle
// @homepage     https://filewarez.tv/member.php?u=74646
// @contactURL   https://filewarez.tv/private.php?do=newpm&u=74646
// @supportURL   https://filewarez.tv/private.php?do=newpm&u=74646
// @description  Separa áreas do fórum em categorias com 2 selects.
// @include      /^http(s)?:\/\/(www\.)?filewarez\.tv\/(inlinemod.php\?forumid=[{0-9}].*)|(.+postings\.php).*$/
// @icon         data:image/png;base64,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
// @license      https://creativecommons.org/licenses/by-nd/3.0/br/
// @downloadURL  https://personalscripts.github.io/fw/EasyMovefw.user.js
// @updateURL    https://personalscripts.github.io/fw/EasyMovefw.user.js
// @run-at       document-start
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

$(document).ready(function(){

   $(".blockrow select")
   .attr({
      id: "primeiroselect",
      name: ""
   });

   $("#primeiroselect option[class!='d0']").hide(); // escondo tudo que não tiver a classe 'd0'

   $("<select>", {
      id: "destforumid",
      name: "destforumid",
      class: "primary",
      tabindex: "1"
   })
   .insertAfter("#primeiroselect");

   var cats = $("#primeiroselect option");

   $("#primeiroselect").on("change", function(){

      var opt = $(this)
                .find("option:selected")
                .nextUntil(".d0"),
          htm = '';

      if(opt.length == 0){
         htm = $(this)
               .find("option:selected")
               .clone();
      }else{
         $(opt).each(function(i,e){
            htm += e.outerHTML;
         });
      }

      $("#destforumid")
      .empty()
      .append(htm)
      .find("option")
      .show();

   }).trigger("change");

   //var newOption = $('<option selected disabled>Selecione uma área</option>');
   //newOption.insertAfter('#elementsID option[value="value1"]');
   $('#primeiroselect').css({"margin-right": "5px"}).append('<option class="d0" selected disabled>Selecione uma Categoria</option>');
   $("#destforumid option[class!='d0']").hide();
   $('#destforumid').append('<option selected disabled>Selecione uma área</option>');
   //$('label').append('<div>');
   $('#primeiroselect').before('<div style="font-weight: bold; float: left;">Categorias:</div>');
   $('#primeiroselect').before('<div style="font-weight: bold; margin-left: 51.10%;">Destino:</div>');
});
