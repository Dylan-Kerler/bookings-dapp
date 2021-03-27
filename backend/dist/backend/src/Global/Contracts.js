"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTRACTS = void 0;
const Bookings_json_1 = __importDefault(require("../../../smart-contracts/deployments/ganache/Bookings.json"));
const ethers_1 = require("ethers");
exports.CONTRACTS = {
    Bookings: new ethers_1.ethers.Contract(Bookings_json_1.default.address, Bookings_json_1.default.abi, 
    //@ts-ignore
    new ethers_1.ethers.getDefaultProvider("http://localhost:7545")),
};
//# sourceMappingURL=Contracts.js.map