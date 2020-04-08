'use strict'

const {createHash} = require('crypto')
const {strictEqual} = require('assert')
const {DateTime} = require('luxon')
const generateIcs = require('ics-service/generate-ics')
const fetchScreenings = require('./lib/fetch-screenings')
const pkg = require('./package.json')

const hash = (str) => {
	const h = createHash('sha256')
	h.update(str)
	return h.digest('hex')
}
strictEqual(hash('foo'), '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae')

const FEED_TITLE = `bi'bak movie screenings`
const ADDRESS = 'Prinzenallee 59, Berlin, Germany'
const LATITUDE = 52.557718
const LONGITUDE = 13.385242
const RADIUS = 15

const formatDateTime = (iso) => {
	const dt = DateTime.fromISO(iso)
	return [dt.year, dt.month, dt.day, dt.hour, dt.minute]
}

const getBiBakMovieScreeningsIcs = async (feedUrl = null) => {
	const screenings = await fetchScreenings()
	const events = screenings.map((s) => ({
		uid: hash(s.url),
		title: s.title,
		description: s.description,
		url: s.url,
		location: ADDRESS,
		geo: {lat: LATITUDE, lon: LONGITUDE, radius: RADIUS},
		start: s.start ? formatDateTime(s.start) : null,
		startInputType: 'local',
		startOutputType: 'local',
		end: s.end ? formatDateTime(s.end) : null,
		endInputType: 'local',
		endOutputType: 'local',
		duration: s.end ? null : {hours: 3, minutes: 0}, // todo
		status: 'CONFIRMED',
		productId: pkg.homepage,
	}))

	return generateIcs(FEED_TITLE, events, feedUrl)
}

module.exports = getBiBakMovieScreeningsIcs
