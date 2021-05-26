<div id="media-controls" class="unselectable" unselectable="on">
    <div id="speed-control">
        slow
        <div id="speed-input" class="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
            <span id="speed-input-handle" tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
        </div>
        fast
    </div>
    <span id="go-to-beginning" class="media-control-button" title="go to beginning" onclick="goToBeginning()">
        <img src="http://<?= $_SERVER['HTTP_HOST'] ?>/assets/img/goToBeginning.png" alt="go to beginning" />
    </span>
    <span id="previous" class="media-control-button" title="step backward" onclick="stepBackward()">
        <img src="http://<?= $_SERVER['HTTP_HOST'] ?>/assets/img/prevFrame.png" alt="previous frame" />
    </span>
    <span id="pause" class="media-control-button" title="pause" onclick="pause()">
        <img src="http://<?= $_SERVER['HTTP_HOST'] ?>/assets/img/pause.png" alt="pause" />
    </span>
    <span id="play" class="media-control-button" title="play" onclick="play()">
        <img src="http://<?= $_SERVER['HTTP_HOST'] ?>/assets/img/replay.png" alt="replay" title="replay" />
    </span>
    <span id="next" class="media-control-button" title="step forward" onclick="stepForward()">
        <img src="http://<?= $_SERVER['HTTP_HOST'] ?>/assets/img/nextFrame.png" alt="next frame" />
    </span>
    <span id="go-to-end" class="media-control-button" title="go to end" onclick="goToEnd()">
        <img src="http://<?= $_SERVER['HTTP_HOST'] ?>/assets/img/goToEnd.png" alt="go to end" />
    </span>
    <div id="progress-bar" class="media-control-button ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
        <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min"></div>
        <span id="progress-bar-handle" tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
    </div>
</div>