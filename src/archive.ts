import { readFileSync } from 'fs'
import puppeteer from 'puppeteer'

const archive_prefix = 'https://archive.is/?url='

const delay = (time: number) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const urls = JSON.parse(readFileSync('urls.json') as unknown as string)

async function processUrl(page, url) {
  const link = archive_prefix + url
  await page.goto(link)

  const save_button = '#submiturl > div:nth-child(4) > input:nth-child(1)'
  await page.waitForSelector(save_button)
  await page.click(save_button)

  const finished = '#HEADER > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > div:nth-child(1)'
  await page.waitForSelector(finished)
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // executablePath: '/usr/bin/chromium-browser'
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768 })
  await page.setDefaultTimeout(1000 * 60 * 20) // 20min

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`Processing ${i}, ${url}`)

    await processUrl(page, url)
  }

  await browser.close()
})()
