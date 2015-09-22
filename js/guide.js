window.onload=function () {
  var ref = new Firebase('https://brilliant-torch-5432.firebaseio.com');
  var currentUser = localStorage.getItem("currentUser");

  ref.child(currentUser).on("value", function(snapshot) {
    localStorage.setItem("gender", snapshot.val().userDetails.gender);
  })
}

function serveChange() {
	var gender = localStorage.getItem("gender");
	var serve = document.getElementById("serve");
	var selected = serve.options[serve.selectedIndex].text;

	if ((gender == "Male" && selected >= 6) || (gender == "Female" && selected >= 5)) {
		document.getElementById("under").style.display = "none";
	}
	else {
		document.getElementById("under").style.display = "inline";
	}

	document.getElementById("recommondation").placeholder = selected - (-1);
}

function setReward() {
	localStorage.removeItem("gender");
	var input = document.getElementById("recommondation");
	var goal;

	if (input.value == "") {
		goal = input.placeholder;
	}
	else {
		goal = input.value;
	}

	var ref = new Firebase('https://brilliant-torch-5432.firebaseio.com');
	var currentUser = localStorage.getItem("currentUser");
	ref.child(currentUser).child("userDetails").update({
      goal: goal
    }, function (error) {
      if (error) {
        alert(error);
      } 
      else {
        window.location.href='setgoal.html';
      }
    });
}