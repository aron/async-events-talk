An Introduction to JavaScript Custom Events
===========================================

Talk given at [Async Brighton][:async] on [Thursday 25th
August 2011][:talk].

Slides available at [aron.github.com/async-events-talk/slides.pdf](http://aron.github.com/async-events-talk/slides.pdf). Demo
app at [aron.github.com/async-events-talk/](http://aron.github.com/async-events-talk/).

Overview
--------

Events, also known as the publish/subscribe pattern, are a common idiom used throughout JavaScript. They are used to notify other objects about changes that may be acted upon (such as the browser events “click“, “load” and “submit“) and work very well with the asynchronous nature of JavaScript. They are a useful coding pattern to help keep JavaScript objects modular, reusable and easily extensible.

In this session, Aron Carroll will take us through examples of event usage in the wild, such as the DOM’s .addEventListener() and jQuery’s .ajax() methods. We will then look at building a simple example using jQuery to handle the events, and finish up with an overview of other libraries that could be used in our own code.

[:async]:   http://asyncjs.com/
[:talk]:    http://asyncjs.com/pubsub/
