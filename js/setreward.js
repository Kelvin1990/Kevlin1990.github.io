function saveRewards (rewards, ref) {
  var currentUser = localStorage.getItem("currentUser");

  ref.child(currentUser).child("reward").remove(function (error) {
    if (error) {
      alert(error);
    }
    else {
      if (rewards.length > 0) {
        saveReward(rewards, ref, currentUser, 0, rewards.length);
      }
      else {
        window.location.href = "setgoal.html";
      }
    }
  });
}

function saveReward (rewards, ref, currentUser, index, length) {
  ref.child(currentUser).child("reward").child(index).set({
    text: rewards[index].text
  }, function (error) {
    if (error) {
      alert(error);
    }
    else {
      if (index - (-1) == length) {
        window.location.href = "setgoal.html";
      }
      else {
        saveReward(rewards, ref, currentUser, index + 1, length);
      }
    }
  });
}