var Q = require('q');
var url = require('url');
var fs = require('fs');
var path = require('path');
var request = require('request');

function codeblock(language, content) {
    return '<pre><code class="lang-' + language + '">' + content + '</code></pre>';
}

module.exports = {
    blocks: {
        codesnippet: {
            process: function(block) {
                var that = this;
                var filename = block.args[0];

                // Determine language
                var language = block.kwargs.language || (filename? path.extname(filename).slice(1) : '');

                if (!filename) return codeblock(language, block.body);

                // Read the file
                return Q()

                .then(function() {
                    if (url.parse(filename).protocol) {
                        var d = Q.defer();

                        request(filename, function (error, response, body) {
                            if (error) return d.reject(error);
                            if (Math.floor(response.statusCode/200) != 1) d.reject(new Error('No 2XX status code when downloading '+filename));

                            d.resolve(body.toString('utf-8'));
                        });

                        return d.promise;
                    } else {
                        return that.book.readFile(filename);
                    }
                })

                // Return the html content
                .then(function(content) {
                    return codeblock(language, content);
                });
            }
        }
    }
};
