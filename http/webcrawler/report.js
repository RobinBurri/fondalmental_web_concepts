const printReport = (pages) => {
    console.log('======')
    console.log('REPORT')
    console.log('======')
    const sortedData = sortPages(pages)
    for (const page of sortedData) {
        const url = page[0]
        const hits = page[1]
        console.log(`Found: ${hits} links to page: ${url}`)
    }
    console.log('======')
    console.log('END REPORT')
    console.log('======')
}

const sortPages = (pages) => {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        return b[1] - a[1]
    })
    return pagesArr
}

module.exports = { sortPages, printReport }
