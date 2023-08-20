# Loyalty Reward System

To run the project locally,

1. Create a .env file according to .env.example file and fill in the respective values for each key

2. Afterwards, we need to deploy this contract to a blockchain. This can be performed by executing the `deploy.js`, using the following command

```bash
node .\src\deploy.js
```

3. After having deployed the contract, make sure to update the contract address in your .env file.

4. Now, we can use netlify's CLI to run a local development server for testing the program

```bash
npm run netlify
```

5. After waiting a few seconds, the webpage can be viewed and interacted with, on the browser.