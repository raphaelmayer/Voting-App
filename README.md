# Voting App

A NodeJS App that allows users to view polls, create polls, and vote on them. 

The app uses React for the front-end, express on the back-end, MongoDB for the database, and Facebook's SDK for authentication.

You can view the live demo here: tbd

### User Stories:
* As an authenticated user, I can keep my polls and come back later to access them.
* As an authenticated user, I can share my polls with my friends.
* As an authenticated user, I can see the aggregate results of my polls.
* As an authenticated user, I can delete polls that I decide I don't want anymore.
* As an authenticated user, I can create a poll with any number of possible items.
* As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
* As an authenticated user, if I don't like the options on a poll, I can create a new option.

Link to the freecodecamp project - https://www.freecodecamp.com/challenges/build-a-voting-app

### todo:
* no chart colors if poll.answers > 12
* bug: logout-button
* bug: newpoll input.answers delete
* bug: inserts new user on every login
* design(fonts, buttons, colors)

### eventually todo:
* mongodb .find() projection
* users can only vote once per poll
* add tags to polls for a better search feature
* code revision and clean up
* maybe render chart after vote?

