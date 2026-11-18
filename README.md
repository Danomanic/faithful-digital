# Faithful Digital

A free, independent digital blueprint for small to mid-sized UK churches: guidance, tool comparisons, templates, a digital health check and a tool finder.

Status: draft. The content is still being reviewed, and the site isn't published yet.

## What's here

- `content/guidance/`: the written guidance, in MDX
- `data/tools/`: the tool comparison data, with sources and "last checked" dates
- `templates/`: template sources, generated as web pages and Word documents
- `lib/`: health check scoring, tool finder rules and other logic, with unit tests
- `app/` and `components/`: the Next.js site and its components

## Running it

You need Node.js 26 or later.

```sh
npm install
npm run build   # generates the Word templates, then builds the static site into out/
npm run pdf     # generates the PDF blueprint from the built site
npm start       # serves out/ at http://localhost:4321
```

`npm run verify` runs the type check, lint, unit tests, build, PDF generation, design check and browser tests.

## Licence

The written content is available under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). See `LICENSE-CONTENT.md`. The code is available under the MIT License. See `LICENSE`.
