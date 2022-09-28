// import jwtDecode from "jwt-decode";
const jwtDecode = require("jwt-decode");

let showListPage = (req, res) => {
  let token = req.cookies.JWT;
  let username = null;
  
  if (token) {
      try {
          token = jwtDecode(token);
          username = token.sub;

          if (!username) {
            res.redirect('/login');        
          }
          
          res.render("pages/customer/list", {username: username});
      } catch(error) {
          console.log('Invalid token');
      }
  }
  else {
    res.redirect('/login');
  }
}

let CustomerController = {
  showListPage
}

module.exports = CustomerController;
