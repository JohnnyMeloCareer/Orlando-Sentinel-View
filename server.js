var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var path = require("path");

var app = express();

// Set the app up with morgan.
// Morgan is used to log our HTTP Requests. By setting morgan to "dev"
// The :status token will be colored red for server error codes,
// Yellow for client error codes, cyan for redirection codes,
// And uncolored for all other codes
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Database configuration
var databaseUrl = "placeholder"
var collections = ["notes"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any monogojs config to db variable
db.on("error", function(error) {
    console.log("Database Error:", error);
});

// Routes
// ======

// Simple index route
app.get("/", function(req, res) {
    const websiteScrape = "https://www.orlandosentinel.com/";
    
    axios.get(websiteScrape).then(function (response) {
        console.log("orlandoData: " , reponse.data);

        const $ = cheerio.load(response.Data);

        var results = [];
        $("article").each(function(index, element) {
            results.push({
                article: $(this);
                
            })
        })
        res.json(results);
    }



    // res.render // COME BACK TOO AND FIX <--
})

// Handle form submission, save submission to mongo
app.post("/submit", function(req, res) {
    console.log(req.body);
    // Insert the note into the notes collection
    db.notes.insert(req.body, function(error, saved) {
        // Log any errors
        if (error) {
            console.log(error);
        }
else {
    // Otherwise, send the note back to the browser
    // This will fire off the success function of the ajax request

    res.send(saved); // COME BACK TOO AND FIX <--
}
    }):
}):

// Retrieve results from mongo
app.get("/all", function(req, res) {
    // Find all placeholder in the placeholder collection
    db.notes.find({}, function(error, found) {
        // Log any errors
        if (errors) {
            console.log(error);
        }
        else {
            // OTherwise, send json of the notes back to user
            // This will fire off the success function of the ajax request
            res.json(found);
        }
    });
});

// Sleect just one note by an id
app.get("/find/:id", function(req, res) {
    // When searching by an id, the id needs to be passed in
    // as (mongojs.ObjectId(IdYouWantToFind))

    // Find just one result in the notes collection
    db.notes.findOne(
        {
            // Using the id in the url
            _id: mongojs.ObjectId(req.params.id)
        },
        function(error, found) {
            // log any errors
            if (error) {
                console.log(error);
                res.send(error);
            }
            else {
                // Otherwise, send the placeholder to the browser
                // This will fire off the success function of the ajax request
                console.log(found);
                res.send(found);
            }
        }
    );
});

// Update just one note by an id
app.post("/update/:id", function(req, res) {
    // When searching by an id, the id needs to be passed in
    // as (mongojs.ObjectId(IdYouWantToFind))
  
    // Update the note that matches the object id
    db.notes.update(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        // Set the title, note and modified parameters
        // sent in the req body.
        $set: {
          title: req.body.title,
          note: req.body.note,
          modified: Date.now()
        }
      },
      function(error, edited) {
        // Log any errors from mongojs
        if (error) {
          console.log(error);
          res.send(error);
        }
        else {
          // Otherwise, send the mongojs response to the browser
          // This will fire off the success function of the ajax request
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });
  
  // Delete One from the DB
  app.get("/delete/:id", function(req, res) {
    // Remove a note using the objectID
    db.notes.remove(
      {
        _id: mongojs.ObjectID(req.params.id)
      },
      function(error, removed) {
        // Log any errors from mongojs
        if (error) {
          console.log(error);
          res.send(error);
        }
        else {
          // Otherwise, send the mongojs response to the browser
          // This will fire off the success function of the ajax request
          console.log(removed);
          res.send(removed);
        }
      }
    );
  });
  
  // Clear the DB
  app.get("/clearall", function(req, res) {
    // Remove every note from the notes collection
    db.notes.remove({}, function(error, response) {
      // Log any errors to the console
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(response);
        res.send(response);
      }
    });
  });

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});