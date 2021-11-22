//const { json } = require("stream/consumers");

ws = new WebSocket("ws://localhost:8082");

// All code the for the log-in/registration process

// Assign Element Variables from the html
const signInBtn = document.querySelector(".signin--btn");
const registerBtn = document.querySelector(".register--btn");
const signOutBtn = document.querySelector(".signout--btn");
const uidInput = document.querySelector(".input--uid");
const newUidInput = document.querySelector(".input--newuid");
const userContent = document.querySelector(".user--content");
const uidHeading = document.querySelector(".uid--heading");
const dataDisplay = document.querySelector(".database");
const dataAdd = document.querySelector(".dataadd--btn");
const dataInput = document.querySelector(".input--data");
const dataDelete = document.querySelector(".datadel--btn");
const dataDelInput = document.querySelector(".input--datadel");

// Assign General State variables
let signedIn = false;
let currentUser = null;
let currentData = null;

// Assign all functionality when sign-in button pressed
signInBtn.addEventListener("click", function () {
  // If no user signed in, give the button function
  if (!signedIn) {
    // set the message to send as an object with event and data keys
    let message = {
      event: "SIGNIN-ATTEMPT",
      data: uidInput.value,
    };
    ws.send(JSON.stringify(message));
  } else {
    uidInput.value = "";
  }
});

// Assign all functionality when sign-out button pressed
signOutBtn.addEventListener("click", function () {
  // Only function is currently signed-in
  if (signedIn) {
    // when signing out, send the current user data back to the server and update
    let message = {
      event: "USER-SIGNOUT",
      data: currentData,
    };

    //stringify and send the data to the server
    ws.send(JSON.stringify(message));

    // change all variables to reset the page
    currentUser = null;
    currentData = null;
    signedIn = false;
    dataInput.value = "";
    userContent.classList.add("hidden");
  }
});

// Functionality when the register button is cliccked
registerBtn.addEventListener("click", function () {
  // Assign new uid input box value  to a variable for clarity
  let newUid = newUidInput.value;
  // Only function if no user currently signed in
  if (!signedIn && newUid) {
    // let the message to send to server be the following
    let message = {
      event: "NEW-USER",
      data: newUid,
    };
    ws.send(JSON.stringify(message));
  }
  // clear the input box
  newUidInput.value = "";
});

// Functionality on the add data button to local db
dataAdd.addEventListener("click", function () {
  // Only run if signed in and the datainput field not empty
  if (signedIn && dataInput.value) {
    currentData.push(dataInput.value);
    dataDisplay.textContent = currentData;
  }
  // clear the input field when button pressed
  dataInput.value = "";
});

// Add all the functionality for deleting data from local db
dataDelete.addEventListener("click", function () {
  // if signedin and data is present in the delete input box
  if (signedIn && dataDelInput.value) {
    // verify data exists in the current user local db
    if (currentData.includes(dataDelInput.value)) {
      let i = currentData.indexOf(dataDelInput.value);
      // Delete the array at the index of the data point to be deleted
      currentData.splice(i, 1);
      dataDisplay.textContent = currentData;
    } else {
      alert(
        "Data you typed cannot be found\nEither entry does not exist or data was not typed exactly"
      );
    }
  }
  dataDelInput.value = "";
});

// Create an event listener that listens for messages from the server
ws.addEventListener("message", (message) => {
  // parse the JSON string into new variable m
  let m = JSON.parse(message.data);
  // log the object for debugging purposes!
  console.log(m);

  if (m.event === "SIGNIN-REPLY") {
    // if m.data false, failed sign in attempt
    if (!m.data) {
      // clear the uid input and alert user
      uidInput.value = "";
      alert("Invalid UID\nPlease enter correct UID or register");
    } else {
      // else the UID is valid, set the current data and user variables
      uidInput.value = "";
      currentUser = m.data.uid;
      currentData = m.data.data;
      // set signedIn to true
      signedIn = true;
      // unhide the main content
      userContent.classList.remove("hidden");
      // add the uid to the heading
      uidHeading.textContent = `User ID: ${m.data.uid}`;
      // Display the current user data
      dataDisplay.textContent = currentData;

      // log current user data for debugging
      console.log(currentUser, currentData, signedIn);
    }

    // If the event is  a newuser-response
  } else if (m.event === "NEWUSER-REPLY") {
    if (m.data) {
      alert("Account successfully created\nSign in with your new UID");
    } else {
      alert("Either UID is invalid or already in use,  try a different UID");
    }
  }
});
