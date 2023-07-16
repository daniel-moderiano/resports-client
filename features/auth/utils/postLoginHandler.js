/**
 * Handler that will be called during the execution of a PostLogin flow. Used in Auth0 Action flows.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */

exports.onExecutePostLogin = async (event, api) => {
  // User is performing a silent authentication to request access token. Do not treat this as a normal login
  if (event.request.query.response_mode === "web_message") {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axios = require("axios");

  // Retrieve a JWT that can be used for AWS API Gateway calls
  const tokenRequest = {
    method: "POST",
    url: `https://${event.secrets.DOMAIN}/oauth/token`,
    headers: { "content-type": "application/json" },
    data: `{
        "client_id":"${event.secrets.CLIENT_ID}",
        "client_secret":"${event.secrets.CLIENT_SECRET}",
        "audience":"https://auth0-jwt-authorizer",
        "grant_type":"client_credentials"
      }`,
  };

  const { data: tokenData } = await axios(tokenRequest);

  // Calls the "addUser lambda" via HTTP API gateway endpoint
  const addUserRequest = {
    method: "POST",
    url: `${event.secrets.AWS_API_ENDPOINT}/users`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenData.access_token}`,
    },
    data: {
      email: event.user.email,
      email_verified: event.user.email_verified,
      _id: event.user.user_id,
    },
  };

  const res = await axios(addUserRequest);
  console.log(res);
};
