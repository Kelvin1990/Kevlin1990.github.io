 angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicPopup) {
  window.getServe();// initialize variable

  checkDailyAchievement($ionicPopup);//check if there are unlocked achievements
  
  if (localStorage.getItem("reachGoal") == "true") {
    var alertPopup = $ionicPopup.alert({
      title: 'Congratulations!',
      template: 'You have reached the daily goal!<div class="row" id="stars"><img id="star1" src="img/star.png"><img id="star2" src="img/star.png"><img id="star3" src="img/star.png"></div>'
    });

    localStorage.setItem("reachGoal", false);
  }
})

.controller('LoginCtrl', function($scope) {})

.controller('SettingCtrl', function($scope) {

})

.controller('AchievementCtrl', function($scope) {
  $scope.data = {};
  if (localStorage.getItem("daily") == null){
    localStorage.setItem("daily", 0);
  }

  if (localStorage.getItem("weekly") == null){
    localStorage.setItem("weekly", 0);
  }

  if (localStorage.getItem("monthly") == null){
    localStorage.setItem("monthly", 0);
  }

  if (localStorage.getItem("generalVegeAmount") == null){
    localStorage.setItem("generalVegeAmount", 0);
  }
  
  if (localStorage.getItem("isDaily") == null){
    localStorage.setItem("isDaily", false);
  }

  if (localStorage.getItem("isWeekly") == null){
    localStorage.setItem("isWeekly", false);
  }

  if (localStorage.getItem("isMonthly") == null){
    localStorage.setItem("isMonthly", false);
  }

  if (localStorage.getItem("daily") >= 1) {
    document.getElementById("daily1").src = "img/completed.png";
    if (localStorage.getItem("daily") >= 3) {
      document.getElementById("daily2").src = "img/completed.png";
      if (localStorage.getItem("daily") >= 5 ) {
        document.getElementById("daily3").src = "img/completed.png";
        if (localStorage.getElementById("isDaily") == false) {
          localStorage.setItem("isDaily", true);
        }
      }
    }    
  }

  if (localStorage.getItem("weekly") >= 10) {
    document.getElementById("weekly1").src = "img/completed.png";
    if (localStorage.getItem("weekly") >= 20) {
      document.getElementById("weekly2").src = "img/completed.png";
      if (localStorage.getItem("daily") >= 30 ){
        document.getElementById("weekly3").src = "img/completed.png";
        if (localStorage.getElementById("isWeekly") == false) {
          localStorage.setItem("isWeekly", true);
        }
      }
    }    
  }

  if (localStorage.getItem("weekly") >= 80) {
    document.getElementById("weekly1").src = "img/completed.png";
    if (localStorage.getItem("weekly") >= 100) {
      document.getElementById("weekly2").src = "img/completed.png";
      if (localStorage.getItem("daily") >= 120 ){
        document.getElementById("weekly3").src = "img/completed.png";
        if (localStorage.getElementById("isMonthly") == false) {
          localStorage.setItem("isMonthly", true);
        }
      }
    }    
  }

  if (localStorage.getItem("isDaily") == true && localStorage.getItem("isWeekly") == true && localStorage.getItem("isMonthly") == true) {
    document.getElementById("general4").src = "img/completed.png";
  }

  if (localStorage.getItem("generalVegeAmount") >= 10) {
    document.getElementById("general4").src = "img/completed.png";
    if (localStorage.getItem("generalVegeAmount") >= 30) {
      document.getElementById("general3").src = "img/completed.png";
    }
  }

  //missing the sign up achievment
})

