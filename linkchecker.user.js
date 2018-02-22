// ==UserScript==
// @name        Verificador de uploads [FW]
// @description Userscript para auxiliar na verificação de uploads na FileWarez.
// @include     /^http(s)?:\/\/(www\.)?filewarez\.tv/.*$/
// @copyright   2016, XOR
// @author      XOR
// @version     0.3.3.1
// @license     MIT License
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// @require     https://linkchecker.github.io/lib/asmcrypto.js
// @connect     *
// @run-at      document-start
// @noframes
// ==/UserScript==
(function() {
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
    return (a = sb.exec(a)) ? {href:a[0], host:a[2], rest:a[3] || "/"} : null;
  }
  function x(a) {
    var b = M(a), c;
    if (b) {
      if (b = N.test(b.href) ? M(b.rest.substring(2)) : b, b) {
        if (c = y[b.host.replace(tb, "")]) {
          if ("function" === typeof c.checkUrl) {
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
  function q(a, b) {
    var c = a.statusE;
    a.linkE.style.backgroundColor = xb[b.status];
    --q.n;
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
    var t, xb = (t = {}, t.online = "rgba(0, 13, 103, 0.85)", t.offline = "rgba(103, 0, 0, 0.95)", t.unknown = "rgba(255, 247, 163, 0.9)", t);
    window.location.pathname.startsWith("/showthread.php") && yb();
  }
})();
