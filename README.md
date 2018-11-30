# Gab API Wrapper
This wrapper allows easy access to the Gab.com API. It uses Axios to make GET, POST, and DELETE requests to their API and returns their results. All avaialble endpoints are avaialable within this wrapper.
You will need to use OAuth2 to retrieve your users' auth token, which is then passed into the wrapper. More information is available on their documentation.

## Links
- [Documentation](https://gavkaz.github.io/Gab-API-Wrapper/)
- [Gab Documentation](https://developers.gab.com/)

## Prerequisites
- Register a Gab.com account at [Gab.com](https://gab.com/)
- Purchase Pro from Gab's store. Pro is currently require to access Gab's API.
- Visit User -> Settings and create a developer application.
- Authenticate your user with their OAuth2 endpoint and get their auth token.

## Usage
```js
const Gab = require('gab-api-wrapper');

const gab = new Gab({
  auth: '<Auth Token>'
});

// .then
gab.me()
  .then(response => {
    console.log(response);
  });

// async/await
const getMe = async () => {
  const me = await gab.me();

  console.log(me);
}

getMe();
```
