const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetch('https://theavalonmusic.com/');
  const matches = html.match(/class=[\"'][^\"']*elementor-section[^\"']*[\"'][^>]*style=[\"'][^\"']*[\"']/gi) || [];
  console.log('Elementor sections with inline style:', matches.slice(0, 10));

  // Check the fonts used on the site
  const fonts = html.match(/font-family:[^;\"']+/gi) || [];
  console.log('Fonts:', [...new Set(fonts)].slice(0, 10));
}

run();
