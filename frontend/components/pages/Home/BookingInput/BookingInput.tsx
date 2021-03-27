import { MainTitle } from "../../../core/Typography"
import { RoomSelect } from "./RoomSelect"
import styled from "styled-components";
import { TimeSelect } from "./TimeSelect";
import { Button } from "../../../core/Button";
import { useContext, useState } from "react";
import { TabSquareNav } from "../../../core/TabSquareNav";
import { EthersContext } from "../../../../context/EthersContext";
import { useRecoilState, useResetRecoilState } from "recoil";
import { notificationsState } from "../../../layout/Notifications";
import { shortenAddress } from "../../../../utils/helpers";
import { useBookings } from "../../../../utils/hooks";

const Container = styled.div`
    display: grid;
    row-gap: 24px;
`;

export const COMPANIES = {
    cocaCola: { label: "Coca Cola", value: 1 },
    pepsi: { label: "Pepsi", value: 2 },
};

export const BookingInput = () => {
    const { signer, BookingsContract } = useContext(EthersContext);
    const [notifications, setNotifications] = useRecoilState(notificationsState);
    const [selectedCompany, setSelectedCompany] = useState(COMPANIES.cocaCola.value);
    const [selectedTime, setSelectedTime] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [rooms] = useBookings();

    return (
        <Container>
            <MainTitle>Book a room.</MainTitle>

            <TabSquareNav
                selected={selectedCompany}
                onChange={(e) => setSelectedCompany(e as number)}
                items={Object.values(COMPANIES)}
            />

            <TimeSelect
                onChange={setSelectedTime}
                value={selectedTime}
            />

            <RoomSelect
                options={new Array(10)
                    .fill(null)
                    .map((_, i) => ({  
                        name: `Room ${i}`,
                        waiting: rooms?.[selectedCompany]?.[i]?.[selectedTime] || 0,
                    }))
                }
                onChange={setSelectedRoom}
                value={selectedRoom}
            />

            <Button 
                style={{ width: 240, justifySelf: "right", }}
                onClick={async () => {
                    if (!BookingsContract) 
                        return setNotifications(notifications.concat({
                            content: "Connect your wallet",
                            timestamp: Date.now(),
                            isError: true,
                        }));

                    try {
                        const tx = await BookingsContract.addReservation(
                            selectedCompany, 
                            selectedRoom,
                            selectedTime,    
                        );

                        const { transactionHash, status, } = await tx.wait();
                        setNotifications(notifications.concat({ 
                            content: `Confirmed Tx: ${shortenAddress(transactionHash)}`, 
                            timestamp: Date.now(),
                        }));
                    } catch (e) {
                        console.error(e);
                        setNotifications(notifications.concat({ 
                            content: `Failed Transaction`, 
                            timestamp: Date.now(),
                            isError: true,
                        }));
                    }
                }}
            >
                Book Room
            </Button>
        </Container>
    );
};