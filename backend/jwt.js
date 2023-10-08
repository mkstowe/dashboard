const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'https://dash.mkstowe.com/api',
    issuerBaseURL: 'https://dev-1fguvr6cw0f84i24.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

module.exports = checkJwt;