const cheerio = require('cheerio');
const request = require('sync-request');
const fs = require('fs');

function synonyms(query) {
    const url = 'https://www.thesaurus.com/browse/' + encodeURIComponent(query);
    const req = request('GET', url);

    if (req.statusCode !== 200) {
        return { synonyms: [], antonyms: [] };
    }

    const $ = cheerio.load(req.getBody(), { ignoreWhitespace: true });

    let synonyms = $('#meanings').find('ul li a');
    // fs.writeFileSync('test.html', $('#meanings').html())
    synonyms = synonyms.map(function() {
        return $(this).text().trim();
    }).get();

    return {
        synonyms: synonyms,
    };
}

module.exports = { synonyms };