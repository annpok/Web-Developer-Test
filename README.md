# Shopping Cart application

##web-app
UI part of the application. Contains basic logic to work with the Shopping Cart
##server-app 
Server part. Contains REST API endpoints for UI part or Postman scripts collection (_postman_scripts folder - feel free to test) 

To use server side you'll need to set up https://cloud.mongodb.com/  or use credentials from the config/db.js file _[credentials in the file will be removed soon]_

todo: add data structures

# Dependencies
> node ^14.17.1

# Get Started

- Fork this repo
- Clone your repo

## Install dependancies
##### for web-app
```
npm i
npm start
``` 
##### for server-app
```
npm i
npm start or  npm start-dev 
``` 

## Creative assets  
Look in ```./design-assets```

### Fonts
All free to download or include from [https://fonts.google.com/specimen/Libre+Franklin](https://fonts.google.com/specimen/Libre+Franklin) (Regular and ExtraLight)

## Which Browsers/Devices or Virtualization services did you check the application in?
Chrome Version 98.0.4758.82 

## Anything you want to tell us?
- There are pieces that can be improved: 
**Web-app:** 

- Design improvements, current version supports only desktops screens. Build dynamic Grid component
- Add additional layer to show and edit saved baskets, processed orders
- Track basket status - NEW, UPDATED, FINISHED etc 
- Add Authentication for the user to track different basket 
- Store data(basket) locally for unauthorized user
- Write tests - ui test, unit tests [ Cypress, Jest ]
- Build with webpack, deploy to cloud
 
**Server-app:** 

- Adding additional routes to create new records (POST products, POST basket) 
- Using different MongoDB/SQL lib to have functionality to manage data Models  - data validation and adding json-schema validation
- Write tests - unit tests, integration tests (nodejs<->db) [ Jest ]
- Build Rest API documentation [ swagger, apimatic, etc ]
- Build with webpack, deploy to cloud

## What did you think of this test/exercise?
### What did you like?
1. Design application from scratch - FE/BE structure
2. Choosing technologies/ libraries  - React, NodeJS, MongoDB


### What could be improved?
Seeing this task from the interviewer perspective: 
I would suggest to extend base application and add some workings pieces of components/ nodejs routes (FE&BE) and ask developer to fix/extend features

For FE part it can be some operation on data structures, adding specific user logic - session timeout, html reports ideas, charts for statistic - using external libs like highcharts/d3 etc

For BE part it can be managing bulk operation, data calculations - working with object/arrays/Set/Map etc etc 

### What didn't you like?
1. Takes time to set up working environment from scratch. Set up communication between FE<->BE<-> parts - cors, routing, MongoDB lib retrieving data/ set up connection etc
Issues in setting up everything locally was one of the reasons to pick cloud MongoDB and not using local SQL server - in general it can be deployed to AWS, not sure about test account license 
2. Sketch files has limited functionality on web [Windows users], requires Mac app to copy svg icons etc
