How to automate everything
Scrape page every minute and save all pairings
    - If new round is found then timeout for 50 minutes and then again every minute until new round
Then depending on who is using it get the correct table from the current round. Send out discord messages when new round drops
Store who needs to receive a push notification with their discord Id and message them


Functions

SetInterval 1 minute
    function scrapeRK9 either with Axios getting the html or puppeteer doing its thing{
        getCurrentRound from #P2-tab -> (document.getElementById('P2-tab').textContent).split(' ')[3]
        if currentRound is not already in json 
            getAllThePairings and
    }