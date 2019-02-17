// function reset 

function reset() {
	if(workSession) {
		clearInterval(workSession);
		workSession = null;
	} else {
		clearInterval(breakSession);
		breakSession = null;
	}
	document.getElementById("showtime").innerHTML = "";
	document.getElementById("timer-panel").style.backgroundColor = "#FC5D66";
	document.getElementById("pause").disabled = false;
	document.getElementById("resume").disabled = false;	
}// end of function
