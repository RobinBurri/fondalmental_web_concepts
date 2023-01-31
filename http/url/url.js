const url =
    'http://testuser:testpass@testdomain.com:8080/testpath?testsearch=testvalue#testhash'

const printURLParts = (url) => {
    const urlObj = new URL(url)
    console.log(
        `protocol: ${urlObj.protocol}\nusername: ${urlObj.username}\npassword: ${urlObj.password}\nhostname: ${urlObj.hostname}\nport: ${urlObj.port}\npathname: ${urlObj.pathname}\nsearch: ${urlObj.search}\nhash: ${urlObj.hash}`
    )
}

printURLParts(url)
