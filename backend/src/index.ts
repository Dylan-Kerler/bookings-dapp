import { BOOKINGS_API } from "./Bookings/API";
import { BOOKINGS } from "./Bookings/Bookings";
import { GLOBAL_API } from "./Global/API";
import { DATABASE } from "./Global/Database";
const main = async () => {
    console.log("Starting server...");
    await DATABASE.init();
    await BOOKINGS.start();

    await GLOBAL_API.start();
    await BOOKINGS_API.start();
};

main();
