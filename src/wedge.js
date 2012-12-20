/*global LowLatencyAudio,cordova,Media,LocalFileSystem,buzz,console*/
/**
 * Wedge.js - Tiny audio library that provides HTML5 apps with low latency audio
 * if available, and falls back to Buzz.js 
 * 
 * Named after a wedge monitor speaker that you'd get onstage at a gig!
 * 
 * This means you can write your HTML5 application to play sound using Wedge.js, and if
 * accelerated audio is availble through Cordova, that will be used. Otherwise,
 * it will fall back to Buzz!. This means you can develop on your desktop and
 * still hear audio, whilst still getting the benefits of low latency audio
 * when you compile.
 * 
 * Under the hood, it uses the LowLatencyAudio plugin for Cordova to provide
 * much more responsive sound than the native HTML5 web audio API.
 * 
 * Dependencies:
 * * Buzz! - http://buzz.jaysalvat.com/ - this is the fallback option. This means
 *   you can still test audio even when you're just working in the web browser.
 * 
 * Optional Dependencies:
 * * Apache Cordova - http://cordova.apache.org/ - if you're building HTML5 for
 *   native
 * * Cordova Low Latency Audio plugin - https://github.com/phonegap/phonegap-plugins/tree/master/iPhone/LowLatencyAudio - 
 *   low latency audio for iOs and Android
 * 
 * Usage:
 * 
 * Loads an object "wedge" onto the window object.
 * 
 * See documentation (supplied with project) for detailed examples, but you
 * can play a sample by doing something like:
 * 
 * wedge.preload("foo/bar.wav");
 * wedge.play("foo/bar.wav");
 * 
 * License:
 * 
 * MIT licensed
 * 
 * Support:
 * * Tested with iOs/Cordova
 * * Should also work with Android
 */
(function() {
    var Wedge = function() {

        // Check dependencies
        if (typeof buzz === 'undefined') {
            throw new Error('Missing dependency: Buzz!. You can download Buzz! from http://buzz.jaysalvat.com/');
        }

        // only used if not accelerated
        this.samples = {};

        // determine if Low Latency Audio is supplied by Cordova. If not, everything
        // will fall back to Buzz.
        this.accelAudioAvailable = false;
        if(typeof cordova !== "undefined" && typeof cordova.exec !== "undefined" && typeof LowLatencyAudio !== "undefined") {
            this.accelAudioAvailable = true;
        }
    };
    
    /**
     * Error message. Displayed on the console.
     * 
     * @param msg String The message to display
     */
    function wedgeError(msg) {
        if(typeof console !== "undefined") {
            console.log(msg);
        }
    }

    /**
     * Get a sound from the internal collection.
     * 
     * Not compatible with LowLatencyAudio.
     * 
     * @param wedge Wedge We pass in the Wedge object so that this function is
     * not a "public method" on Wedge. Otherwise, it would cloud the interface.
     * @param path String e.g. "sfx/foo.wav"
     */
    function getSound(wedge, path) {
        var sound = wedge.samples[path];
        if(sound === null) {
            wedgeError("Wedge.js: Could not play sample " + path + "; perhaps it has not been preloaded?");
            return false;
        }

        return sound;
    }
    
    /**
     * Preload a sample into Wedge. You should not try to play a sample that you
     * have not preloaded.
     * 
     * @param path String e.g. "sfx/foo.wav"
     * 
     * @return Wedge For chaining method calls
     */
    Wedge.prototype.preload = function(path) {
        
        if(this.accelAudioAvailable) {
            LowLatencyAudio.preloadAudio(path, path, 2);
        } else {
            this.samples[path] = new buzz.sound(path);
        }
        
        return this;
    };

    /**
     * Play a sample identified by its path.
     * This will play using accelerated audio if available.
     * @param path String e.g. "sfx/foo.wav"
     * 
     * @return Wedge For chaining method calls
     */
    Wedge.prototype.play = function(path) {

        if(this.accelAudioAvailable) {
            LowLatencyAudio.play(path);
        } else {
            var sound = getSound(this, path);
            if(!sound) {
                return this;
            }

            // Trigger the sound from the start
            if(sound.getPercent() === '--' || sound.getPercent() === 0 || sound.getPercent() === 100) {
                sound.play();
            } else {
                sound.setPercent(0);
            }
        }
        
        return this;
    };

    /**
     * Start looping a sample identified by its path
     * This will play using accelerated audio if available.
     * @param path String e.g. "sfx/foo.wav"
     * 
     * @return Wedge For chaining method calls
     */
    Wedge.prototype.loop = function(path) {
        
        if(this.accelAudioAvailable) {
            LowLatencyAudio.loop(path);
        } else {
            var sound = getSound(this, path);
            if(!sound) {
                return this;
            }

            sound.play().loop();
        }
        
        return this;
    };

    /**
     * Stop a sample identified by its path
     * @param path String e.g. "sfx/foo.wav"
     * 
     * @return Wedge For chaining method calls
     */
    Wedge.prototype.stop = function(path) {

        if(this.accelAudioAvailable) {
            LowLatencyAudio.stop(path);
        } else {
            var sound = getSound(this, path);
            if(!sound) {
                return this;
            }

            sound.stop();
        }
        
        return this;
    };
    
    // export an instance of Wedge to the global object
    window.wedge = new Wedge();
})(window);