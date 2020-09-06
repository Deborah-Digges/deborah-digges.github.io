
---
title : From Jekyll to Gatsby: 6 Simple Steps
layout: post
crosspost_to_medium: true
---

Six years ago, during my final year in college, I was enrolled in a course on Open Source technology. To pass the course was to do two things: contribute to an open source project, and write about it on your own blog. Laughably, the only thing that propelled me to start writing publicly was the fear of failing a class.

I passed the course, and managed to get some semblance of a blog together. However, I didn't put too much effort into building the site as much of my effort was expended writing the content and trying to creep my way into open source. At the time, Jekyll was all the rage and I went with a themed Jekyll starter called lanyon.

It's served me well over the years, but my unfamiliarity with how it worked kept me from making any substantial changes to the structure of the site. I've finally taken the stand to move to a stack I'm a little more comfortable with. Enter: GatsbyJS

Why Gatsby?

The two options I considered for restructuring my blog were Gatsby and Next. I decided to go with Gatsby since it was a a little more specialized towards static site generation, which made things like reading markdown files very basic.

https://www.gatsbyjs.com/blog/2017-11-08-migrate-from-jekyll-to-gatsby/
https://dev.to/joserfelix/how-to-make-a-static-blog-with-next-js-2bd6#comments
Scaffolding
https://www.gatsbyjs.com/docs/adding-markdown-pages/

Getting a Gatsby project up and running is a breeze (link). Enhancing the project to use generate a page from a markdown file is also well documented(link)

In summary:
Use gatsby-source-filesystem to read (markdown) files into Gatsby
Parse markdown files using gatsby-transformer-remark to extract the frontmatter as data and the content as html. 
Create a template using React to render the above data as a blog post page
Generate pages for all your markdown files using the createPage Gatsby API
Create a listing page for all your blog articles


Move all your Markdown files
Copy all the markdown files from your old website to the folder indicated in your gatsby-source-filesystem config entry

Fix all the things
Links: To avoid breaking links, use the same slug format as before, for this
In my case, the slug is derived from the filename
Use createFilePath to access the filename
Perform logic to create the slug
Use createNodeField to create fields that can be queried per file.
Highlighting:
Changing from pygment to markdown highlighting
Images
Mention the plugins needed to drop code
Gifs


Favicon


Styling
I lazily migrated over my poole/lanyon theme to avoid me having to write any CSS. Let's not kid ourselves, I don't really know how to build a UI. 

To make the CSS I copied over from my old site "work" I needed to import them into the gatsby-browser.config.js file
Deploying

To test the site out and compare it with my old site, I'm deploying to netlify. It's about as simple as going to the netlify site, authorizing access to your GitHub repo, and providing a build command. 

Testing that no links are broken

Now that we have our site deployed we can switch it over and make sure there are no broken links!

Switching over

It's time to say our goodbyes and switch over to the new site. I don't want to maintain both so I am simply overwriting the repository at deborah-digges.github.io with my new shiny code.

This will require me to change the deployment for my GitHub pages site. 
Add a circle CI script that runs the Gatsby build command on pushing to master and pushes the changes to the gh-pages repo
Change the branch from which gh-pages deploys to master

And, voila! My site at deborah-digges.github.io now uses Gatsby instead of Jekyll. Now that I'm using a system I understand a little better, I want to soon

Implement pagination
Create categories for pages and allow browsing the blog by category
Create a navigation element called Content in the header which expands to Blogs, Drawings
Create a Reading List navigation element
Lean enough about CSS and design to create a better landing page

If you'd like to check it out, you can find the source code here.

Tune in soon for more exciting updates to my Gatsby blog! 


