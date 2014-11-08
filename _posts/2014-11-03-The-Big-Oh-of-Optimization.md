---
title: The Big Oh of Optimization
layout: post
---
We now have a functional GC, but we need to ask ourselves the question-*Can we do better?* This is a toy implementation, but if we look at something [real](https://github.com/Deborah-Digges/mark-sweep-simulation/tree/master/04-Demo-GC-Pauses), we find that the invocation of a mark-sweep GC causes pauses in the execution of the actual program, especially for programs which show a high memory utilization. When memory hits a low, the GC is invoked, and there are *noticable* pauses. Of course, we wouldn’t want these pauses to be too long so we need to figure out *where* we can do better.

## What to Optimize
A good way to identify bottlenecks is by using a profiling tool like *gprof*. We add a *new test* for performance, where we initialize a heap of a 100,000 blocks and a threshold GC invocation of 1,000 blocks. The profiling shows the following results.
![GPROF]({{site.url}}/images/gprof.png)
<div class="align-center">Fig: Gprof Profile</div>

A lot of the execution time is spent in the standard library functions and in the core GC routines - mark & sweep. We now know what to optimize.

## Optimizing the Mark Routine
Revisiting the mark routine, we see that it is recursive. There is a significant time and space cost associated with such a recursive function because of the slowness of function calls and returns, and the overhead of managing the stack.
However, what recursion *is* great for is *understanding* the problem. 
>“Loops may achieve a performance gain for your program. Recursion may achieve a performance gain for your programmer”.
 
The algorithm is succinct and lends itself to easy interpretation -
Mark an object if it isn't already marked; if it has references to other objects, mark those too.

{% highlight C++ %}
{% raw %}
void VM::mark(Object* object)
{
        if(object->marked)
        {
                return;
        }

        object->marked = 1;

        if(object->type == OBJ_PAIR)
        {
                mark(object->left);
                mark(object->right);
        }
}
{% endraw %}
{% endhighlight %}

## Implementing Mark using an Explicit Stack
The mark routine can be [implemented iteratively](https://github.com/Deborah-Digges/mark-sweep-simulation/tree/master/02-marksweep-Explicit-Stack). We use an explicit stack for traversing allocated objects. It *does* the same thing, although [the code](https://github.com/Deborah-Digges/mark-sweep-simulation/blob/master/02-marksweep-Explicit-Stack/vm.cpp/#L151-192) is more contorted and unnatural.<br/>
As we traverse a node, it is marked; it is pushed onto the stack if there are other nodes reachable from it--if it is not an atom. The algorithm repeateadly pops elements from the stack, marks the elements reachable from the popped element and performs the same procedure till the stack becomes empty.<br/>

![GPROF]({{site.url}}/images/traversal.png)
<div class="align-center">Fig: Mark Using an Explicit Stack</div>


So, we've managed to convert the recursive algorithm into an iterative one, with some loss of elegance in the program code and some gain in speed.

## Premature Optimization is the Root of All Evil
It’s a good idea to get a good grasp of the problem you’re trying to solve before trying to solve it better. Recursion helped us with just this--we *understood* what we were trying to do and *then* tried improving it.

While this code does improve our algorithm’s time, there is still the question of space. The size of the stack used for traversal grows linearly with the number of objects being traversed.

We ask ourselves the golden question-*can we do better?*
