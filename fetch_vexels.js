const https = require('https');
https.get('https://br.vexels.com/png-svg/previsualizar/152348/logo-da-selecao-brasileira-de-futebol', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/https:\/\/images\.vexels\.com[^"]+/);
    if(match) console.log(match[0]);
  });
});
