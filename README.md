# PixiJS space shooter

This project was developed as a learning experience, to learn the basics of video game development using PixiJS as the graphics engine, all within a React app in Typescript.

It experiments with basic game concepts such as collision detection or using locks to handle concurrent updates to the shared game state. In particular, a very simple mutex lock API is implemented using the Atomics API.

## Running the game

You first have to install the dependencies by running `npm i`.

Then you can start the game by running the following two commands in two shells:

- `npx tsc -w` to compile the TS code to JS
- `npm start` to run the React app

Then, open [http://localhost:3000](http://localhost:3000) to view it in the browser. You can move the spaceship with the ZQSD or arrow keys, and shoot fire balls with the space bar to destroy aliens.
