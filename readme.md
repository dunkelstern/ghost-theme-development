# Ghost Template development environment

<!-- MarkdownTOC -->

- Requirements
- Installation of dependencies
- Building
- Mock-Data for Handlebars templates
- Serving the files with a local webserver

<!-- /MarkdownTOC -->

## Requirements

1. [nodejs](http://nodejs.org),
    On a mac fetch it with _homebrew_: `brew install nodejs`
2. [gulp](http://gulpjs.com),
    Install via _npm_ if you don't have it: `npm install -g gulp`
3. [bower](http://bower.io),
    Install via _npm_ if you don't have it: `npm install -g bower`

## Installation of dependencies

Execute the following commands while in the package dir (`package.json` lies there):
- `npm install`
- `bower install`

It will fetch a lot of gulp plugins and the [inuitcss](https://github.com/inuitcss) framework.

## Building

There are three main targets for building:
- `default` (just run `gulp` without arguments), builds the complete theme and dumps to `build/`
- `livereload` (run `gulp livereload`) starts a file watcher and a livereload server, connect your browser to that server (or just depend on the inserted javascript shim) to get a live preview while editing templates or css
- `serve` (run `gulp serve`) runs a local webserver that serves the content of the `build`-directory (livereload enabled!)

## Mock-Data for Handlebars templates

If you want to fill a Handlebars template with some mock data to live preview the generated HTML create a mock json file.

For the Template `example.hbs` The file must be named `example.hbs.mockdata.json` and has to be a valid json file, else the gulp task will crash.

## Serving the files with a local webserver

You could just the already installed `http-server` from node:

```
cd build && ../node_modules/http-server/bin/http-server -o
```

Or use the gulp task `serve`:

```
gulp serve
```

if you use the gulp task, you can configure which version of live-reload the server should use. Set the variable `socket_io_livereload` in `gulpfile.js` to  `true` if you're having problems with the site not reloading in your browser/app (phonegap comes to mind).
