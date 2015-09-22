function getServe () {
  var ref = new Firebase('https://brilliant-torch-5432.firebaseio.com');
  var currentUser = localStorage.getItem("currentUser");

  //get today time stamp
    var now = new Date();
    //var tomorrow = now+1;
    var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
    var startTime = startOfDay.getTime() ;
    var endTime = endOfDay.getTime();
    // var offsetRef = new Firebase("https://brilliant-torch-5432.firebaseio.com/.info/serverTimeOffset");
    //   offsetRef.on("value", function(snap) {
    //   var offset = snap.val();//4577
    //   startTime = new Date().getTime() + offset;
    //   //alert(startOfDay.getTime());
    // });
    //alert(endOfDay.getTime());


    var uid = localStorage.getItem("currentUser");
    var currentServe = 0;
    //alert(startOfDay.getTime() < 1442341471817);
    ref.child(uid).child("statistic").on('child_added', function(snap) {
      var name = snap.val();
      if ((name.time > startTime)&&(name.time < endTime)) {
        //alert(name.time);
        //alert(name.intake);
        currentServe-= -name.intake;
      };
      
      //alert(currentServe);
    });
    
    ref.child(currentUser).on("value", function(snapshot) {
    goalServe = snapshot.child("userDetails").val().goal;
    totalIntake = snapshot.child("userDetails").val().totalIntake;
    
    

    //var currentServe = totalIntake;
    var percentage = Math.floor(currentServe * 100 / goalServe);
  
    // set the height of the white box
    var whiteBox = document.getElementById('white');
    if (percentage > 100) percentage = 100;
    whiteBox.style.height = (277 - 193 * percentage / 100) + "px";
  
    // set the contents of current serve
    var current = document.getElementById('currentServe');
    current.innerHTML = currentServe + "</br>" + (percentage + "%");
  
    // set the coordinate and contents of the goal
    var goal = document.getElementById('goalServe');
    var width = window.innerWidth;
    goal.style.left = (width / 2 + 50) + "px";
    goal.innerHTML = "Goal: " + goalServe + " Serve(s)";
  }, function (error) {
    alert(error.code);
  })

  if (localStorage.getItem("currentServe") == null) {
    localStorage.setItem("currentServe", 0);
  }
  if (localStorage.getItem("reachGoal") == null) {
    localStorage.setItem("reachGoal", false);
  }
};

// function for if the window is resized by the user
window.onresize = resize;
function resize () {
  var goal = document.getElementById('goalServe');
  var width = window.innerWidth;
  if (goal != null) goal.style.left = (width / 2 + 50) + "px";
}