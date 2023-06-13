# streetle

streetle is a geo location guessing game

## git-standards

- don't git push straight to master
- define code owners for faster review
- don't commit dependencies into source control
- don't commit local config files into source control
- makre sure git ignore file is updated with new dependencies
- branch naming convention example 'feat-droplist-dane'
- update tickets on project board as you work on them
- please follow [this guide](https://pages.nist.gov/dioptra/dev-guide/contributing-commit-styleguide.html) for commit message stylings

## Setting up a dev enviroment

* Clone this repo
* Install node packages ```npm install```
* Run the project in dev mode ```npm run dev``` <br>

***optional***

To take the streetview API out of dev mode create a ***.env*** file in the root directory <br>
In ***.env*** add this line ```VITE_STREET_VIEW_API_KEY=<Your API key>```

## Live Deploy
[Live Deploy](https://streetle-29d87.web.app/)

