import { useContext, useEffect, useState } from "react";
import { EthersContext } from "../context/EthersContext";

export const useAccount = () => {
    const { signer } = useContext(EthersContext);
    const [address, setAddress] = useState<null | string>();

    useEffect(() => {
        if (signer) {
            signer.getAddress().then(setAddress);
        } else {
            setAddress(null);
        }
    }, [signer]);

    return { address };
};

interface RoomInfoMapping {
    [c:number]: { 
        [r:number]: { 
            [h:number]: number 
        }
    }
}

export interface RoomInfo {
    companyId: number,
    hour: number,
    roomId: number,
}

export const useBookings = () => {
    const [rooms, setRooms] = useState<RoomInfoMapping | undefined>();
    const [accountBookings, setAccountBookings] = useState<RoomInfo[] | undefined>();
    const { address } = useAccount();

    useEffect(() => {
        fetch("http://localhost:8080/bookings/roomsWaitingList")
            .then(res => res.json())
            .then(rooms => {
                type RoomInfo = {
                    companyId: number,
                    hour: number,
                    roomId: number,
                    waiting: number,
                };

                const mapping: RoomInfoMapping = {};
                rooms.forEach(({ companyId, hour, roomId, waiting }: RoomInfo) => {
                    if (!mapping[companyId]) mapping[companyId] = {};
                    if (!mapping[companyId][roomId]) mapping[companyId][roomId] = {};
                    mapping[companyId][roomId][hour] = waiting;
                });

                setRooms(mapping);
            });

        
    }, []);

    useEffect(() => {
        if (address) {
            fetch(`http://localhost:8080/bookings/accountBookings?account=${address}`)
                .then(res => res.json())
                .then(setAccountBookings);
        }
    }, [address]);

    return [rooms, accountBookings];
}; 