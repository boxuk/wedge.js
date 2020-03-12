# Unmaintained

wedge.js
========

Tiny audio library that provides HTML5 apps with low latency audio if available,
and falls back to [Buzz! by Jay Salvat](https://github.com/jaysalvat/buzz).

Named after a wedge monitor speaker that you'd get onstage at a gig, this library
is designed for people who want very simple playback - no fancy effects, only
loading and playing and looping sounds. It's targeted at cross-platform development,
to make it easy to target both desktop and mobile HTML5 apps.

This means you can write your HTML5 application to play sound using Wedge.js, and if
accelerated audio is availble through Cordova, that will be used. Otherwise,
it will fall back to Buzz!. This means you can develop on your desktop and
still hear audio, whilst still getting the benefits of low latency audio
when you compile.
 
Under the hood, it uses the LowLatencyAudio plugin for Cordova to provide much more responsive sound than the native HTML5 web audio API.

Documentation
-------------

Clone the repo, then cd to the directory. This may be something like:

    git clone git://github.com/boxuk/wedge.js.git
    cd wedge.js

Then, load the dependency on Buzz.js as a submodule:

    git submodule init
    git submodule update

For usage examples, please see the "examples" directory of this project. There is also <a href="http://boxuk.github.com/wedge.js/examples/index.html">a Github page showing this in action</a>!

If you're running a Cordova/PhoneGap project and want LowLatencyAudio, see the documentation for the [Cordova Low Latency Audio plugin](https://github.com/phonegap/phonegap-plugins/tree/master/iPhone/LowLatencyAudio) and make sure that dependency is available to your application.

Dependencies
------------

 * [Buzz! by Jay Salvat](https://github.com/jaysalvat/buzz) - this is the fallback option. This means
  you can still test audio even when you're just working in the web browser.
 
Optional Dependencies
---------------------

 * [Apache Cordova](http://cordova.apache.org/) - if you're building HTML5 for native iOS/Android.
 * [Cordova Low Latency Audio plugin](https://github.com/phonegap/phonegap-plugins/tree/master/iPhone/LowLatencyAudio) - low latency audio for iOS and Android.
 
License
-------
 * MIT licensed (see LICENSE-MIT)
 
Support
-------

 * Tested with iOS/Cordova/Low Latency Audio plugin
 * Should also work with Android/Cordova/Low Latency Audio plugin

Contributing
------------
For contributing guidelines, please see CONTRIBUTING.md
