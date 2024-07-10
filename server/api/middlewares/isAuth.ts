import { expressjwt } from 'express-jwt';

const getTokenFromHeader = (req) => {
 
};

const isAuth = expressjwt({
  secret: 'JWT-SECRET-12391879283218123', // The _secret_ to sign the JWTs
  requestProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, // How to extract the JWT from the request
  algorithms: ['HS256']
});

export default isAuth;
