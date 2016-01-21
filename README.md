# Include code snippets in your GitBook

This plugins makes it easy to import files as code blocks in your GitBook.

### How to use it?

Add it to your `book.json` configuration:

```
{
    plugins: ["codesnippet"]
}
```

And then in your content:

```md
This is a code snippet:

{% codesnippet "./myfile.js" %}{% endcodesnippet %}
```

Using a specific language:

```md
This is a code snippet, display as HTML:

{% codesnippet "./myfile.ejs", language="html" %}{% endcodesnippet %}
```
