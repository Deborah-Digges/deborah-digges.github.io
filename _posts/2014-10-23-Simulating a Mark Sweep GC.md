---
title: Simulating a Mark Sweep GC
layout: post
comments: True
---

To understand the basic machinery of a garbage collector, consider a *virtual machine* that has to it’s disposal a pool of *free memory*--typically called the *heap*. Requests for memory needed at run time are satisfied from this free list. <br/>
A simplifying assumption we are making is that allocation of memory is always in *fixed size* blocks. If this weren’t the case, we would have to slay an ugly dragon called *fragmentation* which we will save for another day.<br/>
The virtual machine’s *execution stack* holds references to objects, which can either be atomic or can in turn hold references to other objects. 

![VM]({{site.url}}/images/gc.png)
##What does Allocation Involve?
Allocation of memory for any purpose, such as object creation, involves removing a memory block from the *free list* and adding it to the *allocated list*. The reference to the newly created object will be pushed onto the stack, so the program can manipulate it’s contents.

##What are Reachable Objects?
Reachable objects are those referenced directly from the stack or those that can be reached by following references from reachable objects. This is a naturally recursive definition, which results in a graph of reachable objects, starting from the roots of the program--the variables referenced from the execution stack. Only reachable objects are those truly usable by the program(You can’t use an object if you can’t get to it). 
The objects shown in *green* are those reachable.

##Garbage == Unreachable Objects?
Any object that is unreachable is termed garbage because it is not of any use to the executing program. It can’t be allocated for any other request despite it being unused. 
The objects shown in *red* are the ones unreachable, ripe for collection.

##The Mark Phase
Starting from the objects referenced from the stack, the mark procedure proceeds to *mark* all reachable objects. At the end of this phase, the objects shown in green will be marked.

##The Sweep Phase
The objects which are unreachable are *collected* which moves them to the free list. A single pass is made through the allocated list, and all objects unmarked at the end of the mark phase are removed from this list and returned to the free list.

##When Can the GC be invoked?
<ol>
<li>Explicitly -- akin to Java’s System.gc() call( Although this is only a <i>suggestion</i> to the JVM)</li>
<li>When memory runs low or even dry.</li>
<li>When the number of allocations crosses some predefined threshold.</li>
</ol>

So, there it is - A *simulation* of a mark sweep GC.<br/>
You can find the code for the above simulation [here](https://github.com/Deborah-Digges/mark-sweep-simulation).
