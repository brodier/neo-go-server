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
	        console.log('params: ',req.params);
	        console.log('query: ', req.query);
	        console.log(JSON.stringify(users, null, 4));
	        jsonPlayers = JSON.stringify(
	        	users.map(function(u){
	        		if(u.u.properties)
	        			return {id: u.u._id, name: u.u.properties.name || "no name", level: 0};
	        		else
	        			return {id: u.u._id, name: "no name", level: 1000};
	        	}), null, 4);
	        console.log(jsonPlayers)
	        res.send(jsonPlayers);
	    }
	});
});

router.post('/players', (req, res) => {
	db.cypher({
	    query: 'CREATE (u:User {player}) RETURN u',
	    params: { player: req.query }
	}, function (err, results) {
	    if (err) 
	    	throw err;
	    console.log('req create player with : ', req.query);
	    res.send(req.query);
	});
});

router.get('/players/:id', (req, res) => {
	db.cypher({
	    query: 'MATCH (u:User) WHERE ID(u)={id} RETURN u',
	    params: {id: parseInt(req.params.id) }
	}, function (err, results) {
	    if (err) 
	    	throw err;
	    var result = results[0];
	    if (!result) {
	        console.log('No user found.');
	    	res.send('api works, No user found' );
	    	console.log('params: ',req.params);
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
	    query: 'MATCH (u:User) WHERE ID(u)={id} SET u+= {player} RETURN u',
	    params: {id: req.params.id, player: req.query}
	}, function (err, results) {
	    if (err) {
	    	console.log("Err with Neo4J", err)
	    	res.send('api works, No user found' );
	    	return;
	    }
	    	
	    var result = results[0];
	    if (!result) {
	        console.log('No user found.');
	    	res.send('api works, No user found' );
	    } else {
	        var user = result.u;
	        res.send(JSON.stringify(user, null, 4));
	    }
	});
});

router.delete('/players/:id', (req, res) => {
	db.cypher({
	    query: 'MATCH (u:User) WHERE ID(u)={id} DELETE u',
	    params: {id: req.params.id}
	}, function (err, results) {
	    if (err) 
	    	throw err;
	    console.log("req delete for user id: ", id);
	    res.send({});
	});
});

module.exports = router;
