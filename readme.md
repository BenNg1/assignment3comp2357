# Assignment 3 - Pokedex I : A Web App to View and Filter Pokemon


# Demo Link
https://incomparable-swan-4cb161.netlify.app/

# Instructions
Objective: The objective of this assignment is to design and develop a web application that allows users to view a list of all the Pokémon, filter them by type, navigate through the list, and get more information about a specific Pokémon.

# User Stories:

1.  As a user, I want to see a list of all the Pokémon available, so that I can choose the one I want to know more about.
2.  As a user, I want to filter the Pokémon by their type, so that I can easily find the ones with specific characteristics.
2.  As a user, I want to see a limited number of Pokémon at a time and have the ability to navigate between them, so that I don't get overwhelmed by a large list.
3.  As a user, I want to see the total number of Pokémon and the number of Pokémon being displayed, so that I can keep track of the amount of data being displayed.
5.  As a user, I want to see more information about a Pokémon when I click on it, so that I can learn more about it.

Requirements:

1.  The web app should have a homepage that displays a list of all the Pokémon available.
2.  The web app should have a filter option that allows users to filter the Pokémon by type.
3.  The web app should have a pagination feature that allows users to navigate through the list.
4.  The web app should display the total number of Pokémon and the number of Pokémon being displayed.
5.  The web app should display more information about a specific Pokémon when the user clicks on it.

<!-- # Deliverables:
1.  [text link] Short YT video (1-2 minutes) that demonstrates the working of the web app. Use user stories to demonstrate the features of the web app.
2.  [text] Self-Evaluation (see Sample below).
3.  [Zip link] GitHub ClassRoom link of your source code. -->
   


# Rubric [Out of 50]:
10 items x 5 marks each = 50 marks
- [complete/incomplete] Fetch all pokemons names from the API and Create a pokemon card for each pokemon  
- [complete/incomplete] Display the pokemon's details in the modal
- [complete/incomplete] Pagination - All pokemons are accessible through the pagination buttons
- [complete/incomplete] Pagination - Display only at max 5 pages at a time
- [complete/incomplete] Pagination - Display the next and previous buttons  
- [complete/incomplete] Pagination - Highlight the current page's button and
- [complete/incomplete] Pagination - Hide the next and previous buttons when there is no next or previous page
- [complete/incomplete] Pagination - Display total number of Pokémons and the number of Pokémon being displayed
- [complete/incomplete] Filtration - Fetch the Pokémon types from the API and display them in a checkbox group  
- [complete/incomplete] Filter the Pokémon cards based on the selected types


# Self-Evaluation Sample [40/50]:
- [complete] Fetch all pokemons names from the API and Create a pokemon card for each pokemon  
- [complete] Display the pokemon's details in the modal
- [complete] Pagination - Get The All the pages buttons
- [complete] Pagination - Display only at max 5 pages at a time
- [complete] Pagination - Display the next and previous buttons  
- [complete] Pagination - Highlight the current page's button and
- [complete] Pagination - Hide the next and previous buttons when there is no next or previous page
- [incomplete] Pagination - Display total number of Pokémons and the number of Pokémon being displayed
- [complete] Filtration - Fetch the Pokémon types from the API and display them in a checkbox group  
- [incomplete] Filter the Pokémon cards based on the selected types

You will be penalized  for 
- Improper/missing incremental atomic GIT commits, 
- Missing deliverables, and/or 
- Late submission.

<!-- ## Development Strategy/Hint  
1.  Design the wireframe and plan the development process.   
2.  Develop the web app and implement the features mentioned in the user stories.  
3.  Test the web app, fix bugs, and prepare the YT demo.   -->

# References
- Use the Pokémon API - https://pokeapi.co/ to fetch the data.
  - GET all the pokemon: `https://pokeapi.co/api/v2/pokemon?limit=810`
  - GET a specific pokemon: `https://pokeapi.co/api/v2/pokemon/{id or name}/`
  - GET all the pokemon types: `https://pokeapi.co/api/v2/type/`
- You may use any CSS framework of your choice.
- You may use any JavaScript framework of your choice.