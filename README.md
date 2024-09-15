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
```

## Folders/Files
```
app.js
schemas.js
models
|- puzzle.js
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
|- error.ejs
|- home.ejs
seeds
|- index.js
|- seedHelpers.js
utils
|- catchAsync.js
|- ExpressError.js
```