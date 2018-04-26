const express = require('express') 
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

const app = express()


app.get('/scrape', (req, response , nex) => {
    let url = 'http://www.imdb.com/title/tt1229340/'

    request( url , (err,res,html) => {
        if( !err ){
            var $ = cheerio.load(html)
            var title,release,rating

            var json = { title: "" , release : "" , rating: "" }

            var titlemovie = $(".title_wrapper").children().first().text()

            $('.header').filter(function(){
                var data = $(this);
                title = data.children().first().text()

                release = data.children().last().children().text()

                json.title = title;

                // Once again, once we have the data extract it we'll save it to our json object

                json.release = release

                response.send(titlemovie);

            })

        }
    })

})


app.listen(8003 , () => {
    console.log('SERVER ONLINE: ' + 8003 )
})


exports = module.exports = app;