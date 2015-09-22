function readData()
  {
    var ref = new Firebase('https://brilliant-torch-5432.firebaseio.com');
    var currentUser = localStorage.getItem("currentUser");

    ref.child(currentUser).on("value", function (snapshot) {
      var goal = snapshot.val().userDetails.goal;
      var goals = document.getElementById("goals");
      goals.selectedIndex = goal - 1;

      for (var i = 1; i <= 4; i++) {
        var content = snapshot.child("stageReward").child(i).val();
        if (content != null) {
          document.getElementById("reward" + i).innerHTML = content.content;
        }
      }
    }, function (error) {
      alert(error.code);
    })
  }

function confirmIni () {
  var goalRef = new Firebase('https://brilliant-torch-5432.firebaseio.com');
  var currentUser = localStorage.getItem("currentUser");
  var goals = document.getElementById("goals");
  var goal = goals.options[goals.selectedIndex].text;

  goalRef.child(currentUser).child("userDetails").update({
    goal: goal
  }, function (error) {
    if (error) {
      alert(error);
    } 
    else {
      window.location.href='index.html#/tab/home';
    }
  });
}
