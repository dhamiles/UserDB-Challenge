const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

// General user variables
let currentUser;
let currentData;

// Create a simple array object to serve as a database to store user data
let database = [
    {
        uid: '12345',
        data: [1,2,3]
    }
];

wss.on("connection", ws => {

    ws.on("message", message => {
        m = JSON.parse(message);
        // log the response for debugging purposes
        console.log(m);

        // If the event is a sign-in attempt
        if (m.event === "SIGNIN-ATTEMPT") {
            // run the validate UID on the data in the message
            let validate = validateUID(m.data);
            //update current data and user serverside if valid UID
            if (validate !== false) {
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
            currentData = m.data;

            // log current user and data for debugging
            console.log(currentUser,currentData);
        }
    })
})

// Create a function to validate the UIDs from the database object
const validateUID = function (uid) {
    for (const u of database) {
        if (u.uid === uid) {
            return u;
        } else {
            return false;
        }
    }
}

// Create function that updates the data when user logs out to be called above

// Create a function that creates a new user in the database 
