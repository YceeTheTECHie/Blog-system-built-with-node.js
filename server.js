const http = require('http')
const app = require('./app')
// const port = 3000;



// server.listen(port);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const server = http.createServer(app)
