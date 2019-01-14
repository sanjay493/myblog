module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `newslist` ORDER BY news_date DESC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('home.ejs', {
                title: "Welcome to Tech News",
                news: result
            });
        });
    },
    techNews: (req, res) => {
        let query = "SELECT * FROM `newslist` ORDER BY news_date DESC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('technews.ejs', {
                title: "Welcome to Tech News",
                news: result
            });
        });
    },
    NotFound: (req,res) => {
        res.render('NotFound.ejs',{
            title:"Welcome to Tech News",
            notice: " The page you are looking for is not Available Here!"
        });
    }
};
