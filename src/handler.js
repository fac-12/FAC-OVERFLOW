/*eslint-disable*/

const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const queries = require('./queries.js');
const bcrypt = require('bcryptjs');
const {
  sign,
  verify
} = require('jsonwebtoken');
const {
  parse
} = require('cookie');

const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'login.html')
  fs.readFile(filePath, function (err, file) {
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
  const filePath = path.join(__dirname, '..', endpoint);
  fs.readFile(filePath, function (err, file) {
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

const validateToken = (request, response) => {
  const send401 = () => {
    const message = 'You are not logged in';
    response.writeHead(401, {
      'Content-Type': 'text/plain'
    });
    return response.end(message);
  }
  if (!request.headers.cookie) return send401();
  const { jwt } = parse(request.headers.cookie);
  if (!jwt) return send401();
  return verify(jwt, process.env.SECRET, (jwt_err, jwt_res) => {
    if (jwt_err) {
      return send401()
    } else {
      const email = jwt_res;
      response.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      return response.end(email);
    }
  })
}

const signUpUser = (request, response) => {
  let allData = '';
  request.on('data', function (data) {
    allData += data;
  });
  request.on('end', function () {
    const userInfo = JSON.parse(allData);
    const email = userInfo.email;
    queries.emailInDatabase(email, (err, res) => {
      if (res === 1) {
        response.writeHead(409, {
          'Content-Type': 'text/plain'
        });
        return response.end('You\'ve already signed up!');
      } else if (res === 0) {
        const hashPassword = (password, callback) => {
          bcrypt.hash(password, 10, (bcrypt_err, bcrypt_res) => {
            if (bcrypt_err) callback(bcrypt_err);
            else callback(null, bcrypt_res);
          });
        };
        hashPassword(userInfo.password, (hash_err, hash_res) => {
          if (hash_err) {
            response.writeHead(500, {
              'Content-Type': 'text/plain'
            });
            return response.end('Password Error');
          } else {
            queries.addUser(email, hash_res, (add_err, add_res) => {
              if (add_err) {
                response.writeHead(500, {
                  'Content-Type': 'text/plain'
                });
                return response.end('Database Error');
              } else {
                const cookie = sign(email, process.env.SECRET);
                response.writeHead(201, {
                  'Location': '/forum',
                  'Set-Cookie': `jwt=${cookie}; HttpOnly`
                });
                return response.end();
              }
            });
          }
        });

      }
    });

  });
}

const loginUser = (request, response) => {
  let data = '';
  request.on('data', function (chunk) {
    data += chunk;
  })
  request.on('end', function () {
    const userInfo = JSON.parse(data);
    const email = userInfo.email;
    const password = userInfo.password;
    queries.emailInDatabase(email, (err, res) => {
      if (res === 0) {
        response.writeHead(403, {
          "Content-Type": "text/plain"
        })
        return response.end('You need to sign up first!');
      } else if (res === 1) {
        queries.getHash(email, (hash_err, hash_res) => {
          if (hash_err) {
            response.writeHead(500, {
              "Content-Type": "text/plain"
            })
            return response.end('server error password not found');
          } else {
            bcrypt.compare(password, hash_res.rows[0].password, (bcrypt_err, bcrypt_res) => {
              if (bcrypt_err) {
                response.writeHead(500, {
                  "Content-Type": "text/plain"
                })
                return response.end('server error');
              } else {
                if (bcrypt_res) {
                  const cookie = sign(email, process.env.SECRET);
                  response.writeHead(201, {
                    "Location": '/forum',
                    'Set-Cookie': `jwt=${cookie}; HttpOnly`
                  });
                  return response.end();
                } else {
                  response.writeHead(403, {
                    "Content-Type": 'text/plain'
                  });
                  return response.end('Password is incorrect');
                }
              }
            });
          }
        });
      }
    });
  });
}

const getPost =  (request, response) => {
  queries.loadPost((post_err, post_res) => {
    if(post_err) {
      response.writeHead(500, {'Content-Type': 'text/plain'})
      return response.end('Database error')
    } else {
      response.writeHead(200,{ 'Content-Type': 'application/json'})
      response.end(JSON.stringify(post_res.rows[0]))
    }
  })
}

const getComments =  (request, response, endpoint) => {
  const postID = endpoint.split('?')[1];
  queries.loadComments(postID, (comments_err, comments_res) => {
    if(comments_err) {
      response.writeHead(500, {'Content-Type': 'text/plain'})
      return response.end('Database error')
    } else {
      response.writeHead(200,{ 'Content-Type': 'application/json'})
      response.end(JSON.stringify(comments_res))
    }
  })
}

module.exports = {
  homeHandler,
  staticFileHandler,
  signUpUser,
  loginUser,
  validateToken,
  getPost
};
