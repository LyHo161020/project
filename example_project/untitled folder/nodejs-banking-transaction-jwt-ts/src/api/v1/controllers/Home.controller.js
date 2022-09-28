
let showHomePage = (req, res) => {
    res.redirect('/customers');
}

let HomeController = {
    showHomePage
}

module.exports = HomeController;
