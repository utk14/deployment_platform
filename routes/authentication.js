
const express = require('express');

const router = express.Router();
const passport = require('passport');

let oauth;
// const request = require('request');

router.get('/', passport.authenticate('gitlab'));

router.get('/gitlab', passport.authenticate('gitlab'), (req, res) => {
  const authCode = req.query.code;
  oauth = authCode;
  res.redirect('/#/newapp');
});

router.get('/code', (req, res) => {
  console.log('in /code');

  res.send(`hello ${oauth}`);
});

// router.get('/logout1', (req, res) => {
//   const options = {
//     method: 'POST',
//     url: 'https://gitlab.com/oauth/applications/revoke',
//     headers: { 'content-type': 'application/json' },
//     body:
//    {
//      client_id: 'beba364bb0b848ddb8e34dc19e7582e4c9654a5290696f953db040549486f812',
//      client_secret: 'a0df3018e8f43db95f20d17d9035caea2485c047664a559705881590001e008d',
//      token: oauth,
//    },
//     json: true,
//   };

//   request(options, (error, response, body) => {
//     if (error) {
//       console.log(error);
//     }

//     console.log(body);
//   });
// });

module.exports = router;
