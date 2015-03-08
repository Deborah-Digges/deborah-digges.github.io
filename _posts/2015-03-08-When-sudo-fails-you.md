---
title: When sudo Fails You
layout: post
comments: True
---
<div class="disclaimer-header" >
	This post is only relevant to the OS X family and other flavours of UNIX that support BSD flags.
</div>

I was running the fairly common command to make a read-only file writable and ran into permission issues:

{% highlight bash %}
$ chmod +w text.properties 
chmod: Unable to change file mode on text.properties: Operation not permitted
{% endhighlight %}

Strange, especially since I *own* the file:

{% highlight bash %}
$ ls -l text.properties
-r--r--r--  1 ddigges  846622648  0 Mar  3 09:46 text.properties
{% endhighlight %}

To appease the permission gods I tried what I most often think is the fix-me for permission problems:

{% highlight bash %}
$ sudo chmod +w text.properties
chmod: Unable to change file mode on text.properties: Operation not permitted
{% endhighlight%}

*I’m running the command as superuser! Dare defy me.*

What is this mysterious power that will not cower even before the superuser? After digging around a bit in the OS X forums I came across this:

>“Immutable flags are file system attributes that, when enabled, prohibit changes to objects i.e. lock them. Enabled, immutable flags supersede permissions: you cannot modify an object whose immutable flags have been enabled despite having Read & Write permissions on that object.”
-[The X Lab](http://thexlab.com/faqs/immutableflags.html)

These flags are BSD file flags that are used primarily to limit a file's use. They often override traditional Unix permissions.
The *-O option of ls* can be used to inspect what file flags are currently enabled:

{% highlight bash %}
$ ls -lO text.properties
-r--r--r--  1 ddigges  846622648  uchg 0 Mar  3 09:46 text.properties
{% endhighlight %}

uchg is the *User immutable flag* that prevents  inadvertent modification to a file at the user level. When uchg is set, it marks the file as immutable preventing it from being  changed, moved, or deleted, even by root. 

Similarly, there is a flag schg which is the *System Immutable Flag* which can only be enabled or disabled by the superuser in single user mode.

The uchg file flag can be set or cleared by the owner of the file. To clear the uchg flag on the file, run the [*chflags*](http://www.openbsd.org/cgi-bin/man.cgi?query=chflags&section=1) command with *nouchg*:
{% highlight bash %}
$ chflags nouchg text.properties 
{% endhighlight %}
The uchg flag will have been cleared:
{% highlight bash %}
$ ls -lO text.properties 
-r--r--r--  1 ddigges  846622648  - 0 Mar  3 09:46 text.properties
{% endhighlight %}
{% highlight bash %}
$ chmod +w text.properties 
$ ls -l text.properties 
-rw-r--r--  1 ddigges  846622648  0 Mar  3 09:46 text.properties
{% endhighlight %}
And thus will be restored the balance of power in the universe.
