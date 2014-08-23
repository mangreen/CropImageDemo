var http = require("http"),
	url = require("url")
	querystring = require("querystring");;

module.exports = {
	start: function(route, handle) {
		function onRequest(request, response) {
			var pathname = url.parse(request.url).pathname, 
				postData = "",
				responseString = "";
		    //console.log("Request for " + pathname + " received.");
			if (request.method === "GET") {
			
				route(handle, pathname, response, request);
				
			}else if(request.method === "POST") {
			    request.setEncoding('utf8');
				
				request.addListener("data", function(postDataChunk) {
					
					postData += postDataChunk;
				    //console.log("Received POST data chunk '"+ postDataChunk + "'.");
				});
		
				request.addListener("end", function() {
					
					// 解析post数据
					var objectPostData = querystring.parse(postData);
		 
					for (var i in objectPostData) {
						responseString = i + " => " + objectPostData[i];
						console.log(responseString);
					}
					
					route(handle, pathname, response, request, objectPostData["img"]);
				});
			}
		}

		http.createServer(onRequest).listen(8888);
		console.log("Server has started.");
	}
};