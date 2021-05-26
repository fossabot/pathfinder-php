var mode = "exploration";
var codetraceColor = "white";

function highlightLine(lineNumbers) {
	$("#codetrace p")
		.css("background-color", "#673ab7")
		.css("color", codetraceColor);
	if (lineNumbers instanceof Array) {
		for (var i = 0; i < lineNumbers.length; i++)
			if (lineNumbers[i] != 0)
				$("#code" + lineNumbers[i])
					.css("background-color", "black")
					.css("color", "white");
	} else {
		$("#code" + lineNumbers)
			.css("background-color", "black")
			.css("color", "white");
	}
}
var isPlaying = false;
var cur_slide = null;
var last_click = 0;

function isActionsOpen() {
	return $("#actions-hide img").hasClass("rotateRight");
}

function isStatusOpen() {
	return $("#status-hide img").hasClass("rotateRight");
}

function isCodetraceOpen() {
	return $("#codetrace-hide img").hasClass("rotateRight");
}

function showActionsToast() {
	$('#actions-toast').fadeIn(function() {
		setTimeout(function() {
			$('#actions-toast').fadeOut();
		}, 2000);
	});
}

function showActionsPanel() {
	if (!isActionsOpen()) {
		if (isPlaying) {
			showActionsToast();
			return;
		}
		$("#actions-hide img").removeClass("rotateLeft").addClass("rotateRight");
		$("#actions").animate({
			width: "+=" + actionsWidth
		});
	}
}

function hideActionsPanel() {
	if (isActionsOpen()) {
		$("#actions-hide img").removeClass("rotateRight").addClass("rotateLeft");
		$("#actions").animate({
			width: "-=" + actionsWidth
		});
	}
}

function showStatusPanel() {
	if (!isStatusOpen()) {
		$("#status-hide img").removeClass("rotateLeft").addClass("rotateRight");
		$("#current-action").fadeIn();
		$("#status").animate({
			width: "+=" + statusCodetraceWidth
		});
	}
}

function hideStatusPanel() {
	if (isStatusOpen()) {
		$("#status-hide img").removeClass("rotateRight").addClass("rotateLeft");
		$("#current-action").fadeOut();
		$("#status").animate({
			width: "-=" + statusCodetraceWidth
		});
	}
}

function showCodetracePanel() {
	if (!isCodetraceOpen()) {
		$("#codetrace-hide img").removeClass("rotateLeft").addClass("rotateRight");
		$("#codetrace").animate({
			width: "+=" + statusCodetraceWidth
		});
	}
}

function hideCodetracePanel() {
	if (isCodetraceOpen()) {
		$("#codetrace-hide img").removeClass("rotateRight").addClass("rotateLeft");
		$("#codetrace").animate({
			width: "-=" + statusCodetraceWidth
		});
	}
}

function triggerRightPanels() {
	hideEntireActionsPanel();
	showStatusPanel();
	showCodetracePanel();
}

function extractQnGraph(graph) {
	var vList = graph.internalAdjList;
	for (var key in vList) {
		var temp;
		var v = vList[key];
		temp = v.cxPercentage;
		v.cxPercentage = v.cx;
		v.cx = (temp / 100) * MAIN_SVG_WIDTH;
		temp = v.cyPercentage;
		v.cyPercentage = v.cy;
		v.cy = (temp / 100) * MAIN_SVG_HEIGHT;
	}
	return graph;
}

function closeSlide(slide, callback) {
	if (typeof slide == "undefined" || slide == null) {
		if (typeof callback == "function") callback();
		return;
	}
	$(".menu-highlighted").removeClass("menu-highlighted");
}

function canContinue() {
	var this_click = new Date().getTime();
	if (this_click - last_click < 200) return false;
	last_click = this_click;
	return true;
}

