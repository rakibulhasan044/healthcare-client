const https = require('https');
https.get('https://health-care-1-4e41.onrender.com/api/v1/meta', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', data));
}).on('error', err => console.log('ERROR:', err.message));