.controller('ChatsCtrl', function($scope, Chats) {

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('VegeCtrl', function($rootScope, $scope, $filter, $ionicPopup, $location) {
  $scope.data = {};
  $scope.items = iniVege ();
  $scope.intakes = [];
  $scope.displayIndex = 0;
  $scope.deleteVisible = false;
  $scope.intakeAmount = 0;

  $scope.decreaseDisplayIndex = function() {
    $scope.displayIndex -= 4;
    if ($scope.displayIndex == 0) {
      document.getElementById("arrow-left").style.visibility = "hidden";
    }
    document.getElementById("arrow-right").style.visibility = "visible";
  }

  $scope.increaseDisplayIndex = function() {
    $scope.displayIndex += 4;
    if ($scope.displayIndex >= $rootScope.resultLength - 4) {
      document.getElementById("arrow-right").style.visibility = "hidden";
    }
    document.getElementById("arrow-left").style.visibility = "visible";
  }

  $scope.$watch('resultLength', function(newValeu, oldValue) {
    $scope.displayIndex = 0;
    document.getElementById("arrow-left").style.visibility = "hidden";
    if (newValeu <= 4) {
      document.getElementById("arrow-right").style.visibility = "hidden";
      document.getElementById("arrows").style.height = "0px";
    }
    else {
      document.getElementById("arrow-right").style.visibility = "visible";
      document.getElementById("arrows").style.height = "40px";
    }
  })

  $scope.showDelete = function() {
    var deleteButton = document.getElementsByClassName('delete');

    for (var i = 0; i < deleteButton.length; i++) {
      if (!$scope.deleteVisible) {
        deleteButton[i].style.visibility = "visible";
      }
      else {
        deleteButton[i].style.visibility = "hidden";
      }
    }

    $scope.deleteVisible = !$scope.deleteVisible;
  }

  $scope.deleteItem = function(vegeId) {
    for (var i = 0; i < $scope.intakes.length; i++) {
      if ($scope.intakes[i].text == vegeId) {
        $scope.intakeAmount -= $scope.intakes[i].serve;
        $scope.intakes.splice(i, 1);
      }
    }
  }

  $scope.clearSearch = function() {
    $scope.data.searchQuery = '';
  };       

  $scope.showPopup1 = function(vegeId) {
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<div class="row"><input type="number" style="height: 20px; width: 150px;" ng-model="data.intake" min="0" max="100" placeholder="e.g. 1"><select style="width: 150px;"><option>Serve(s)</option><option>Cup(s)</option></select></div>',
      title: vegeId,
      subTitle: "Please enter the amount:",
      scope: $scope,
      buttons: [
        { text: 'Cancel',
          onTap: function(e) {
            $scope.data.intake = '';
          }
        },
        {
          text: '<b>Confirm</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.intake) {
              //don't allow the user to confirm if they do not enter numbers
              e.preventDefault();
            } else {
              var duplicated = false;
              for (var i = 0; i < $scope.intakes.length; i++) {
                if (vegeId == $scope.intakes[i].text) {
                  $scope.intakes[i].serve += $scope.data.intake;
                  duplicated = true;
                }
              }

              if (!duplicated) {
                $scope.intakes.push({text: vegeId, img: "img/" + vegeId + ".png", serve: $scope.data.intake});
                
                var deleteButton = document.getElementsByClassName('delete');
                for (var i = 0; i < deleteButton.length; i++) {
                  deleteButton[i].style.visibility = "hidden";
                }
              }

              $scope.intakeAmount += $scope.data.intake;
              $scope.data.intake = '';
              return $scope.data.intake;
            }
          }
        }
      ]
    });
  }

  $scope.showPopup2 = function(vegeId, serve) {
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<div class="row"><input type="number" style="height: 20px; width: 150px;" ng-model="data.intake" min="0" max="100" placeholder=' + serve + '><select style="width: 150px;"><option>Serve(s)</option><option>Cup(s)</option></select></div>',
      title: vegeId,
      subTitle: "Please update the amount:",
      scope: $scope,
      buttons: [
        { text: 'Cancel',
          onTap: function(e) {
            $scope.data.intake = '';
          }
        },
        {
          text: '<b>Confirm</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.intake) {
              //don't allow the user to confirm if they do not enter numbers
              e.preventDefault();
            } else {
              for (var i = 0; i < $scope.intakes.length; i++) {
                if (vegeId == $scope.intakes[i].text) {
                  $scope.intakeAmount = $scope.intakeAmount - $scope.intakes[i].serve + $scope.data.intake;
                  $scope.intakes[i].serve = $scope.data.intake;
                }
              }
              $scope.data.intake = '';
              return $scope.data.intake;
            }
          }
        }
      ]
    });
  }

  $scope.showConfirm1 = function() {

    var confirmPopup = $ionicPopup.confirm({
      //title: 'Back',
      template: 'Are you sure to go back to home page?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        window.location = 'index.html#/tab/home';
      }
    });
  }

  $scope.showConfirm2 = function() {
    //connect to firebase --kelvin
    var newIntake = $scope.intakeAmount;
    var userId = localStorage.getItem("currentUser");
    var myDataRef = new Firebase('https://brilliant-torch-5432.firebaseio.com');
    var place = myDataRef.child(userId);
    var confirmPopup = $ionicPopup.confirm({
      //title: 'Back',
      template: 'Are you sure to confirm the intakes?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        var originServe = localStorage.getItem("currentServe");
        var goal = localStorage.getItem("totalServe");
        localStorage.setItem("currentServe", localStorage.getItem("currentServe") - (-$scope.intakeAmount));
        if (originServe < goal && localStorage.getItem("currentServe") >= goal) {
          localStorage.setItem("reachGoal", true);
        }


        //update to firebase --kelvin
        place.child("statistic").push({
            intake :newIntake,
            time: Firebase.ServerValue.TIMESTAMP
        },function(error) {
          console.log("reach");
          if (!error)        window.location = 'index.html#/tab/home';
        })
        
      }
    });
  }
})

.filter('myFilter', function($filter, $rootScope) {
  return function(items, query) {
    var results = $filter('filter')(items, query)
    $rootScope.resultLength = results.length;
    return results;
  }
})

