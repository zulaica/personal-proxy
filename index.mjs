import server from './modules/server.mjs';
import CONFIG from './modules/config.mjs';

server.listen(CONFIG.port, CONFIG.ipAddress, () => {
  const { address, port } = server.address();

  console.clear();
  console.log('Starting proxy server.');
  console.log(`Serving on http://${address}:${port}/`);
  console.info('Type CTRL-C to stop the proxy server.');
  console.log('');
});
