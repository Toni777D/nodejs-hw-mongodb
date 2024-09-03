import { setupServer } from "./server.js";
// setupServer();

import { initMongoConnection } from "./db/initMongoConnection.js";
// initMongoConnection();

const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
};

bootstrap();
