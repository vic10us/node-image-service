'use strict';

const puppeteer = require('puppeteer');
const Handlebars = require("handlebars");
const fs = require('fs');
const sharp = require("sharp");
const mime = require('mime-types');
const validUrl = require('valid-url');
const fetch = require('node-fetch');
const accepts = require('accepts');
const lb = require('lorembarnak');

exports.get_file_or_url = async (filePath) => {
  if (validUrl.isUri(filePath)) {
    var resp = await fetch(filePath).then(res => res.buffer());
    return resp;
  }
  var fileBuffer = fs.readFileSync(filePath);
  return fileBuffer;
};

exports.get_bad_words = async (req, res) => {
  let num = req.params.numWords || 10;
  let respon = lb.getText(num);
  res.send(respon);
};

// function to encode file data to base64 encoded string
exports.base64_encode = async (file) => {
  // read binary data
  var bitmap = await this.get_file_or_url(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
};

exports.get_data_uri = async (image) => {
  var base64img = await this.base64_encode(image);
  var mimeType = mime.lookup(image);
  return `data:${mimeType};base64,${base64img}`;
};

exports.create_rank_card = async (req, res) => {
  var accept = accepts(req);
  console.log(accept.type(['svg']));

  var templateFile = fs.readFileSync('templates/cards/rank.hbs', 'utf8');
  const template = Handlebars.compile(templateFile);
  
  var svgImage = template(req.body);

  if (accept.type('svg') !== false) {
    console.log(accept);
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml',
    });
    res.end(svgImage);
    return;
  }

  var img = await sharp(Buffer.from(svgImage), { density: 144 })
                  .png()
                  .toBuffer();
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img); 
};

exports.get_rank = async (req, res) => {
  var accept = accepts(req);
  console.log(accept.type(['svg']));

  var templateFile = fs.readFileSync('templates/cards/rank.hbs', 'utf8');
  const template = Handlebars.compile(templateFile);

  var data = {
    rank: 44,
    level: 12,
    name: 'ᐺᓰᑢ10ᑘS',
    code: 2622,
    xp: {
      current: 429,
      required: 1337
    },
    avatar: {
      backgroundColor: 'black',
      image: await this.get_data_uri('https://cdn.discordapp.com/avatars/649665887267323935/4f1a19858b001734497a755626aa6f58.png')
    },
    backgroundColor: '#23272A',
    levelColor: '#498366',
    statusColor: '#44b37f',
    progressBarColor: '#498366',
    progressBarBackgroundColor: '#484B4E',
    rankColor: 'white',
    fontColor: 'white',
    codeColor: '#7F8384',
    requiredXPColor: '#7F8384',
    card: {
      background: {
        hasImage: true,
        image: await this.get_data_uri('https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/187b0add-7720-41a3-a58c-a40ebb3c0ead.jpg'),
        color: '#23272A'
      },
      content: {
        background: {
          color: 'black',
          opacity: 0.7
        }
      }
    }
  };

  // if (accept.type('json') !== false) {
  //   res.json(data);
  //   return;
  // }

  var svgImage = template(data);

  if (accept.type('svg') !== false) {
    console.log(accept);
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml',
    });
    res.end(svgImage);
    return;
  }

  var img = await sharp(Buffer.from(svgImage), { density: 144 })
                  .png()
                  .toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img); 
};

exports.get_image = async (req, res) => {
    const browser = await puppeteer.launch({
        args: [
            '--window-size=1920,1080',
        ],
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page._client.send('Emulation.clearDeviceMetricsOverride');

    await page.goto('https://www.google.com');

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
        };
    });
    await page.setViewport({width: dimensions.width, height: dimensions.height});

    console.log('Dimensions:', dimensions);

    var img = await page.screenshot({ 
        encoding: 'binary', 
        width: dimensions.width, 
        height: dimensions.height
    });
    await browser.close();

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img); 
};