function initUI() {
	var actionsHeight = $("#actions p").length * 27 + 10;
	$("#actions").css("height", actionsHeight);
	$("#actions").css("width", actionsWidth);
	var actionsHideTop = Math.floor((actionsHeight - 16) / 2);
	var actionsHideBottom = actionsHeight - 16 - actionsHideTop;
	$("#actions-hide").css("padding-top", actionsHideTop);
	$("#actions-hide").css("padding-bottom", actionsHideBottom);
	$("#current-action").hide();
	$("#actions-hide img").addClass("rotateRight");
	$(".action-menu-pullout").css("left", actionsWidth + 43 + "px");
	$(".action-menu-pullout").children().css("float", "left");
	$(".coloured-menu-option").css("color", "white");
}
$(function () {
	$("#speed-input").slider({
		min: 200,
		max: 2000,
		value: 1500,
		change: function (event, ui) {
			gw.setAnimationDuration(2200 - ui.value);
		},
	});
	$("#progress-bar").slider({
		range: "min",
		min: 0,
		value: 0,
		slide: function (event, ui) {
			gw.pause();
			gw.jumpToIteration(ui.value, 0);
		},
		stop: function (event, ui) {
			if (!isPaused) {
				setTimeout(function () {
					gw.play();
				}, 500);
			}
		},
	});
	initUI();
	$("#mode-button").click(function () {
		$("#other-modes").toggle();
	});
	$("#mode-menu").hover(
		function () {
			$("#other-modes").show();
		},
		function () {
			$("#other-modes").hide();
		}
	);
	$("#status-hide").click(function () {
		if (isStatusOpen()) hideStatusPanel();
		else showStatusPanel();
	});
	$("#codetrace-hide").click(function () {
		if (isCodetraceOpen()) hideCodetracePanel();
		else showCodetracePanel();
	});
	$("#actions-hide").click(function () {
		if (isActionsOpen()) hideEntireActionsPanel();
		else showActionsPanel();
	});
});
var isPaused = false;

function isAtEnd() {
	return gw.getCurrentIteration() == gw.getTotalIteration() - 1;
}

function pause() {
	if (isPlaying) {
		isPlaying = false;
		isPaused = true;
		gw.pause();
		$("#play").show();
		$("#pause").hide();
		showActionsPanel();
	}
}

function play() {
	isPlaying = true;
	isPaused = false;
	$("#pause").show();
	$("#play").hide();
	if (isAtEnd()) gw.replay();
	else gw.play();
	hideActionsPanel();
}

function stepForward() {
	if (isPlaying) {
		pause();
		gw.forceNext(250);
	}
}

function stepBackward() {
	if (isPlaying) {
		pause();
		gw.forcePrevious(250);
	}
}

function goToBeginning() {
	if (isPlaying) {
		gw.jumpToIteration(0, 0);
		pause();
	}
}

function goToEnd() {
	if (isPlaying) {
		gw.jumpToIteration(gw.getTotalIteration() - 1, 0);
		pause();
	}
}

function stop() {
	try {
		gw.stop();
	} catch (err) { }
	isPaused = false;
	isPlaying = false;
	$("#pause").show();
	$("#play").hide();
}

function disableScroll() {
	$("html").css("overflow", "hidden");
}

function enableScroll() {
	$("html").css("overflow", "visible");
}

function replaceAll(find, replace, str) {
	return str.replace(new RegExp(find, "g"), replace);
}

function getColours() {
	var generatedColours = new Array();
	while (generatedColours.length < 4) {
		var n = Math.floor(Math.random() * colourArray.length);
		if ($.inArray(n, generatedColours) == -1) generatedColours.push(n);
	}
	return generatedColours;
}

function isOn(value, position) {
	return (value >> position);
}

function customAlert(msg) {
	$("#custom-alert p").html(msg);
	var m = -1 * ($("#custom-alert").outerHeight() / 2);
	$("#custom-alert").css("margin-top", m + "px");
	$("#dark-overlay").fadeIn(function () {
		$("#custom-alert").fadeIn(function () {
			setTimeout(function () {
				$("#custom-alert").fadeOut(function () {
					$("#dark-overlay").fadeOut();
				});
			}, 1000);
		});
	});
}

function showLoadingScreen() {
	$("#loading-overlay").show();
	$("#loading-message").show();
}

function hideLoadingScreen() {
	$("#loading-overlay").hide();
}

function commonAction(retval, msg) {
	if (retval) {
		$("#current-action").fadeOut(function () {
			$("#current-action").html(msg);
			$("#current-action").fadeIn();
		});
		$("#progress-bar").slider("option", "max", gw.getTotalIteration() - 1);
		triggerRightPanels();
		isPlaying = true;
	}
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (decodeURIComponent(pair[0]) == variable)
			return decodeURIComponent(pair[1]);
	}
	return "";
}

$(function () {
	$("#trigger-about").click(function () {
		if ($(window).width() > 600) {
			$("#dark-overlay").fadeIn(function () {
				$("#about").fadeIn();
			});
		} else {
			alert("Sorry, this dialog is too big. Please load it on bigger screen");
		}
	});

	$(".close-overlay").click(function () {
		$(".overlays").fadeOut(function () {
			$("#dark-overlay").fadeOut();
		});
	});

	$("#dark-overlay").click(function () {
		$(".overlays").fadeOut();
		$("#dark-overlay").fadeOut();
	});
});