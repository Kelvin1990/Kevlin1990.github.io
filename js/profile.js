angular.module('starter.controllers', [])

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
