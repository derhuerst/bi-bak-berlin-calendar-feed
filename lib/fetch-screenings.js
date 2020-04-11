'use strict'

const fetch = require('node-fetch')
const pkg = require('../package.json')
const parseScreenings = require('./parse-screenings')

const fetchScreenings = async () => {
	const res = await fetch('https://bi-bak.de/bi-bakino', {
		redirect: 'follow',
		timeout: 20 * 1000,
		headers: {
			accept: 'text/html',
			'accept-language': 'en-US, de', // todo: make this an option
			'user-agent': pkg.homepage,
		},
	})
	if (!res.ok) {
		const err = new Error(res.statusText)
		err.statusCode = res.status
		err.url = res.url
		err.res = res
		throw err
	}

	return parseScreenings(await res.text())
}

module.exports = fetchScreenings
