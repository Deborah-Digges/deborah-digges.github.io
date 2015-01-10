---
title : Stroustrup on Campus
layout: post
---
It’s not everyday that the creator of C++ visits your campus. And when he does, everyone scurries around in giddy excitement hoping to exchange a word with him at least. Today was that day for PES University. At 11AM, Bjarne Stroustrup entered the auditorium, sending a wave of hushes down the rows of students and teachers, as the crowd fell silent and stood to applaud him. 

##The  Essence of C++
“Lots of people have really different ideas about what C++ is", Stroustrup began, using the analogy of a blind man trying to describe an elephant: “a tail, a trunk, perhaps a wonderfully large leg, is as far as he would get”. The ultimate aim of a  programming language is to build *maintainable systems* and often in the deluge of details and nuances we lose sight of the bigger picture. 


###What is C++?
C++, he explained, is a systems programming language, used in embedded systems and other resource constrained environments. 
>“C++ is expert friendly, but it is not *just* expert friendly.”

##Resource Management
He went on to explain the concept of a resource as anything that needs to be released after having been initially acquired. 
>“It’s not just memory; There’s file handles, locks, sockets, threads. If you leak enough file handles, your OS would freeze!”

##Pointer Misuse
>“The complexity of your code should reflect the complexity of what you’re doing”
{% highlight C++ %}
{% raw %}
void f(int x, int n)
{
	Gadget * g = new Gadget{n}; // Look ! I’m a Java Programmer :)
	if(x < 100) throw std::runtime_error{"weird"}; //leak
	if(x < 200) return; //leak
	delete p;
}	
{% endraw %}
{% endhighlight %}
Stroustrup went through the problems with raw pointers explaining how leaks occur when a pointer is not freed in the case of an exception or a return.
>“Most uses of pointers in local scope are not exception safe”.

The cleaner approach, he explained, would be to use a unique\_ptr,which fires the destructor for the object as soon as the unique\_ptr is destroyed.

{% highlight C++ %}
{% raw %}
unique_ptr<Gadget> g {new Gadget{n}}; // Manage that pointer!
{% endraw %}
{% endhighlight %}
“Why use a pointer at all? Just use a scoped variable”

{% highlight C++ %}
{% raw %}
Gadget g{n}; // Death to the pointer!
{% endraw %}
{% endhighlight %}


##How do you get a large amount of data out of a function?

{% highlight C++ %}
{% raw %}
?? operator+(const Matrix& a, const Matrix& b)
{
}
{% endraw %}
{% endhighlight %}
The ways in which data can be passed out of functions were explained:

1. POINTER to a new’d object - Who owns the object and who would be responsible for it’s destruction? This adds to code complexity and often causes leaks.

2. REFERENCE to a new’d object - Who does the delete? *What delete*. We have made the notation pleasant at the cost of hiding the problem.

3. OBJECT - object copies are *expensive*.

4. SMART POINTER - still need to dereference it.

##Move Semantics
He went on to explain C++11’s solution to the problem:

{% highlight C++ %}
{% raw %}
Matrix operator+(const Matrix& a, const Matrix& b)
{
	Matrix result;
	// copy a[i] + b[i] into result[i] for each i
	return result;
}
{% endraw %}
{% endhighlight %}

{% highlight C++ %}
{% raw %}
Matrix c = a + b;
{% endraw %}
{% endhighlight %}


“Don’t copy, *steal* the representation”
{% highlight C++ %}
{% raw %}
class Matrix
{
	Representation rep;
	Matrix(Matrix&& a) //Move Constructor
	{
		rep = a.rep; //*this gets a’s elements
		a.rep = {} //a becomes the empty matrix
	}
};
{% endraw %}
{% endhighlight %}

The local object *result* created in the function is returned by *value* and a special *move constructor* is used in the creation of the object c, by the caller. This move constructor *steals* the representation of the local object *result*. It makes the newly created object *c* point to this object, while making the local object *result* the empty object.

![MOVE_CTOR]({{site.url}}/images/move_ctor.png)
<div class="align-center">Fig: Illustration of the working of Move Constructor</div>



##The Case Against Garbage Collection
>“Garbage Collection is neither general, nor ideal.”

Stroustrup explained that garbage collection applies to memory only and hence does not generalize resource management. In a world that’s only getting more distributed, a garbage collector becomes a global resource that leads to only more contention.
C++11 however, does provide a GC interface that does “Litter Collection” for legacy code that may not have handled all it’s leaks. 

##Object Oriented Programming

Stroustrup used “Ye good olde Shape example” to go over inheritance and polymorphism and emphasized that OOP is only fitting for a domain in which objects are truly hierarchically related.

>“You try to force the object into your view. You can’t. Reality is always what it will be.”

##Concepts
Of the C++14 features that he introduced, the one that is closest to my heart is that of concepts. The pages of cryptic error messages generated by even a small amount of generic code can make even the staunchest of C++ programmers throw up their hands in defeat. The *cause* of these errors is the fact that the generic function does not specify the *interface* it requires on it’s inputs. Should the input iterators be random access or will bidirectional do?
Concepts alleviate this problem by allowing you to specify requirements on your inputs.

{% highlight C++ %}
{% raw %}
template<typename S, typename T>
requires Sequence<S>() && Equality_comparable(Value_type<S>, T);
Iterator_of<S> find(S& seq, const T& val);
{% endraw %}
{% endhighlight %}

The template declaration requires S to be a sequence and the elements of S to be comparable with the element T, using the == operator. That’s a mouthful. It’s a good thing there’s a shorthand notation as well.
The error message generated by such templated functions specifies the problem quite precisely. For example:
```
error ‘list<int>’ does not satisfy the constraint ‘Sortable’
```
This would be soothing to any seasoned C++ template programmer.

##A Day To Remember
It's not everyday that the creator of C++ visits your campus and it's not everyday that you get an autographed version of his latest book.
But today was that day.
