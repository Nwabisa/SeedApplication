exports.showFeeds = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}
			

		connection.query('SELECT * FROM post', function(error, results) {
			if (error) return next(error);
			res.render( 'feeds', {
				posts : results
			});
		});
	});
};

exports.add = function(req, res, next) {
	req.getConnection(function(err, connection){
		if (err){ 
			return next(err);
		}
		
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
            title : input.title,
            content : input.content
		};
		console.log(input);
	connection.query('insert into post set ?', data, function(err, results) {	
			if (err)
			console.log("Error inserting : %s ",err );
			console.log(data);
			res.redirect('/');
		});
	});
};

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM post WHERE Id = ?', [Id], function(err,rows){
			if(err){
				console.log("Error Selecting : %s ",err );
			}
			res.render('Editpost',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.showAdd = function (req, res) {
    res.render('write');
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE post SET ? WHERE Id = ?', [data, Id], function(err, rows){
			if (err){
				console.log("Error Updating : %s ",err );
			}
			res.redirect('/write');
		});

	});
};

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM post WHERE id = ?', [Id], function(err,rows){
			if(err){
		         //alert("Are You sure You Want To delete This Product?");
		         console.log("Error Selecting : %s ",err );
		     }
		     res.redirect('/write');
		 });
	});
};