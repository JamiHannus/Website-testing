const {Builder, By} = require('selenium-webdriver');
(async function example() {
    let url = "https://profilence.com/"
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("Test 3 tries to find all links on the url and count the unique ones")
    try {
     await driver.get(url);
     const elements = await driver.findElements(By.css('a'),1000);
     let linkcount = 0; 
     let links = []
     for ( let e of elements){
         let href = await e.getAttribute("href") 
             if (href){
                linkcount++;
                links.push(href);
                //console.log(href);
             }
             else{ //console.log(" no reference found")
         }
         //console.log(await e.getAttribute("title") || await e.getAttribute("class")||  await e.getAttribute("id"));
                     }
    console.log("Found " + linkcount+" links on the given url")  
    let unilinks = [...new Set(links)];
    console.log(unilinks.length + " Unique links found on page")
    console.log(unilinks)
    }
    catch(e){
        console.log("catch error" + e)
    } 
    finally {
      await driver.quit();
    }
  })();