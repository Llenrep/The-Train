var config = {
    apiKey: "AIzaSyB8N6RmEi4lgMlNppR6PxniE4svg0IXCh4",
    authDomain: "trainproject-9a035.firebaseapp.com",
    databaseURL: "https://trainproject-9a035.firebaseio.com",
    projectId: "trainproject-9a035",
    storageBucket: "trainproject-9a035.appspot.com",
    messagingSenderId: "508004385161"
};

firebase.initializeApp(config);

var database = firebase.database();

function updateTime() {
    $("#timer").html(moment().format('MMMM Do YYYY, h:mm:ss a'));
}

$(document).ready(function(){

    setInterval(updateTime, 1000)

    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();
      
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainTime = moment($("#train-time-input").val().trim(), "hh:mm").format("h:mm:ss a");
        var frequency = $("#frequency-input").val().trim();
      
        var newTrain = {
          name: trainName,
          destination: trainDestination,
          arrival: trainTime,
          rate: frequency
        };
      
        database.ref().push(newTrain);

        // console.log(name.trainName);
        // console.log(destination.trainDestination);
        // console.log(arrival.trainTime);
        // console.log(rate.frequency);
      
        alert("Train successfully added");
      
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#train-time-input").val("");
        $("#frequency-input").val("");
    });


    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().arrival;
        var frequency = childSnapshot.val().rate;
      
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(frequency);
      
        // Prettify the employee start
        var trainTimePretty = moment.unix(trainTime).format("h:mm:ss a");
        
        var now = moment().format("HH:MM");
        console.log(now)
        // Calculate the months worked using hardcore math
        // To calculate the months worked
        var minutesAway = moment().diff(moment(trainTime, "hh:mm"), "minutes");
        //you need current time, frequency, and the different 
        console.log(minutesAway);
      
      
        // Create the new row
        var newRow = $("<tr>").append(
          $("<th>").text(trainName),
          $("<td>").text(trainDestination),
          $("<td>").text(frequency),
          $("<td>").text(trainTime),
          $("<td>").text(minutesAway),
        );
      
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });
})

//social security
//lake mary social security office 