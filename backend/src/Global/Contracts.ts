import BookingsArtifact from "../../../smart-contracts/deployments/ganache/Bookings.json";
import { ethers } from "ethers";

export const CONTRACTS = {
    Bookings: new ethers.Contract(
        BookingsArtifact.address, 
        BookingsArtifact.abi, 
        //@ts-ignore
        new ethers.getDefaultProvider("http://localhost:7545")
    ),
};
