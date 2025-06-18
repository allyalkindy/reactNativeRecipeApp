const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = [
  {
    name: 'Poppins-Regular.ttf',
    url: 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Regular.ttf'
  },
  {
    name: 'Poppins-Medium.ttf',
    url: 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Medium.ttf'
  },
  {
    name: 'Poppins-SemiBold.ttf',
    url: 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-SemiBold.ttf'
  },
  {
    name: 'Poppins-Bold.ttf',
    url: 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Bold.ttf'
  }
];

const downloadFont = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename);
      reject(err);
    });
  });
};

const downloadAllFonts = async () => {
  for (const font of fonts) {
    try {
      await downloadFont(font.url, font.name);
    } catch (error) {
      console.error(`Error downloading ${font.name}:`, error);
    }
  }
};

downloadAllFonts(); 