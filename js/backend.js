
function register () {
	var myDataRef = new Firebase('https://brilliant-torch-5432.firebaseio.com');

	//fetch user information
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var repassword = document.getElementById("repassword").value;
	var email = document.getElementById("email").value;
	var gender = document.getElementById("gender").value;
	var dob = document.getElementById("dob").value;
	var checkbox = document.getElementById("checkbox").checked;//on or off
	// validate input value
	if (username == "") {
		alert("username cannot be empty");
		return;
	};

	if (password == "") {
		alert("password cannot be empty");
		return;
	};

	if (password != repassword) {
		alert("password is not same");
		return;
	};

	if (checkbox == false) {
		$scope.showAlert = function() {
   		var alertPopup = $ionicPopup.alert({
     	title: 'Don\'t eat that!',
     	template: 'It might taste good'
   		});
   		alertPopup.then(function(res) {
     	console.log('Thank you for not eating my delicious ice cream cone');
   		});
 		};
		alert("you have to accept our terms of requirements");
		return;
	};
	//alert("username:"+username+password+email+gender+weight+checkbox);

	myDataRef.createUser({
	  email    : email,
	  password : password
	}, function(error, userData) {
	  if (error) {
	    console.log("Error creating user:", error);
	    switch(error.code) {
	    	case "INVALID_EMAIL": 
	    		alert("your email adress is invalid");
	    		break;
	    	case "EMAIL_TAKEN":
	    		alert("email has been used");

	    }
	  } else {
	    console.log("Successfully created user account with uid:", userData.uid);
	    
	    var currentUser = userData.uid;
	    localStorage.setItem("currentUser", currentUser);
	    myDataRef.child(currentUser).set({
	    	userDetails: {
	    	    email: email,
	    	    name: username,
	    	    dob: dob,
	    	    gender: gender,
	    	    longest: "0",
	    	    goal: "5",
	    	    totalIntake: "0",
	    	    points: "0",
	    	    reachDailyGoal: "false"
	        },

	        achievements:{
	        	dailyGoal: "locked",
	        	weeklyGoal: "locked",
	        	monthlyGoal: "locked"
	        	//some other goals
	        }
	    }, function (error) {
	    	if (error) {
	    		alert(error);
	    	}
	    	else {
	    		window.location.href = "guide.html";
	    	}
	    });
	  }
	});
	//console.log("Successfully created user account with uid:", userData.uid);
}

function login () {
	var ref = new Firebase('https://brilliant-torch-5432.firebaseio.com');
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	ref.authWithPassword({
  		email    : username,
  		password : password
	}, function(error, authData) {
	if (error) {
			alert("Login Failed!");
	    	console.log("Login Failed!", error);
	  	} else {
	    	console.log("Authenticated successfully with payload:", authData);
	    	localStorage.setItem("currentUser", authData.uid);
	    	
	    	window.location.href = "index.html#/tab/home";
	  	}
	});
}
function jump () {
	window.location.href = "#/tab/home";
}
