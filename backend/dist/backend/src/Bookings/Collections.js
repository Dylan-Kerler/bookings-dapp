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
exports.BOOKINGS_COLLECTIONS = exports.BookingsCollections = exports.ACCOUNT_BOOKINGS_COLL_NAME = exports.ROOM_WAITING_LIST_COLL_NAME = void 0;
const Database_1 = require("../Global/Database");
exports.ROOM_WAITING_LIST_COLL_NAME = "room_waiting_list";
exports.ACCOUNT_BOOKINGS_COLL_NAME = "account_bookings";
class BookingsCollections {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Creating Bookings collections`);
            this.roomWaitingListCollection = yield this.getRoomWaitingListsCollection();
            this.accountBookingsCollection = yield this.getAccountBookingsCollection();
        });
    }
    // account -> reservation
    getAccountBookingsCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            const collections = yield Database_1.DATABASE.db.listCollections({ name: exports.ACCOUNT_BOOKINGS_COLL_NAME }).toArray();
            const collExists = collections.length > 0;
            if (collExists)
                return Database_1.DATABASE.db.collection(exports.ACCOUNT_BOOKINGS_COLL_NAME);
            console.log(`   ⛏️  Creating ${exports.ACCOUNT_BOOKINGS_COLL_NAME} collection`);
            const accountBookingsCollection = yield Database_1.DATABASE.db.createCollection(exports.ACCOUNT_BOOKINGS_COLL_NAME, {
                "validator": {
                    "$jsonSchema": {
                        "bsonType": "object",
                        "required": ["account", "roomId", "hour", "companyId"],
                        "properties": {
                            "companyId": { "bsonType": "int" },
                            "roomId": { "bsonType": "int" },
                            "hour": { "bsonType": "int" },
                            "account": { "bsonType": "string" },
                        }
                    }
                }
            });
            Database_1.DATABASE.db.collection(exports.ACCOUNT_BOOKINGS_COLL_NAME).createIndex({ "account": 1, });
            return accountBookingsCollection;
        });
    }
    // [companyId, roomId, hour] -> waiting count
    getRoomWaitingListsCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            const collections = yield Database_1.DATABASE.db.listCollections({ name: exports.ROOM_WAITING_LIST_COLL_NAME }).toArray();
            const collExists = collections.length > 0;
            if (collExists)
                return Database_1.DATABASE.db.collection(exports.ROOM_WAITING_LIST_COLL_NAME);
            console.log(`   ⛏️  Creating ${exports.ROOM_WAITING_LIST_COLL_NAME} collection`);
            const roomWaitingListCollection = yield Database_1.DATABASE.db.createCollection(exports.ROOM_WAITING_LIST_COLL_NAME, {
                "validator": {
                    "$jsonSchema": {
                        "bsonType": "object",
                        "required": ["companyId", "roomId", "hour", "waiting"],
                        "properties": {
                            "companyId": { "bsonType": "int" },
                            "roomId": { "bsonType": "int" },
                            "hour": { "bsonType": "int" },
                            "waiting": { "bsonType": "int" },
                        }
                    }
                }
            });
            Database_1.DATABASE.db.collection(exports.ACCOUNT_BOOKINGS_COLL_NAME).createIndex({ "roomId": 1, });
            return roomWaitingListCollection;
        });
    }
}
exports.BookingsCollections = BookingsCollections;
exports.BOOKINGS_COLLECTIONS = new BookingsCollections();
//# sourceMappingURL=Collections.js.map