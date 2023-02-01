const { JSDOM } = require('jsdom')

const crawlPage = async (baseURL, currentURL, pages) => {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }
    const normalizeCurrentURL = normalizeURL(currentURL)
    if (pages[normalizeCurrentURL] > 0) {
        pages[normalizeCurrentURL]++
        return pages
    }
    console.log(`actively crawling: ${currentURL}`)
    pages[normalizeCurrentURL] = 1
    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(
                `error in fetch with status code: ${resp.status} on page: ${currentURL}`
            )
            return pages
        }
        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(
                `non html response, content-type: ${contentType}, on page: ${currentURL}`
            )
            return pages
        }
        const htmlContent = await resp.text()
        const nextURLs = getURLsFromHTML(htmlContent, baseURL)
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
        return pages
    } catch (err) {
        console.log(`crawlPage error: ${err.message}`)
    }
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkEl of linkElements) {
        if (linkEl.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${linkEl.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(linkEl.href)
                if (linkEl.href.slice(-1) === '/') {
                    urls.push(linkEl.href.slice(0, -1))
                } else {
                    urls.push(linkEl.href)
                }
            } catch (err) {
                console.log(`error with absolut url: ${err.message}`)
            }
        }
    }
    return urls
}

const normalizeURL = (urlString) => {
    const urlObj = new URL(urlString)
    const hostpath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
        return hostpath.slice(0, -1)
    }
    return hostpath
}

module.exports = { normalizeURL, getURLsFromHTML, crawlPage }
