import puppeteer from 'puppeteer'
import { load } from 'cheerio'
import fs from 'fs'
let round;
import all_pairings from './pairings.json' assert { type: "json" }

export const start = async (_round) => {
    round = _round
    const browser = await init_browser()
    const page = await scrape_page(browser)
    await get_pairings(await get_round(page))

    await browser.close()
    console.log('Closed')
}

const init_browser = async () => {
    const browser = await puppeteer.launch()
    console.log('Launched')
    return browser
}

const scrape_page = async (browser) => {

    const page = await browser.newPage()
    await page.goto('https://rk9.gg/pairings/FeaUVURjohP4cvrMb5ZZ')
    return page
}

const get_pairings = async (doc) => {
    const $ = load(doc)

    const pairings = $(`.row.row-cols-3.match`)
    const pairings_array = []
    pairings.each((i, pair) => {

        const data = $(pair).text().replace((/  /gm), "").split(/\r\n|\n|\r/gm).filter((el) => {
            return el !== '' && !el.includes('pts')
        })

        if (!data[3]) {
            data[3] = ''
        }
        const obj = {
            'round': round,
            'table': `#${data[3].replace('Table', '')}` || '',
            'player_1': {
                'name': `${data[0]} ${data[1]}` || '',
                'score': data[2] || ''
            },
            'player_2': {
                'name': `${data[4]} ${data[5]}` || '',
                'score': data[6] || ''
            },
        }

        pairings_array.push(obj)

    })
    all_pairings.pairings[`round_${round}`] = pairings_array
    fs.writeFileSync('pairings.json',JSON.stringify(all_pairings))
}

const get_round = async (page) => {
    return await page.evaluate((round) => {
        console.log(round)
        const getMasterRound = (document.getElementById('P2-tab').textContent).split(' ')[3]
        return document.getElementById(`P2R${round}`).innerHTML
    }, round)
}
