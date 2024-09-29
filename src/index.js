import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import createDirIfNotExists from "./utils/createDirIfNotExists.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constans/index.js";

const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
};

bootstrap();
