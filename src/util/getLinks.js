const request = require('request');

// Run in browser at https://deborah-digges.github.io/
// and https://deborah-digges.github.io/page2/
// to get all links

// var links = document.querySelectorAll("a");
// var siteLinks = []
// for (var i=0; i < links.length; i++) {
//     var linkText = links[i].textContent;
//     linkText = linkText.replace(/\s+/g, ' ').trim();
//     var link = links[i].href;
//     siteLinks.push([linkText, link]);
// }

// for(i=0; i < siteLinks.length; i++) {
//     console.log(siteLinks[i][1]);
// }

const links = ["https://deborah-digges.github.io/",
"https://deborah-digges.github.io/about/",
"https://deborah-digges.github.io/2018/07/11/a-new-adventure/",
"https://deborah-digges.github.io/2018/03/13/org-changes/",
"https://deborah-digges.github.io/2016/12/27/Traffic-Sign-Classification/",
"https://deborah-digges.github.io/2016/10/31/Lane-Detection/",
"https://deborah-digges.github.io/2016/10/27/Beginning-SDCND/",
"https://deborah-digges.github.io/2016/08/30/Review-Stanford-OLI-Probability-Statistics/",
"https://deborah-digges.github.io/2016/08/03/Tranistive-Dependency-List-Groovy-Gradle/",
"https://deborah-digges.github.io/2016/06/04/Mozilla-Science-Lab-Global-Sprint-16/",
"https://deborah-digges.github.io/2015/11/11/Insensitive-OSX/",
"https://deborah-digges.github.io/2015/10/23/pr-bot/",
"https://deborah-digges.github.io/2015/06/30/Remember-the-intern/",
"https://deborah-digges.github.io/2015/06/09/Dot-Slash-To-Do/",
"https://deborah-digges.github.io/2015/05/06/To-Do-or-Not-to-Do/",
"https://deborah-digges.github.io/2015/03/08/When-sudo-fails-you/",
"https://deborah-digges.github.io/2015/01/10/Stroustrup-on-Campus/",
"https://deborah-digges.github.io/2014/11/03/The-Big-Oh-of-Optimization/",
"https://deborah-digges.github.io/2014/10/23/Simulating-a-Mark-Sweep-GC/",
"https://deborah-digges.github.io/2014/10/06/Demystifying-the-GC/",
"https://deborah-digges.github.io/2014/09/14/Going-the-Open-Source-Way/",
"https://deborah-digges.github.io/2014/08/13/Hello-World/"]

links.forEach(link => {
  link = link.replace("deborah-digges.github.io", "epic-mirzakhani-8e39a6.netlify.app");
  request(link, (err, res, body) => {
    if (err) { console.log('Page fetch failed', err); }
    console.log(link, res.statusCode);
  });
}); 