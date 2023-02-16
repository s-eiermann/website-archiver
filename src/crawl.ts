import fetch from 'node-fetch'
import { load } from 'cheerio'
import { writeFile } from 'fs'

const URI = 'https://www.ostprog.de'

const url = new URL(URI)
const hostname = url.hostname.replaceAll('www.', '')

const paths = new Set()

const hasIgnoreExtensions = (href: string) => {
  return /\.(\d|\w){3}/.test(new URL(href).pathname)
}

const getLinks = (url: string): Promise<void> => {
  console.log(`Processing: ${url}`)
  return new Promise<void>(async resolve => {
    const response = await fetch(url.toString());
    const body = await response.text();
    const $ = load(body)
    const links = $('a')

    for (const link of links) {
      const href = new URL($(link).attr('href'), URI).toString()
      if (href &&
        !href.startsWith('mailto:') &&
        href.indexOf(hostname) > -1 &&
        !hasIgnoreExtensions(href)) {
        const pathname = new URL(href).pathname
        if (paths.has(pathname)) {
          console.log(`Already found: ${pathname}`)
        } else {
          console.log(`Found: ${pathname}`)
          paths.add(pathname)
          await getLinks(href)
        }
      }
    }
    resolve()
  })
}

paths.add(url.pathname)

await getLinks(url.toString())

const result = Array.from(paths).map(p => URI + p)
writeFile("urls.json", JSON.stringify(result, null, 2), err => {
  if (err) console.log(err)
  console.log('Done')
})
