---
title: Dot Slash To Do
---
I like to make a list of things that need to be done for the day, although my approach tends to be a little chaotic&#8212;make a list on a post-it taped to the corner of my screen, make a list in evernote or keep or what-have-you, scribble in unintelligible letters on my whiteboard. Either way, I can’t remember *where* I’ve written down the things I need to remember, let alone remember what I actually need to remember!

To ease this menace, I went about writing a little command line To Do list that'll tell me what I need to do when I ask it.

Here’s a sample run:

```bash
$ todo add Go to XYZ

$ todo add Meet Phil

$ todo
1. Go to XYZ
2. Meet Phil

$ todo del
What’ve you done old (wo)man?
------
1. Go to XYZ
2. Meet Phil
------
1

$ todo
1. Meet Phil
```

Here's what `todo` can do:

1. `todo add <thing to be done>` will add an entry to your To Do list. 

2. `todo del` will ask you which entry to remove from your To Do list.

3. `todo` will show you the things you need to do.

4. `todo help`

It’s pretty simple but it has helped me immensely. You can check out the code and installation instructions [here](https://github.com/Deborah-Digges/dot-slash-todo).


