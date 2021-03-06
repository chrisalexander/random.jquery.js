random.jquery.js
================

A jQuery plugin for generating random numbers.

## Durrrr, Math.random()???

It's true, you *could* simply do:

    Math.random();
    
That will give you a random number.

However, it really is only *pseudorandom*. This means its basically picked from a list.

The server at random.org provides truly random numbers as generated from atmospheric noise. It's a slightly less expensive way of doing it than waiting for various nuclear atoms to decay.

When an internet connection is available, this plugin is capable of retrieving random numbers from the random.org API and substituting them in for normal JavaScript random numbers.

Why would you do this? Maybe you want more randomness, geek points, or just for fun. At least you don't need to faff around writing code to do it now.

## Installation

Include jQuery in your page (either in the &lt;head&gt; or at the bottom of your &lt;body&gt;). Perhaps use a CDN like so:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

Then, after it, include the random library. For production use, it's recommended to use the minified version:

    <script src="//raw.github.com/chrisalexander/random.jquery.js/master/random.jquery.min.js"></script>

## Usage

### Basic usage

Use either on a jQuery function or on the jQuery object:

    $().random();

or:

    jQuery.fn.random();
    
All of the random numbers generated look exactly like normal JavaScript random numbers.
    
### Advanced usage

##### How random?

When you get a random number, you can provide a boolean parameter to find out how random the number is, like so:

    $().random(true);
    
This makes random() return a tuple, of the random number and just how random it is.

For random numbers generated by Math.random(), the returned value will look like this:

    [0.5670705798547715, "pseudorandom"]
    
For random numbers obtained from random.org, the returned value will look like this:

    [0.6050752005539834, "random"]
    
##### What if I know I will want several random numbers in a while?

To prepare the plugin to receive a lot of requests to the random() function, you can let it know you will need around a certain number of random numbers in advance.

Simply call the method with "precache" as an argument, and how many numbers you will likely need.

For example, if you will need ~300 numbers, call:

    $().random("precache", 300);
    
This will return a boolean - true if there are that number or more in the cache already, false if there currently isn't.

If there isn't enough to service your request, an async call will be kicked off to get enough for you.

You can call the same function again later, and it will return false until there is enough numbers, at which point it will return true.

##### How do I know how big the random number cache is?

    $().random("available");
    
Returns an integer number of how many numbers are available in the cache.

##### What if I want my first call to return a truly random number?

If you don't do anything, the first call to random() will return a number generated by Math.random() while the plugin goes and fetches you some random numbers.

To make it get some random numbers in advance, simply:

    $().random("init");
    
This will get it to load up some numbers. You can find out when its ready when available returns > 0:

    var ready = $().random("available") > 0;

Then you can go get a random number:

    $().random();

##### Is it synchronous?

All requests to the .random() function are entirely **synchronous**.

This means no waiting around for network requests just to get a random digit.

If requests need to be made, they are done in the background.

## Contributing

Please, send a pull request! Bug fixes, tests, improvements are all welcome.

Changes to "make things more JavaScript-y" will not be accepted.
