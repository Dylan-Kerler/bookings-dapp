import { MainTitle, MinorTitle } from "../../core/Typography"

import styled from "styled-components";
import { TextButton } from "../../core/TextButton";
import { useContext } from "react";
import { useRecoilState } from "recoil";
import { EthersContext } from "../../../context/EthersContext";
import { notificationsState } from "../../layout/Notifications";
import { shortenAddress } from "../../../utils/helpers";
import { RoomInfo, useBookings } from "../../../utils/hooks";

const Container = styled.div`
    display: grid;
    row-gap: 24px;
`;

export const MyBookings = () => {
    const { signer, BookingsContract } = useContext(EthersContext);
    const [notifications, setNotifications] = useRecoilState(notificationsState);
    const [,accountBookings] = useBookings();

    return (
        <Container>
            <MainTitle style={{ marginBottom: 12 }}>My Bookings.</MainTitle>

            {
                accountBookings ? 
                    accountBookings.map(({ companyId, hour, roomId }: RoomInfo) =>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", width: "fit-content", columnGap: 5 }}>
                            <MinorTitle>{companyId === 1 ? "Coca Cola" : "Pepsi"} Room {roomId}</MinorTitle>
                            <div>@ {hour}:00 - </div>

                            <TextButton 
                                onClick={async () => {
                                    try {
                                        const tx = await BookingsContract.cancelReservation(1, 1, 1, { gasLimit: 1_000_000 });
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
                                Cancel this booking
                            </TextButton>
                        </div>
                    )
                :
                    <MinorTitle>You don't have any bookings.</MinorTitle>
            }
        </Container>
    );
}