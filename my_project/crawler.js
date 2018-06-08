const Crawler = require('crawler');
const fs = require('fs');

function spider(url, callback) {
    return new Promise(function(resolve, reject) {
        const c = new Crawler({
            callback: function(err, res, done) {
                if (err) {
                    reject(err);
                } else {
                    let obj = callback(res.$)
                    resolve(obj)
                }
                done();
            }
        });
        c.queue(url)
    })
}

function gatherLiveUrl($) {
    let $dom = $('.dropdown ul li a')
    let tmpArr = [];
    for (var key in $dom) {
        if (isObjEmpty($dom[key].attribs)) {
            continue;
        }
        tmpArr.push({
            label: $dom.eq(key).text().trim(),
            href: $dom[key].attribs.href
        })
    }
    return tmpArr;
}

function gatherCategoryUrl($) {
    let $dom = $('.js-list-ul li a')
    let tmpArr = [];
    for (var key in $dom) {
        if (isObjEmpty($dom[key].attribs)) {
            continue;
        }
        tmpArr.push({
            href: $dom[key].attribs.href,
            avatar: $('.js-list-ul li a .pic img').eq(key).attr('src'),
            nickname: $('.js-list-ul li a .figure-info .username .name').eq(key).text().trim()
        })
    }
    return tmpArr;
}

const asyncFetch = async function() {
    let res1 = await spider("http://www.huajiao.com", gatherLiveUrl)
    let json = { data: [] }
    for (var i = 0; i < res1.length; i++) {
        let res = await spider("http://www.huajiao.com" + res1[i].href, gatherCategoryUrl)
        var obj = {}
        obj[res1[i].label] = res
        json.data.push(obj)
    }
    fs.writeFile('./static/data.json', JSON.stringify(json), 'utf8', (err) => {
        if (err) console.log(err)
        console.log('ok')
    })
}

function isObjEmpty(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}
module.exports = asyncFetch;