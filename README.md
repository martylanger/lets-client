# Let's: A platform for group decision-making

Let's is a web app for group decision-making using alternative voting methods, such as approval/disapproval and instant-runoff voting.

Registered users of Let's can currently create elections with a name, description, and voting method, and add choices (nominations/candidates/options) to elections, with titles, descriptions, and links to pertinent websites. They can also view a list of the elections made by all registered users, view the details of each election, and update or delete elections they've created.

In order to add choices to an election, users currently must enter the ID number of that election.

Users of Let's will be able to create, open, and close an election and choose from a plethora of options:
-   Which voting method
-   How and when the candidates are determined
-   How to share elections with voters and verify ballots
-   Whether ballots are secret, open, or visible but anonymized
-   To whom the results are visible
-   When to open and close the voting

Users will also be able to save contacts, groups of contacts, and sets of election preferences for quick implementation.

## Important Links

-   [Let's Client Repo](https://github.com/martylanger/lets-client)
-   [Deployed Client](https://martylanger.github.io/lets-client/)
-   [Let's API Repo](https://github.com/martylanger/lets-api)
-   [Deployed API](https://letsapi.herokuapp.com)

## Planning Story

In a previous project, I'd built an app for users to create and view election facades, but without the capability to actually have nominations or voting. That project had only a single one-to-many relationship in the back-end. When I began work on this project, I initially thought that I would be able to build on the earlier project and race towards a fully functional voting app, despite starting from scratch with React and a more complex database structure.

Of course, I needed to learn to walk before I could run, and my first versions of the Let's app had less functionality than the earlier project despite working with the more robust tools. This time, however, before starting to code I had already mapped out a plan for adding all my desired features. My initial schedule was four days of work, with the first day devoted to the back-end and the remaining three left for the front-end. On day one, I set up the GA-provided Rails API template, designed my database, and took my first crack at deploying to Heroku. There were issues.

By the end of the four days, the back-end had consumed more than half of my time, as the classes with which I first made my controllers required user ownership, and that conflicted with my design, in which only the election creator was required to be a registered user.

On the front-end, I began with a GA-provided React template with authentication built in. Notably, I spent way too much time trying to hooksify important parts of the template - eventually I was encouraged to abandon this task and aim straight for election CRUD. When that was achieved, I started down my list of features, starting with the capability for adding choices to elections.

##### Troubleshooting
I closely followed the steps laid out in the React lessons of the GA course, but I also did a lot of googling and watched a handful of React tutorials on Youtube. Console.logs were a smaller part of my troubleshooting process than usual, with stack exchange pulling more weight than usual - not having other programmers around me during the development process, many would-be quick questions turned into protracted searches. I tried to lean on the issue queue in lieu of an active milieu, too.

## Technologies Used

-   React
-   Axios
-   Javascript
-   HTML
-   CSS

## Unsolved Problems

-   (SOLVED) I must rejigger my interface for viewing an election so that all the links work as expected and the information is current with any updates or deletions made.
-   Most of my features, including many of the basic features, still need to be implemented.
-   (SOLVED) Most importantly, I need to implement the voting capability and write the logics for determining winners of elections.
-   I'd like to restyle the app entirely.

## Screenshot

![Let's Screenshot](https://i.imgur.com/x6gkpzh.png "Let's Screenshot")

## Wireframe

![Let's Wireframe](https://i.imgur.com/shnhCUl.jpg?2 "Let's Wireframe")

## User Stories

#### v1
-   As an unregistered user, I would like to sign up with email and password.
-   As a registered user, I would like to sign in with email and password.
-   As a signed in user, I would like to change password.
-   As a signed in user, I would like to sign out.

-   As a signed in user, I would like to create an election with a title, a description, and a voting method.
-   As a signed in user, I would like to update my election's title, description, or voting method.
-   As a signed in user, I would like to delete my election.
-   As a signed in user, I would like to see all my elections or all users' elections.

#### v2.0 - Voting
-   As a user, I would like to vote in an election.

###### v2.1
-   As a user, I would like to get a link to vote in my election to share with voters.

#### v3.0 - Nominations
-   As a user, I would like the options to set all the choices myself, to allow nominations, or to set some myself and allow nominations.

###### v3.1
-   As a user, I would like the option to separate the nomination period from the voting period or to have nominations and votes occur concurrently

#### v4.0 - Full basic functionality
-   As a user, I would like to use an alternative voting method (TBD).
-   As a signed-in user, I would like my election to accept single votes, abstains, approve/disapprove, rankings, or ratings, depending on my chosen voting method.
-   As a user, I would like to open and close (and reopen) my election.
###### v4.1
-   As a user, I would like to invite others to vote in my election.
###### v4.2
-   As a user, I would like to restrict voters to 1 ballot per voter, by invite or by IP address. Verification.
###### v4.3
-   As a user, I would like to update my ballot.
###### v4.4
-   As a user, I would like to make an election secret, open-ballot, or anonymized open-ballot.
-   As a signed-in user, I would like to choose whether before an election is closed the preliminary results are visible or not.
-   As a user, I would like to be able to make an election's results visible only to participants, only to invitees, only to myself, or public.
###### v4.5
-   As a user, I would like to open my election to an indefinite number of choices.

#### v5
-   As a user, I would like several options of alternative voting methods.

#### v6 - Voter account
-   As a signed-in user, I would like to see all the elections I have voted in.

#### v7 - Information
-   As a user, I would like some information with which to choose my voting method.

#### v8 - Closing elections
-   As a user, I would like to set a timer or a date and time for my election to close.
-   As a signed-in user, I want the option to see who has voted and who hasn't in my election.

#### v9 - User options/contacts
-   As a signed-in user, I would like to save default options or profiles for new elections.
-   As a signed-in user, I would like to save contacts to whom I can quickly send out elections.
-   As a signed-in user, I would like to save groups to whom I can quickly send out elections.

#### v10 - Choices
-   As a user, I would like to comment on an election.
-   As a user, I would like to include links to choices' websites.
-   As a user, I would like to see previews of choices.

#### v>10
-   As an unregistered user, I would like to create an election.

-   As a user, I would like the results to update in real time.

-   As a signed-in user, I would like to choose the style of my ballot.

-   As a user, I would like to see how the results of my election would have differed had I used a different voting method.
