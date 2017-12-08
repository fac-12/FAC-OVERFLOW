# FAC-OVERFLOW

https://facoverflow.herokuapp.com/

Our goal this week was to make a forum which only authenticated users could access. They can log in or sign up on the home page. 

Posts and comments cannot be edited at this time, they draw from the pre-populated database.

Users can log out.

If user tries to go to the forum page without authentication then they are redirected to the log in page.


  # Setting up the database locally
 Let's start by setting up the database we will connect to.

1. Connect to postgres, by typing `psql` in the terminal on MAC, and `sudo -u postgres psql` on ubuntu.
1. Create the database by typing `CREATE DATABASE [the name of the database];`.
1. Create a superuser with a password by typing `CREATE USER [the new username] WITH SUPERUSER PASSWORD '[the password of the database]';` (the password needs to be in quotes, otherwise you get an error).
1. Change ownership of the database to the new user by typing `ALTER DATABASE [name of the database] OWNER TO [the new username];`
1. Add a `config.env` file and add the database's url in this format:
`DB_URL = postgres://[username]:[password]@localhost:5432/[database]`. The database name needs to be in lower case.
