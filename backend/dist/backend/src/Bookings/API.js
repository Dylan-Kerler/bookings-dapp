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
exports.BOOKINGS_API = void 0;
const API_1 = require("../Global/API");
const Collections_1 = require("./Collections");
class BookingsApi {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getRoomsWaitingList();
            this.getAccountBookings();
        });
    }
    getRoomsWaitingList() {
        return __awaiter(this, void 0, void 0, function* () {
            API_1.GLOBAL_API.app.get(`${BookingsApi.URL_PREFIX}roomsWaitingList`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const roomsWaitingListCollection = Collections_1.BOOKINGS_COLLECTIONS.roomWaitingListCollection;
                const roomsWaitingList = yield roomsWaitingListCollection
                    .find()
                    .sort({ compId: 1, roomId: 1 })
                    .toArray();
                res.json(roomsWaitingList);
            }));
        });
    }
    getAccountBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            API_1.GLOBAL_API.app.get(`${BookingsApi.URL_PREFIX}accountBookings`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = {
                    account: typeof req.query.account === "string" ? req.query.account : ""
                };
                const accountBookingsCollection = Collections_1.BOOKINGS_COLLECTIONS.accountBookingsCollection;
                const accountBookings = yield accountBookingsCollection
                    .find({ account: query.account })
                    .sort({ compId: 1, roomId: 1 })
                    .toArray();
                res.json(accountBookings);
            }));
        });
    }
}
BookingsApi.URL_PREFIX = "/bookings/";
exports.BOOKINGS_API = new BookingsApi();
//# sourceMappingURL=API.js.map