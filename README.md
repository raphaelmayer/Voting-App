# YouVote - A Voting App

A React App that allows users to view polls, create polls, and vote on them. 

This app was built with **React.js** on the front-end, **Express.js** on the back-end and a **MongoDB** database. 

*Authentication via Facebook only for now.*
*The Login does not work on mobile browsers. I am looking into it.*

You can view the live demo here: *youvote.glitch.me*

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

### Additional Features:
* Search Feature
* Explore *hot* and *most recent* polls


---


## my notes:

### maybe todo:
* users can only vote once per poll (isAuth => voters.push(username)) oder (req.headers)
* bug: /newpoll input.answers delete
* redesign /poll?
* maybe render chart after vote?
* improve search feature (add tags, make answers query-able => .createIndex("text")? )
* put searchbar query into URL (to make back work)
* get user email from facebook
* mongodb .find() projection
* add delete function to /poll
* comment feature 
* basic SEO
* chart colors if poll.answers > 12
* /poll convert displayed time to eg. two days ago, one month ago, etc.
