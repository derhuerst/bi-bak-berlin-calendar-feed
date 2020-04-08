'use strict'

const {strictEqual} = require('assert')
const {DateTime, IANAZone} = require('luxon')
const cheerio = require('cheerio')

const trim = str => str.replace(/^[\r\n\s]+/g, '').replace(/[\r\n\s]+$/g, '')
strictEqual(trim('\n \t foo\r\n '), 'foo')

const removeBreaks = str => str.replace(/([^\s\r\n])\s*[\r\n]+\s*([^\s\r\n])/g, '$1 $2')
strictEqual(removeBreaks('foo \n bar'), 'foo bar')

const zone = new IANAZone('Europe/Berlin')
const inBerlinTz = (iso) => {
	return DateTime.fromJSDate(new Date(iso), {zone})
	.toISO({suppressMilliseconds: true})
}

const parseScreenings = (html) => {
	const $ = cheerio.load(html)

	return $('body > .wrapper .scroller .sparte--bi-bakino--b92026')
	.map((i, entry) => {
		const description = $('p', entry)
		.map((i, row) => removeBreaks(trim($(row).text())))
		.toArray().join('\n')
		const dateAndTime = $('time', entry)
		const start = trim(dateAndTime.first().attr('datetime') || '') || null
		const end = trim(dateAndTime.eq(1).attr('datetime') || '') || null
		return {
			title: trim($('h2 a', entry).text() || '') || null,
			description,
			start: start && inBerlinTz(start) || null,
			end: end && inBerlinTz(end) || null,
			url: $('h2 a', entry).attr('href'),
		}
	})
	.get()
}

module.exports = parseScreenings
