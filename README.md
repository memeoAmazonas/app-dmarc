# DMARC GUARDIAN
Dashboard for DMARC record analysis.

---

## Linting
The code uses eslint and flow js to check for types and code structure. To set it up on VS Code follow
https://github.com/flowtype/flow-for-vscode#setup


---

## Development

The app is built using React and Redux along with other modules to help organizing it better. For more information about them check:

[React](https://reactjs.org/) | [Redux](https://redux.js.org/) | [Redux Saga](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html) | [Webpack](https://webpack.js.org/) | [Jest](https://jestjs.io/)

> Check the `package.json` file to see the rest of the packages being used

## Building the app for dev
Go to the root folder and run the following command to install all the project dependencies (NOTE: Make sure you have a version of node >=3.10.7 and npm >=6.9.0)
```
npm install
```

### Ampify Configuration
The app relies on some features from the amplify framework to authenticate users and deploy itself to an Amazon S3 bucket. For that reason we need to configure AWS user pools and buckets for the project. Follow this video https://www.youtube.com/watch?v=s2_j_L0aJ_I to create the necessary user pools, and IAM user and the create a file called `.env` and configure it as shown below:

```
cp env-template .env
```



### Running the code
Once you have completed all the previous steps run on your root folder.

```
npm run dev
```
---



---
</br></br>
**Questions?**
</br>
Contact: nelsonochoam@gmail.com </br>
Phone: +5879681309

