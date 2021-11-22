const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

// General user variables
let currentUser;
let currentData;

// Create a simple array object to serve as a database to store user data
let database = [
//    {
//        uid: '12345',
//        data: [1,2,3]
//   }
];

wss.on("connection", ws => {

    ws.on("message", message => {
        m = JSON.parse(message);
        // log the message for debugging purposes
        console.log(m);

        // If the event is a sign-in attempt
        if (m.event === "SIGNIN-ATTEMPT") {
            // run the validate UID on the data in the message
            let validate = validateUID(m.data);
            //update current data and user serverside if valid UID
            if (validate) {
                currentUser = validate.uid;
                currentData = validate.data;
            }
            // create the reply object
            let reply = {
                event: "SIGNIN-REPLY",
                data: validate
            }
            
            ws.send(JSON.stringify(reply));

        // If the event is a user signing out
        } else if (m.event === "USER-SIGNOUT") {
            // Update the current data variable 
            currentData = m.data;
            // Clear current user and data variables
            currentData = null;
            currentUser = null;
            // log current user and data for debugging
            console.log(currentUser,currentData);

        // If the event is a new  user creation
        } else if (m.event === "NEW-USER") {

            // Call the new user function and create reply object
            let reply = {
                event: "NEWUSER-REPLY",
                data:  createUser(m.data)
            }
            // Send the response back to the client
            ws.send(JSON.stringify(reply))

            // log current user  database for debugging
            console.log(database);

        }
    })
})

// Create a function to validate the UIDs from the database object
const validateUID = function (uid) {
    let r = false;
    for (var i=0; i < database.length; i++) {
        if (database[i].uid === uid) {
            r = database[i];
        } else {continue}
    // if not in the db return false
    return r;
    }
}

// Create function that updates the data when user logs out to be called above

// Create a function that creates a new user in the database 
const createUser = function (uid) {
    //loop through all the users in the database
    for (var i=0; i < database.length; i++) {
        if (database[i].uid === uid) {
            return false;
        } // If not in the db then create new user object
    }
    // If not in the db then create new user object
    let userObj = {
        uid: uid,
        data: []
    } // push to database
    database.push(userObj);
    return true;
}