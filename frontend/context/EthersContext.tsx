import { ethers } from "ethers";
import { createContext, useMemo, useState } from "react";
import BookingsArtifact from "../../smart-contracts/deployments/ganache/Bookings.json";

export const EthersContext = createContext({
    signer: null,
    setSigner: null,
    BookingsContract: null,
});

export const EthersProvider = ({ children }: { children: React.ReactNode }) => {
    const [signer, setSigner] = useState();

    const BookingsContract = signer && 
        new ethers.Contract(
            BookingsArtifact.address, 
            BookingsArtifact.abi, 
            signer
        )

    return (
        <EthersContext.Provider value={{ setSigner, signer, BookingsContract }}>
            {children}
        </EthersContext.Provider>
    );
};