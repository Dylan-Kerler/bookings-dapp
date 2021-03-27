pragma solidity ^0.7.3;

import "hardhat/console.sol";

contract Bookings {
    struct CompanyRoomsInfo {
        uint companyId;
        uint maxRooms;
    }

    address public owner;

    mapping(uint => bool) public registeredCompanies;
    mapping(uint => CompanyRoomsInfo) public companyRooms;

    // companyId -> roomId -> hour -> waitingList[]
    mapping(uint => mapping(uint => mapping(uint => address[]))) public reservations;

    // address -> companyId -> roomId -> hour -> bool
    mapping(address => mapping(uint => mapping(uint => mapping(uint => bool)))) public isRoomReserved;

    constructor() {
        console.log("Deploying Bookings");
        owner = msg.sender;
    }

    function addCompany(uint companyId, uint maxRooms) public {
        require(registeredCompanies[companyId] == false, "Company has already been registered");
        require(msg.sender == owner, "You are not the owner");

        companyRooms[companyId] = CompanyRoomsInfo({
            companyId: companyId,
            maxRooms: maxRooms
        });

        registeredCompanies[companyId] = true;
    }

    function addReservation(uint companyId, uint roomId, uint hour) public {
        require(registeredCompanies[companyId] == true, "Company does not exist");
        require(roomId < companyRooms[companyId].maxRooms, "Room does not exist");
        require(
            isRoomReserved[msg.sender][companyId][roomId][hour] == false, 
            "You already have a reservation for this room at this time"
        );

        reservations[companyId][roomId][hour].push(msg.sender);
        isRoomReserved[msg.sender][companyId][roomId][hour] = true;
    }


}