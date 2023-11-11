# qa_cypress_exam

## Tests:
1. Bar graph test
   - Bar selection enabled behavior (which must not be present):
     - if bar is selected another class 'is-selected' is added
     - if not, opacity is decreased to 0.6
   - Y-axis text validated corresponding to the position of the bar
2. Table test
   - included multiple search string as data
   - highlighted with a red box each word that includes the search string  
3. App menu test
   - included multiple search string as data
   - validation of the accordion panels depending on the search string and if any child of the parent is selected
  
## How to run:
1. Download infor-qa-exam.cy.js script to local machine.
2. Install Cypress.
3. Run the script. Please refer to [Cypress](https://docs.cypress.io/guides/guides/command-line) page.

## Results:
![](https://github.com/narancog/qa_cypress_exam/blob/main/Infor-exam-result.png)
