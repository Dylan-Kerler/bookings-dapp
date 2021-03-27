const { expect } = require("chai");

describe("Booking", function() {
    it("Should initialise", async function() {
        const accounts = await ethers.getSigners();

        const Bookings = await ethers.getContractFactory("Bookings");
        const bookings = await Bookings.deploy();

        await bookings.deployed();
        expect(await bookings.owner()).to.equal(accounts[0].address);
    });

    it("Should add company", async function() {
        const Bookings = await ethers.getContractFactory("Bookings");
        const bookings = await Bookings.deploy();

        await bookings.deployed();

        const [companyId, maxRooms] = [1, 10];
        await bookings.addCompany(companyId, maxRooms);
        expect(await bookings.registeredCompanies(companyId)).to.equal(true);

        const companyRoomsInfo = await bookings.companyRooms(companyId);
        expect(companyRoomsInfo.companyId).to.equal(companyId);
        expect(companyRoomsInfo.maxRooms).to.equal(maxRooms);
    });

    it("Should add reservation", async function() {
        const accounts = await ethers.getSigners();

        const Bookings = await ethers.getContractFactory("Bookings");
        const bookings = await Bookings.deploy();

        await bookings.deployed();

        const [companyId, maxRooms] = [1, 10];
        await bookings.addCompany(companyId, maxRooms);

        const roomId = 8;
        const hour = 15;
        await bookings.addReservation(companyId, roomId, hour);
        let reservation = await bookings.reservations(companyId, roomId, hour, 0);
        expect(reservation).to.equal(accounts[0].address);

        expect(bookings.addReservation(companyId, roomId, hour))
            .to.be.revertedWith(" You already have a reservation for this room at this time");

        await bookings.connect(accounts[1]).addReservation(companyId, roomId, hour);
        reservation = await bookings.reservations(companyId, roomId, hour, 1);
        expect(reservation).to.equal(accounts[1].address);
    });
});