const unirest = require('unirest')
const cheerio = require('cheerio')

const elems = {
  riadagestan: {
    title: '.itemTitle',
    image: '.preview_picture',
    text: '#qaz',
    views: '.itemHits b'
  },
  groznyinform: {
    title: '.news h1',
    image: '.imgB img',
    text: '.news p'
  },
  magastimes: {
    title: '.td-post-title .entry-title',
    image: '.wp-block-image img',
    text: '.td-post-content',
    views: '.td-post-views span'
  }
}

/*
  'https://riadagestan.ru/news/president/sergey_melikov_vruchit_gosnagrady_vydayushchimsya_dagestantsam/'
  'https://grozny-inform.ru/news/politic/124694/'
  'http://magastimes.ru/aeroport-ingushetii-v-2021-godu-nameren-poluchit-status-mezhdunarodnogo/'
*/

function parsePost(url, elems) {
  unirest.get(url).end(function (response) {
    const body = response.body
    const $ = cheerio.load(body)

    const domain = url.match(/\/\/(.*?)\//)[1]
    const title = $(elems.title).text().trim()
    let image = $(elems.image).attr('src')
    image = image.indexOf('http') >= 0 ? image : `http://${domain}${image}`
    const text = $(elems.text).text().trim()
    const views = $(elems.views).text().trim()

    const post = {
      title,
      image,
      text,
      views
    }

    console.log(post)
  })
}

parsePost('https://grozny-inform.ru/news/politic/124694/', elems.groznyinform)
