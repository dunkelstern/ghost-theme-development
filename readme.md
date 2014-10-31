# Ghost Template development environment

<!-- MarkdownTOC -->

- Requirements
- Installation of dependencies
- Building
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

It will fetch a lot of gulp plugins, a ghost package and the [inuitcss](https://github.com/inuitcss) framework.

## Building

There are three main targets for building:
- `default` (just run `gulp` without arguments), builds the complete theme and dumps to `content/themes/dev/`
- `livereload` (run `gulp livereload`) starts a file watcher and a livereload server, and a ghost demo instance. connect your browser to that server (or just depend on the inserted javascript shim) to get a live preview while editing templates or css
- `dist` (run `gulp dist`) packs up the template in `dev-theme.zip` and removes livereload and `.map` files.

## Serving the files with a local webserver

Just use the gulp task `livereload`:

```
gulp livereload
```

This will run a demo ghost instance on http://localhost:2368 (user `template`, email: `example@example.com`, password: `template`) with the dev-theme preselected.