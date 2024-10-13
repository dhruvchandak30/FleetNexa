import express from 'express';
import { main } from './queue/producer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


app.listen(PORT, () => {
    main();
    console.log(`Server is running on http://localhost:${PORT}`);
});
