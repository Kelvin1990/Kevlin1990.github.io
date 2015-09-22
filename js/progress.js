function updateBar() {
	var x = document.getElementById("progressNum").value;
	//--------
	var prevBar = document.getElementById("currentBar");
	var maxBar = document.getElementById("maxBar");

	var prevNum = prevBar.style.width.replace('%','');
	var maxNum = maxBar.style.width.replace('%','');

	

	var currentNum = x -(-prevNum);

  	prevBar.style.width = currentNum +"%";

  	if (x - maxNum < 0){
  		maxNum -= x;
  		maxBar.style.width = maxNum + "%";
  	}else{
  		maxBar.style.width = "0%";
  	}

  	// document.getElementById("result").innerHTML = maxNum;

  	// document.getElementById("cuårrentBar")[0].setAttribute("class", "democlass");

}

function readCurrentData(){

}

function readMaxData(){

}