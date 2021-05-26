var mw,
  gw,
  randomGraphID,
  MST = function () {
    var e,
      t = new GraphWidget(),
      n = {},
      r = {},
      i = {},
      s = 0;
    function a(e, t, n, r, i, s, a) {
      var o,
        l = !0;
      null == n && null == r && null == i && null == s && null == a && (l = !1),
        null == n && (n = {}),
        null == r && (r = {}),
        null == i && (i = {}),
        null == s && (s = {}),
        null == a && (a = {});
      var h = { vl: {}, el: {} };
      if (l) {
        for (o in e)
          (h.vl[o] = {}),
            (h.vl[o].cx = e[o].x),
            (h.vl[o].cy = e[o].y),
            (h.vl[o].text = o),
            (h.vl[o].state = VERTEX_GREY_OUTLINE),
            (h.vl[o].extratext = e[o].extratext);
        for (o in t)
          (h.el[o] = {}),
            (h.el[o].vertexA = t[o].u),
            (h.el[o].vertexB = t[o].v),
            (h.el[o].type = EDGE_TYPE_UDE),
            (h.el[o].weight = t[o].w),
            (h.el[o].state = EDGE_GREY),
            (h.el[o].displayWeight = !0),
            (h.el[o].animateHighlighted = !1);
      } else {
        for (o in e)
          (h.vl[o] = {}),
            (h.vl[o].cx = e[o].x),
            (h.vl[o].cy = e[o].y),
            (h.vl[o].text = o),
            (h.vl[o].state = VERTEX_DEFAULT),
            (h.vl[o].extratext = e[o].extratext);
        for (o in t)
          (h.el[o] = {}),
            (h.el[o].vertexA = t[o].u),
            (h.el[o].vertexB = t[o].v),
            (h.el[o].type = EDGE_TYPE_UDE),
            (h.el[o].weight = t[o].w),
            (h.el[o].state = EDGE_DEFAULT),
            (h.el[o].displayWeight = !0),
            (h.el[o].animateHighlighted = !1);
      }
      for (o in a)
        (key1 = h.el[o].vertexA),
          (key2 = h.el[o].vertexB),
          (h.vl[key1].state = VERTEX_DEFAULT),
          (h.vl[key2].state = VERTEX_DEFAULT),
          (h.el[o].state = EDGE_DEFAULT);
      for (o in n) h.vl[o].state = VERTEX_HIGHLIGHTED;
      for (o in r) h.el[o].state = EDGE_HIGHLIGHTED;
      for (o in i) h.vl[o].state = VERTEX_TRAVERSED;
      for (o in s) h.el[o].state = EDGE_TRAVERSED;
      return h;
    }
    function o(e) {
      switch (e) {
        case 0:
          $("#code1").html("T = {s}"),
            $("#code2").html(
              "enqueue edges connected to s in PQ (by inc weight)"
            ),
            $("#code3").html("while (!PQ.isEmpty)"),
            $("#code4").html(
              "&nbsp;&nbsp;if (vertex v linked with e = PQ.remove &notin; T)"
            ),
            $("#code5").html(
              "&nbsp;&nbsp;&nbsp;&nbsp;T = T &cup; {v, e}, enqueue edges connected to v"
            ),
            $("#code6").html("&nbsp;&nbsp;else ignore e"),
            $("#code7").html("MST = T");
          break;
        case 1:
          $("#code1").html("Sort E edges by increasing weight"),
            $("#code2").html("T = {}"),
            $("#code3").html("for (i = 0; i &lt; edges.length; i++)"),
            $("#code4").html(
              "&nbsp;&nbsp;if adding e = edges[i] does not form a cycle"
            ),
            $("#code5").html("&nbsp;&nbsp;&nbsp;&nbsp;add e to T"),
            $("#code6").html("&nbsp;&nbsp;else ignore e"),
            $("#code7").html("MST = T");
      }
    }
    (this.getGraphWidget = function () {
      return t;
    }),
      (fixJSON = function () {
        for (var e in ((s = 0), n)) s++;
        for (var e in r);
        var t = [];
        for (e in r)
          t.push(
            new ObjectTriple(
              parseInt(r[e].w),
              parseInt(r[e].u),
              parseInt(r[e].v)
            )
          );
        t.sort(ObjectTriple.compare);
        for (var a = 0; a < t.length; a++)
          (r[a].w = t[a].getFirst()),
            (r[a].u = t[a].getSecond()),
            (r[a].v = t[a].getThird());
        for (var e in n) i[e] = Array();
        for (var e in r)
          i[r[e].u].push(new ObjectTriple(r[e].v, r[e].w, e)),
            i[r[e].v].push(new ObjectTriple(r[e].u, r[e].w, e));
      }),
      (takeJSON = function (e) {
        null != e && ((e = JSON.parse(e)), (n = e.vl), (r = e.el), fixJSON());
      }),
      (statusChecking = function () {
        $("#draw-status p").html(
          "Draw a <b>connected undirected weighted</b> graph, preferably <b>V > 7</b>, <b>minimize edge crossing</b>, and make it <b>challenging for Prim&#39;s/Kruskal&#39;s algorithm</b>"
        );
      }),
      (warnChecking = function () {
        var e = "";
        s >= 17 &&
          (e += "Too much vertex on screen, consider drawing smaller graph. "),
          "" == e
            ? $("#draw-warn p").html("No Warning")
            : $("#draw-warn p").html(e);
      }),
      (errorChecking = function () {
        var e = "";
        if (0 != s)
          if (1 != s) {
            var t = [],
              n = [];
            for (n.push(0), t[0] = !0; n.length > 0; ) {
              var i = n.pop();
              for (var a in r)
                r[a].u != i || t[r[a].v] || ((t[r[a].v] = !0), n.push(+r[a].v)),
                  r[a].v != i ||
                    t[r[a].u] ||
                    ((t[r[a].u] = !0), n.push(+r[a].u));
            }
            for (var o = 0; o < s; o++)
              if (!t[o]) {
                e += "Vertex 0 and vertex {i} is not connected. ".replace(
                  "{i}",
                  o
                );
                break;
              }
            "" == e
              ? $("#draw-err p").html("Graph must contain at least one edge. ")
              : $("#draw-err p").html(e);
          } else
            $("#draw-err p").html("Graph must contain at least one edge. ");
        else $("#draw-err p").html("Graph cannot be empty. ");
      }),
      (this.startLoop = function () {
        e = setInterval(function () {
          takeJSON(JSONresult),
            warnChecking(),
            errorChecking(),
            statusChecking();
        }, 100);
      }),
      (this.stopLoop = function () {
        clearInterval(e);
      }),
      (this.draw = function () {
        return (
          "Graph must contain at least one edge. " == $("#draw-err p").html() &&
          ($("#submit").is(":checked") && this.submit(JSONresult),
          $("#copy").is(":checked") &&
            window.prompt("Copy to clipboard:", JSONresult),
          fixJSON(),
          (graph = a(n, r)),
          t.updateGraph(graph, 500),
          !0)
        );
      }),
      (this.importjson = function (e) {
        takeJSON(e),
          statusChecking(),
          (graph = a(n, r)),
          t.updateGraph(graph, 500);
      }),
      (this.getGraph = function () {
        return { vl: n, el: r };
      }),
      (this.getV = function () {
        return s;
      }),
      (this.kruskal = function (e) {
        var i,
          l,
          h = 0,
          p = [],
          c = [],
          d = {},
          u = {},
          m = {},
          f = {},
          g = {},
          v = new UfdsHelper();
        if (0 == s)
          return (
            $("#kruskals-err").html(
              "There is no graph to run this on. Please select an example graph first."
            ),
            !1
          );
        for (i in n) v.insert(i);
        for (i in r)
          (g[i] = !0), c.push(new ObjectPair(parseInt(r[i].w), parseInt(i)));
        function w() {
          for (var e = "", t = Math.min(c.length, 9), n = 0; n < t; n++) {
            var i = c[n].getSecond();
            (e += "(" + r[i].w + ",(" + r[i].u + "," + r[i].v + "))"),
              n < t - 1 && (e += ", ");
          }
          return c.length > 10 && (e += " ..."), e;
        }
        for (
          c.sort(ObjectPair.compare),
            (l = a(n, r)).status =
              "Edges are sorted in increasing order of weight: " + w() + ".",
            l.lineNo = [1, 2],
            p.push(l),
            numTaken = 0;
          c.length > 0;

        ) {
          ((l = a(n, r, d, u, m, f, g)).status =
            "The remaining edge(s) is/are " + w() + "."),
            (l.lineNo = 3),
            p.push(l);
          var E = c.shift().getSecond(),
            T = r[E].u,
            x = r[E].v,
            b = parseInt(r[E].w);
          (u[E] = !0),
            (d[T] = !0),
            (d[x] = !0),
            ((l = a(n, r, d, u, m, f, g)).status =
              "Checking if a cycle will appear if we add this edge: (" +
              b +
              ",(" +
              T +
              "," +
              x +
              "))."),
            (l.lineNo = 4),
            p.push(l);
          var k = !1;
          v.isSameSet(T, x) ||
            ((k = !0),
            v.unionSet(T, x),
            (f[E] = !0),
            (m[T] = !0),
            (m[x] = !0),
            (h += b)),
            delete u[E],
            delete g[E],
            delete d[T],
            delete d[x],
            (l = a(n, r, d, u, m, f, g)),
            k
              ? ((l.status =
                  "Adding that edge will not form a cycle, so we add it to T. The current weight of T is " +
                  h +
                  "."),
                (l.lineNo = 5),
                numTaken++)
              : ((l.status =
                  " that edge will form a cycle, so we ignore it. The current weight of T remains at " +
                  h +
                  "."),
                (l.lineNo = 6)),
            p.push(l),
            k &&
              numTaken == s - 1 &&
              (((l = a(n, r, d, u, m, f, g)).status =
                s -
                1 +
                " edges have been taken by Kruskal&#39;s, so the MST has been found.<br>An optimized version of Kruskal&#39;s algorithm can stop here."),
              (l.lineNo = 5),
              p.push(l));
        }
        return (
          ((l = a(n, r, d, u, m, f, g)).status =
            "The highlighted vertices and edges form an MST with weight = " +
            h +
            "."),
          (l.lineNo = 7),
          p.push(l),
          o(1),
          t.startAnimation(p, e),
          !0
        );
      }),
      (this.prim = function (e, l) {
        var h,
          p = 0,
          c = {},
          d = {},
          u = {},
          m = {},
          f = {},
          g = {},
          v = [];
        if (0 == s)
          return (
            $("#prims-err").html(
              "There is no graph to run this on. Please select an example graph first."
            ),
            !1
          );
        if (e >= s || e < 0)
          return (
            $("#prims-err").html("This vertex does not exist in the graph"), !1
          );
        for (w in n) c[w] = !1;
        for (var w in ((m[e] = !0), n)) n[w].extratext = "";
        (n[e].extratext = "start"),
          ((h = a(n, r, d, u, m, f, g)).status = "T = {" + e + "}."),
          (h.lineNo = 1),
          v.push(h),
          delete d[e],
          (m[e] = !0);
        var E = [],
          T = "";
        function x() {
          for (var e = "", t = Math.min(E.length, 6), n = 0; n < t; n++) {
            var r = E[n];
            (e += "(" + r.getFirst() + "," + r.getSecond() + ")"),
              n < t - 1 && (e += ", ");
          }
          return E.length > 6 && (e += ".."), "" == e && (e = "empty"), e;
        }
        function b(e) {
          for (w in ((T = ""), (c[e] = !0), i[e])) {
            var t = i[e][w].getFirst(),
              n = i[e][w].getSecond(),
              r = i[e][w].getThird();
            c[t] ||
              ((enqueuedEdge = new ObjectTriple(
                parseInt(n),
                parseInt(t),
                parseInt(r)
              )),
              (g[r] = !0),
              (T += "(" + n + "," + t + "), "),
              E.push(enqueuedEdge));
          }
          (T = T.substring(0, T.length - 2)), E.sort(ObjectTriple.compare);
        }
        b(e),
          ((h = a(n, r, d, u, m, f, g)).status =
            T + " is added to the PQ.<br>The PQ is now " + x() + "."),
          (h.lineNo = 2),
          v.push(h);
        for (var k = 1; E.length > 0; ) {
          var P = E.shift(),
            O = P.getSecond(),
            y = P.getThird();
          (d[O] = !0),
            (u[y] = !0),
            ((h = a(n, r, d, u, m, f, g)).status =
              "(" +
              P.getFirst() +
              "," +
              O +
              ") is removed from PQ. Check if vertex " +
              O +
              " is in T.<br>The PQ is now " +
              x() +
              "."),
            (h.lineNo = 4),
            v.push(h),
            c[O]
              ? (delete g[y],
                delete u[y],
                ((h = a(n, r, d, u, m, f, g)).status =
                  O + " is in T, so ignore this edge."),
                (h.lineNo = 6),
                v.push(h))
              : (delete u[y],
                (u[y] = !0),
                (d[O] = !0),
                ((h = a(n, r, d, u, m, f, g)).status = O + " is not in T."),
                (h.lineNo = 4),
                v.push(h),
                delete d[O],
                delete u[y],
                (f[y] = !0),
                (m[O] = !0),
                b(O),
                (p += parseInt(P.getFirst())),
                ((h = a(n, r, d, u, m, f, g)).status =
                  O +
                  " and this edge are added into T (T\\&#39;s weight = " +
                  p +
                  "), " +
                  (T.length > 0 ? T : "(null)") +
                  " is also added to PQ. The PQ is now " +
                  x() +
                  "."),
                (h.lineNo = 5),
                v.push(h),
                ++k == s &&
                  (((h = a(n, r, d, u, m, f, g)).status =
                    k +
                    " vertices have been taken by Prim\\&#39;s, so the MST has been found.<br>An optimized version of Prim\\&#39;s algorithm can stop here."),
                  (h.lineNo = 5),
                  v.push(h)));
        }
        return (
          ((h = a(n, r, d, u, m, f, g)).status =
            "The highlighted vertices and edges form an MST with weight = " +
            p +
            "."),
          (h.lineNo = 7),
          v.push(h),
          o(0),
          t.startAnimation(v, l),
          !0
        );
      }),
      (this.examples = function (e) {
        var t = getExampleGraph(e, VL),
          n = getExampleGraph(e, EL);
        return this.loadGraph(t, n), !0;
      }),
      (this.loadGraph = function (e, i) {
        (n = e), (r = i), fixJSON();
        var s = a(n, r);
        t.updateGraph(s, 500);
      });
  },
  actionsWidth = 150,
  statusCodetraceWidth = 430,
  isExamplesOpen = !1,
  isPrimsOpen = !1;
