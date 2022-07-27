# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

- Properfans backend API

### Naming Conventions ###

- variableName
- file-name
- directory-name
- ENV_VARIABLE

### Best Practices ###

- If possible give types to all variables via typescript.
- Create your own type if a variable takes type values that are outside the norm.
- Use `const` where possible
- If the variable value changes in the scope, use `let`
- Avoid using `var`
- Lint your code with eslint (pending)
- Add common prettier (pending)
- Add husky to run tests before pushing the code (pending)
- Setup bitbucket pipeline to run after merge (pending)

### How do I get set up? ###

* Summary of set up
    - Install Neo4J locally if testing local setup - https://neo4j.com/docs/operations-manual/current/installation/
    - Import data into your data using CSV with https://data-importer.graphapp.io/
    - Change the connection bolt URL, username and password to connect to your instance
    - run node .\src\index.js
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

- Always raise your PR's with proper commit messages
- Alawys test your changes before raising PR
- Add your change along with JIRA ticket number to the `CHANGELOG.md` file
- Atleast get 2 approvals from the team before the PR gets merged
