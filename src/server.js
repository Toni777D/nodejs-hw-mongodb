import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

export const setupServer = () => {
const app = express();
const PORT = 3000;
const logger = pino({
    transport: {
        terget: "pino-pretty"
    }
});

app.use(logger);
app.use(cors());
app.use(express.json());

app.use((req, res) => {
    res.status(404).json({
        message: "Not found"
    });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
