// ==UserScript==
// @name        Verificador de uploads MOD [FW]
// @description Userscript para auxiliar na verificação de uploads na FileWarez.
// @include     /^http(s)?:\/\/(www\.)?filewarez\.tv/.*$/
// @copyright   2016, XOR
// @author      XOR [MOD by Castle]
// @version     0.3.3.0.6
// @license     MIT License
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// @require     https://raw.githubusercontent.com/PersonalScripts/fw/master/asmcrypto.js
// @iconURL     data:image/png;base64,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
// @homepage    https://filewarez.tv/member.php?u=74646
// @contactURL  https://filewarez.tv/private.php?do=newpm&u=74646
// @supportURL  https://filewarez.tv/private.php?do=newpm&u=74646
// @updateURL   https://github.com/PersonalScripts/fw/raw/master/linkchecker.mod.user.js
// @downloadURL https://github.com/PersonalScripts/fw/raw/master/linkchecker.mod.user.js
// @namespace   ffdebde62120de094d5075fadefcbc02
// @connect     *
// @run-at      document-start
// @noframes
// ==/UserScript==

(function() {
  var upstatus, upstatusUNK = "";
  function Q(a, b) {
    return Object.keys(a).map(function(c) {
      return b(c, a[c]);
    });
  }
  function z(a, b) {
    Object.keys(a).forEach(function(c) {
      return b(c, a[c]);
    });
  }
  function A(a) {
    if (a) {
      var b = typeof a;
      if ("string" === b) {
        return a;
      }
      if ("object" === b) {
        return Q(a, function(a, b) {
          return [a, b].map(encodeURIComponent).join("=");
        }).join("&");
      }
    }
    return "";
  }
  function B(a, b, c, d, e) {
    "undefined" === typeof c.Referer && (c.Referer = b);
    c["X-Requested-With"] = "XMLHttpRequest";
    return new Promise(function(f, h) {
      var g = void 0, g = "function" === typeof e ? function(a) {
        var c = a.responseText;
        a = a.status;
        200 === a ? f(e(c)) : h({responseText:e(c), status:a});
      } : function(a) {
        var c = a.responseText;
        a = a.status;
        200 === a ? f(c) : h({responseText:c, status:a});
      };
      GM_xmlhttpRequest({method:a, url:b, headers:c, data:d, onload:g});
    });
  }
  function k(a, b, c, d) {
    c = A(c);
    return B("GET", a + (c ? "?" + c : ""), b || {}, "", d);
  }
  function C(a, b, c, d) {
    c = A(c);
    var e = {"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"};
    z(b, function(a, c) {
      e[a] = c;
    });
    return B("POST", a, e, c, d);
  }
  function R(a) {
    bypasswindowclose();
    return C("/postador.php", {Referer:a.referer || window.location.href}, {linkid:a.id, status:a.online, securitytoken:a.token || unsafeWindow.SECURITYTOKEN, automatic:!1, "do":"updatestatus"});
  }
  function n(a) {
    var b = a.responseText;
    a = a.status;
    404 === a ? this.status = "offline" : (this.status = "unknown", this.reason = "Response: " + JSON.stringify(b || "") + "\nStatus : " + a);
    return this;
  }
  function g(a) {
    var b = this, c = {hostName:this.hostName, url:a.href, type:"file"};
    return k(c.url, this.headers || {}, this.data || "").then(function(a) {
      var e = void 0, f = void 0, h = b.regex;
      h && (e = h.linkOff, f = h.linkOn);
      if (e && e.test(a)) {
        c.status = "offline";
      } else {
        if ("undefined" === typeof f || f.test(a)) {
          c.status = "online";
          if (b.getInfo) {
            return b.getInfo(c, a);
          }
          e = h.fileName;
          h = h.fileSize;
          e && (e = (e.exec(a) || [])[1]) && (c.name = e);
          h && (a = (h.exec(a) || [])[1]) && (c.size = a);
        } else {
          c.status = "unknown", c.reason = "Ops... regex";
        }
      }
      return c;
    }, n.bind(c));
  }
  function l(a) {
    return S.parseFromString(a, "text/html");
  }
  function T(a, b) {
    var c = l(b), d = c.querySelector('input[name="filename"]'), c = c.getElementsByClassName("meta");
    d && (a.name = d.value);
    c.length && (d = U.exec(c[0].textContent)) && (a.size = d[1]);
    return a;
  }
  function V(a) {
    var b = {url:a.href, type:"file"};
    return k("http://gdvid.ga/2shd/index.php?url=" + b.url).then(function(a) {
      try {
        var d = JSON.parse(a);
        switch(d.code) {
          case 200:
            b.status = "online";
            b.name = d.name;
            b.size = d.size;
            break;
          case 404:
            b.status = "offline";
            break;
          default:
            b.status = "unknown";
        }
        return b;
      } catch (e) {
        b.status = "unknown";
      }
      return b;
    }, function() {
      b.status = "unknown";
      return b;
    });
  }
  function W(a, b) {
    var c = l(b).getElementsByClassName("inner-bg-repeat");
    c.length && (c = c[0].children, 4 <= c.length && (a.name = c[2].textContent, c = (X.exec(c[3].textContent || "") || [])[1], a.size = c));
    return a;
  }
  function Y(a, b) {
    var c = l(b).getElementsByClassName("fNameLink");
    if (c.length) {
      var c = Z.exec(c[0].textContent) || [], d = c[2];
      a.name = c[1];
      a.size = d;
    }
    return a;
  }
  function aa(a) {
    return a.rest.startsWith("/download/") ? !0 : !1;
  }
  function ba(a) {
    return ca.test(a.rest) ? !0 : !1;
  }
  function da(a, b) {
    var c = l(b), d = c.querySelector(".title-font .title");
    d && (a.name = d.textContent);
    c = c.getElementsByClassName("size pic");
    c.length && (a.size = c[0].textContent.trim());
    return a;
  }
  function ea(a) {
    return fa.test(a.rest) ? !0 : !1;
  }
  function ga(a, b) {
    var c = l(b), d = c.getElementsByClassName("sizetagtext");
    d.length && (a.size = d[0].textContent);
    if (c = c.getElementsByClassName("downloadfilename")) {
      a.name = c[0].textContent;
    }
    return a;
  }
  function ha(a, b) {
    var c = l(b);
    a.name = c.getElementById("main").children[6].textContent;
    return a;
  }
  function ia(a) {
    return a.rest.startsWith("/v/") ? !0 : !1;
  }
  function ja(a, b) {
    var c = l(b).getElementsByClassName("left")[0];
    a.name = c.children[3].textContent;
    a.size = c.children[6].textContent;
    return a;
  }
  function ka(a, b) {
    var c = l(b).getElementsByClassName("font14");
    if (c.length) {
      var c = la.exec(c[0].textContent) || [], d = c[2];
      a.name = c[1];
      a.size = d;
    }
    return a;
  }
  function ma(a, b) {
    var c = l(b), d = c.getElementById("file_name");
    d && (a.name = d.title);
    c = c.getElementsByClassName("filename_normal");
    c.length && (c = na.exec(c[0].textContent)) && (a.size = c[1]);
    return a;
  }
  function oa(a) {
    return a.rest.startsWith("/file/") ? !0 : !1;
  }
  function pa(a) {
    return qa.test(a.rest) ? {type:"file"} : !1;
  }
  function ra(a, b) {
    var c = b.type;
    return sa[c]({url:a.href, type:c});
  }
  function ta(a) {
    return a.rest.startsWith("/file/") ? !0 : !1;
  }
  function ua(a, b) {
    var c = l(b);
    c.getElementsByClassName("in").length ? (a.name = c.querySelector(".btm p a").textContent.trim(), a.size = c.querySelector(".btm div > strong").textContent) : a.status = "unknown";
    return a;
  }
  function va(a) {
    return wa.test(a.rest) ? !0 : !1;
  }
  function xa(a) {
    return ya.file({url:a.href, type:"file"});
  }
  function za(a) {
    return a.rest.startsWith("/d/") ? !0 : !1;
  }
  function Aa(a, b) {
    var c = unescape(Ba.exec(b)[1]);
    a.name = Ca.exec(c)[1];
    a.size = Da.exec(b)[1];
    return a;
  }
  function Ea(a) {
    return D.test(a.rest) ? !0 : !1;
  }
  function Fa(a) {
    var b = a.rest.replace(D, "/get/");
    return E({host:a.host, rest:b, href:"http://" + a.host + b});
  }
  function Ga(a) {
    return Ha.test(a.rest) ? !0 : !1;
  }
  function p(a) {
    for (var b = 0;1024 <= a;++b, a /= 1024) {
    }
    return a.toFixed(1) + " " + ["B", "kiB", "MiB", "GiB", "TiB"][b];
  }
  function Ia(a) {
    return (a = Ja.exec(a.rest)) ? {id:a[1]} : !1;
  }
  function Ka(a, b, c) {
    return k("https://api.oboom.com/1/ls", b, c, JSON.parse).then(function(c) {
      var b = c[0];
      c = c[1];
      switch(b) {
        case 404:
          a.status = "offline";
          break;
        case 200:
          a.status = "online";
          a.name = c.name;
          a.size = p(c.size);
          break;
        default:
          a.status = "unknown", a.reason = "Code: " + b;
      }
      return a;
    });
  }
  function La(a, b) {
    var c = b.id, d = {type:"file", url:a.href, id:c};
    return k(d.url, F).then(function(a) {
      a = {token:(Ma.exec(a) || [])[1], item:c, http_errors:0};
      return Ka(d, F, a);
    });
  }
  function Na(a) {
    return a.rest.startsWith("/f/") ? {type:"folder"} : {type:"file"};
  }
  function Oa(a, b) {
    var c = b.type;
    return Pa[c]({url:a.href, type:c});
  }
  function G(a) {
    var b = a.responseText;
    a = a.status;
    404 === a || 403 === a ? this.status = "offline" : (this.status = "unknown", this.reason = "Response: " + JSON.stringify(b || "") + "\nStatus : " + a);
    return this;
  }
  function Qa(a, b) {
    return k("https://drive.google.com" + b + "/folderview?usp=sharing&id=" + a.id).then(function(c) {
      a.status = "online";
      if (c = (Ra.exec(c) || [])[0]) {
        c = JSON.parse(c.replace(Sa, '"$1"').replace(Ta, '"$1"').replace(Ua, "[").replace(Va, '","').replace(Wa, "]").replace(Xa, "]}").replace(Ya, "]").trim());
        a.name = c.folderName;
        a.children = [];
        c = c.viewerItems;
        for (var b = 0;b < c.length;++b) {
          var e = c[b];
          a.children.push({name:e[0], id:e[2], url:e[5], type:"file"});
        }
      }
      return a;
    }, G.bind(a));
  }
  function Za(a, b) {
    return k("https://drive.google.com" + b + "/file/d/" + a.id + "/view?usp=sharing").then(function(c) {
      a.status = "online";
      if (c = $a.exec(c)) {
        a.name = c[1];
      }
      return a;
    }, G.bind(a));
  }
  function ab(a) {
    var b = bb.exec(a.rest);
    if (b) {
      a = b[1] || "";
      var c = b[2] || b[3], b = b[4];
      switch(c) {
        case "file":
        ;
        case "uc":
        ;
        case "document":
        ;
        case "open":
        ;
        case "spreadsheets":
          c = "file";
          break;
        case "folderview":
        ;
        case "folder":
          c = "folder";
          break;
        default:
          return !1;
      }
      return {pref:a, id:b, type:c};
    }
    return !1;
  }
  function cb(a, b) {
    var c = b.pref, d = b.id, e = b.type, f = {hostName:this.hostName, id:d, url:a.href, type:e};
    return "file" === e ? Za(f, c) : "folder" === e ? Qa(f, c) : handleOther(f, d);
  }
  function H(a) {
    var b = {weblink:a.weblink};
    a.token && (b.token = a.token);
    return k("https://cloud.mail.ru/api/v2/folder", {}, b, JSON.parse).then(function(c) {
      c = c.body;
      a.status = "online";
      if ("storage" === c.kind) {
        c = c.list[0], a.type = "file", a.name = c.name, a.size = p(c.size);
      } else {
        a.type = "folder";
        a.name = c.name;
        a.children = [];
        c = c.list;
        for (var b = 0;b < c.length;++b) {
          var e = c[b], f = {name:e.name, weblink:e.weblink};
          "file" === e.kind ? (f.type = "file", f.size = p(e.size)) : f.type = "folder";
          a.children.push(f);
        }
      }
      return a;
    }, function(c) {
      var b = c.responseText;
      c = c.status;
      a.status = 400 === c || 404 === c ? "offline" : "unknown";
      b = JSON.stringify(b);
      a.reason = "Response: " + b + "\nStatus : " + c;
      return a;
    });
  }
  function db(a) {
    return (a = (eb.exec(a.rest) || [])[1]) ? {weblink:decodeURIComponent(a)} : null;
  }
  function fb(a, b) {
    var c = {url:a.href, weblink:b.weblink};
    return k("https://cloud.mail.ru/api/v2/tokens", null, null, JSON.parse).then(function(a) {
      c.token = a.body.token;
      return H(c);
    }, function(a) {
      if (403 === a.status) {
        return H(c);
      }
      c.status = "unknown";
      return c;
    });
  }
  function I(a) {
    for (var b = a.length << 2, c = new Uint8Array(b), d = 0;d < b;d += 4) {
      var e = d >> 2;
      c[d] = a[e] >> 24;
      c[d + 1] = a[e] >> 16;
      c[d + 2] = a[e] >> 8;
      c[d + 3] = a[e];
    }
    return c;
  }
  function J(a) {
    for (var b = [24, 16, 8, 0], c = Array(a.length + 3 >> 2), d = 0, e = a.length;d < e;++d) {
      c[d >> 2] |= a[d] << b[d & 3];
    }
    return c;
  }
  function u(a) {
    switch(a.length % 4) {
      case 0:
        break;
      case 2:
        a += "==";
        break;
      case 3:
        a += "=";
        break;
      default:
        throw Error("Invalid base64url string.");;
    }
    var b = a.length;
    if (0 !== b % 4) {
      throw Error("Invalid string. Length must be a multiple of 4");
    }
    var c;
    c = "=" === a.charAt(b - 2) ? 2 : "=" === a.charAt(b - 1) ? 1 : 0;
    for (var d = 0 < c ? b - 4 : b, b = new Uint8Array(.75 * b - c), e = 0, f = 0;f < d;f += 4) {
      var h = m[a.charAt(f)] << 18 | m[a.charAt(f + 1)] << 12 | m[a.charAt(f + 2)] << 6 | m[a.charAt(f + 3)];
      b[e++] = (h & 16711680) >> 16;
      b[e++] = (h & 65280) >> 8;
      b[e++] = h & 255;
    }
    2 === c ? (h = m[a.charAt(f)] << 2 | m[a.charAt(f + 1)] >> 4, b[e++] = h & 255) : 1 === c && (h = m[a.charAt(f)] << 10 | m[a.charAt(f + 1)] << 4 | m[a.charAt(f + 2)] >> 2, b[e++] = h >> 8 & 255, b[e++] = h & 255);
    return b;
  }
  function w(a, b) {
    var c = "string" === typeof a ? u(a) : a, d = "string" === typeof b ? u(b) : b;
    32 <= d.length && (d = J(d), d = I([d[0] ^ d[4], d[1] ^ d[5], d[2] ^ d[6], d[3] ^ d[7]]));
    c = v.decrypt(c, d, !1);
    for (d = c.length - 1;0 <= d && 0 === c[d];--d) {
    }
    c = c.subarray(4, d + 1);
    return JSON.parse(gb.decode(c));
  }
  function K(a, b) {
    var c = "string" === typeof a ? u(a) : a, d = "string" === typeof b ? u(b) : b;
    if (16 === c.length) {
      return v.decrypt(c, d, !1);
    }
    if (32 <= c.length) {
      var e = v.decrypt(c.subarray(0, 16), d, !1), c = v.decrypt(c.subarray(16, 32), d, !1), d = e.length, f = new Uint8Array(d + c.length);
      f.set(e, 0);
      f.set(c, d);
      e = J(f);
      return I([e[0] ^ e[4], e[1] ^ e[5], e[2] ^ e[6], e[3] ^ e[7]]);
    }
    throw Error("Invalid key.");
  }
  function L(a, b, c, d) {
    return C(a, hb, b).then(function(a) {
      var b = c.exec(a);
      if (b) {
        return a = b[1], a |= 0, -9 === a || -16 === a || -6 === a ? d.status = "offline" : (d.status = "unknown", d.reason = "C\u00f3digo: " + a), d;
      }
      d.status = "online";
      return ib[d.type](a, d);
    }, function(e) {
      var f = e.responseText;
      e = e.status;
      if (500 === e) {
        return L(a, b, c, d);
      }
      d.status = "unknown";
      f = JSON.stringify(f);
      d.reason = "Resp: " + f + " | Status: " + e;
      return d;
    });
  }
  function jb(a) {
    a = kb.exec(a.rest) || [];
    var b = a[2];
    return b ? {id:b, key:a[3], type:a[1] ? "folder" : "file"} : null;
  }
  function lb(a, b) {
    var c = {url:a.href, id:b.id, key:b.key, type:b.type}, d, e, f;
    "file" === c.type ? (d = /^\[(-*\d+)]/, e = '[{"a":"g","p":"' + c.id + '"}]', f = "https://eu.api.mega.co.nz/cs?id=0") : (d = /^(-*\d+)/, e = '[{"a":"f","c":1,"r":1}]', f = "https://eu.api.mega.co.nz/cs?id=0&n=" + c.id);
    return L(f, e, d, c);
  }
  function mb(a) {
    return (a = (nb.exec(a.rest) || [])[1]) ? {shareId:a} : null;
  }
  function ob(a) {
    return k("https://www.amazon.com/drive/v1/nodes/" + (a.id || a.infoId) + "/children?customerId=&resourceVersion=V2&ContentType=JSON&limit=200&sort=%5B%22kind+DESC%22%2C+%22name+ASC%22%5D&tempLink=true&shareId=" + a.shareId, {Referer:a.url}, "", JSON.parse).then(function(b) {
      b = b.data[0];
      a.status = "online";
      a.id = b.id;
      a.name = b.name;
      "FILE" === b.kind ? (a.type = "file", a.size = p(b.contentProperties.size)) : a.type = "folder";
      return a;
    }, n.bind(a));
  }
  function pb(a) {
    return k("https://www.amazon.com/drive/v1/shares/" + a.shareId + "?resourceVersion=V2&ContentType=JSON&asset=ALL", {Referer:a.url}, "", JSON.parse).then(function(b) {
      b = b.nodeInfo;
      a.status = "online";
      a.infoId = b.id;
      return ob(a);
    }, n.bind(a));
  }
  function qb(a, b) {
    return pb({url:a.href, shareId:b.shareId});
  }
  function rb(a) {
    return a.rest.startsWith("/f/") ? !0 : !1;
  }
  function M(a) {
    //console.log(a[3]);
    return (a = sb.exec(a)) ? {href:a[0], host:a[2], rest:a[3].replace(new RegExp("^/a(.*)/file", "mg"), "/file") || "/"} : null;
  }
  function x(a) {
    var b = M(a), c;

    if (b) {
      if (b = N.test(b.href) ? M(b.rest.substring(2)) : b, b) {
        if (c = y[b.host.replace(tb, "")]) {
          if ("function" === typeof c.checkUrl) {
            console.log(b.rest.substring(2));
            var d = c.checkUrl(b);
            if (d) {
              return c.checkStatus(b, d);
            }
            b = "Tipo de URL n\u00e3o suportada para este servidor.";
          } else {
            return c.checkStatus(b);
          }
        } else {
          b = "Servidor n\u00e3o suportado ou desativado.";
        }
      } else {
        b = "URL inv\u00e1lida ap\u00f3s remover anonimizador.";
      }
    } else {
      b = "URL inv\u00e1lida.";
    }
    return Promise.resolve({url:a, status:"unknown", reason:b});
  }
  function ub(a) {
    var b = a.beforeEach, c = a.afterEach, d = a.context || document;
    if (!d.getElementsByClassName("upload_links").length) {
      return Promise.resolve("Ops...");
    }
    a = [];
    var d = d.getElementsByClassName("upload_link"), e = d.length;
    c.n = e;
    for (var f = 0;f < e;++f) {
      var h = d[f], g = h.lastElementChild.firstElementChild, h = {linkE:h, statusE:g, url:h.firstElementChild.firstChild.href, status:g.classList.contains("online") ? "online" : "offline"};
      b(h);
      h = x(h.url).then(c.bind(this, h));

      a.push(h);
    }
    return Promise.all(a);
  }
  function vb() {
    return new Promise(function(a, b) {
      "loading" !== document.readyState ? a() : document.addEventListener("DOMContentLoaded", function() {
        a();
      });
    });
  }
  function wb(a, b) {
    a.statusE.classList.add("loading");
  }

  function changeico(i) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://raw.githubusercontent.com/PersonalScripts/fw/master/'+i+'.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
    var on_  = "0";
    var off_ = "0";
    function bypasswindowclose(){
        if(off_ != "0") return;
        if(off_ == "0"){
              function closeWindow() {
                  setTimeout(function() {
                      window.close();
                      console.log('%c CLOSE', "background: grey; color: black; padding-left:10px;");
                  }, 3000);
              }
              window.onload = closeWindow();
        }
    }


  function q(a, b) {
    var c = a.statusE;
    a.linkE.style.backgroundColor = xb[b.status];
    --q.n;


      function avancada(b){
          var on = b.status == "online";
          var off= b.status == "offline";
          var unk= b.status == "unknown";
          var status = b.status;

          if(status == "online" && upstatus == "offline"){
              changeico("red_green");
              document.title = "On/OFF";
              off_ = "offline";
              console.log('%c UP On & OFF', "background: pink; color: black; padding-left:10px;");
          }
          else
          if(status == "online" && upstatus != "offline"){
              changeico("green");
              document.title = "On";
              on_ = "online";
              console.log('%c UP Online', "background: green; color: black; padding-left:10px;");

              /*function closeWindow() {
                  setTimeout(function() {
                  //window.close();
                       console.log('%c CLOSE', "background: grey; color: black; padding-left:10px;");
                  }, 3000);
              }*/
              //window.onload = closeWindow();
          }

          if(upstatusUNK && off){}else

          if(off && status != upstatus){
              changeico("red");
              document.title = "OFF";
              off_ = "offline";
              console.log('%c UP Off-line', "background: red; color: black; padding-left:10px;");
              upstatus = status;
          }

          if(unk){
              changeico("yellow");
              document.title = "?UKN?";
              off_ = "offline";
              console.log('%c UP Status Indefinido', "background: yellow; color: black; padding-left:10px;");
              upstatusUNK = status;
          }
      }
      avancada(b);




    !q.checkInDone && 0 === q.n || "unknown" !== b.status && a.status !== b.status ? function() {
      var d = "unknown" === b.status ? "online" === a.status : "online" === b.status;
      R({id:c.id, online:d}).then(function() {
        var a = c.classList;
        d ? (a.add("online"), a.remove("offline")) : (a.add("offline"), a.remove("online"));
        a.remove("loading");
      });
      q.checkInDone = !0;
    }() : c.classList.remove("loading");
    return {row:a, node:b};
  }
  function yb() {
    vb().then(function() {
      var a = document.getElementsByClassName("upload_links"), b = document.getElementsByClassName("link_password");
      a.length && 0 === b.length ? (a[0].scrollIntoView(), ub({beforeEach:wb, afterEach:q})) : console.warn("n\u00e3o h\u00e1 http links");
    });
  }
  if (window.top === window.self) {
    var S = new DOMParser, U = /\u00b7\s*(.+)$/, zb = {hostName:"DropboxCom", host:["dropbox.com"], getInfo:T, checkStatus:g, regex:{linkOff:/class="err">/, linkOn:/id="default_content_download_button"/}}, Ab = {hostName:"_2sharedCom", host:["2shared.com"], checkStatus:V}, X = /\((.+)\)/, Bb = {hostName:"HugefilesNet", host:["hugefiles.net"], checkStatus:g, getInfo:W, regex:{linkOff:/www.hugefiles.net\/404.html"|File Not Found/, linkOn:/download-file-btn-f"/}}, Z = /\s(.+)\s\[(.+)\]/, Cb = {hostName:"EzfileCh",
    host:["ezfile.ch"], getInfo:Y, checkStatus:g, regex:{linkOff:/was either removed or did not exist/, linkOn:/class="fNameLink"/}}, Db = {hostName:"LetitbitNet", host:["letitbit.net"], checkUrl:aa, checkStatus:g, regex:{linkOff:/id="captcha"/, fileName:/file-info-name">(.+)&nbsp;/, fileSize:/"file-info-size">\[(.+)\]/}}, ca = /^\/\w{7}(\/|$)/, Eb = {hostName:"GeTt", host:["ge.tt"], checkUrl:ba, checkStatus:g, getInfo:da}, fa = /^\/\w{5}(\/|$|\?)/, Fb = {hostName:"SpeedyshareCom", host:["speedyshare.com"],
    checkUrl:ea, checkStatus:g, getInfo:ga}, Gb = {hostName:"_180uploadCom", host:["180upload.com"], checkStatus:g, getInfo:ha, regex:{linkOff:/file expired or deleted/, linkOn:/id="btn_download"/}}, Hb = {hostName:"ZippyshareCom", host:["zippyshare.com"], checkUrl:ia, checkStatus:g, getInfo:ja, regex:{linkOff:/does not exist/, linkOn:/id="dlbutton"/}}, la = /Downloading "(.+)" \((.+)\)/, Ib = {hostName:"SecureuploadEu", host:["secureupload.eu"], checkStatus:g, getInfo:ka, regex:{linkOff:/could not be found/,
    linkOn:/value="download1"/}}, Jb = {hostName:"SoniclockerCom", host:["soniclocker.com"], checkStatus:g, regex:{linkOn:/class="download-content"/, fileName:/class="name">(.+?)</, fileSize:/class="size">(.+?)</}}, na = /\((.+)\)/, Kb = {hostName:"UploadableCh", host:["uploadable.ch"], checkStatus:g, getInfo:ma, regex:{linkOff:/Page not found|File not available|no longer available/, linkOn:/id="file_name"/}}, Lb = {hostName:"FilefactoryCom", host:["filefactory.com"], checkUrl:oa, checkStatus:g,
    regex:{linkOff:/alert alert-danger/, linkOn:/id="file_name"/, fileName:/<h2>(.+)</, fileSize:/id="file_info">([\d.,]+\s\w+)/}}, qa = /^\/\w{12}/, Mb = /File was not found/, Nb = /download-file-block/, Ob = /Download file\s(.+)\s\((.+)\)/, sa = {file:function(a) {
      return k(a.url).then(function(b) {
        var c = l(b);
        Mb.test(b) ? a.status = "offline" : Nb.test(b) ? (a.status = "online", b = Ob.exec(c.title), a.name = b[1], a.size = b[2]) : a.status = "unknown";
        return a;
      }, n.bind(a));
    }}, Pb = {hostName:"TurbobitNet", host:["turbobit.net"], checkUrl:pa, checkStatus:ra}, Qb = {hostName:"RapidgatorNet", host:["rapidgator.net"], checkUrl:ta, checkStatus:g, getInfo:ua, regex:{linkOff:/File not found/}}, wa = /^\/\w{12}(?=$|\/|\?)/, ya = {file:function(a) {
      return k(a.url).then(function(b) {
        b = l(b);
        var c = b.getElementsByClassName("para_title")[0].textContent;
        if (c.startsWith("File not found")) {
          a.status = "offline";
        } else {
          if (b.querySelector('input[value="download2"]')) {
            if (a.status = "online", b = /(.+)\s\((.+)\)/.exec(c)) {
              a.name = b[1], a.size = b[2];
            }
          } else {
            a.status = "unknown";
          }
        }
        return a;
      }, function(b) {
        a.status = "unknown";
        return a;
      });
    }}, Rb = {hostName:"UptoboxCom", host:["uptobox.com"], checkUrl:va, checkStatus:xa}, Sb = {hostName:"SolidfilesCom", host:["solidfiles.com"], checkUrl:za, checkStatus:g, regex:{linkOn:/id="file"/, fileName:/title="(.+)"/, fileSize:/<p class="meta">(.+),/}}, Ba = /unescape\('(.+)'/, Ca = /title="(.+)">/, Da = /"file_size">.+?(\d.+?)</, Tb = {hostName:"DepositfilesOrg", host:["depositfiles.org", "dfiles.eu"], checkStatus:g, getInfo:Aa, regex:{linkOff:/no_download_msg/, linkOn:/class="downloadblock"/}},
    D = /^\/(archive|zip|rar|file|video)\//, E = void 0, O = {hostName:"_4sharedCom", host:["4shared.com"], checkUrl:Ea, checkStatus:Fa, headers:{Cookie:"4langcookie=en"}, regex:{linkOff:/link that you requested is not valid/, linkOn:/class="fileName/, fileName:/f24">(.+)<\/h1/, fileSize:/floatLeft">\s*(\d+.+?)\s\|/}}, E = g.bind(O), Ha = /^\/\w{12}(\/|$|\?)/, Ub = {hostName:"BruploadNet", host:["brupload.net"], checkUrl:Ga, checkStatus:g, regex:{linkOff:/Arquivo Nao Encontrado/, linkOn:/Baixar Arquivo/,
    fileName:/<small>(.+)<\/s/, fileSize:/\((\d.+)\)/}}, r = {hostName:"UserscloudCom", host:["userscloud.com"], checkStatus:g, regex:{linkOff:/download is no longer available/, linkOn:/value="download2"/, fileName:/\?q=(.+?)"/, fileSize:/<div class="ribbon">(.+?)</}}, Vb = {hostName:"TusfilesNet", host:["tusfiles.net"], checkUrl:r.checkUrl, checkStatus:r.checkStatus, regex:{linkOff:r.regex.linkOff, linkOn:r.regex.linkOn, fileName:/#ffffff">(.+)<\/F/, fileSize:/Size:<\/th>\s+<.+">(.+?)</m}}, F =
    {Referer:"https://www.oboom.com"}, Ja = /^\/(\w{8})(?:$|\/)/, Ma = /Session\s+:\s+"(\w{8}-(?:\w{4}-){3}\w{12})"}/, Wb = {hostName:"OboomCom", host:["oboom.com"], checkUrl:Ia, checkStatus:La}, Xb = {hostName:"1fichierCom", host:["1fichier.com"], checkStatus:g, regex:{linkOff:/durant 60 jours|File not found/i, linkOn:/File Name :/i, fileName:/File Name :<\/td>[\s\w<="]+>(.+)</m, fileSize:/Size :<\/td>[\s\w<="]+>(.+)</m}}, Yb = {hostName:"MediafireCom", host:["mediafire.com"], checkStatus:g, headers:{Cookie:"noCookie=true"},
    regex:{linkOff:/error_msg_title/, linkOn:/class="dl-btn-container"/, fileName:/class="fileName">(.+?)</, fileSize:/File size: <span>(.+?)</}}, Pa = {folder:function(a) {
      return k(a.url).then(function(b) {
        b = l(b);
        a.status = "online";
        a.name = b.title;
        a.children = [];
        b = b.querySelectorAll("#fileList td.file");
        for (var c = 0, d = b.length;c < d;++c) {
          var e = b[c];
          a.children.push({name:e.children[0].textContent, size:e.children[1].textContent, type:"file", url:e.children[0].firstChild.href});
        }
        return a;
      }, n.bind(a));
    }, file:function(a) {
      return k(a.url).then(function(b) {
        b = l(b);
        b.getElementById("download") ? (b = b.getElementById("filename"), a.status = "online", a.name = b.textContent, a.size = b.nextElementSibling.textContent) : (a.status = "unknown", a.type = null);
        return a;
      }, n.bind(a));
    }}, Zb = {name:"UploadedNet", host:["ul.to", "uploaded.net"], checkUrl:Na, checkStatus:Oa}, Sa = /(\w+)\s*(?=:[^\/])/g, Ta = /'\s*(.+)\s*'/g, Ua = /\[,+/g, Va = /"\s*,+\d?,+"/g, Wa = /,+\d]/g, Xa = /]\s*,}/g, Ya = /]\s*/g, Ra = /{folder(?:.\s*)+?}/, $a = /,\[,"(.+?)",,/, bb = /^(\/a\/g\.pl|\/a\/gazeta\.pl)?\/(?:(file|document|spreadsheets|folder)\/d\/|(folderview|uc|open)\?id=)([\w-]+)/, $b = {hostName:"GoogleCom", host:["docs.google.com", "drive.google.com"], checkUrl:ab, checkStatus:cb}, eb =
    /^\/public(\/.+)/, ac = {name:"CloudmailRu", host:["cloud.mail.ru"], checkUrl:db, checkStatus:fb}, gb = new TextDecoder, m = function() {
      for (var a = {}, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), c = 0;c < b.length;++c) {
        a[b[c]] = c;
      }
      a["+"] = c;
      a["-"] = c;
      a["/"] = c + 1;
      a._ = c + 1;
      return a;
    }(), v = asmCrypto.AES_CBC, hb = {"Content-Type":"text/plain; charset=UTF-8", Referer:"https://mega.nz"}, ib = {folder:function(a, b) {
      var c = JSON.parse(a)[0].f, d = c[0], e = b.key, f = K(d.k.split(":")[1], e);
      b.name = w(d.a, f).n;
      b.parent = "#";
      b.id = d.h;
      b.children = [];
      d = {};
      d[b.id] = b;
      for (var h = 1;h < c.length;++h) {
        var g = c[h], k = {id:g.h, parent:g.p};
        1 === g.t ? (k.type = "folder", k.children = [], d[k.id] = k) : 0 === g.t && (k.type = "file", k.size = p(g.s));
        f = K(g.k.split(":")[1], e);
        k.name = w(g.a, f).n;
        d[k.parent].children.push(k);
      }
      return b;
    }, file:function(a, b) {
      var c = JSON.parse(a)[0];
      b.size = p(c.s);
      b.key && (b.name = w(c.at, b.key).n);
      return b;
    }}, kb = /^\/#(F)?!(\w{8})!([\w-]+)$/, bc = {name:"Mega", host:["mega.nz", "mega.co.nz"], checkUrl:jb, checkStatus:lb}, nb = /^\/clouddrive\/share\/([\w-]{43})/, cc = {name:"AmazonCom", host:["amazon.com"], checkUrl:mb, checkStatus:qb}, P = {hostName:"OpenloadCo", host:["openload.io", "openload.co"], checkUrl:rb, checkStatus:g, regex:{linkOff:/deleted by the owner or was removed/, linkOn:/container file-details/, fileName:/class="other-title-bold">(.+?)</, fileSize:/File size:\s(.+?)</}};
    g.bind(P);
    var dc = {OpenloadCo:P, AmazonCom:cc, MegaNz:bc, CloudMailRu:ac, GoogleCom:$b, UploadedNet:Zb, MediafireCom:Yb, _1fichierCom:Xb, OboomCom:Wb, UserscloudCom:r, TusfilesNet:Vb, BruploadNet:Ub, _4sharedCom:O, DepositfilesOrg:Tb, SolidfilesCom:Sb, UptoboxCom:Rb, RapidgatorNet:Qb, TurbobitNet:Pb, FilefactoryCom:Lb, UploadableCh:Kb, SoniclockerCom:Jb, SecureuploadEu:Ib, ZippyshareCom:Hb, _180uploadCom:Gb, SpeedyshareCom:Fb, GeTt:Eb, LetitbitNet:Db, EzfileCh:Cb, HugefilesNet:Bb, _2sharedCom:Ab, DropboxCom:zb},
    sb = /^(https?:)\/\/([\w\-\.]+)(\/.*|$)/, N = void 0, y = Object.create(null), ec = "hiderefer.com anonymz.com blankrefer.com hidemyass.com nullrefer.com refhide.com href.li".split(" "), tb = /^(?:www(?:\.|\d{1,2}\.(?=zippyshare))|\w{9}(?:\.(?=letitbit)|\w\.(?=1fichier)))/;
    x.init = function() {
      N = new RegExp("^https?:\\/\\/(?:www\\.)?(?:" + ec.join("|").replace(/\./g, "\\.") + ")\\/\\?", "i");
      z(dc, function(a, b) {
        for (var c = b.host, d = 0, e = c.length;d < e;++d) {
          y[c[d]] = b;
        }
      });
    }();
    x.hosts = y;
    var t, xb = (t = {}, t.online = "rgba(46, 204, 113, 0.2)", t.offline = "rgba(231, 76, 60, 0.2)", t.unknown = "rgba(255, 247, 163, 0.9)", t);
    window.location.pathname.startsWith("/showthread.php") && yb();
  }
})();
