﻿/*
 AngularJS v1.3.1
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (p, g, q) {
    'use strict'; function F(a) { var d = []; t(d, g.noop).chars(a); return d.join("") } function k(a) { var d = {}; a = a.split(","); var c; for (c = 0; c < a.length; c++) d[a[c]] = !0; return d } function G(a, d) {
        function c(a, b, c, h) { b = g.lowercase(b); if (u[b]) for (; f.last() && v[f.last()];) e("", f.last()); w[b] && f.last() == b && e("", b); (h = x[b] || !!h) || f.push(b); var n = {}; c.replace(H, function (a, b, d, c, e) { n[b] = s(d || c || e || "") }); d.start && d.start(b, n, h) } function e(a, b) {
            var c = 0, e; if (b = g.lowercase(b)) for (c = f.length - 1; 0 <= c && f[c] != b; c--);
            if (0 <= c) { for (e = f.length - 1; e >= c; e--) d.end && d.end(f[e]); f.length = c }
        } "string" !== typeof a && (a = null === a || "undefined" === typeof a ? "" : "" + a); var b, m, f = [], n = a, h; for (f.last = function () { return f[f.length - 1] }; a;) {
            h = ""; m = !0; if (f.last() && y[f.last()]) a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + f.last() + "[^>]*>", "i"), function (a, b) { b = b.replace(I, "$1").replace(J, "$1"); d.chars && d.chars(s(b)); return "" }), e("", f.last()); else {
                if (0 === a.indexOf("\x3c!--")) b = a.indexOf("--", 4), 0 <= b && a.lastIndexOf("--\x3e", b) === b && (d.comment && d.comment(a.substring(4,
                b)), a = a.substring(b + 3), m = !1); else if (z.test(a)) { if (b = a.match(z)) a = a.replace(b[0], ""), m = !1 } else if (K.test(a)) { if (b = a.match(A)) a = a.substring(b[0].length), b[0].replace(A, e), m = !1 } else L.test(a) && ((b = a.match(B)) ? (b[4] && (a = a.substring(b[0].length), b[0].replace(B, c)), m = !1) : (h += "<", a = a.substring(1))); m && (b = a.indexOf("<"), h += 0 > b ? a : a.substring(0, b), a = 0 > b ? "" : a.substring(b), d.chars && d.chars(s(h)))
            } if (a == n) throw M("badparse", a); n = a
        } e()
    } function s(a) {
        if (!a) return ""; var d = N.exec(a); a = d[1]; var c = d[3]; if (d = d[2]) r.innerHTML =
        d.replace(/</g, "&lt;"), d = "textContent" in r ? r.textContent : r.innerText; return a + d + c
    } function C(a) { return a.replace(/&/g, "&amp;").replace(O, function (a) { var c = a.charCodeAt(0); a = a.charCodeAt(1); return "&#" + (1024 * (c - 55296) + (a - 56320) + 65536) + ";" }).replace(P, function (a) { return "&#" + a.charCodeAt(0) + ";" }).replace(/</g, "&lt;").replace(/>/g, "&gt;") } function t(a, d) {
        var c = !1, e = g.bind(a, a.push); return {
            start: function (a, m, f) {
                a = g.lowercase(a); !c && y[a] && (c = a); c || !0 !== D[a] || (e("<"), e(a), g.forEach(m, function (c, f) {
                    var l =
                    g.lowercase(f), m = "img" === a && "src" === l || "background" === l; !0 !== Q[l] || !0 === E[l] && !d(c, m) || (e(" "), e(f), e('="'), e(C(c)), e('"'))
                }), e(f ? "/>" : ">"))
            }, end: function (a) { a = g.lowercase(a); c || !0 !== D[a] || (e("</"), e(a), e(">")); a == c && (c = !1) }, chars: function (a) { c || e(C(a)) }
        }
    } var M = g.$$minErr("$sanitize"), B = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/, A = /^<\/\s*([\w:-]+)[^>]*>/, H = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, L = /^</,
    K = /^<\//, I = /\x3c!--(.*?)--\x3e/g, z = /<!DOCTYPE([^>]*?)>/i, J = /<!\[CDATA\[(.*?)]]\x3e/g, O = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, P = /([^\#-~| |!])/g, x = k("area,br,col,hr,img,wbr"); p = k("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"); q = k("rp,rt"); var w = g.extend({}, q, p), u = g.extend({}, p, k("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), v = g.extend({}, q, k("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
    p = k("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use"); var y = k("script,style"), D = g.extend({}, x, u, v, w, p), E = k("background,cite,href,longdesc,src,usemap,xlink:href"); p = k("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width");
    q = k("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan");
    var Q = g.extend({}, E, q, p), r = document.createElement("pre"), N = /^(\s*)([\s\S]*?)(\s*)$/; g.module("ngSanitize", []).provider("$sanitize", function () { this.$get = ["$$sanitizeUri", function (a) { return function (d) { var c = []; G(d, t(c, function (c, b) { return !/^unsafe/.test(a(c, b)) })); return c.join("") } }] }); g.module("ngSanitize").filter("linky", ["$sanitize", function (a) {
        var d = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/, c = /^mailto:/; return function (e, b) {
            function m(a) { a && l.push(F(a)) } function f(a,
            c) { l.push("<a "); g.isDefined(b) && (l.push('target="'), l.push(b), l.push('" ')); l.push('href="'); l.push(a); l.push('">'); m(c); l.push("</a>") } if (!e) return e; for (var n, h = e, l = [], k, p; n = h.match(d) ;) k = n[0], n[2] == n[3] && (k = "mailto:" + k), p = n.index, m(h.substr(0, p)), f(k, n[0].replace(c, "")), h = h.substring(p + n[0].length); m(h); return a(l.join(""))
        }
    }])
})(window, window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map