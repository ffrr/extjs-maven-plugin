# ExtJS builder plugin for Maven

This plugin (or Mojo, if you like the maven lingo) is a working proof-of-concept used happily in specific production environments. It was created in the pre-senchacmd era, therefore it is basically deprecated in favor of [Sencha Cmd](https://www.sencha.com/products/extjs/cmd-download/).

Although it's way more lightweight, and quite fast, it lacks any functionality except the dependency resolution and file concatenation. (No minifying, you can use other projects for that. [This one comes to mind, for example.](http://samaxes.github.io/minify-maven-plugin/))

Beware, there's no serious lexing / ast building going on here, the only thing that is parsed (by regex, nonetheless) are the specific dependency directives of ExtJS. Also, the structure of your projects needs to follow the default ExtJS MVC dir struct (models, views, stores, controllers). There was a plan to actually use Rhino as a runtime environment, but it was abandoned. 

## Usage

TBD. For now, read the [docu on the private properties of the mojo descriptor class](https://github.com/ffrr/extjs-maven-plugin/blob/master/src/main/java/com/digmia/maven/plugin/extjsbuilder/BuilderMojo.java).
