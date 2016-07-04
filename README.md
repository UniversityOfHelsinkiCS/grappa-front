# Grappa [![Build Status](https://travis-ci.org/ultra-hyper-storm-ohtuprojekti/grappa-front.svg?branch=master)](https://travis-ci.org/ultra-hyper-storm-ohtuprojekti/grappa-front) [![Coverage Status](https://coveralls.io/repos/github/ultra-hyper-storm-ohtuprojekti/grappa-front/badge.svg?branch=master)](https://coveralls.io/github/ultra-hyper-storm-ohtuprojekti/grappa-front?branch=master)

An app to speed up and simplify the process of getting one's thesis approved. Made for the Helsinki University's department of Computer Science.

This front-end is made with React + Redux + Webpack + coffee. [You can read the documentation](https://github.com/ultra-hyper-storm-ohtuprojekti/grappa-front/blob/master/DOCUMENTATION.md) in which the general structure is explained. Hopefully it's helpful.

But basically you just create these "Smart Components" (that are just regular components but which are connected to the Redux state) named ```x.container.jsx``` to their individual folder inside the ```src```-folder. And whenever you make changes to them they are automatically re-rendered onto your view on localhost:8080 thanks to Hot Loading(react-hmre).

[How to install](https://github.com/ultra-hyper-storm-ohtuprojekti/grappa-front/blob/master/INSTALLATION.md)

[Heroku](https://grappa-app.herokuapp.com/)

[Heroku(dev version)](https://grappa-app-dev.herokuapp.com/)

[Trello](https://trello.com/ultrahyperstormohtuprojekti)