.controller('StatisticCtrl', function($scope) {
            //call draw intake js
            window.drawsta();
})

.controller('GoalCtrl', function($scope, $rootScope) {
  $scope.createReward = function (index) {
    localStorage.setItem("stage", index);
    window.location.href = "reward-setting.html";
  }
})

.controller('RewardCtrl', function($scope, $rootScope, $ionicPopup) {
  $scope.data = {};
  $scope.rewards = [];
  var ref = new Firebase('https://brilliant-torch-5432.firebaseio.com');
  var currentUser = localStorage.getItem("currentUser");

  ref.child(currentUser).child("reward").on("value", function (snapshot) {
    if (snapshot.val() != null) {
      var length = snapshot.val().length;
      for (var i = 0; i < length; i++) {
        $scope.rewards.push({text: snapshot.child(i).val().text, index: i});
      }
    }
  });

  $scope.addReward = function() {
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.reward">',
      title: 'New Reward',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Create</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.reward) {
              //don't allow the user to close unless he enters serves
              e.preventDefault();
            } else {
              $scope.rewards.push({text: $scope.data.reward, index: $scope.data.reward.length});
              $scope.data.reward = '';
            }
          }
        }
      ]
    });
  }

  $scope.deleteReward = function(index) {
    $scope.rewards.splice(index, 1);
    var length = $scope.rewards.length;
    for (var i = index; i < length; i++) {
      $scope.rewards[i].index = i;
    }
  }

  $scope.back = function() {
    var ref = new Firebase('https://brilliant-torch-5432.firebaseio.com');
    saveRewards($scope.rewards, ref);
  }

  $scope.setReward = function(reward) {
    var ref = new Firebase('https://brilliant-torch-5432.firebaseio.com');
    var currentUser = localStorage.getItem("currentUser");
    var stage = localStorage.getItem("stage");

    ref.child(currentUser).child("stageReward").child(stage).set({
      content: reward
    }, function (error) {
      if (error) {
        alert(error);
      }
      else {
        saveRewards($scope.rewards, ref);
      }
    });
  }
})

.controller('AccountCtrl', function($scope, $ionicActionSheet, $ionicPopup, $timeout) {

  // Triggered on a button click, or some other target
  $scope.showGenders = function() {
    var gender_show = $ionicActionSheet.show({
     buttons: [
       { text: 'Female'},
       { text: 'Male'}
     ],
     //destructiveText: 'Delete',
     titleText: 'Gender',
     cancelText: 'Cancel',
     buttonClicked: function(index) {
       if (index == 0)
       {
          $("#gender").html("Female");
       }
       else
       {
          $("#gender").html("Male");
       }
       return true;
     }

   });

  }

  $scope.showDOB = function() {
    $scope.user = {};
    $scope.user.dob = new Date();

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="date" ng-model="user.dob">',
      title: 'Enter new date of birth',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (($scope.user.dob).toDateString())
              return $scope.user.dob;
          }
        }
      ]
    });
    myPopup.then(function(res) {
      $("#dob").html(res.toDateString());
    });
  };

  $scope.showName = function() {
    $scope.user = {}
    //$scope.user.username = "Tom"
    
    // An elaborate, custom popup
    var name_popup = $ionicPopup.show({
      
      template: '<input type="text" ng-model="user.username">',
      title: 'Enter new name',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.user.username;
          }
        }
      ]
      
    });
    //name = $scope.user.username;
    name_popup.then(function(res) {
      $("#name").html(res);
    });
  };

  $scope.showOccupation = function() {
    $scope.user= {}

    // An elaborate, custom popup
    var occupation_popup = $ionicPopup.show({
      template: '<input type="text" ng-model="user.job">',
      title: 'Enter new occupation',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.user.job;
          }
        }
      ]
    });
    occupation_popup.then(function(res) {
      $("#occupation").html(res);
    });
  };

  $scope.showHeight = function() {
    $scope.user = {}

    // An elaborate, custom popup
    var height_popup = $ionicPopup.show({
      template: '<input type="number" ng-model="user.height">',
      title: 'Enter new height',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.user.height;
          }
        }
      ]
    });
    height_popup.then(function(res) {
      $("#height").html(res + "cm");
    });
  };

  $scope.showWeight = function() {
    $scope.user = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="number" ng-model="user.weight">',
      title: 'Enter new weight',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.user.weight;
          }
        }
      ]
    });
    myPopup.then(function(res) {
      $("#weight").html(res + "kg");
    });
  };

  $scope.showGoalWeight = function() {
    $scope.user = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="number" ng-model="user.g_weight">',
      title: 'Enter new goal weight',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.user.g_weight;
          }
        }
      ]
    });
    myPopup.then(function(res) {
      $("#g_weight").html(res + "kg");
    });
  };
});
