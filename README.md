## Project VAJ 2024
This project was written by Jakub Hýža (HYZ0013). It allows you to create infoboards showing information about public transport in Ostrava. I chosed this topic because it is something I wanted to do for a long time but had no time to do it.

### Source of data
The source of data is https://scc.dpo.cz/dashboard/ (Dopravní podnik Ostrava)  
App uses only publicly available endpoints and it is able to automaticly detect public API key but if you want to use this app more than just for testing purposes it would be probablly better to ask DPO if you can use it and get your own API key.  
App is also trying minimize the number of requests to the API as much as possible.

### Requirements
This app was build on
- Node.js v20.6.1
- npm v10.5.2

### Setup instructions (dev environment)
1. Clone this repository
2. Run `npm install` in both `be` and `fe` folders
3. Run `npm run migrate` in `be` folder

### Running the app (dev environment)
1. Run `npm start` in `be` folder and let it run
2. Run `npm run dev` in `fe` folder ale let it run

API is running on `http://localhost:8080` 
Client is running on `http://localhost:5173`
