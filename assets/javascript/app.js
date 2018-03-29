$(document).ready(function(){
var config = {
    apiKey: "AIzaSyCPF8Q_LW-z2t3MwRlRRjt3kEYuOjjPBTU",
    authDomain: "train-schedule-a5e31.firebaseapp.com",
    databaseURL: "https://train-schedule-a5e31.firebaseio.com",
    projectId: "train-schedule-a5e31",
    storageBucket: "train-schedule-a5e31.appspot.com",
    messagingSenderId: "919559186301"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-Train-btn").on("click", function(event) {
  event.preventDefault();
  
  var trainName = $("#train-name-input").val().trim();
  var traindestination = $("#destination-input").val().trim();
  var trainfrequency = $("#frequency-input").val().trim();
  var startTrain = $("#start-input").val().trim();

    var newtrain = {
    name: trainName,
    destination: traindestination,
    frequency: trainfrequency,
    startTrain: startTrain
  };

  database.ref().push(newtrain);

  console.log(newtrain.name);
  console.log(newtrain.destination);
  console.log(newtrain.frequency);
  console.log(newtrain.startTrain);

 
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#start-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var traindestination = childSnapshot.val().destination;
  var trainfrequency = childSnapshot.val().frequency;
  var startTrain = childSnapshot.val().startTrain;

  console.log(trainName);
  console.log(traindestination);
  console.log(trainfrequency);
  console.log(startTrain);

  var startTrainTime = moment().hours(moment(startTrain,"HH:mm").hours()).minutes(moment(startTrain,"HH:mm").minutes());
  
  var currentTime = moment();
  while(startTrainTime.isBefore(currentTime)){
    startTrainTime.add(parseInt(trainfrequency),"m");
  }
  
  var minutesAway = Math.floor(startTrainTime.diff(currentTime)/1000/60);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + traindestination + "</td><td>" +
  trainfrequency + "</td><td>" + startTrainTime.format("MM/DD/YYYY HH:mm") + "</td><td>" 
  + minutesAway+ "</td></tr>");
});
});