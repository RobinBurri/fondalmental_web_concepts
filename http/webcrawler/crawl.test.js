const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing /', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL lowerCase capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">Boot.dev Blog</a>
        </body>
    <html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = ['https://blog.boot.dev']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Boot.dev Blog</a>
        </body>
    <html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML multiple', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Boot.dev Blog</a>
            <div> <a href="/home">Boot.dev Blog</a> </div>
            <div> <a href="https://blog.boot.dev/signup">Boot.dev Blog</a> </div>
        </body>
    <html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = [
        'https://blog.boot.dev/path/',
        'https://blog.boot.dev/home',
        'https://blog.boot.dev/signup',
    ]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Invalid url</a>
        </body>
    <html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = []
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid + valid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <div> <a href="/home">Boot.dev Blog</a> </div>
            <div> <a href="https://blog.boot.dev/signup">Boot.dev Blog</a> </div>
            <a href="invalid">Invalid url</a>
        </body>
    <html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, baseURL)
    const expected = [
        'https://blog.boot.dev/home',
        'https://blog.boot.dev/signup',
    ]
    expect(actual).toEqual(expected)
})
