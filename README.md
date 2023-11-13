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
### Prerequisite:
  - Node.js
  - NPM
### Steps:
1. Choose or create your root folder
2. Open command prompt or powershell, and navigate to the root folder
   ```
   cd <your-root-directory>
   ```
3. Install cypress via CLI
   ```
   npm install cypress --save-dev
   ```
4. Download the **\e2e\\** folder from Github to the Cypress **\node_modules\cypress\\** installation directory 
5. Execute the command to run the test
   ```
   npx cypress run --headed --spec "cypress/e2e/infor-qa-exam.cy.js"
   ```
   
## Results:
**Headless Result**

![](https://github.com/narancog/qa_cypress_exam/blob/main/infor-cli-result.png)

**UI Result**

![](https://github.com/narancog/qa_cypress_exam/blob/main/Infor-exam-result.png)
