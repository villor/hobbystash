import express from 'express';
import path from 'path';

import { BuiltInAttributeIds } from 'hobbystash-shared';

const app = express();
const PORT = 4000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client')));

// An api endpoint that returns a short list of items
app.get('/api/attributeIds', (_, res) => {
  res.json(BuiltInAttributeIds);
  console.log('Sent list of aids');
});

// Handles any requests that don't match the ones above
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡️[hobbystash-server]: Server is running at http://localhost:${PORT}`);
});
