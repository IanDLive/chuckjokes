(function() {
    // Make request of API to return JSON object.
    function _getJSON(url) {
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, encodeURI(url), '', new HashMap());
        return responseData.content;
    }

    // Command event
    $.bind('command', function(event) {
        // All of the default methods are stored in the event argument.
        // To access a method, you would do 'event.myMethod()'.

        // Register all of the methods into variables for ease/readability.
        var command = event.getCommand();
        var sender = event.getSender();
        var arguments = event.getArguments();
        var args = event.getArgs();

        // Decision loops set up to parse an argument that is passed with the command.
        // If no argument is passed, then a random joke is returned.
        if (command.equalsIgnoreCase('chuck')) {
            if (arguments.equalsIgnoreCase('total')) {
                jsonObject = JSON.parse(_getJSON('https://api.icndb.com/jokes/count'));
                $.say('There are a total of ' + jsonObject.value + ' Chuck Norris truths...');
                return;
            }
            if (args[0] !== undefined) {
                jsonObject = JSON.parse(_getJSON('https://api.icndb.com/jokes/' + args[0]));
                $.say('Truth #' + jsonObject.value.id + ' - ' + jsonObject.value.joke);
            } else {
                jsonObject = JSON.parse(_getJSON('https://api.icndb.com/jokes/random'));
                $.say('Truth #' + jsonObject.value.id + ' - ' + jsonObject.value.joke);
            }
        }
    });

    // initReady event to register the commands.
    $.bind('initReady', function() {
        // 'script' is the script location.  IT MUST BE IN SCRIPTS!!!
        // 'command' is the command name without the '!' prefix.
        // 'permission' is the group number from 0, 1, 2, 3, 4, 5, 6 and 7.
        // These are also used for the 'permcom' command.
        // $.registerChatCommand('script', 'command', 'permission');
        $.registerChatCommand('./custom/chuckCommand.js', 'chuck', 7);
    });
})();