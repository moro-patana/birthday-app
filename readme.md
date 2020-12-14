<h1 align="center">Birthday App</h1>

<div align="center">
  <h3>
    <a href="https://birthday-app-manjaka.netlify.app">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/moro-patana/birthday-app">
      Solution
    </a>
  </h3>
</div>

## Overview
![screenshot](https://iili.io/KT50yF.png)


- This project built with vanilla javascript. First of all, the data is from an api. It is used for searching somebody birthdate and their names.


-   You can find the demo: https://birthday-app-manjaka.netlify.app

### Built With


-   [Javascript](http://vanilla-js.com/)

## Features

## How To Use


To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/your-user-name/your-project-name

# Install dependencies
$ npm install react react-dom react-router-dom

# Run the app
$ npm start or parcel index.html
```
## Structure:
 1. Declare the path where I fetch the data.

 2. Set timeout to the wait function when it resolves in milliseconds(ms).

 3. Grab necessary elements wich are in my html(tbody and add button).

 4. I created an async function to destroy the popup when the promise resolves.

 5. Fetch the data from the basepoint and sort it by the lastname.

 6. Map through the data to create an html.

 7. Use swich to use superscipt th, st, nd or rd with the date.

 8. Get the birthdate to calculate person ages and to know their birthday(already gone or still in the future).

 9. Create popup to add, edit and to delete item from the data.

 10. Store the data in the local storage so every time I make changes, they will change from the local storage as well.

 ## Improvement:
  This time, I fell confident to use local storage and create popup.

## Lessons:
- We can not sort the data unless we put it before the map.
- We can store all of my function inside the fetch function.

## Challenge:
- To fetch the data at the bigging(parcel does not work).
- To use date-fns(I can not import it.)


## Contact

-   GitHub [Manjaka](https://github.com/moro-patana/country-quiz)


  

  

