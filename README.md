Clean-Facebook-links
====================

Removes the annoying link proxy wrapping any external link in the Facebook news feed

---

### What it does


It removes the links that are proxied by Facebook on the homepage newsfeed and replaces the correct link value in a vanilla &lt;a&gt;  tag.

### How ?

By injecting a script in all tabs that belong to the facebook.com domain, and running periodically on all links in the page matching a facebok-proxy regular expression.