const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '..', 'lib', 'translations.tsx')
const src = fs.readFileSync(file, 'utf8')

const start = src.indexOf('const translations')
if (start === -1) {
  console.error('Could not find translations in', file)
  process.exit(2)
}
const objStart = src.indexOf('{', start)
let i = objStart
let depth = 0
for (; i < src.length; i++) {
  if (src[i] === '{') depth++
  else if (src[i] === '}') {
    depth--
    if (depth === 0) break
  }
}
const objText = src.slice(objStart, i + 1)

// Create a safe eval: wrap in function and return the object
let translations
try {
  // replace TypeScript/JSX-specific tokens that could break eval
  const cleaned = objText
    .replace(/\bundefined\b/g, 'null')
  translations = Function('return ' + cleaned)()
} catch (err) {
  console.error('Failed to parse translations object:', err)
  process.exit(3)
}

const enKeys = Object.keys(translations.EN || {})
const esKeys = Object.keys(translations.ES || {})

const missingInEs = enKeys.filter(k => !esKeys.includes(k))
const missingInEn = esKeys.filter(k => !enKeys.includes(k))

const untranslated = enKeys.filter(k => translations.ES[k] === translations.EN[k])

console.log('EN keys:', enKeys.length)
console.log('ES keys:', esKeys.length)
console.log('Missing in ES:', missingInEs.length)
if (missingInEs.length) console.log(missingInEs.join(', '))
console.log('Missing in EN (extra in ES):', missingInEn.length)
if (missingInEn.length) console.log(missingInEn.join(', '))
console.log('Potentially untranslated (same string):', untranslated.length)
if (untranslated.length) console.log(untranslated.join(', '))

if (missingInEs.length === 0 && untranslated.length === 0) {
  console.log('\nAll translation keys present and appear translated.')
} else {
  console.log('\nReview the listed keys and update lib/translations.tsx ES object as needed.')
}
