/*eslint-disable*/

const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const queries = require('./queries.js');
const bcrypt = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
const {parse} = require('cookie');

const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'login.html')
  fs.readFile(filePath, function(err, file) {
    if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      response.end('Server error');
    }
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.end(file);
  })
}

const staticFileHandler = (request, response, endpoint) => {
  const extensionType = {
    html: 'text/html',
    css: 'txt/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
  }
  const extension = endpoint.split('.')[1].split('?')[0];
  const filePath = path.join(__dirname, '..', endpoint)
  fs.readFile(filePath, function(err, file) {
    if (err && err.code === 'ENOENT') {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      response.end('404 Not Found');
    } else if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      response.end('Server error');
    } else {
      response.writeHead(200, 'Content-Type: ' + extensionType[extension]);
      response.end(file);
    }
  })
}

const signUpUser = (request, response) => {
  let allData = '';
  request.on('data', function(data) {
    allData += data;
  });
  request.on('end', function() {
    const userInfo = JSON.parse(allData);
    const email = userInfo.email;
    queries.emailInDatabase(email, (err, res) => {
      if (res === 1) {
        response.writeHead(409, {
          'Content-Type': 'text/plain'
        });
        response.end('User already in database');
      } else if (res === 0) {
        const hashPassword = (password, callback) => {
          bcrypt.hash(password, 10, (bcrypt_err, bcrypt_res) => {
             if (bcrypt_err) callback(bcrypt_err);
             else callback(null,bcrypt_res);
          });
        };
        const hashedPassword = hashPassword(userInfo.password,(hash_err,hash_res) => {
          if(hash_err) {
            response.writeHead(500, {
              'Content-Type': 'text/plain'
            });
            response.end('Password Error');
          }
          else{
            queries.addUser(email,hash_res, (add_err, add_res) => {
              if (add_err) {
                response.writeHead(500, {
                  'Content-Type': 'text/plain'
                });
                response.end('Database Error');
              }
              else {
                const cookie = sign(email, process.env.SECRET);
                response.writeHead(302, {
                  'Location' : '/forum',
                  'Set-Cookie' : `jwt=${cookie}; HttpOnly`
                });
                return response.end();
              }
            });
          }
        });
        
      }
    });
 
  });
  //parse data

  //check if user in database
      //if yes send message 'Already signed up'
      //if no add to database and log in
}


module.exports = {
  homeHandler,
  staticFileHandler,
  signUpUser
};
