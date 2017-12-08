# FAC-OVERFLOW

https://facoverflow.herokuapp.com/

Our goal this week was to make a forum which only authenticated users could access. They can log in or sign up on the home page. 

Posts and comments cannot be edited at this time, they draw from the pre-populated database.

Users can log out.

If user tries to go to the forum page without authentication then they are redirected to the log in page.

# Instructions for the database
To create the database locally run db_build.js 
Task 1: Setting up the database

We are currently hard-coding the data in to the application (static.js) because we don't have a database. Now we want to replace static.js with an actual database. Let's start by setting up the database we will connect to.

Connect to postgres, by typing psql in the terminal on MAC, and sudo -u postgres psql on ubuntu.
Create the database by typing CREATE DATABASE [the name of the database];.
Create a superuser with a password by typing CREATE USER [the new username] WITH SUPERUSER PASSWORD '[the password of the database]'; (the password needs to be in quotes, otherwise you get an error).
Change ownership of the database to the new user by typing ALTER DATABASE [name of the database] OWNER TO [the new username];
Add a config.env file and add the database's url in this format: DB_URL = postgres://[username]:[password]@localhost:5432/[database]. The database name needs to be in lower case.
