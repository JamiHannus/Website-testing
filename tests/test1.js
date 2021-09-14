const {Builder} = require('selenium-webdriver');
(async function example() {
  console.log("Test 1 is very basic , will go to given url and check the expected title.")
    let driver = await new Builder().forBrowser('chrome').build();
    let knowtitle = "Profilence Technical Quality Analysis"
    let url ="https://profilence.com/"
    try {
     await driver.get(url);
     let title = await driver.getTitle();
     if (title.match(knowtitle)){
        console.log("Title matches the expected value")
      }else{ console.log(title + " is what was found, Is the title right? was compared to "+knowtitle)
      }
    }
    catch(e){
        console.log("catch error" + e)
    } 
    finally {
      await driver.quit();
    }
  })();