"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE = void 0;
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true, });
class Database {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Connecting to mongo server");
            yield client.connect();
            this.db = client.db(Database.DB_NAME);
            console.log("Connected to mongo server");
        });
    }
}
Database.DB_NAME = "BOOKINGS";
exports.DATABASE = new Database();
//# sourceMappingURL=Database.js.map