# icrossland
ICROSSLAND

Don’t miss out!, actively track the stock market with Icrossland.

ICROSSLAND allows users to search and  track their favorite stocks. Stocks information include: their daily real-time data and their history and graph of open and close data. Users can also see what others are tracking. 

Tools and Technologies:
BACKEND: Node / Express / Javascript
FRONT-END: React / React-bootstrap / Styled Components
TESTING: Jasmine, Supertest, Proxyquire
DATABASE: Mongodb / Mongoose / Atlas
AUTHENTICATION & AUTHORIZATION: Auth0 / JWT (JSON Web Tokens)
API's: https://www.worldtradingdata.com/, my own built API, using Axios for Http requests
OTHER: 
  VSCode Editor
  Postman HTTP Client
  Google Developer Tools extensions 
  React Developer Tools Chrome extensions
  Heroku & Git Deployment

Features:
Google Login with Auth0.
Current User dashboard profile.
    Basic user information (ID, email, join date).
    Favorite stocks been tracked.
    Search bar to filter favorite stocks by name.
Explore page:	
    List of 50 stocks to explore from.
    Search bar to filter stocks by name.
Stocks: 
    Real-time daily data (name, symbol, high, low, prev close, closed date).
    Track/untrack button to add/remove as a favorite stock.
    Full profile: (52-week-high, 52-week-low, market-cap, volume, volume average, shares, gmt offsets, open and close graph       for the past 10 days generated with chart.js).
All users List
    Basic information of their profiles.
    Their favorite stocks. 

Pages:
Login Page.
Dashboard.
Explore (homepage).
Stock Profile.
All Users.
User Profile.

Steps while building my app:
Rest API w/Express (done).
React-App skeleton (done).
Database Schema  (done).
Split into multiple pages with react-router (done).
Login, Adding user accounts with Auth0+google (done).
Deploy to Heroku (done).
Integrate https://www.worldtradingdata.com/ and view list of stocks (done).
Integrate chart.js to visualize open and close history data (done).
Add tracking/untracking button functionality (done).
Code clean up (IN PROGRESS).
CSS (IN PROGRESS).
Automated tests in backend with jasmine(done).
Automated tests in frontend(PENDING).
Responsive design (tablet, mobile) (IN PROGRESS).
