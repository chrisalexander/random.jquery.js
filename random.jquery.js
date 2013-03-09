(function( $ ) {

	// Queue of retrieved random numbers
	var q = [];

	// Current requesting state
	var requesting = false;

	// Lock to prevent fast calls to the API
	var requestable = true;

	// Timeout for when the next request can take place
	var requestTimeout = false;

	// Log for debugging
	var log = function() {
		//console.log(arguments);
	};

	// For requesting stuff from random.org
	var request = function(count) {
		if (requesting || q.length > 1000 || !requestable) {
			// Already requesting or too much data
			log("Not requesting", requesting, requestable, q.length);
			return;
		}
		if (navigator.hasOwnProperty("onLine") && !navigator.onLine) {
			// Currently offline
			log("Offline");
			return;
		}
		requesting = true;
		requestable = false;

		setTimeout(function() {
			requestable = true;
			log("Requestable");
		}, 60000);

		if (!count || count < 100) {
			// Default count to min of 100
			count = 100;
		}

		$.get("http://www.random.org/decimal-fractions/?num=" + count + "&dec=17&col=1&format=plain&rnd=new").done(function(data) {
			var data_array = data.split("\n");
			data_array = data_array.slice(0, -1).map(parseFloat);
			log("Received data", data_array);
			q = q.concat(data_array);
			requesting = false;
		});
	};

	// Add a listener for when the device goes back online, so that we can get more randoms then
	window.addEventListener("online", function() { request(); });

	// The random function
	$.fn.random = function(input, n) {
		if (input == "init") {
			request();
		} else if (input == "available") {
			return q.length;
		} else if (input == "precache") {
			if (!n) {
				// Bad input, ignore call
				return;
			}
			if (n > 1000) {
				throw "Your precache count must be 1000 or less";	
			}
			if (q.length >= n) {
				// The queue is already long enough
				return true;
			} else {
				// Need moar items
				request(n - q.length);
				return false;
			}
		} else {
			// They want a number
			var number;
			var reason = "";
			if (q.length < 10) {
				// Running out of numbers, get some more
				request();
			}
			if (q.length) {
				number = q.shift();
				reason = "random";
			} else {
				number = Math.random();
				reason = "pseudorandom";
			}
			if (input) {
				// They want it as a tuple
				return [number, reason];
			}
			return number;
		}
	};
})( jQuery );
