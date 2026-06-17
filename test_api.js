const http = require('http');

const postData = JSON.stringify({
  name: "Test User",
  email: "test" + Math.floor(Math.random() * 1000) + "@example.com",
  password: "password123"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/user/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log("--- Testing API Registration ---");

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response Body:', data);
    
    if (res.statusCode === 201) {
        console.log("\n✅ SUCCESS: User registered fine!");
    } else {
        console.log("\n❌ FAILED: Check if your server is running on port 5000.");
    }
  });
});

req.on('error', (e) => {
  console.error(`\n❌ ERROR: ${e.message}`);
  console.log("Make sure you ran 'node server.js' in another terminal!");
});

req.write(postData);
req.end();
