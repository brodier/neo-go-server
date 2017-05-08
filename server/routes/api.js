const express = require('express');
const router = express.Router();

var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:A1Q2W3@localhost:7474');
 

var getEmail = function(req){
	if(req.query.email){
		return req.query;
	} else {
		return {email: 'default@mail.com'};
	}
}

/* GET api listing. */
router.get('/players', (req, res) => {
	db.cypher({
	    query: 'MATCH (u:User) RETURN u',
	    params: {}
	}, function (err, results) {
	    if (err) 
	    	throw err;
	    var result = results[0];
	    if (!result) {
	        console.log('No user found.');
	    	res.send('api works, No user found' );
	    } else {
	        var users = results;
	        console.log(JSON.stringify(users, null, 4));
	        console.log('params: ',req.params);
	        console.log('query: ', req.query);
	        res.send(JSON.stringify(users, null, 4));
	    }
	});
});

router.post('/players', (req, res) => {
	db.cypher({
	    query: 'MATCH (u:User) RETURN u',
	    params: {}
	}, function (err, results) {
	    if (err) 
	    	throw err;
	    console.log('req create player with : ', req.query);
	    res.send(req.query);
	});
});

router.get('/players/:id', (req, res) => {
	db.cypher({
	    query: 'MATCH (u:User {_id: {param_id}}) RETURN u',
	    params: {param_id: req.params.id}
	}, function (err, results) {
	    if (err) 
	    	throw err;
	    var result = results[0];
	    if (!result) {
	        console.log('No user found.');
	    	res.send('api works, No user found' );
	    } else {
	        var user = result.u;
	        console.log(JSON.stringify(user, null, 4));
	        console.log('params: ',req.params);
	        console.log('query: ', req.query);
	        res.send(JSON.stringify(user, null, 4));
	    }
	});
});

router.put('/players/:id', (req, res) => {
	db.cypher({
	    query: 'MATCH (u:User {email: {email}}) RETURN u',
	    params: {_id: req.params.id}
	}, function (err, results) {
	    if (err) 
	    	throw err;
	    var result = results[0];
	    if (!result) {
	        console.log('No user found.');
	    	res.send('api works, No user found' );
	    } else {
	        var user = result.u;
	        console.log(JSON.stringify(user, null, 4));
	        console.log('req update for ',req.params);
	        console.log('query: ', req.query);
	        res.send(JSON.stringify(user, null, 4));
	    }
	});
});

router.delete('/players/:id', (req, res) => {
	db.cypher({
	    query: 'MATCH (u:User {email: {email}}) RETURN u',
	    params: getEmail(req)
	}, function (err, results) {
	    if (err) 
	    	throw err;
	    console.log("req delete for user id: ", id);
	    res.send({});
	});
});

module.exports = router;
