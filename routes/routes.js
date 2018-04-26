var morgan = require('morgan');
var express = require('express');

//var Movie = require('../models/movie');
var Composition = require('../models/composition');

// app/routes.js
module.exports = function(app, passport) {
    
    app.use(morgan('dev')); //log requests to console
    
    app.get('/edit', function(req, res) {
        res.render('edit.ejs'); // load the edit.ejs file
    });


    // HOME PAGE 
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // LOGIN
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form

    // SIGNUP 
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form

    // PROFILE
    // needs to be logged in to see this page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // LOGOUT
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
        // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the profile screen
        failureRedirect : '/signup', // redirect back to the signup page if error
        failureFlash : true // allow flash messages
    }));
    
        // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the profile screen
        failureRedirect : '/login', // redirect back to the signup page if error
        failureFlash : true // allow flash messages
    }));

    var router = express.Router();
    
    router.use(function(req, res, next){
        console.log("Something is happening");
        next();
    });
    
    router.get('/', function(req, res) {
	   res.json({ message: 'hooray! welcome to our api!' });	//success message
    });
    
router.route('/comps')

	// create a composition
	.post(function(req, res) {
    
    console.log("body:", req.body);
		
        var comp = new Composition();
		comp.title = req.body.title;    //set the composition name
        comp.notes = req.body.notes;    //set the composition notes
        comp.bpm = req.body.bpm;        //set the composition beats per minute
        comp.user = req.body.user;      //set the composition user/creator

		comp.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Composition created!' });
		});
	})

	// get all the compositions
	.get(function(req, res) {
		Composition.find(function(err, comps) {
			if (err)
				res.send(err);

			res.json(comps);
		});
	});

// on routes that end in /comps/:comp_id
router.route('/comps/:comp_id')

	// get the comp with that id
	.get(function(req, res) {
		Composition.findById(req.params.comp_id, function(err, comp) {
			if (err)
				res.send(err);
			res.json(comp);
		});
	})

	// update the comp with this id
	.put(function(req, res) {
		Composition.findById(req.params.comp_id, function(err, comp) {

			if (err)
				res.send(err);

			comp.title = req.body.title;
            comp.notes = req.body.notes;
            comp.bpm = req.body.bpm;
            comp.user = req.body.user;
            
			comp.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Composition entry updated!' });
			});
		});
	})

	// delete the comp with this id
	.delete(function(req, res) {
		Composition.remove({
			_id: req.params.comp_id
		}, function(err, comp) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


//register routes
app.use('/api', router);
  
    //----------------
    
};

//make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated
    if (req.isAuthenticated())
        return next();  //continue

    //not authenticated - back to home
    res.redirect('/');
}
