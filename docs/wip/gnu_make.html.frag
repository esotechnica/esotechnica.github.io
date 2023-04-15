<h2>Overview</h2>
GNU <code>make</code> is a utility designed to provide an automated build environment, primarily for large software projects.  In a large software product without an automated build mechanism, updating a single file may require the developer to recompile many different modules manually.  The determination of which modules need to be rebuilt, which dependencies need to be examined, etc may be quite complex.  GNU <code>make</code> allows these complexities to be encapsulated in build scripts known as <strong>makefiles</strong>.  Once the build infrastructure has been constructed, a developer need only invoke <code>make</code> to automatically rebuild the entire project.<!--more-->

While <code>make</code> was designed for building software projects, it can be used in any situation where a tree of dependencies exist.  Makefiles typically exist in each directory of a project, usually with the name <code>Makefile</code> or <code>makefile</code>.  This because, by default, <code>make</code> looks for makefiles with these names in the current directory.  You can choose to name the makefile something else, but you must specify to <code>make</code> what that name is via the <code>-f</code> option
<pre>$ make -f <em>makefile_name
</em></pre>
A makefile allows you to define a set of <strong>targets</strong>.  Each target represents either a file that must be updated, or an action that must be performed.

A makefile is primarily a list of <strong>rules</strong>.  Each rule consists of a <strong>target</strong>, a list of <strong>dependencies</strong>, and a <strong>recipe</strong>.  The target acts as both a unique identifier for the rule, and in many cases the name of a file that must be created or updated within the current directory (the exception to this is <em>phony targets</em>, discussed later).

Dependencies are either file names or the names of targets in other rules.  These files/targets must be updated

The make program, when invoked, will execute one or more rules.  The rules to execute can be specified on the command line by listing their targets as parameters to make.

<span style="font-size: 28px; font-weight: 900;">Makefile format overview</span>

A makefile consists of one or more of the following five entities:
<ul>
 	<li style="list-style-type: none;">
<ul>
 	<li style="list-style-type: none;">
<ul>
 	<li>Explicit rules</li>
 	<li>Implicit rules</li>
 	<li>Variable definitions</li>
 	<li>Directives</li>
 	<li>Comments</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3>Explicit Rules</h3>
An <em>explicit rule</em> contains three parts: a list of <strong>targets</strong>, a list of <strong>dependencies</strong>, and a <strong>recipe. </strong>Targets are typically <em>files</em> that need to be created or updated (the exception being <em>phony targets</em>, discussed later).  A target is considered to be <em>stale</em> if:
<ul>
 	<li style="list-style-type: none;">
<ul>
 	<li style="list-style-type: none;">
<ol>
 	<li>A file with the same name as the target does not exist, or</li>
 	<li>Any of its dependencies are out-of-date.</li>
</ol>
</li>
</ul>
</li>
</ul>
<code>make</code> will first examine each dependency in the dependency list.  The name of the dependency may be a target of another rule in the makefile.  If such a rule exists, make will process this rule in order to

A <em>dependency</em> maybe either a target within another rule of the makefile, or a file, or both.  If the dependency is a file, it is considered stale if its modified date/time is later than the modified date/time on the target file.  If the dependency is the target of another makefile rule, then the make program determines if this target is stale in the same manner as described above, in a recursive manner.

The format of a rule is as follows:
<pre><span style="color: #333333;"><em>&lt;target&gt;</em></span> ':' <em>&lt;dependency&gt;</em> {' '+ <em>&lt;dependency&gt;</em>}* '\n'
'\t' <em>&lt;recipe&gt;</em></pre>
<strong>Example</strong>: The following makefile contains explicit rules to build an executable program from three files called main.c, utilities.c and utilities.h
<pre>helloworld: main.o utilities.o
    gcc -o helloworld main.o utilities.o

main.o: main.c utilities.h
    gcc -c main.c

utilities.o: utilities.c utilities.h
    gcc -c utilities.c</pre>
When <code>make</code> processes this makefile, if no target has been specified at the command line, it will update the target for the first rule found.  The first rule has the target <code>helloworld</code>.  If the file <code>helloworld</code> does not exist, it will execute the recipe (<code>gcc -o helloworld main.o utilities.o</code>).  If the file <code>helloworld</code> does exist, it will check the dependencies.  The first dependency is main.o.  If this file exists, and has been modified more recently than helloword, then the recipe is executed