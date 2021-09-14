const {Builder, By} = require('selenium-webdriver');
(async function example() {
    let url = "https://profilence.com/"
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("Test 4 tries to find all the links in nav element then tries to go to the random one, but not the current one")
    try {
        await driver.get(url);
        let element = await driver.findElement(By.css("nav"), 1000);
        let elements = await element.findElements(By.css("a"))
        let links = []
        for (let e of elements) {
            let href = await e.getAttribute("href");
            links.push(href);
        };
        let unilinks = [...new Set(links)];
        let currenturl= await driver.getCurrentUrl()
        // remove the current url from the list to not to navigate to same address
        for (let i = 0; i < unilinks.length; i++) {
            if (unilinks[i] === currenturl) {
                unilinks.splice(i, 1);
                i--; 
            }
        }
        // lets pick a random link
        const randomlink = Math.floor(Math.random() * unilinks.length);
        console.log(unilinks)
        let testurl = unilinks[randomlink]
        console.log(testurl + " the randomly picked link")
        await driver.get(testurl);
        console.log( await driver.getCurrentUrl() + " the current navigated address");
        console.log( "Navigated urls title " + await driver.getTitle());
    } catch (e) {
        console.log("catch error" + e)
    } finally {
        await driver.quit();
    }
})();