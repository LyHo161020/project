let showLoginPage = (req, res) => {
    res.clearCookie("JWT");
    res.render("pages/login");
}

let LoginController = {
    showLoginPage
}
 
module.exports = LoginController;