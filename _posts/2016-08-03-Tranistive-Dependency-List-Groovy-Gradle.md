---
title: Transitive Dependency List for a Gradle Project
layout: post
comments: True
---
{% highlight groovy %}
task findTransitiveDeps() {

    configurations.runtime.resolvedConfiguration
    .getFirstLevelModuleDependencies().each() {
        findDeps(it);
    };

    for(dep in depsList) {
        println dep;
    }
}   

/**
    Recursively finds dependencies for each dependency
*/
def findDeps(dep) {
    depsList.add(dep.toString().tokenize(";")[0]);

    if((dep.children == null) || (dep.children.size() == 0)) {
        return;
    }

    if((dep.children != null) &&  (dep.children.size() > 0)) {
        dep.children.each() { 
            findDeps(it);
        }
    } 
}
{% endhighlight %}
