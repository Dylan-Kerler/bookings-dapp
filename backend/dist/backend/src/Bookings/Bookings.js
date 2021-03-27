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
exports.BOOKINGS = void 0;
const Collections_1 = require("./Collections");
const Contracts_1 = require("../Global/Contracts");
class Bookings {
    constructor() {
        this.contract = Contracts_1.CONTRACTS.Bookings;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Collections_1.BOOKINGS_COLLECTIONS.init();
            console.log("Starting Bookings contract listener...");
            yield this.listenForNewBookings();
            yield this.listenForCancellations();
        });
    }
    listenForNewBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Listening for new bookings...");
            // Insert into mongoDB here
            this.contract.on("Reservation", (from, companyId, roomId, hour) => {
                companyId = companyId.toNumber();
                roomId = roomId.toNumber();
                hour = hour.toNumber();
                console.log(companyId, roomId, hour, from);
                Collections_1.BOOKINGS_COLLECTIONS.accountBookingsCollection.updateOne({ companyId, roomId, hour, account: from }, { "$set": { companyId, roomId, hour, account: from } }, { upsert: true });
                Collections_1.BOOKINGS_COLLECTIONS.roomWaitingListCollection.updateOne({ companyId, roomId, hour, }, { "$inc": { waiting: 1 } }, { upsert: true });
            });
        });
    }
    listenForCancellations() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("Listening for new bookings...");
        });
    }
}
exports.BOOKINGS = new Bookings();
//# sourceMappingURL=Bookings.js.map