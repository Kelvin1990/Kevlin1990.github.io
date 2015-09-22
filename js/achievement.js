function checkDailyAchievement ($ionicPopup) {
	var dailyGoal = "daily goal!";
	// name of goals, like "daily goal"
	var congrat = "You have reached the"
	//string of congratulation
	var htmlContent = '<div class="row" id="stars"><img id="star1" src="img/star.png"><img id="star2" src="img/star.png"><img id="star3" src="img/star.png"></div>';

	var string = congrat + dailyGoal + htmlContent;
	// final string of achievement



	//popup if satisfy requirements
	var ref = new Firebase('https://brilliant-torch-5432.firebaseio.com');
	var uid = localStorage.getItem("currentUser");
	var status;
	var intake;

	var goal;
	ref.child(uid).child("userDetails").on("value", function(snapshot) {
		status = snapshot.val().reachDailyGoal
		intake = snapshot.val().totalIntake;
		goal = snapshot.val().goal;
		localStorage.setItem("goal",goal);
		if ((status == false)&&(intake >= goal)) {
			popupAchievement(string,$ionicPopup);
			
		};

	})
	
		

	
	
	

	
}
function popupAchievement(string,$ionicPopup) {
	var alertPopup = $ionicPopup.alert({
      title: 'Congratulations!',
      template: string
    });
}