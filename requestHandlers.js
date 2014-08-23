var querystring = require("querystring"), 
	fs = require("fs"),
    formidable = require("formidable"),
    url = require('url');

var FOLDER_PATH = "web";

module.exports = {
	start: function(response, request) {
		console.log("Request handler 'start' was called.");

		var filePath = FOLDER_PATH + url.parse(request.url).pathname;
		
		if(request.url === "/"){
			filePath += 'index.html';
		}
		
		//console.log(filePath);
		
		var encode = "utf8";
		
		var contentType = "";
		if(request.url.indexOf('.html') != -1){
			contentType = 'text/html';
		}else if(request.url.indexOf('.js') != -1){
			contentType = 'text/javascript';
		}else if(request.url.indexOf('.css') != -1){
			contentType = 'text/css';
		}else if(request.url.indexOf('.png') != -1){
			contentType = 'image/png';
			encode = "binary";
		}else if(request.url.indexOf('.jpg') != -1){
			contentType = 'image/jpg';
			encode = "binary";
		}
		
		module.exports.readFile(response, filePath, encode, contentType);
	},
	upload: function upload(response, request, postData) {
		console.log("Request handler 'upload' was called.");

		module.exports.writeFile(response, postData);
	},
	show: function(response, request) {
		console.log("Request handler 'show' was called.");
		
		module.exports.readFile(response, "tmp/test.jpg", "binary", "image/jpg");
		/*fs.readFile("tmp/test.jpg", "binary", function(error, file) {
		    if(error) {
		    	response.writeHead(500, {"Content-Type": "text/plain"});
		    	response.write(error + "\n");
		    	response.end();
		    } else {
		    	response.writeHead(200, {"Content-Type": "image/jpg"});
		    	response.write(file, "binary");
		    	response.end();
		    }
		});*/
	},
	readFile: function(response, filePath, encode, contentType){
		fs.readFile(filePath, encode, function(error, file) {
	        if (error) {
	        	response.writeHead(404, {'Content-Type': 'text/plain'});
	        	response.write(error + "\n");
	        	response.end();
	            return;
	        }
	        
	        response.writeHead(200, {"Content-Type": contentType});
		    response.write(file, encode);
		    response.end();
	        
		});
	},
	writeFile: function(response, imagedata){
		fs.writeFile("tmp/nail.jpg", imagedata, "base64", function(error) {
			if (error) {
	        	response.writeHead(404, {'Content-Type': 'text/plain'});
	        	response.write(error + "\n");
	        	response.end();
	            return;
	        }
			
		    console.log("The file was saved!");
		    response.writeHead(200, {"Content-Type": 'text/html'});
		    response.write("The file was saved!");
		    response.end();
		});
	}
};




