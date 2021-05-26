<div id="actions" class="panel">
    <p id="draw" onclick="drawGraph()" class="execAction unselectable" unselectable="on">Draw Custom Graph</p>
    <p id="examples" class="execAction unselectable" unselectable="on">Graphs Example</p>
    <p id="kruskals" onclick="kruskals()" class="execAction unselectable" unselectable="on">Kruskal's Algorithm</p>
    <p id="prims" class="execAction unselectable" unselectable="on">Prim's Algorithm</p>
</div>
<div id="actions-hide" class="panel-hide">
    <img src="http://<?= $_SERVER['HTTP_HOST'] ?>/assets/img/arrow_white_right.png" alt="&gt;" title="show/hide actions panel" class="rotateRight unselectable" unselectable="on">
</div>
<div id="actions-extras">
    <div class="draw action-menu-pullout">
        <div id="draw-err" class="err"></div>
    </div>
    <div class="examples action-menu-pullout">
        <div id="example1" class="execAction new-menu-option coloured-menu-option" onclick="example(CP3_4_10)">
            <p class="unselectable" unselectable="on">CP 4.10</p>
        </div>
        <div id="example2" class="execAction new-menu-option coloured-menu-option" onclick="example(CP3_4_14)">
            <p class="unselectable" unselectable="on">CP 4.14</p>
        </div>
        <div id="example3" class="execAction new-menu-option coloured-menu-option" onclick="example(K5)">
            <p class="unselectable" unselectable="on">K5</p>
        </div>
        <div id="example4" class="execAction new-menu-option coloured-menu-option" onclick="example(RAIL)">
            <p class="unselectable" unselectable="on">Rail</p>
        </div>
        <div id="example5" class="execAction new-menu-option coloured-menu-option" onclick="example(TESSELLATION)">
            <p class="unselectable" unselectable="on">Tessellation</p>
        </div>
    </div>
    <div class="kruskals action-menu-pullout">
        <div id="kruskals-err" class="err"></div>
    </div>
    <div class="prims action-menu-pullout">
        <div id="prims-input" class="new-menu-option">
            s =
            <input type="number" id="prim-v" title="Enter the source vertex" autocomplete="off" min="0" max="99" value="0" />
        </div>
        <div id="prims-go" class="execAction coloured-menu-option" onclick="prims()">
            <p>Go</p>
        </div>
        <div id="prims-err" class="err"></div>
    </div>
</div>
<div id="actions-toast" hidden>
    <p id="message">Please stop current program to start a new graph / algorithm</p>
</div>