// Import express
let express = require('express');

// Initialize the app
let app = express();

app.use(express.urlencoded({extended:true}))        // parce que body est un texte, pour qu'onpuisse l'uitiliser en faisant .body

let router = require("./routes");
app.use('/', router);

// Launch app to listen to specified port
app.listen(8000, function(){
    console.log('Runnings on port 8000');
})

// http://www.localhost:8000/user