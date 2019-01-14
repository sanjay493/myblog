const fs = require('fs');

module.exports = {
    addNewsPage: (req, res) => {
        res.render('add-news.ejs', {
            title: "Welcome to Tech News World | Add a new Tech News"
            ,message: ''
        });
    },
    addNews: (req, res) => {

        let message = '';
        let headline = req.body.headline;
        let para1 = req.body.para1;
        let link = req.body.link;
        let news_date = req.body.news_date;
                        // send the player's details to the database
    let query = "INSERT INTO `newslist` (headline, para1, link, news_date) VALUES ('" +
                            headline + "', '" + para1 + "', '" + link + "', '" + news_date + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                
                
            
        
    },
    editNewsPage: (req, res) => {
        let newsId = req.params.id;
        let query = "SELECT * FROM `newslist` WHERE id = '" + newsId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-news.ejs', {
                title: "Edit  News",
                news: result[0],
                message: ''
            });
        });
    },
    editNews: (req, res) => {
        let NewsId = req.params.id;
        let headline = req.body.headline;
        let para1 = req.body.para1;

        let query = "UPDATE `newslist` SET `headline` = '" + headline + "', `para1` = '" + para1 + "' WHERE `newslist`.`id` = '" + NewsId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteNews: (req, res) => {
        let NewsId = req.params.id;
        //let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        let deletenewsQuery = 'DELETE FROM newslist WHERE id = "' + NewsId + '"';

        
                db.query(deletenewsQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
        
    
    }
};
