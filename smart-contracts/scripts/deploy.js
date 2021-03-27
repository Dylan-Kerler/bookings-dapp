async function main() {
    const Bookings = await ethers.getContractFactory("Bookings");
    const bookings = await Bookings.deploy();
  
    console.log("bookings deployed to:", bookings.address);
}
  
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });