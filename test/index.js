'use strict'

const {join} = require('path')
const {readFileSync} = require('fs')
const {deepStrictEqual, ok} = require('assert')
const parseScreenings = require('../lib/parse-screenings')
const fetchScreenings = require('../lib/fetch-screenings')

const html = readFileSync(join(__dirname, 'screenings.html'), {encoding: 'utf8'})
deepStrictEqual(parseScreenings(html), [{
	title: 'City of Smile + Swipe',
	description: `\
Director Arafat Mazhar
OV with English subs
Followed by a talk with Arafat Mazhar`,
	start: '2020-05-28T19:30:00+02:00',
	end: null,
	url: 'https://bi-bak.de/bi-bakino/-/shehr-e-tabassum-swipe-1',
}, {
	title: 'Heads and Tails',
	description: `\
Director Aylin Kuryel and Fırat Yücel Turkey 2019
57 min, OV with English subs
Followed by a talk with Aylin Kuryel and Fırat Yücel`,
	start: '2020-02-26T19:30:00+01:00',
	end: null,
	url: 'https://bi-bak.de/bi-bakino/-/heads-and-tails',
}, {
	title: 'TEMPORARY FRIENDSHIPS',
	description: `\
Contract Labor and Internationalism in the GDR
Curated by Tobias Hering and Sun-ju Choi`,
	start: '2019-10-24T00:00:00+02:00',
	end: '2019-11-22T00:00:00+01:00',
	url: 'https://bi-bak.de/bi-bakino/freundschaft-auf-zeit',
}, {
	title: 'Arab Woman Filmmakers: A Manifold Gaze',
	description: `\
Curated by Amal Ramsis`,
	start: '2019-10-03T00:00:00+02:00',
	end: '2019-10-18T00:00:00+02:00',
	url: 'https://bi-bak.de/bi-bakino/amal-test-de',
}, {
	title: 'INTERFERENCES',
	description: `\
Curated by Malve Lippmann and Can Sungu`,
	start: '2019-09-05T00:00:00+02:00',
	end: '2019-09-26T00:00:00+02:00',
	url: 'https://bi-bak.de/bi-bakino/stoerfelder',
}, {
	title: 'KuirFest Berlin 2019',
	description: `\
Queer Feminist Rebels
Curated by Pembe Hayat KuirFest / Pink Life QueerFest, Esma Akyel and Esra Özban`,
	start: '2019-05-23T00:00:00+02:00',
	end: '2019-06-07T00:00:00+02:00',
	url: 'https://bi-bak.de/bi-bakino/kuirfest-berlin',
}, {
	title: 'MORE THAN A MIDNIGHT RAINBOW',
	description: `\
Chinese X Queer X Film\nCurated by Popo Fan`,
	start: '2019-04-04T00:00:00+02:00',
	end: '2019-04-25T00:00:00+02:00',
	url: 'https://bi-bak.de/bi-bakino/more-than-a-midnight-rainbow',
}, {
	title: 'Ideology in Turkish Cinema',
	description: `\
The Figure of the Migrant
Curated by Ömer Alkın`,
	start: '2019-03-14T00:00:00+01:00',
	end: '2019-03-29T00:00:00+01:00',
	url: 'https://bi-bak.de/bi-bakino/ideologie-im-tuerkischen-kino',
}, {
	title: 'True Voyage is Return',
	description: `\
Curated by Necati Sönmez`,
	start: '2019-01-10T00:00:00+01:00',
	end: '2019-02-21T00:00:00+01:00',
	url: 'https://bi-bak.de/bi-bakino/true-voyage-is-return',
}])
console.info('parsing works ✔︎')

fetchScreenings()
.then((screenings) => {
	ok(screenings)
	ok(screenings.length > 0)
	ok(screenings.every(s => !!s.title))
	ok(screenings.every(s => !!s.description))
	ok(screenings.every(s => !Number.isNaN(new Date(s.start))))
	ok(screenings.every(s => !!s.url))

	console.info('fetching live works ✔︎')
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
