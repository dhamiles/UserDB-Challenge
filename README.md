# UserDB - JS Coding Challenge

This repository contains the code written for the MA coding assignment

Refer back to this write-up for information and details on the code and its functionality

## Contents

1. Server: Contains the node.js server files
   - server.js: contains all server-side functionality
2. script.js: contains all client-side functonality
3. style.css: style sheet for the html
4. userDB.html: the actual userDB page to be opened

## Requirements

- To run the server you need nodejs

## Initialisation

1. Run a terminal inside the 'server' folder
2. Run the command: 'node server.js'
3. Open 'userDB.html' and enjoy :)

### Comments about my solution

As of commit 3: This is a very messy solution. I believe a lot of the code could be refactored to appear cleaner, and also I believe I have not fully exploited Javascript as I am still learning - some of the operations I have used are very innefficient in time (O(n) when looping through an array, perhaps an object with constant look up time O(1) wouldve have been better, I would implement if I had more time).

What I would do if I had more time:

- Refactor the code, group all the code into a package that can be re-used (unsure of nomenclature in JS, in python its a module/package).
- Create a more specific/bespoke database object. Due to my inexperience with JavaScript I have not learnt many of the nuances of OOP in JS and as such felt more comfortable for now using a simple array to serve as the DB, despite the limited functionality that would provide.
- Add the updating of the db at regular intervals. This would have used the setInterval() functionality but I felt I should be honest and send the solution I currently had. I could have implement this given more time.
- MOST IMPORTANTLY: I would clean the code, I think I have numerous unecessary assignments and I think there is some muddling between local (inside function) variables and global variables in the entire script. Cleaning the code would make it easier to package the functionality to be reused as currently it would require significant refactoring to become a reusable package.

QUESTION 8 EXTENSION:

- FIrst and foremost, using a proper relational database tool such as mySQL to serve as the database. This will provide far more funcationality such as persistance on server shutdown as well as all the tools the software offers.
- Using a more secure protocal instead of ws, possibly wss (websocket-secure) would provide greater encryption between the client and server
- I do not know how to prevent data loss in the event a connection drops or the browser closes. I will probably find out pretty soon as I continue my self-teaching in JS/web development.
