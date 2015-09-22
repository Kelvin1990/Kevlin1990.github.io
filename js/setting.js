function updateWeightLoss() {
  	var weightLoss = document.getElementById("weightLoss").checked;
  	localStorage.setItem("weightLoss", weightLoss);
  	alert(localStorage.getItem("weightLoss"));
}

function updateDiet() {
  	var diet = document.getElementById("diet").checked;
  	localStorage.setItem("diet", diet);
  	//alert(localStorage.getItem("weightLoss"));
}

function updateVegeIntake() {
  	var vegeIntake = document.getElementById("vegeIntake").checked;
  	localStorage.setItem("vegeIntake", vegeIntake);
  	//alert(localStorage.getItem("weightLoss"));
}

function updateAchievement() {
  	var achievement = document.getElementById("achievement").checked;
  	localStorage.setItem("achievement", achievement);
  	//alert(localStorage.getItem("weightLoss"));
}

function updateWeekday() {
  	var weekday = document.getElementById("weekday").checked;
  	localStorage.setItem("weekday", weekday);
  	//alert(localStorage.getItem("weightLoss"));
}

function updateWeekend() {
  	var weekend = document.getElementById("weekend").checked;
  	localStorage.setItem("weekend", weekend);
  	//alert(localStorage.getItem("weekend"));
}

