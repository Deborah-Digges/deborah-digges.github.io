Garbage Collection is a form of automatic memory management. It reclaims objects that are no longer in use, saving the programmer the effort of the wild goose chase that tracing memory related bugs often is.<br/>
+1 to [John McCarthy](http://swizec.com/blog/the-birth-of-lisp-a-summary-of-john-mccarthys-original-paper/swizec/5075).<br/>
Let’s try to understand what a  GC does and how it does it.

##Thanks for the Memory

![Process Memory Layout](https://github.com/Deborah-Digges/Deborah-Digges.github.io/blob/master/images/memory-layout.png "Memory Layout")

When a program runs, it is designated a process and is entitled to a virtual address space. The concept of virtual addressing is a different beast altogether, but in essence here’s what it means:<br/> 
On a 32 bit system, the address bus is 32 bits wide; the number of addressable locations is 2<sup>32</sup>. Memory is byte-addressable -- the smallest addressable unit of memory is a byte. Coupling this fact with the previous gives us a total of 2<sup>32</sup> bytes of addressable memory(~ 4GB). *Every* process’ virtual address space is 4GB. A process *assumes* it owns the entire memory space. At run time, these addresses are translated to *real* hardware addresses by the MMU and the OS. Groovy. 

The stack handles procedure calls and returns and is used for passing arguments and return values to and from functions. Local variables are allocated on the stack. A key point to note is that their size is known at compile time, but allocation for them is made at run time when the function is called. There is a limit to the size of variables that can be allocated on the stack.

Global data in the program is stored in the data segment. Their size is known at compile time, as is the virtual address to which they are bound. This is possible because of virtual addressing; the compiler doesn’t need to know what memory is free at a particular point in time - it binds a virtual address in the data segment to the static data member.

The heap is the only place where dynamic allocation is possible. It is a large pool of memory from which memory requests are satisfied at run time. Requests for allocation return a pointer to a block of heap memory of the required size. At any point in time, some parts of the heap are in use and the others are free.


##So, What is Garbage ?

The only way to access heap memory is through pointers returned by allocations. So, if a region of heap memory is marked as *allocated* , but it is not accessible i.e. no pointer points to the block, it is termed Garbage.
>“Allocated but not accessible”

It’s important to realize that garbage can *only* occur on the heap.

This is congruent to the concept of a dangling pointer - where a location is freed, but a pointer
to it still exists.
>“Accessible but no allocation”

Dangling pointers can occur anywhere.

##Now, for What a GC Does

Reiterating - Garbage Collection is a form of automatic memory management. It reclaims objects that are no longer in use. 
The garbage collector only reclaims objects on the heap.

##Sweep the Heap, Don’t Whack the Stack

It makes no sense for the garbage collector to consider collecting stack memory because the stack is not managed that way: Everything on the stack is considered to be "in use". And memory used by the stack is automatically reclaimed when you return from method calls. Memory management of stack space is so simple, cheap and easy that you wouldn't want garbage collection to be involved.

##The Root of All GCs

Variables on the stack, in the data segment and in registers that reference heap memory form the *root set*. The gc de-allocates values that are not reachable by following references from the root set. 


##No Silver Bullet

There are a host of ways in which a GC may, starting from the root set, find unused heap memory and re-claim it. The three classical methods of storage reclamation are:

(1)   The Reference Counting Algorithm

It tracks down unused memory by counting the number of references to each block allocated on the heap. Each block maintains the count of the number of references to it. When the count for a block reaches zero, it is deemed unused and reclaimed by the GC.
It is a naturally incremental technique, distributing the overheads of memory management throughout the program.

(2)   The Mark-Sweep Algorithm

Lisp, the brain child of McCarthy contained the first stop-the-world GC(also the first GC).
Garbage is not re-claimed as soon as it is created, but rather when storage is exhausted. At this point, when an allocation is requested, “useful” processing is temporarily halted while the GC routine runs.
It’s pretty intuitive:<br/>
The mark phase starts from the roots, traverses all references recursively to find the graph of all reachable objects. <br/>
The sweep phase identifies all blocks that are unmarked as garbage and reclaims them.

(3)   The Copying Algorithm

The heap is divided equally into two semi-spaces, one containing current data and the other obsolete data. The collector starts by flipping the two spaces. The active blocks in the old semi-space, FromSpace, are copied to the new semi-space ToSpace. After this process, a replica of the active data structure of the program has been created in ToSpace. Garbage cells are simply abandoned in the old space. These collectors are called Scavengers - - they pick out worthwhile objects from amidst the garbage and take them away.

The algorithm chosen depends largely on the requirements of the system and the type of data that it generates.

##In Conclusion

I’ve described garbage collection as the automatic reclamation of unused memory.
However, this description loses sight of the forest for the trees and confuses the mechanism with the goal. It's like saying the job of a firefighter is "driving a red truck and spraying water".
Garbage collection is simulating a computer with an infinite amount of memory. The rest is mechanism. 

>Reduce, Reuse, Recyle

