# Discover Puzzle

## Start Server
```
> nodemon app.js
```

## Discover Puzzle NPM
```
> npm init -y
> npm i express
> npm i mongoose ejs
> npm i method-override
> npm i ejs-mate
> npm i joi
> npm i connect-flash
> npm i express-session
> npm i passport passport-local passport-local-mongoose
```

## Folders/Files
```
app.js
schemas.js
middleware.js
controllers
|- puzzles.js
|- reviews.js
|- users.js
models
|- puzzle.js
|- review.js
|- user.js
views
|- puzzles
   |- edit.ejs
   |- index.ejs
   |- new.ejs
   |- show.ejs
|- layouts
   |- boilerplate.ejs
|- partials
   |- footer.ejs
   |- header.ejs
   |- flash.ejs
|- users
   |- login.ejs
   |- register.ejs
|- error.ejs
|- home.ejs
seeds
|- index.js
|- seedHelpers.js
utils
|- catchAsync.js
|- ExpressError.js
public
|- javascript
   |- validForms.js
|- stylesheets
   |- stars.css
routes
|- puzzles.js
|- reviews.js
```