import { Collection } from "mongodb";
import { DATABASE } from "../Global/Database";

export const ROOM_WAITING_LIST_COLL_NAME = "room_waiting_list";
export const ACCOUNT_BOOKINGS_COLL_NAME = "account_bookings";

export class BookingsCollections {
    roomWaitingListCollection!: Collection;
    accountBookingsCollection!: Collection;

    async init() {
        console.log(`Creating Bookings collections`);

        this.roomWaitingListCollection = await this.getRoomWaitingListsCollection();
        this.accountBookingsCollection = await this.getAccountBookingsCollection();
    }

    // account -> reservation
    async getAccountBookingsCollection(): Promise<any> {
        const collections = await DATABASE.db.listCollections({ name: ACCOUNT_BOOKINGS_COLL_NAME }).toArray();
        const collExists = collections.length > 0;
        if (collExists) return DATABASE.db.collection(ACCOUNT_BOOKINGS_COLL_NAME);

        console.log(`   ⛏️  Creating ${ACCOUNT_BOOKINGS_COLL_NAME} collection`);
        
        const accountBookingsCollection = await DATABASE.db.createCollection(ACCOUNT_BOOKINGS_COLL_NAME, {
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

        DATABASE.db.collection(ACCOUNT_BOOKINGS_COLL_NAME).createIndex({ "account": 1, },);

        return accountBookingsCollection;
    }

    // [companyId, roomId, hour] -> waiting count
    async getRoomWaitingListsCollection(): Promise<any> {
        const collections = await DATABASE.db.listCollections({ name: ROOM_WAITING_LIST_COLL_NAME }).toArray();
        const collExists = collections.length > 0;
        if (collExists) return DATABASE.db.collection(ROOM_WAITING_LIST_COLL_NAME);

        console.log(`   ⛏️  Creating ${ROOM_WAITING_LIST_COLL_NAME} collection`);
        
        const roomWaitingListCollection = await DATABASE.db.createCollection(ROOM_WAITING_LIST_COLL_NAME, {
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

        DATABASE.db.collection(ACCOUNT_BOOKINGS_COLL_NAME).createIndex({ "roomId": 1, },);

        return roomWaitingListCollection;
    }
}

export const BOOKINGS_COLLECTIONS = new BookingsCollections();