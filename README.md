# Grappa [![Build Status](https://travis-ci.org/ultra-hyper-storm-ohtuprojekti/grappa-front.svg?branch=master)](https://travis-ci.org/ultra-hyper-storm-ohtuprojekti/grappa-front) [![Coverage Status](https://coveralls.io/repos/github/ultra-hyper-storm-ohtuprojekti/grappa-front/badge.svg?branch=master)](https://coveralls.io/github/ultra-hyper-storm-ohtuprojekti/grappa-front?branch=master)

An app to speed up and simplify the process of getting student's theses approved. Made for the Helsinki University's department of Computer Science and licensed under MIT.

This front-end is made with React + Redux + Webpack + coffee. [You can read the documentation](https://github.com/ultra-hyper-storm-ohtuprojekti/grappa-front/blob/master/DOCUMENTATION.md) in which the general structure is explained. Hopefully it's helpful.

If you do not know the basics of React it might be confusing, but basically React holds the view-layer/DOM inside of it in these so called "components". They are like building blocks similar to classes that this whole app consists of. Most of the components are connectded to Redux store in which case they are called sometimes as "containers". Redux holds the state of this app and handles all the changes to it in a one-way dataflow called flux. You should check it out from Youtube or Egghead, it is really cool.

Also there is React Hot Loading which works, at times. You might have to abuse your Ctrl+R or F5 to refresh the page when it fails, my apologies.

[How to install](https://github.com/ultra-hyper-storm-ohtuprojekti/grappa-front/blob/master/INSTALLATION.md)

[In production](https://grappa.cs.helsinki.fi)

Not working due to pdftk not being installed to Heroku.
[Heroku](https://grappa-app.herokuapp.com/)

[Trello](https://trello.com/ultrahyperstormohtuprojekti)
