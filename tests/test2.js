const {Builder, By} = require('selenium-webdriver');
(async function example() {
    let url = "https://profilence.com/"
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("Test 2 tries to find all images on the url and check if they have an alt text")
    try {
     await driver.get(url);
     const elements = await driver.findElements(By.css('img'),1000);
     let missingalt = 1;
     let picurecount = 0;
     for ( let e of elements){
         console.log(await e.getAttribute("src",)), picurecount++;
         console.log(await e.getAttribute("alt") || "Missing alt text, count:" +missingalt++);
     }
    console.log("Test found " + picurecount+ " pictures  with " + (missingalt-1)+ " missing an alternative text" ) 
    }
    catch(e){
        console.log("catch error" + e)
    } 
    finally {
      await driver.quit();
    }
  })();