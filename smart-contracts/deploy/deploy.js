const COMPANIES = {
    cocaCola: { id: 1, maxRooms: 10 },
    pepsi: { id: 2, maxRooms: 10 },
};

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("deployer", deployer)

    await deploy("Bookings", {
        from: deployer,
        log: true,
    });

    const bookings = await ethers.getContract("Bookings")

    await bookings.addCompany(COMPANIES.cocaCola.id, COMPANIES.cocaCola.maxRooms);
    await bookings.addCompany(COMPANIES.pepsi.id, COMPANIES.pepsi.maxRooms);
};

module.exports.tags = ["Bookings"];