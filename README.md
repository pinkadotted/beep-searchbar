
# Frontend Developer Assignment

## Overview
This is a React application for a Search Dropdown Component. It is primarily written using ReactJS and Typescript, with a help of TailwindCSS. 

The default dataset used is an array of countries, placed in *../data/countries.json*.

The components were developed with the example search bar provided in mind. 


## Quick start

Go to the root directory of the project: beep-assignment

```bash
  npm install
```
### Running Tests
To run a simple test suite:
```
npx cypress open
```
Click on "Component Testing" and "Start Component Testing in Chrome" (or whichever browser is shown in the option).

You will see the available test files. In this case, there will only be ***SearchBar.cy.tsx***. 

After clicking on it, you should see 8 (passing) test cases. 
### Run Locally
```
npm run dev
```
Once the server has started, open <localhost:5173> on your browser. The search bar above is asynchronous, while the search bar below is synchronous.

## Features

### Synchronous Searchbar
- Upon clicking on the searchbar, the Dropdown is displayed with all the options
- Every key stroke invokes the filter function, and the filtered results will be displayed below


### Asynchronous Searchbar
- Debounce asynchronous requests
- Implements an isLoading state for asynchronous searching
- Shows a loading spinner on the right side of the searchbar when the Debounce function is being called (i.e when the user is actively typing)
- The wait is set to 1 second, afterwhich the filter function runs and the Dropdown is displayed with the filtered results


### For both types of searchbars
- Configurable by passing these optional props:
    - label: *string*
    - description: *string*
    - isAsync: *boolean*
    - disabled: *boolean*
    - component: *React component*
- Keyboard navigation
    - **Up Arrow Key** and **Down Arrow Key** to scroll through list of results
    - **Esc** to close results windows
    - **Enter** to select highlighted result
- Mouse navigation
    - Clicking on a search result will toggle it from list of selected options
    - Click away from the input or list of results will close the results window
- If the search term does not match any option in the dataset, "No Results Found" will be shown.


### Future Improvements
- Upon selection, it would be good for the selected options to be displayed in the input field so that the user can easily see all the selection options
- A checkbox that allows the user to select all the options 
- A more robust testing suite

### Credits
The mock dataset was retrieved from this GitHub gist:
https://gist.github.com/amitjambusaria/b9adebcb4f256eae3dfa64dc9f1cc2ef#file-countries-json