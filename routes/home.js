exports.root = (req, res) => {
    res.render("home")
}

exports.work = (req, res) => {
    res.render("how-we-work")
}

exports.customer = (req, res) => {
    res.render("customer-dash")
}