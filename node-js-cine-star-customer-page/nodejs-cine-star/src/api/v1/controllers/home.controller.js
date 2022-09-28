
let showHomePage = (req, res) => {
    res.render("pages/customer/list");
    // res.send("Hello world");
}

let homeController = {
    showHomePage
}

module.exports = homeController;
