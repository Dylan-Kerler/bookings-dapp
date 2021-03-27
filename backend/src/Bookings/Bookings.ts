import { BOOKINGS_COLLECTIONS } from "./Collections";
import { CONTRACTS } from "../Global/Contracts";

class Bookings {
    contract = CONTRACTS.Bookings;

    async start() {
        await BOOKINGS_COLLECTIONS.init();
        console.log("Starting Bookings contract listener...");

        await this.listenForNewBookings();
        await this.listenForCancellations();
    }

    async listenForNewBookings() {
        console.log("Listening for new bookings...");

        // Insert into mongoDB here
        this.contract.on("Reservation", (from, companyId, roomId, hour) => {
            companyId = companyId.toNumber();
            roomId = roomId.toNumber();
            hour = hour.toNumber();

            console.log(companyId, roomId, hour, from);

            BOOKINGS_COLLECTIONS.accountBookingsCollection.updateOne(
                { companyId, roomId, hour, account: from },
                { "$set": { companyId, roomId, hour, account: from }},
                { upsert: true },
            );

            BOOKINGS_COLLECTIONS.roomWaitingListCollection.updateOne(
                { companyId, roomId, hour, },
                {  "$inc": { waiting: 1 }},
                { upsert: true },
            );
        });
    }

    async listenForCancellations() {
        // console.log("Listening for new bookings...");

    }
}

export const BOOKINGS = new Bookings();