
<div align="center">
  <p>
    <img alt="Logo" src="celestia-logo.png" width="192">
  </p>
  <p>
    <b>Celestia</b>
  </p>
  </p>
</div>

# Celestia

Celestia is a market prediction app for the MMORPG Eve Online. 
Celestia leverages AI and Machine Learning to predict market prices.

You can view the live application here: https://evecelestia.com/
You can view the live API here: https://celestia-api.fly.dev/graphiql

## Getting Started
Celestia is an open-source project that is open to all developers. If you would like to help please submit an issue or Pull Request!

Current mono-repo package structure:
- celestia-database: A node package with a Postgres database powered by PostGraphile and db-migrate. Once deployed is hosted on Neon.
- celestia-api: A node package with a postgraphile API. Once deployed is hosted on fly.io.
- celestia-app: A Next.js application using React, Radix-ui, TailwindCSS, and Apollo GraphQL.
- celestia-data-pipeline: A Python package used for all of the database interactions.
- celestia-models: A Python/Jupyter package used for the testing and production of AI/ML models. 

### With codespaces
On GitHub click the green code button on the repository. After that switch to the `Codespaces` tab and click "Create Codespace on main". You do not need to configure any additional settings since the `devcontainer.json` file has predefined everything you will need. After this you can create code in the browser IDE like normal, keep in mind that normal GitHub users get 120 hours of codespace time a month after that you have to pay for more. Here is the documentation for codespaces if you want to learn more:
https://docs.github.com/en/codespaces/overview

### Local DevContainer
Prerequisites: Install Docker and have the Dev Containers extension from Microsoft installed in your local VS code.

After cloneing the repository you can open the code normally with your editor and you should be prompted to re-open in a Dev Container. This will create a Docker container to develop inside.

### Local development
Prerequisites: PostgreSQL

After cloneing the repository in the root run `yarn install:all` this will install all dependencies you need through each package.

### Next steps:
View each package READEME.md for instructions on development.

