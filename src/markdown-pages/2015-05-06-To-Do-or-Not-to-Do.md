---
title : To Do or Not to Do
---

I was recently in dire need of a hash table implementation in C and wasn’t ready to write one just then. With some luck and after considerable foraging on the internet I came across Troy Hanson’s project, [uthash](http://troydhanson.github.io/uthash/userguide.html) which provides a hash table for C structures.

For some reason, I needed to tweak one of the functions and found uthash to consist entirely of a single header file with macros like this:

```bash
#define FOO(stuff)        \
do {                      \
    thing1();             \
    thing2();             \
} while(0)
```

It seemed perfectly redundant to have a loop that always executes exactly once. Like most things in the universe, it has a reasonable explanation for its awkwardness.

>“It's the only construct in C that you can use to #define a multistatement operation, put a semicolon after, and still use within an if statement.”

For example, if FOO was defined as below:

```bash
#define FOO(stuff) thing1(); thing2()
```

the following if-else construct would be syntactically wrong:
```bash
if (condition)                     
    FOO(stuff);                  
else                                   
    other_stuff();                 
                                       

// Preprocessed to:                                       
if (condition)
    thing1();
    thing2();  => Compiler cries.
else
    other_stuff();
```

Even enclosing the macro body in braces would not help, as you would need to omit the semicolon after the call to FOO, which is counter-intuitive.

```bash
#define FOO(stuff) { thing1(); thing2(); }

if (condition)
    FOO(x)
else
    other_stuff();
```

The do-while-zero construct makes this syntactically correct:

```bash
if (condition)
    FOO(x);
else
    other_stuff();
```

On the other hand, you could just use a function and save yourself the brain jitters.