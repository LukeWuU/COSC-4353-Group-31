Modified site.js and index.html files with added features.

Files based on Microsoft tutorial "Tutorial: Call an ASP.NET Core web API with Javascript", with ASP.NET Core version set to 3.1.

Basic create/delete actions for Client Profile Management can be performed, verified through unit testing with launch URL: index.html.
 
The classes for user objects and fuel rate quotes are located in the Models folder of the project.

The project uses InMemoryDatabase from the EntityFrameworkCore package to store data. External database to be determined.

Modules added for login and gallon usage validation. Class attributes added to user object: city, state, and zipcode.

Missing components as of 3/12/22:

-User friendly Login Module with backend connectivity

-Client management reading and editing capabilities to the backend

-Fuel quote display upon selecting items from either a dropdown box or entering a custom value for gallons used

-Refer to displayRates() function for fuel quote display implementation details.
 
