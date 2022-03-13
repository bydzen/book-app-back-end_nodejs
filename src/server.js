// Import @hapi/hapi
const Hapi = require('@hapi/hapi');
// Import ./routes.js
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    // Listen to port 5000
    port: 5000,
    // Environment
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      // Cross-Origin Resource Sharing (CORS)
      cors: {
        // All
        origin: ['*'],
      },
    },
  });

  // Routes placement
  server.route(routes);

  // Nodemon
  await server.start();
  // Print log to terminal
  console.log(`Server running at ${server.info.uri}`);
};

init();
