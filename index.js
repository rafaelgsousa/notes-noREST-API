import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/notes.js";
import { client } from "./db/connect.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

try {
    client.connect();
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Listening on port ${port}`));
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}


