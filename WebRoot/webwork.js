/**
 * 
 */
var numDiv;
var work = null;
var num = 0;
window.onload = function(){
	numDiv = document.getElementById("numDiv");
	
	document.getElementById("start").onclick = startWorker;
	document.getElementById("stop").onclick = stopWorker;
}

function startWorker(){
	if(work){
		return;
	}
	
	work = new Worker("count.js");
	work.onmessage = function(e){
		numDiv.innerHTML = e.data+num;
	}
}

function stopWorker(){
	if(work){
		num = parseInt(numDiv.innerHTML);
		work.terminate();
		work = null;
	}
}