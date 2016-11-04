const request = require('superagent');
let ticket;

$("#loginForm").submit(e => {
  e.preventDefault();
  const email = $("#loginForm input:first").val();
  const password = $("input:password").val();
  console.log(email, password);
  request.post(`https://discordapp.com/api/v6/auth/login`)
    .send({ email: email, password: password })
    .end((err, res) => {
      const loginPacket = JSON.parse(res.text);
      console.log(loginPacket)
      if (loginPacket.token === null && loginPacket.mfa === true) {
        ticket = loginPacket.ticket;
        $("#loginForm").hide();
        $("#loginMFA").show();
      } else {

      }
    })
});

$("#loginMFA").submit(e => {
  e.preventDefault();
  const code = $("#loginMFA input:first").val();
  request.post(`https://discordapp.com/api/v6/auth/mfa/totp`)
    .send({ code: code, ticket: ticket })
    .end((err, res) => {
      const loginPacket = JSON.parse(res.text);
      if (loginPacket.token === null) {

      }
    })
});