function openExamples() {
  isExamplesOpen || ($(".examples").fadeIn("fast"), (isExamplesOpen = !0));
}
function closeExamples() {
  isExamplesOpen && ($(".examples").fadeOut("fast"), (isExamplesOpen = !1));
}
function openPrims() {
  isPrimsOpen || ($(".prims").fadeIn("fast"), (isPrimsOpen = !0));
}
function closePrims() {
  isPrimsOpen &&
    ($(".prims").fadeOut("fast"), $("#prims-err").html(""), (isPrimsOpen = !1));
}
function hideEntireActionsPanel() {
  closeExamples(), closePrims(), hideActionsPanel();
}
function importjson(e) {
  isPlaying && stop(),
    "exploration" == mode &&
      (mw.importjson(e), closeExamples(), (isPlaying = !1));
}
function drawGraph() {
  isPlaying && stop(),
    "exploration" == mode &&
      ($("#dark-overlay").fadeIn(function () {
        $("#drawgraph").fadeIn();
      }),
      mw.startLoop(),
      (isPlaying = !1));
}
function drawDone() {
  if (!mw.draw()) return !1;
  mw.stopLoop(), $("#drawgraph").fadeOut(), $("#dark-overlay").fadeOut();
}
function drawCancel() {
  mw.stopLoop(), $("#drawgraph").fadeOut(), $("#dark-overlay").fadeOut();
}
function example(e) {
  isPlaying && stop(),
    setTimeout(function () {
      "exploration" == mode &&
        mw.examples(e) &&
        ($("#progress-bar").slider("option", "max", 0),
        closeExamples(),
        (isPlaying = !1));
    }, 500);
}
function hideCodetracePlaceholder() {
  $("#codetrace-placeholder").attr("hidden") ||
    $("#codetrace-placeholder").attr("hidden", !0);
  for (let e = 1; e <= 7; e++) $(`#code${e}`).removeAttr("hidden");
}
function kruskals(e) {
  hideCodetracePlaceholder(),
    stop(),
    commonAction(mw.kruskal(e), "Kruskal&#39;s Algorithm");
}
function prims() {
  hideCodetracePlaceholder(),
    stop(),
    primsWithInput(parseInt($("#prim-v").val()));
}
function primsWithInput(e, t) {
  commonAction(mw.prim(e, t), "Prim&#39;s Algorithm, s = " + e),
    setTimeout(function () {
      $("#prim-v").val(Math.floor(Math.random() * mw.getV()));
    }, 500);
}
function loadGraph(e) {
  mw && mw.loadGraph(e.vl, e.el);
}
write(!0, !1),
  $(function () {
    $("#play").hide(), (mw = new MST()), (gw = mw.getGraphWidget());
    var e = [CP3_4_10, CP3_4_14, K5, RAIL, TESSELLATION];
    mw.examples(e[Math.floor(5 * Math.random())]), (randomGraphID = -1);
    var t = getQueryVariable("create");
    t.length > 0 &&
      (importjson(t),
      window.history.pushState(
        "object or string",
        "Title",
        window.location.href.split("?")[0]
      )),
      $("#draw").click(function () {
        closeExamples(), closePrims();
      }),
      $("#random").click(function () {
        closeExamples(), closePrims();
      }),
      $("#examples").click(function () {
        openExamples(), closePrims();
      }),
      $("#kruskals").click(function () {
        closeExamples(), closePrims();
      }),
      $("#prims").click(function () {
        closeExamples(), openPrims();
      });
  });
var userGraph = { vl: {}, el: {} };
function ENTER_LECTURE_MODE() {
  mw && (userGraph = mw.getGraph());
}
function ENTER_EXPLORE_MODE() {
  loadGraph(userGraph);
}
function CUSTOM_ACTION(e, t, n) {
  "kruskal" == e
    ? hideSlide(function () {
        kruskals(showSlide);
      })
    : "prim" == e &&
      hideSlide(function () {
        primsWithInput(t, showSlide);
      });
}
