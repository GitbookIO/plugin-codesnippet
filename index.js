var fs = require('fs');
var path = require('path');

console.log('include includeCode');
module.exports = {
    blocks: {
        codesnippet: {
            process: function(block) {
                var filename = block.args[0];
                if (!filename) throw new Error('Require a "filename" as first argument');

                // Determine language
                var language = block.kwargs.language || path.extname(filename).slice(1);

                // Read the file
                return this.book.readFile(filename)

                // Return the html content
                .then(function(content) {
                    return '<pre><code class="lang-' + language + '">' + content + '</code></pre>';
                });
            }
        }
    }
};
