var request = require('request'),
cheerio = require('cheerio'),
fs = require('fs'),
urls = [];

request('http://www.reddit.com', function(err, resp, body){
	if(!err && resp.statusCode == 200 ) {
		var $ = cheerio.load(body);
		$('a.title', '#siteTable').each(function(){
			var url = this.attr('href');
			if(url.indexOf('i.imgur.com')!= -1)
			{
				urls.push(url);
			}

		});

		console.log(urls);
		for(var i=0; i < urls.length; i++){
			request(urls[i]).pipe(fs.createWriteStream('images/' + i + '.jpg'));
		}
	}
});