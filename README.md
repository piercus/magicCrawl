# magicCrawl
Crawl firstname stats from http://www.magicmaman.com/

### Presentation

You're a Geek ?
You're a future Daddy ?
You want to have free statistics on french firstnames ?

This repo is made for you !

### For the mummies

Take a nap, you should not be on this repo ! should you ?

### How to use it

1. Install nodejs and npm see [https://nodejs.org]
2. Download the repo 
3. Inside the downloaded folder do `npm install` to install dependencies
4. Edit the firstnames you want to crawl in **firstnames.json**
5. Edit the years you want to crawl in **years.json**
6. In a console prompt `node index.js`
7. Your data should be in `db.csv` file

NB : the magicmaman.com databases is not fully clean, some years are not retrieved


### Output format

It output a csv directly.
If you want to crawl all the firstname database, there may be issues, so you might want to connect to a database server.

### Contribute

Fork me, i won't be famous anyway ;-)

Or add issues if you want !