var fs = require('fs');
var path = require('path');

function codeblock(language, content) {
    return '<pre><code class="lang-' + language + '">' + content + '</code></pre>';
}

module.exports = {
    blocks: {
        codesnippet: {
            process: function(block) {
                var filename = block.args[0];

                // Determine language
                var language = block.kwargs.language || (filename? path.extname(filename).slice(1) : '');

                if (!filename) return codeblock(language, block.body);

                // Read the file
                return this.book.readFile(filename)

                // Return the html content
                .then(function(content) {
                    return codeblock(language, content);
                });
            }
        }
    }
};
