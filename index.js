const server = require("./api/server");
const PORT = 9000;

server.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}..`);
});
