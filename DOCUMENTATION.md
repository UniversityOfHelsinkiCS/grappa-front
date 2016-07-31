# General

Edit couple months after I wrote this:
Okey to be honest, not the most descriptive overview of the technologies. There is a lot of good tutorials out there, you imaginary developer who might never exist to read this. Egghead.io has some good redux videos.

This app is made with React+Webpack+Redux and incase those hipster techs aren't familiar here is a short summary what they do:

# React

React is the View-layer of this app which does nothing else but handle the HTML-side of things. In short you create these Components that change in response to the DOM-events such as ```onClick``` or outside events which come from the Redux.

# Webpack

Well if you know what Browserify is this one is simple: it's basically the same. If you don't know what Browserify is the simplest explanation is that you have these libraries such as jQuery and React that need to be included inside your ```index.html``` right? So instead of million ```<script>``` -tags for all of your libraries you want a one ```<script>``` -tag, one file that has all the necessary stuff included right?

So what Browserify and Webpack does is they bundle all of your libraries which they figure out by your ```import``` -statements and bundle them up into a one file. And since we have also our own scripts inside ```src```-folder that also need to be transpiled from ES6 to ES5 Webpack takes them all, compiles them and then mush them into this one file called ```bundle.js``` inside the ```dist```-folder. It might not be that obvious how important this is because it's so automated but let me tell you, it would SUCK if there weren't things like Webpack.

Also in this project we have two ```webpack.config``` -files for development and production but you shouldn't worry about them too much since they are functional unless you decide to touch them and then that's your fault :D.

# Redux

Now since React does only the View part of things you want something to store the data and pass it down whenever it is needed. This is where Redux comes in, it's called "state-management-library" which is a fancy way of saying that it's the one that keeps track of things.

Since it's impossible to describe it in full detail I'll just write down the core basics that should at least give you a small idea how things work.

## Index.js

This is the so-called ```main``` of this app. All starts in here. Thought it would important to note this.

## Store

Inside the ```index.js``` we import this file called ```store.js```. Now what is that? Well Redux has these states that describe all the states your app can be in. And this one stores them all together. But when you call ```store.getState()``` you don't actually get the "state" but list of reducers that store their own individual state. So Store is more like an array of reducers that have their own states.

And state is basically an object, which incase of our own project is Immutable (you can't make changes to it, only replace it with a new one), which stores the data you desire. Like the current User. Or list of theses fetched from the API. And every time you want to get stuff like say theses you dispatch an action that says "hey gimme theses" which store then passes down to all of its reducers and hopefully one of them has a switch-case ```GIVE_THESES``` that then returns the theses to the whiny React-Component. If this didn't make sense don't worry. Just take a deep breath and curse loudly in what kind of shit you've gotten into :D.

## Reducer

As said before the Store has a state that is actually a bunch of reducers that hold their own individual state. All the real logic of this app is done inside of them in which actions are handled according to their type and the state of this app is changed if needed so.

The noble rules they abide by are that every action should always return the same result with same parameters. Hence they are given the name "pure function" to separate them from the other, vile and unholy functions. From docs:

> Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.”.

Another rule is that the state of a reducer is never modified directly. It is ALWAYS (note the all-caps) replaced by a new state leaving the previous state unchanged. That means it can be restored from memory unless you have made some sort of cache invalidation where you flush the old states. But we don't do that so in our case the old state always exists, somewhere, inside his city at browser memory. Dead state waits dreaming...

## Action

And every Reducer can only be changed by an action of desired type. This one is a little trickier than it seems since inside the ```src```-folder the ```x.actions.js``` -files aren't actually actions but action-creators. Why not the longer version? Well this one is shorter to write. And stuff.

Inside these ```x.actions.js``` we have two things: action-types defined in all-caps and action-creators. Types are just the names for the actions so the reducers can identify them. Sure they could be integers too but for some reason strings are easier to read. (especially in all-caps)

Then we have the action-creators aka. the methods that return a new action. It's kinda like you wrap all your would-be-service-calls in this predefined body so they are easier to read and keep track of. So you have your service and instead of direct call to it you wrap it in this ```DO_SERVICE_CALL``` -action that is logged to a list from where you see the whole history of done shit in your app. All your methods calls -> predefined and logged. That's how I see it.

And so an action-creator only returns an object that is called an action. And those actions are categorized by their type. It can take whatever parameters you please like form-inputs or login-information and then it's dispatched to the store where somebody hopefully does something with it.

## Container

Because React-Component does only the View-handling how to the hell can you make it actually fetch data or receive it? Well we need to insert those methods inside the Components but how we do it without fucking up the structure yet again?

That's when the Containers come in. They are actually only decorators which means they only add new methods to an existing Component. Imagine you have a car without the ignition key. You can look at the car, maybe even open some doors and look under the hood and check the tires but without any extra tools there is very little change of getting it actually moving. So you add an ignition key to the car. And then you pass around the version with the key around your app. So it actually can do something.

That's why inside Components you call the Container version of the actual Component. Which is the reason why we decided to name the whole thing Smart so it includes both parts: Component and Container. So when you add other React-Components you don't have to stretch your imagination and import the ```x.container.js``` -file where is nothing more than few lines of JavaScript which maps the logic to the Component but the whole thing where is both the HTML and the mapping.

Phew I hope that made even some sense. And just to confuse you a little more the logic we add to the Components is in fact those same action-creators I described before. And the way they are added to Component is by props which are these custom-attributes. If you know any HTML you know elements can have classes, hrefs and stuff right? Well React allows you to give for example "asdf"-attributes in the same way and that's how those action-creators are added. If this doesn't make any sense I recommend you to start fiddling around with HTML and learn with some easier library like Angular 1.0 maybe.

## Middleware aka. asynchronous stuff

Since asynchronous-methods are vile and impure we can't call them inside our holy Reducers. That's why there are middleware to handle that hideous business. Our API-calls for example are done inside this file named simply ```grappaAPI.js```. What it does is for every action that is dispatched to store it gets a sneak-peek before the reducers and if there is any action with ```CALL_API```-type it triggers an asynchronous call to the API. Then after that call returns ```grappaAPI.js``` then dispatches completely new action that is either X-SUCCESS or X-FAILURE type depending on the result where X is the original action-type.

Yeah I have too still my doubts about this logic. So Reducers are good and holy but the dirty stuff is still done somewhere and kinda unintuitively too. Like wouldn't it be logical to have Reducers do all the logic and maybe divide them too into the impure and pure ones, just so you can see which ones do the asynchronous stuff.

Hopefully one day this all will be made just as easy to understand like Angular 1.0 with its services and directives but until then my advice is to just follow the flock and not to ask too many questions. Or ask, but don't expect answers. Or answers that make a lot sense. Well it would be easier if you just kept quiet.

## Other

Now I didn't cover everything interesting and wonderful about this project but I hope it was enough to convince you not to go insane and give up all dreams of becoming one with the React+Webpack+Redux. [Here, go watch some puppies](https://www.youtube.com/results?search_query=puppies&page=&utm_source=opensearch) before you kill someone.
