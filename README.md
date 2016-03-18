# primiere

Primiere is a project boilerplate that brings together modern technologies and modular design patterns into a simplistic static site generator for the team at Primary. So read the documentation, reference back whenever, and enjoy! :wink:

##Introduction

Primiere is nothing more than a preassembled Gulp environment packaged up with some goodies. The brunt of Primiere happens through Gulp, which happens through Node. To get the most out of Primiere, you'll really want to have a solid understanding of the following:

- Configuration
- The Task System

##Configuration

Primiere is nothing more than a preassembled Gulp environment packaged up with some goodies. The brunt of Primiere happens through Gulp, which happens through Node, so the first step in configuring Primiere is knowing how to use the Node and Gulp APIs. Here are some things you want to be familiar with:

- the [basics](https://darrenderidder.github.io/talks/ModulePatterns/#/) of the [module system](https://nodejs.org/dist/latest-v4.x/docs/api/modules.html) absolutely
- the [Path](https://nodejs.org/dist/latest-v4.x/docs/api/path.html) methods for all things filepath
- the [Gulp API](https://github.com/gulpjs/gulp/blob/master/docs/API.md) used for task configuration
- the magic of [globbing](https://github.com/isaacs/node-glob) for paths configuration

#####`__config__/gulpfile.js`

Primiere abstracts everything away into the `__config__` directory, so any changes or modifications you want to make in your setup will happen in there. Check of the diagram below of how Primiere breaks up its configuration. The `gulpfile.js` file defines the tasks to be available through Gulp. Some separate taks into individual files, but I prefer keeping them consolidated for easier reference.

You should note that packages and Gulp plugins used inside tasks are generally not imported via Node's `require`, but with a module called [`lazy-req`](https://www.npmjs.com/package/lazy-req). This just defers actually importing them until they're used, and avoids requiring things we don't need at any given point.

#####`__config__/envars`

Data structures specific to or variable by environment should be stored here, in a file eponymous to the intended environment. Primiere makes the data accessible via the `env` and `e` flags, and defaults to `development` if not specified. The data is accessible in gulpfile via the `Primiere.envars` property and also in templates.

#####`__config__/extend`

The Nunjucks templating engine lets you define [custom filters](https://mozilla.github.io/nunjucks/api.html#custom-filters) and [custom tags](https://mozilla.github.io/nunjucks/api.html#custom-tags) and Primiere looks in this directory for any custom extensions to add to its Nunjucks environment, from their respective subdirectories. As well, the `locals` subdirectory houses any data to be globally available in templates.

#####`__config__/options`

Rather than clutter the gulpfile with data structures passed to plugins, Primiere abstracts plugin options into separate files; this is where those files go. Every compatible file inside here is available in the gulpfile via the `Primiere.option` property, or via the `_` variable as a shortcut. Just make sure your options are exported from their file.

####The Primiere Configuration File

Primiere exposes on source of configuration outside the `__config__` directory, referring to project root for `.primiere`. This file is enables certain features of Primiere and, even more importantly, stores in the `paths` object the paths to be used in each task.

##The Task System

Primiere ships with eight preassbled tasks &mdash; hopefully they'll cover most of yours needs. For a run-down of the tasks available, check out the gulpfile; each is fully documented in terms of what it does and what flags are available.
