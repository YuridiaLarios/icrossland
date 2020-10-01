# ICROSSLAND

Don’t miss out!, actively track the stock market with Icrossland.

ICROSSLAND allows users to search and  track their favorite stocks. Stocks information include: their daily real-time data and their history and graph of open and close data. Users can also see what others are tracking. 



### Tools and Technologies:

* **BACKEND**: Node / Express / Javascript
* **FRONT-END**: React / React-bootstrap / Styled Components
* **TESTING**: Jasmine, Supertest, Proxyquire
* **DATABASE**: Mongodb / Mongoose / Atlas
* **AUTHENTICATION & AUTHORIZATION**: Auth0 / JWT (JSON Web Tokens)
* **API's**: https://www.worldtradingdata.com/, my own built API, using Axios for Http requests
* **OTHER**: 
    * VSCode Editor
    * Postman HTTP Client
    * Google Developer Tools extensions 
    * React Developer Tools Chrome extensions
    * Heroku & Git Deployment

### Features:
* Google Login with Auth0.
* Current User dashboard profile.
   * Basic user information (ID, email, join date).
   * Favorite stocks been tracked.
   * Search bar to filter favorite stocks by name.
* Explore page:	
   * List of 50 stocks to explore from.
   * Search bar to filter stocks by name.
* Stocks: 
   * Real-time daily data (name, symbol, high, low, prev close, closed date).
   * Track/untrack button to add/remove as a favorite stock.
   * Full profile: (52-week-high, 52-week-low, market-cap, volume, volume average, shares, gmt offsets, open and close graph      * for the past 10 days generated with chart.js).
* All users List
   * Basic information of their profiles.
   * Their favorite stocks. 

### Pages:
* Login Page.
* Dashboard.
* Explore (homepage).
* Stock Profile.
* All Users.
* User Profile.

### Steps while building my app:
1. Rest API w/Express (done).
2. React-App skeleton (done).
3. Database Schema  (done).
4. Split into multiple pages with react-router (done).
5. Login, Adding user accounts with Auth0+google (done).
6. Deploy to Heroku (done).
7. Integrate https://www.worldtradingdata.com/ and view list of stocks (done).
8. Integrate chart.js to visualize open and close history data (done).
9. Add tracking/untracking button functionality (done).
10. Code clean up (IN PROGRESS).
11. CSS (IN PROGRESS).
12. Automated tests in backend with jasmine(done).
13. Automated tests in frontend(PENDING).
14. Responsive design (tablet, mobile) (IN PROGRESS).

### Installation:
1) Fork project, and from your own forked version clone it by copying the URL with HTTPS.
*![image](https://user-images.githubusercontent.com/22802143/58229147-bf478080-7ce5-11e9-90f2-7b89f42cddbc.png)


2) In terminal paste your link.
*![image](https://user-images.githubusercontent.com/22802143/58229736-56f99e80-7ce7-11e9-8451-db515df7cfea.png)


3) Move into icrossland folder and use **npm install**
* ![image](https://user-images.githubusercontent.com/22802143/58229953-d4bdaa00-7ce7-11e9-8111-291f7b8e1eba.png)


4) Move into client folder and use **npm install**  (this will install all react dependencies/packages)
* ![image](https://user-images.githubusercontent.com/22802143/58230171-6cbb9380-7ce8-11e9-8dda-d7eea05a6095.png)


5) Inside the client folder type **npm start** (this will run the react app in your browser)
*![image](https://user-images.githubusercontent.com/22802143/58230403-18fd7a00-7ce9-11e9-823f-59fdd116cf56.png)


6) Open another terminal window, **cd server** we will now do the set-up for the express server.
![image](https://user-images.githubusercontent.com/22802143/58230696-ed2ec400-7ce9-11e9-8204-c2c6a5194047.png)


7) **npm install**
![image](https://user-images.githubusercontent.com/22802143/58230791-2ff09c00-7cea-11e9-8235-6ba5883fb0c7.png)

8) Time to start changing some code! we will need to set up MongoDB Atlas, Auth0 application, Auth0API, World trading data API.

9) First, open the project in your text editor. 
![image](https://user-images.githubusercontent.com/22802143/58231392-bd80bb80-7ceb-11e9-8fe1-ade130d0a7ae.png)

10) In VSCode use **command-p** to quickly search for the file: react-variables.js or use the side menu and manually find the file under client/src/react-variables.js Add this line of code: **http://localhost:3000** this is where the server will run.
![image](https://user-images.githubusercontent.com/22802143/58231561-2cf6ab00-7cec-11e9-8e98-b0252b75915d.png)


11) In VSCode Use **command-p** to quickly search for the file: **.env.example**
![image](https://user-images.githubusercontent.com/22802143/58232668-fa01e680-7cee-11e9-8c41-7b28c8c554f9.png)

12) rename **.env.example** to just **.env** All your important keys, will go into this file which will be ignored before uploading anything to github. 

### MongoDB Atlas SET-UP

13) create a free account with MongoDB Atlas to set up our cloudbase database: https://www.mongodb.com/cloud/atlas
We will need to copy the generated URI into our .env file as shown in the tutorial. after that in the terminal run 
**node index.js** under icrossland/server to run the server and see the success message about connecting to the database.

Tutorial: [`https://www.youtube.com/watch?v=YuczCG1XmI0&feature=youtu.be`](https://www.youtube.com/watch?v=YuczCG1XmI0&feature=youtu.be)

![image](https://user-images.githubusercontent.com/22802143/58237695-941b5c00-7cfa-11e9-9ad9-8c1b8a1ac372.png)

### WorldTradingData API SET-UP

14) create a free account with https://www.worldtradingdata.com/ copy your generated api key into the .env file. (free version will only allow you to retrieve 5 stocks instead of 50 like the original app). 
![image](https://user-images.githubusercontent.com/22802143/58238601-751dc980-7cfc-11e9-8d6a-f39ae008deac.png)

### Auth0 APPLICATION SET-UP
15) Create an account with https://auth0.com/ or login with your google account. Follow the tutorial, and copy the corresponding keys into your .env file for the backend server and also into the Auth.js file in the front-end client. Ignore Audience for now, that's to create protected routes in your backend but it needs extra set up with Auth0 API SETUP

Tutorial: [`https://www.youtube.com/watch?v=3K_NOj1lkVQ`](https://www.youtube.com/watch?v=3K_NOj1lkVQ)


