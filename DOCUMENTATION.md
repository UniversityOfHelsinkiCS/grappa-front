# General

Edit couple months after I wrote this:
Okey to be honest, not the most descriptive overview of the technologies. There is a lot of good tutorials out there, you imaginary developer who might never exist to read this. Egghead.io has some good Redux videos.

This app is made with React+Webpack+Redux and incase those hipster techs aren't familiar here is a short summary what they do:

# React

React is the View-layer of this app which does nothing else but handle the HTML-side of things. In short you create these Components that change in response to the DOM-events such as ```onClick``` or outside events which come from the Redux.

# Webpack

Well if you know what Browserify is this one is simple: it's basically the same. If you don't know what Browserify is the simplest explanation is that you have these libraries such as jQuery and React that need to be included inside your ```index.html``` right? So instead of million ```<script>``` -tags for all of your libraries you want a one ```<script>``` -tag, one file that has all the necessary stuff included right?

So what Browserify and Webpack does is they bundle all of your libraries which they figure out by your ```import``` -statements and combine them into one file. And since we have also our own scripts inside ```src```-folder that also need to be transpiled from ES6 to ES5 Webpack takes them all, compiles them and then mushes them into this one file called ```bundle.js``` inside the ```dist```-folder. It might not be that obvious how important this is because it's so automated but let me tell you, it would SUCK if there weren't things like Webpack.

Also in this project we have two ```webpack.config``` -files for development and production but you shouldn't worry about them too much since they are functional unless you decide to touch them and then that's your fault :D.

# Redux

Now since React does only the View part of things you want something to store the data and pass it down whenever it is needed. This is where Redux comes in, it's a "state-management-library" which is a fancy way of saying that it's the one that keeps track of things.

Since it's impossible to describe it in full detail I'll just write down the core basics that should at least give you a small idea how things work.

## Index.js

This is the so-called ```main``` of this app. All starts in here. Thought it would important to note this.

## Store

Inside the ```index.js``` we import this file called ```store.js```. It is pumping heart of this app and is an entry point for all the changes to the state. It consists of multiple *reducers* that hold their own invidual state but all are combined together to this one big store. It has only a few methods such as `store.getState()` that returns an object of the reducers that belong to the store.

Also you should know that the store is `immutable` which means it can only hold one state. If a change is made the part of the store, reducer in this case, must be replaced with a new object the existing object being tossed in the void of unreferenced objects. Yes creating a new object each time is a little bit costly than just mutating it but the benefits outweight the disadvantages when your app grows and the state becomes really really complex.

And we use `Immutable.js` to hold the state which adds little bit performance to the copying albeit it has really shitty API in my opinion. :D

So when you want to make a change to the state eg. fetch theses from the API or update a user you dispatch an action that says "hey gimme theses" which the store then passes down to all of its reducers and hopefully one of them has a switch-case ```GIVE_THESES``` that then returns theses to the whiny React-Component. 

## Reducer

As said before the Store has a state that is actually a bunch of reducers that hold their own individual state. All the real logic of this app is done inside of them in which actions are handled according to their type and if required a change is made to the state.

The noble rules they abide by are that every action should always return the same result with same parameters. Hence they are given the name "pure function" to separate them from the other, vile and unholy functions. From docs:

> Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.”.

Another rule is that the state of a reducer is never modified directly. It is ALWAYS (note the all-caps) replaced by a new state leaving the previous state unchanged. That means it can be restored from memory unless you have made some sort of cache invalidation where you flush the old states. But we don't do that so in our case the old state always exists, somewhere, inside his city at browser memory. Dead state waits dreaming...

## Action

And every Reducer can only be changed by an action of desired type. This one is a little trickier than it seems since inside the ```src```-folder the ```x.actions.js``` -files aren't actually actions but action-creators. Why not the longer version? Well this one is shorter to write. And stuff.

Inside these ```x.actions.js``` we have two things: action-types defined in all-caps and action-creators. Types are just the names for the actions so the reducers can identify them. Sure they could be integers too but for some reason strings are easier to read. (especially in all-caps)

Then we have the action-creators aka. the methods that return a new action. It's kinda like you wrap all your would-be-service-calls in this predefined body so they are easier to read and keep track of. So you have your service and instead of direct call to it you wrap it in this ```DO_SERVICE_CALL``` -action that is logged to a list from where you see the whole history of shit done in your app. All your methods calls -> predefined and logged. That's how I see it.

And so an action-creator only returns an object that is called an action. And those actions are categorized by their type. It can take whatever parameters you please like form-inputs or login-information and then it's dispatched to the store where somebody hopefully does something with it.

## Container

Because React-Component does only the View-handling how to the hell can you make it actually fetch data or receive it? Well we need to insert those methods inside the Components but how we do it without fucking up the structure yet again?

That's when the Containers come in. They are actually only decorators which means they only add new methods to an existing Component. Imagine you have a car without the ignition key. You can look at the car, maybe even open some doors and look under the hood and check the tires but without any extra tools there is very little change of getting it actually moving. So you add an ignition key to the car. And then you pass around the version with the key around your app. So it actually can do something.

That's what the code in the bottom of Components does. We thought it would be better to include that little piece code that's only purpose is to connect the React-component to Redux store from which it can receive state or send actions to it than create separate file for it.

I hope and pray that made even some sense. It will all make sense one day, I promise. Or well, not really but I'm some-what optimistic :-). Maybe you can fiddle with easier framework such as Vue 2.0 if you have no prior experience with front-end development since React really is kinda confusing.

## Middleware aka. asynchronous stuff

Since asynchronous-methods are vile and impure we can't call them inside our holy Reducers. That's why there are middleware to handle that hideous business. Our API-calls for example are done inside this file named simply ```grappaAPI.js```. What it does is for every action that is dispatched to store it gets a sneak-peek before the reducers and if there is any action that has `if (action.payload && action.payload.request)` then they are passed to the handler called `createRequest` that generates `type + "_REQUEST"` type of action and `type + "_SUCCESS"` or `type + "_FAILURE"` depending what the API response was.

It is not very intuitive although with time it becomes easier to manage and reason about. I think the fact that asynchronous stuff are separated completely so that you can't see the whole chain completely it makes it sometimes harder to see how things work.

There is also this library called `redux-thunk` that allows you to chain API-calls together eg. `return dispatch(loginAction(email, password)).then((action) => { ...` which makes a lot easier the handling of the state. 

Yeah I have too still my doubts about this logic. So Reducers are good and holy but the dirty stuff is still done somewhere and kinda unintuitively too. Like wouldn't it be logical to have Reducers do all the logic and maybe divide them too into the impure and pure ones, just so you can see which ones do the asynchronous stuff.

Hopefully one day this all will be made just as easy to understand like Angular 1.0 with its services and directives but until then my advice is to just follow the flock and not to ask too many questions. Or ask, but don't expect answers. Or answers that make a lot sense. Well it would be easier if you just kept quiet.

## Other

Now I didn't cover everything interesting and wonderful about this project but I hope it was enough to convince you not to go insane and give up all dreams of becoming one with the React+Webpack+Redux. [Here, go watch some puppies](https://www.youtube.com/results?search_query=puppies&page=&utm_source=opensearch) before you kill someone.
