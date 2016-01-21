var path = require('path');
var tester = require('gitbook-tester');
var assert = require('assert');

var pkg = require('../package.json');

describe('codesnippet', function() {
    it('should include file', function() {
        return tester.builder()
            .withContent('#test me\n\n{% codesnippet "./myfile.js" %}{% endcodesnippet %}')
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                "plugins": ["codesnippet"]
            })
            .withFile('myfile.js', 'test')
            .create()
            .then(function(result) {
                var index = result.get('index.html');
                var $ = index.$;

                var codeBlock = $('code[class="lang-js"]');

                assert.equal(codeBlock.length, 1);
                assert.equal(codeBlock.text(), 'test');
            });
    });

    it('should accept a specific language', function() {
        return tester.builder()
            .withContent('#test me\n\n{% codesnippet "./myfile.js", language="hello" %}{% endcodesnippet %}')
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                "plugins": ["codesnippet"]
            })
            .withFile('myfile.js', 'test')
            .create()
            .then(function(result) {
                var index = result.get('index.html');
                var $ = index.$;

                var codeBlock = $('code[class="lang-hello"]');

                assert.equal(codeBlock.length, 1);
                assert.equal(codeBlock.text(), 'test');
            });
    });
});