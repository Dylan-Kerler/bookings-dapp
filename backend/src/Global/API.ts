import express from "express";
import cors from "cors";

class GlobalApi {
    static PORT = 8080;
    app = express();

    async start() {
        this.app.use(cors());
        this.app.get("/", (req, res) => {
            console.log("hello");
            res.send("hello");
        });

        this.app.listen(GlobalApi.PORT, () => {
            console.log(`\n🚀 API started and listening at port: ${GlobalApi.PORT}\n`)
        });
    }
}

export const GLOBAL_API = new GlobalApi();