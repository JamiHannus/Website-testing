const {Builder, By, until} = require('selenium-webdriver');
(async function example() {
    console.log("Test 5 tries to find all links on nav bar and cycles all the links and check if finds id content on the page")
    let url = "https://profilence.com/"
    let driver = await new Builder().forBrowser('chrome').build();
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
       try{
           for (let e of unilinks){
            await driver.get(e);
            await driver.wait(until.elementLocated(By.id("content")),2000);
            console.log(await driver.getCurrentUrl());
            await driver.navigate().back();
            console.log(await driver.getCurrentUrl());
           }
       } catch (e){  
           console.log(" error in navigation loop. Something went wrong with the chosen links" + e)
       }  
    } catch (e) {
        console.log("catch error from the whole loop" + e)
    } finally {
        await driver.quit();
    }
})();