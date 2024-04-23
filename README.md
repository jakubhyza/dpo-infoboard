## Project VAJ 2024

### Instructions

https://docs.google.com/document/d/1mbYYzY0j7Xq8KX8a2ei2_Ta1AQUWpfcpD0tORZt8AD4/edit?usp=sharing

Split your projects into 2 JS projects. You will have 2x package.json. One will be for BE in folder be, one will be for FE in folder fe. 

You can write instructions to your project either in this README ind in separeate README files in the folders be, fe. 

Delete this text after you finish :) 

Good luck!


# Not finished yet!!!

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

### Running the app (dev environment)
1. Run `npm run dev` in `be` folder and let it run
2. Run `npm run dev` in `fe` folder ale let it run

API is running on `http://localhost:8080` 
Client is running on `http://localhost:5173`
