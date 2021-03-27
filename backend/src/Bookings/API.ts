import { GLOBAL_API } from "../Global/API";
import { BOOKINGS_COLLECTIONS } from "./Collections";

class BookingsApi {
    static URL_PREFIX = "/bookings/";

    async start() {
        this.getRoomsWaitingList();
        this.getAccountBookings();
    }

    async getRoomsWaitingList() {
        GLOBAL_API.app.get(`${BookingsApi.URL_PREFIX}roomsWaitingList`, async (req, res) => {
            const roomsWaitingListCollection = BOOKINGS_COLLECTIONS.roomWaitingListCollection;
            const roomsWaitingList = await roomsWaitingListCollection
                .find()
                .sort({ compId: 1, roomId: 1 })
                .toArray();

            res.json(roomsWaitingList);
        });
    }

    async getAccountBookings() {
        type Request = {
            account: string,
        };

        GLOBAL_API.app.get(`${BookingsApi.URL_PREFIX}accountBookings`, async (req, res) => {
            const query: Request = {
                account: typeof req.query.account === "string" ? req.query.account : ""
            };

            const accountBookingsCollection = BOOKINGS_COLLECTIONS.accountBookingsCollection;
            const accountBookings = await accountBookingsCollection
                .find({ account: query.account })
                .sort({ compId: 1, roomId: 1 })
                .toArray();

            res.json(accountBookings);
        });
    }
}

export const BOOKINGS_API = new BookingsApi();