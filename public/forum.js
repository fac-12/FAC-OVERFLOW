const validateToken = (request, response) => {
    const send401 = () => {
      const message = 'You are not logged in';
      response.writeHead(401, {
        'Content-Type': 'text/plain'
      });
      return response.end(message);
    }
    const {
      jwt
    } = parse(request.headers.cookie);
    if (!request.headers.cookie && !jwt) return send401();
    return verify(jwt, process.env.SECRET, (jwt_err, jwt_res) => {
      if (jwt_err) {
        return send401()
      } else {
         const email = jwt_res;
         console.log('I\'m email: ',typeof email)
         response.writeHead(200, { 'Content-Type': 'text/plain'});
         return response.end(email);
      }
    })
  }