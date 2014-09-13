---
layout: post
title: Introducing Lanyon
---

Welcome to my blog.


### RECENT POSTS

    {% assign pages_list = site.pages %}
    {% for node in pages_list %}
      {% if node.title != null && node.title != "introduction"%}
        
          <a class="" href="{{ node.url }}">{{ node.title }}</a>
        
      {% endif %}
    {% endfor %}
