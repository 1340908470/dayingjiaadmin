(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [2],
  {
    wMS7: function (e, t, n) {
      (function (t, n) {
        e.exports = n();
      })(0, function () {
        "use strict";
        function e(e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n;
          }
          return Array.from(e);
        }
        var t = Object.hasOwnProperty,
          n = Object.setPrototypeOf,
          r = Object.isFrozen,
          o = Object.getPrototypeOf,
          i = Object.getOwnPropertyDescriptor,
          a = Object.freeze,
          l = Object.seal,
          c = Object.create,
          s = "undefined" !== typeof Reflect && Reflect,
          u = s.apply,
          f = s.construct;
        u ||
          (u = function (e, t, n) {
            return e.apply(t, n);
          }),
          a ||
            (a = function (e) {
              return e;
            }),
          l ||
            (l = function (e) {
              return e;
            }),
          f ||
            (f = function (t, n) {
              return new (Function.prototype.bind.apply(
                t,
                [null].concat(e(n))
              ))();
            });
        var m = w(Array.prototype.forEach),
          p = w(Array.prototype.pop),
          d = w(Array.prototype.push),
          h = w(String.prototype.toLowerCase),
          g = w(String.prototype.match),
          y = w(String.prototype.replace),
          v = w(String.prototype.indexOf),
          b = w(String.prototype.trim),
          A = w(RegExp.prototype.test),
          T = x(TypeError);
        function w(e) {
          return function (t) {
            for (
              var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), o = 1;
              o < n;
              o++
            )
              r[o - 1] = arguments[o];
            return u(e, t, r);
          };
        }
        function x(e) {
          return function () {
            for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
              n[r] = arguments[r];
            return f(e, n);
          };
        }
        function S(e, t) {
          n && n(e, null);
          var o = t.length;
          while (o--) {
            var i = t[o];
            if ("string" === typeof i) {
              var a = h(i);
              a !== i && (r(t) || (t[o] = a), (i = a));
            }
            e[i] = !0;
          }
          return e;
        }
        function k(e) {
          var n = c(null),
            r = void 0;
          for (r in e) u(t, e, [r]) && (n[r] = e[r]);
          return n;
        }
        function E(e, t) {
          while (null !== e) {
            var n = i(e, t);
            if (n) {
              if (n.get) return w(n.get);
              if ("function" === typeof n.value) return w(n.value);
            }
            e = o(e);
          }
          function r(e) {
            return console.warn("fallback value for", e), null;
          }
          return r;
        }
        var R = a([
            "a",
            "abbr",
            "acronym",
            "address",
            "area",
            "article",
            "aside",
            "audio",
            "b",
            "bdi",
            "bdo",
            "big",
            "blink",
            "blockquote",
            "body",
            "br",
            "button",
            "canvas",
            "caption",
            "center",
            "cite",
            "code",
            "col",
            "colgroup",
            "content",
            "data",
            "datalist",
            "dd",
            "decorator",
            "del",
            "details",
            "dfn",
            "dialog",
            "dir",
            "div",
            "dl",
            "dt",
            "element",
            "em",
            "fieldset",
            "figcaption",
            "figure",
            "font",
            "footer",
            "form",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "head",
            "header",
            "hgroup",
            "hr",
            "html",
            "i",
            "img",
            "input",
            "ins",
            "kbd",
            "label",
            "legend",
            "li",
            "main",
            "map",
            "mark",
            "marquee",
            "menu",
            "menuitem",
            "meter",
            "nav",
            "nobr",
            "ol",
            "optgroup",
            "option",
            "output",
            "p",
            "picture",
            "pre",
            "progress",
            "q",
            "rp",
            "rt",
            "ruby",
            "s",
            "samp",
            "section",
            "select",
            "shadow",
            "small",
            "source",
            "spacer",
            "span",
            "strike",
            "strong",
            "style",
            "sub",
            "summary",
            "sup",
            "table",
            "tbody",
            "td",
            "template",
            "textarea",
            "tfoot",
            "th",
            "thead",
            "time",
            "tr",
            "track",
            "tt",
            "u",
            "ul",
            "var",
            "video",
            "wbr",
          ]),
          _ = a([
            "svg",
            "a",
            "altglyph",
            "altglyphdef",
            "altglyphitem",
            "animatecolor",
            "animatemotion",
            "animatetransform",
            "circle",
            "clippath",
            "defs",
            "desc",
            "ellipse",
            "filter",
            "font",
            "g",
            "glyph",
            "glyphref",
            "hkern",
            "image",
            "line",
            "lineargradient",
            "marker",
            "mask",
            "metadata",
            "mpath",
            "path",
            "pattern",
            "polygon",
            "polyline",
            "radialgradient",
            "rect",
            "stop",
            "style",
            "switch",
            "symbol",
            "text",
            "textpath",
            "title",
            "tref",
            "tspan",
            "view",
            "vkern",
          ]),
          D = a([
            "feBlend",
            "feColorMatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDistantLight",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
          ]),
          N = a([
            "animate",
            "color-profile",
            "cursor",
            "discard",
            "fedropshadow",
            "feimage",
            "font-face",
            "font-face-format",
            "font-face-name",
            "font-face-src",
            "font-face-uri",
            "foreignobject",
            "hatch",
            "hatchpath",
            "mesh",
            "meshgradient",
            "meshpatch",
            "meshrow",
            "missing-glyph",
            "script",
            "set",
            "solidcolor",
            "unknown",
            "use",
          ]),
          O = a([
            "math",
            "menclose",
            "merror",
            "mfenced",
            "mfrac",
            "mglyph",
            "mi",
            "mlabeledtr",
            "mmultiscripts",
            "mn",
            "mo",
            "mover",
            "mpadded",
            "mphantom",
            "mroot",
            "mrow",
            "ms",
            "mspace",
            "msqrt",
            "mstyle",
            "msub",
            "msup",
            "msubsup",
            "mtable",
            "mtd",
            "mtext",
            "mtr",
            "munder",
            "munderover",
          ]),
          M = a([
            "maction",
            "maligngroup",
            "malignmark",
            "mlongdiv",
            "mscarries",
            "mscarry",
            "msgroup",
            "mstack",
            "msline",
            "msrow",
            "semantics",
            "annotation",
            "annotation-xml",
            "mprescripts",
            "none",
          ]),
          L = a(["#text"]),
          F = a([
            "accept",
            "action",
            "align",
            "alt",
            "autocapitalize",
            "autocomplete",
            "autopictureinpicture",
            "autoplay",
            "background",
            "bgcolor",
            "border",
            "capture",
            "cellpadding",
            "cellspacing",
            "checked",
            "cite",
            "class",
            "clear",
            "color",
            "cols",
            "colspan",
            "controls",
            "controlslist",
            "coords",
            "crossorigin",
            "datetime",
            "decoding",
            "default",
            "dir",
            "disabled",
            "disablepictureinpicture",
            "disableremoteplayback",
            "download",
            "draggable",
            "enctype",
            "enterkeyhint",
            "face",
            "for",
            "headers",
            "height",
            "hidden",
            "high",
            "href",
            "hreflang",
            "id",
            "inputmode",
            "integrity",
            "ismap",
            "kind",
            "label",
            "lang",
            "list",
            "loading",
            "loop",
            "low",
            "max",
            "maxlength",
            "media",
            "method",
            "min",
            "minlength",
            "multiple",
            "muted",
            "name",
            "noshade",
            "novalidate",
            "nowrap",
            "open",
            "optimum",
            "pattern",
            "placeholder",
            "playsinline",
            "poster",
            "preload",
            "pubdate",
            "radiogroup",
            "readonly",
            "rel",
            "required",
            "rev",
            "reversed",
            "role",
            "rows",
            "rowspan",
            "spellcheck",
            "scope",
            "selected",
            "shape",
            "size",
            "sizes",
            "span",
            "srclang",
            "start",
            "src",
            "srcset",
            "step",
            "style",
            "summary",
            "tabindex",
            "title",
            "translate",
            "type",
            "usemap",
            "valign",
            "value",
            "width",
            "xmlns",
            "slot",
          ]),
          I = a([
            "accent-height",
            "accumulate",
            "additive",
            "alignment-baseline",
            "ascent",
            "attributename",
            "attributetype",
            "azimuth",
            "basefrequency",
            "baseline-shift",
            "begin",
            "bias",
            "by",
            "class",
            "clip",
            "clippathunits",
            "clip-path",
            "clip-rule",
            "color",
            "color-interpolation",
            "color-interpolation-filters",
            "color-profile",
            "color-rendering",
            "cx",
            "cy",
            "d",
            "dx",
            "dy",
            "diffuseconstant",
            "direction",
            "display",
            "divisor",
            "dur",
            "edgemode",
            "elevation",
            "end",
            "fill",
            "fill-opacity",
            "fill-rule",
            "filter",
            "filterunits",
            "flood-color",
            "flood-opacity",
            "font-family",
            "font-size",
            "font-size-adjust",
            "font-stretch",
            "font-style",
            "font-variant",
            "font-weight",
            "fx",
            "fy",
            "g1",
            "g2",
            "glyph-name",
            "glyphref",
            "gradientunits",
            "gradienttransform",
            "height",
            "href",
            "id",
            "image-rendering",
            "in",
            "in2",
            "k",
            "k1",
            "k2",
            "k3",
            "k4",
            "kerning",
            "keypoints",
            "keysplines",
            "keytimes",
            "lang",
            "lengthadjust",
            "letter-spacing",
            "kernelmatrix",
            "kernelunitlength",
            "lighting-color",
            "local",
            "marker-end",
            "marker-mid",
            "marker-start",
            "markerheight",
            "markerunits",
            "markerwidth",
            "maskcontentunits",
            "maskunits",
            "max",
            "mask",
            "media",
            "method",
            "mode",
            "min",
            "name",
            "numoctaves",
            "offset",
            "operator",
            "opacity",
            "order",
            "orient",
            "orientation",
            "origin",
            "overflow",
            "paint-order",
            "path",
            "pathlength",
            "patterncontentunits",
            "patterntransform",
            "patternunits",
            "points",
            "preservealpha",
            "preserveaspectratio",
            "primitiveunits",
            "r",
            "rx",
            "ry",
            "radius",
            "refx",
            "refy",
            "repeatcount",
            "repeatdur",
            "restart",
            "result",
            "rotate",
            "scale",
            "seed",
            "shape-rendering",
            "specularconstant",
            "specularexponent",
            "spreadmethod",
            "startoffset",
            "stddeviation",
            "stitchtiles",
            "stop-color",
            "stop-opacity",
            "stroke-dasharray",
            "stroke-dashoffset",
            "stroke-linecap",
            "stroke-linejoin",
            "stroke-miterlimit",
            "stroke-opacity",
            "stroke",
            "stroke-width",
            "style",
            "surfacescale",
            "systemlanguage",
            "tabindex",
            "targetx",
            "targety",
            "transform",
            "text-anchor",
            "text-decoration",
            "text-rendering",
            "textlength",
            "type",
            "u1",
            "u2",
            "unicode",
            "values",
            "viewbox",
            "visibility",
            "version",
            "vert-adv-y",
            "vert-origin-x",
            "vert-origin-y",
            "width",
            "word-spacing",
            "wrap",
            "writing-mode",
            "xchannelselector",
            "ychannelselector",
            "x",
            "x1",
            "x2",
            "xmlns",
            "y",
            "y1",
            "y2",
            "z",
            "zoomandpan",
          ]),
          C = a([
            "accent",
            "accentunder",
            "align",
            "bevelled",
            "close",
            "columnsalign",
            "columnlines",
            "columnspan",
            "denomalign",
            "depth",
            "dir",
            "display",
            "displaystyle",
            "encoding",
            "fence",
            "frame",
            "height",
            "href",
            "id",
            "largeop",
            "length",
            "linethickness",
            "lspace",
            "lquote",
            "mathbackground",
            "mathcolor",
            "mathsize",
            "mathvariant",
            "maxsize",
            "minsize",
            "movablelimits",
            "notation",
            "numalign",
            "open",
            "rowalign",
            "rowlines",
            "rowspacing",
            "rowspan",
            "rspace",
            "rquote",
            "scriptlevel",
            "scriptminsize",
            "scriptsizemultiplier",
            "selection",
            "separator",
            "separators",
            "stretchy",
            "subscriptshift",
            "supscriptshift",
            "symmetric",
            "voffset",
            "width",
            "xmlns",
          ]),
          z = a([
            "xlink:href",
            "xml:id",
            "xlink:title",
            "xml:space",
            "xmlns:xlink",
          ]),
          U = l(/\{\{[\s\S]*|[\s\S]*\}\}/gm),
          H = l(/<%[\s\S]*|[\s\S]*%>/gm),
          j = l(/^data-[\-\w.\u00B7-\uFFFF]/),
          P = l(/^aria-[\-\w]+$/),
          B = l(
            /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
          ),
          W = l(/^(?:\w+script|data):/i),
          G = l(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
          q =
            "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" === typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                };
        function K(e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n;
          }
          return Array.from(e);
        }
        var V = function () {
            return "undefined" === typeof window ? null : window;
          },
          Y = function (e, t) {
            if (
              "object" !== ("undefined" === typeof e ? "undefined" : q(e)) ||
              "function" !== typeof e.createPolicy
            )
              return null;
            var n = null,
              r = "data-tt-policy-suffix";
            t.currentScript &&
              t.currentScript.hasAttribute(r) &&
              (n = t.currentScript.getAttribute(r));
            var o = "dompurify" + (n ? "#" + n : "");
            try {
              return e.createPolicy(o, {
                createHTML: function (e) {
                  return e;
                },
              });
            } catch (i) {
              return (
                console.warn(
                  "TrustedTypes policy " + o + " could not be created."
                ),
                null
              );
            }
          };
        function J() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : V(),
            t = function (e) {
              return J(e);
            };
          if (
            ((t.version = "2.3.0"),
            (t.removed = []),
            !e || !e.document || 9 !== e.document.nodeType)
          )
            return (t.isSupported = !1), t;
          var n = e.document,
            r = e.document,
            o = e.DocumentFragment,
            i = e.HTMLTemplateElement,
            l = e.Node,
            c = e.Element,
            s = e.NodeFilter,
            u = e.NamedNodeMap,
            f = void 0 === u ? e.NamedNodeMap || e.MozNamedAttrMap : u,
            w = e.Text,
            x = e.Comment,
            X = e.DOMParser,
            $ = e.trustedTypes,
            Z = c.prototype,
            Q = E(Z, "cloneNode"),
            ee = E(Z, "nextSibling"),
            te = E(Z, "childNodes"),
            ne = E(Z, "parentNode");
          if ("function" === typeof i) {
            var re = r.createElement("template");
            re.content &&
              re.content.ownerDocument &&
              (r = re.content.ownerDocument);
          }
          var oe = Y($, n),
            ie = oe && ze ? oe.createHTML("") : "",
            ae = r,
            le = ae.implementation,
            ce = ae.createNodeIterator,
            se = ae.createDocumentFragment,
            ue = ae.getElementsByTagName,
            fe = n.importNode,
            me = {};
          try {
            me = k(r).documentMode ? r.documentMode : {};
          } catch (yt) {}
          var pe = {};
          t.isSupported =
            "function" === typeof ne &&
            le &&
            "undefined" !== typeof le.createHTMLDocument &&
            9 !== me;
          var de = U,
            he = H,
            ge = j,
            ye = P,
            ve = W,
            be = G,
            Ae = B,
            Te = null,
            we = S({}, [].concat(K(R), K(_), K(D), K(O), K(L))),
            xe = null,
            Se = S({}, [].concat(K(F), K(I), K(C), K(z))),
            ke = null,
            Ee = null,
            Re = !0,
            _e = !0,
            De = !1,
            Ne = !1,
            Oe = !1,
            Me = !1,
            Le = !1,
            Fe = !1,
            Ie = !1,
            Ce = !0,
            ze = !1,
            Ue = !0,
            He = !0,
            je = !1,
            Pe = {},
            Be = S({}, [
              "annotation-xml",
              "audio",
              "colgroup",
              "desc",
              "foreignobject",
              "head",
              "iframe",
              "math",
              "mi",
              "mn",
              "mo",
              "ms",
              "mtext",
              "noembed",
              "noframes",
              "noscript",
              "plaintext",
              "script",
              "style",
              "svg",
              "template",
              "thead",
              "title",
              "video",
              "xmp",
            ]),
            We = null,
            Ge = S({}, ["audio", "video", "img", "source", "image", "track"]),
            qe = null,
            Ke = S({}, [
              "alt",
              "class",
              "for",
              "id",
              "label",
              "name",
              "pattern",
              "placeholder",
              "summary",
              "title",
              "value",
              "style",
              "xmlns",
            ]),
            Ve = "http://www.w3.org/1998/Math/MathML",
            Ye = "http://www.w3.org/2000/svg",
            Je = "http://www.w3.org/1999/xhtml",
            Xe = Je,
            $e = !1,
            Ze = null,
            Qe = r.createElement("form"),
            et = function (e) {
              (Ze && Ze === e) ||
                ((e &&
                  "object" ===
                    ("undefined" === typeof e ? "undefined" : q(e))) ||
                  (e = {}),
                (e = k(e)),
                (Te = "ALLOWED_TAGS" in e ? S({}, e.ALLOWED_TAGS) : we),
                (xe = "ALLOWED_ATTR" in e ? S({}, e.ALLOWED_ATTR) : Se),
                (qe =
                  "ADD_URI_SAFE_ATTR" in e
                    ? S(k(Ke), e.ADD_URI_SAFE_ATTR)
                    : Ke),
                (We =
                  "ADD_DATA_URI_TAGS" in e
                    ? S(k(Ge), e.ADD_DATA_URI_TAGS)
                    : Ge),
                (ke = "FORBID_TAGS" in e ? S({}, e.FORBID_TAGS) : {}),
                (Ee = "FORBID_ATTR" in e ? S({}, e.FORBID_ATTR) : {}),
                (Pe = "USE_PROFILES" in e && e.USE_PROFILES),
                (Re = !1 !== e.ALLOW_ARIA_ATTR),
                (_e = !1 !== e.ALLOW_DATA_ATTR),
                (De = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
                (Ne = e.SAFE_FOR_TEMPLATES || !1),
                (Oe = e.WHOLE_DOCUMENT || !1),
                (Fe = e.RETURN_DOM || !1),
                (Ie = e.RETURN_DOM_FRAGMENT || !1),
                (Ce = !1 !== e.RETURN_DOM_IMPORT),
                (ze = e.RETURN_TRUSTED_TYPE || !1),
                (Le = e.FORCE_BODY || !1),
                (Ue = !1 !== e.SANITIZE_DOM),
                (He = !1 !== e.KEEP_CONTENT),
                (je = e.IN_PLACE || !1),
                (Ae = e.ALLOWED_URI_REGEXP || Ae),
                (Xe = e.NAMESPACE || Je),
                Ne && (_e = !1),
                Ie && (Fe = !0),
                Pe &&
                  ((Te = S({}, [].concat(K(L)))),
                  (xe = []),
                  !0 === Pe.html && (S(Te, R), S(xe, F)),
                  !0 === Pe.svg && (S(Te, _), S(xe, I), S(xe, z)),
                  !0 === Pe.svgFilters && (S(Te, D), S(xe, I), S(xe, z)),
                  !0 === Pe.mathMl && (S(Te, O), S(xe, C), S(xe, z))),
                e.ADD_TAGS && (Te === we && (Te = k(Te)), S(Te, e.ADD_TAGS)),
                e.ADD_ATTR && (xe === Se && (xe = k(xe)), S(xe, e.ADD_ATTR)),
                e.ADD_URI_SAFE_ATTR && S(qe, e.ADD_URI_SAFE_ATTR),
                He && (Te["#text"] = !0),
                Oe && S(Te, ["html", "head", "body"]),
                Te.table && (S(Te, ["tbody"]), delete ke.tbody),
                a && a(e),
                (Ze = e));
            },
            tt = S({}, ["mi", "mo", "mn", "ms", "mtext"]),
            nt = S({}, ["foreignobject", "desc", "title", "annotation-xml"]),
            rt = S({}, _);
          S(rt, D), S(rt, N);
          var ot = S({}, O);
          S(ot, M);
          var it = function (e) {
              var t = ne(e);
              (t && t.tagName) ||
                (t = { namespaceURI: Je, tagName: "template" });
              var n = h(e.tagName),
                r = h(t.tagName);
              if (e.namespaceURI === Ye)
                return t.namespaceURI === Je
                  ? "svg" === n
                  : t.namespaceURI === Ve
                  ? "svg" === n && ("annotation-xml" === r || tt[r])
                  : Boolean(rt[n]);
              if (e.namespaceURI === Ve)
                return t.namespaceURI === Je
                  ? "math" === n
                  : t.namespaceURI === Ye
                  ? "math" === n && nt[r]
                  : Boolean(ot[n]);
              if (e.namespaceURI === Je) {
                if (t.namespaceURI === Ye && !nt[r]) return !1;
                if (t.namespaceURI === Ve && !tt[r]) return !1;
                var o = S({}, ["title", "style", "font", "a", "script"]);
                return !ot[n] && (o[n] || !rt[n]);
              }
              return !1;
            },
            at = function (e) {
              d(t.removed, { element: e });
              try {
                e.parentNode.removeChild(e);
              } catch (yt) {
                try {
                  e.outerHTML = ie;
                } catch (yt) {
                  e.remove();
                }
              }
            },
            lt = function (e, n) {
              try {
                d(t.removed, { attribute: n.getAttributeNode(e), from: n });
              } catch (yt) {
                d(t.removed, { attribute: null, from: n });
              }
              if ((n.removeAttribute(e), "is" === e && !xe[e]))
                if (Fe || Ie)
                  try {
                    at(n);
                  } catch (yt) {}
                else
                  try {
                    n.setAttribute(e, "");
                  } catch (yt) {}
            },
            ct = function (e) {
              var t = void 0,
                n = void 0;
              if (Le) e = "<remove></remove>" + e;
              else {
                var o = g(e, /^[\r\n\t ]+/);
                n = o && o[0];
              }
              var i = oe ? oe.createHTML(e) : e;
              if (Xe === Je)
                try {
                  t = new X().parseFromString(i, "text/html");
                } catch (yt) {}
              if (!t || !t.documentElement) {
                t = le.createDocument(Xe, "template", null);
                try {
                  t.documentElement.innerHTML = $e ? "" : i;
                } catch (yt) {}
              }
              var a = t.body || t.documentElement;
              return (
                e &&
                  n &&
                  a.insertBefore(r.createTextNode(n), a.childNodes[0] || null),
                Xe === Je
                  ? ue.call(t, Oe ? "html" : "body")[0]
                  : Oe
                  ? t.documentElement
                  : a
              );
            },
            st = function (e) {
              return ce.call(
                e.ownerDocument || e,
                e,
                s.SHOW_ELEMENT | s.SHOW_COMMENT | s.SHOW_TEXT,
                null,
                !1
              );
            },
            ut = function (e) {
              return (
                !(e instanceof w || e instanceof x) &&
                !(
                  "string" === typeof e.nodeName &&
                  "string" === typeof e.textContent &&
                  "function" === typeof e.removeChild &&
                  e.attributes instanceof f &&
                  "function" === typeof e.removeAttribute &&
                  "function" === typeof e.setAttribute &&
                  "string" === typeof e.namespaceURI &&
                  "function" === typeof e.insertBefore
                )
              );
            },
            ft = function (e) {
              return "object" ===
                ("undefined" === typeof l ? "undefined" : q(l))
                ? e instanceof l
                : e &&
                    "object" ===
                      ("undefined" === typeof e ? "undefined" : q(e)) &&
                    "number" === typeof e.nodeType &&
                    "string" === typeof e.nodeName;
            },
            mt = function (e, n, r) {
              pe[e] &&
                m(pe[e], function (e) {
                  e.call(t, n, r, Ze);
                });
            },
            pt = function (e) {
              var n = void 0;
              if ((mt("beforeSanitizeElements", e, null), ut(e)))
                return at(e), !0;
              if (g(e.nodeName, /[\u0080-\uFFFF]/)) return at(e), !0;
              var r = h(e.nodeName);
              if (
                (mt("uponSanitizeElement", e, { tagName: r, allowedTags: Te }),
                !ft(e.firstElementChild) &&
                  (!ft(e.content) || !ft(e.content.firstElementChild)) &&
                  A(/<[/\w]/g, e.innerHTML) &&
                  A(/<[/\w]/g, e.textContent))
              )
                return at(e), !0;
              if (!Te[r] || ke[r]) {
                if (He && !Be[r]) {
                  var o = ne(e) || e.parentNode,
                    i = te(e) || e.childNodes;
                  if (i && o)
                    for (var a = i.length, l = a - 1; l >= 0; --l)
                      o.insertBefore(Q(i[l], !0), ee(e));
                }
                return at(e), !0;
              }
              return e instanceof c && !it(e)
                ? (at(e), !0)
                : ("noscript" !== r && "noembed" !== r) ||
                  !A(/<\/no(script|embed)/i, e.innerHTML)
                ? (Ne &&
                    3 === e.nodeType &&
                    ((n = e.textContent),
                    (n = y(n, de, " ")),
                    (n = y(n, he, " ")),
                    e.textContent !== n &&
                      (d(t.removed, { element: e.cloneNode() }),
                      (e.textContent = n))),
                  mt("afterSanitizeElements", e, null),
                  !1)
                : (at(e), !0);
            },
            dt = function (e, t, n) {
              if (Ue && ("id" === t || "name" === t) && (n in r || n in Qe))
                return !1;
              if (_e && !Ee[t] && A(ge, t));
              else if (Re && A(ye, t));
              else {
                if (!xe[t] || Ee[t]) return !1;
                if (qe[t]);
                else if (A(Ae, y(n, be, "")));
                else if (
                  ("src" !== t && "xlink:href" !== t && "href" !== t) ||
                  "script" === e ||
                  0 !== v(n, "data:") ||
                  !We[e]
                ) {
                  if (De && !A(ve, y(n, be, "")));
                  else if (n) return !1;
                } else;
              }
              return !0;
            },
            ht = function (e) {
              var n = void 0,
                r = void 0,
                o = void 0,
                i = void 0;
              mt("beforeSanitizeAttributes", e, null);
              var a = e.attributes;
              if (a) {
                var l = {
                  attrName: "",
                  attrValue: "",
                  keepAttr: !0,
                  allowedAttributes: xe,
                };
                i = a.length;
                while (i--) {
                  n = a[i];
                  var c = n,
                    s = c.name,
                    u = c.namespaceURI;
                  if (
                    ((r = b(n.value)),
                    (o = h(s)),
                    (l.attrName = o),
                    (l.attrValue = r),
                    (l.keepAttr = !0),
                    (l.forceKeepAttr = void 0),
                    mt("uponSanitizeAttribute", e, l),
                    (r = l.attrValue),
                    !l.forceKeepAttr && (lt(s, e), l.keepAttr))
                  )
                    if (A(/\/>/i, r)) lt(s, e);
                    else {
                      Ne && ((r = y(r, de, " ")), (r = y(r, he, " ")));
                      var f = e.nodeName.toLowerCase();
                      if (dt(f, o, r))
                        try {
                          u ? e.setAttributeNS(u, s, r) : e.setAttribute(s, r),
                            p(t.removed);
                        } catch (yt) {}
                    }
                }
                mt("afterSanitizeAttributes", e, null);
              }
            },
            gt = function e(t) {
              var n = void 0,
                r = st(t);
              mt("beforeSanitizeShadowDOM", t, null);
              while ((n = r.nextNode()))
                mt("uponSanitizeShadowNode", n, null),
                  pt(n) || (n.content instanceof o && e(n.content), ht(n));
              mt("afterSanitizeShadowDOM", t, null);
            };
          return (
            (t.sanitize = function (r, i) {
              var a = void 0,
                c = void 0,
                s = void 0,
                u = void 0,
                f = void 0;
              if (
                (($e = !r),
                $e && (r = "\x3c!--\x3e"),
                "string" !== typeof r && !ft(r))
              ) {
                if ("function" !== typeof r.toString)
                  throw T("toString is not a function");
                if (((r = r.toString()), "string" !== typeof r))
                  throw T("dirty is not a string, aborting");
              }
              if (!t.isSupported) {
                if (
                  "object" === q(e.toStaticHTML) ||
                  "function" === typeof e.toStaticHTML
                ) {
                  if ("string" === typeof r) return e.toStaticHTML(r);
                  if (ft(r)) return e.toStaticHTML(r.outerHTML);
                }
                return r;
              }
              if (
                (Me || et(i),
                (t.removed = []),
                "string" === typeof r && (je = !1),
                je)
              );
              else if (r instanceof l)
                (a = ct("\x3c!----\x3e")),
                  (c = a.ownerDocument.importNode(r, !0)),
                  (1 === c.nodeType && "BODY" === c.nodeName) ||
                  "HTML" === c.nodeName
                    ? (a = c)
                    : a.appendChild(c);
              else {
                if (!Fe && !Ne && !Oe && -1 === r.indexOf("<"))
                  return oe && ze ? oe.createHTML(r) : r;
                if (((a = ct(r)), !a)) return Fe ? null : ie;
              }
              a && Le && at(a.firstChild);
              var m = st(je ? r : a);
              while ((s = m.nextNode()))
                (3 === s.nodeType && s === u) ||
                  pt(s) ||
                  (s.content instanceof o && gt(s.content), ht(s), (u = s));
              if (((u = null), je)) return r;
              if (Fe) {
                if (Ie) {
                  f = se.call(a.ownerDocument);
                  while (a.firstChild) f.appendChild(a.firstChild);
                } else f = a;
                return Ce && (f = fe.call(n, f, !0)), f;
              }
              var p = Oe ? a.outerHTML : a.innerHTML;
              return (
                Ne && ((p = y(p, de, " ")), (p = y(p, he, " "))),
                oe && ze ? oe.createHTML(p) : p
              );
            }),
            (t.setConfig = function (e) {
              et(e), (Me = !0);
            }),
            (t.clearConfig = function () {
              (Ze = null), (Me = !1);
            }),
            (t.isValidAttribute = function (e, t, n) {
              Ze || et({});
              var r = h(e),
                o = h(t);
              return dt(r, o, n);
            }),
            (t.addHook = function (e, t) {
              "function" === typeof t && ((pe[e] = pe[e] || []), d(pe[e], t));
            }),
            (t.removeHook = function (e) {
              pe[e] && p(pe[e]);
            }),
            (t.removeHooks = function (e) {
              pe[e] && (pe[e] = []);
            }),
            (t.removeAllHooks = function () {
              pe = {};
            }),
            t
          );
        }
        var X = J();
        return X;
      });
    },
  },
]);
