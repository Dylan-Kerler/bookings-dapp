import styled from "styled-components";
import { MainTitle, MinorTitle } from "../core/Typography";
import Link from 'next/link'

const Container = styled.div`
    position: absolute;
    z-index: 1000;
    top: 100px;
    left: -3px;
    padding-left: 15px;
    background-color: white;
    width: 100%;
    height: 100%;
    text-align: center;

    > div {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        row-gap: 12px;
        width: fit-content;

        > div {
            &:hover {
                cursor: pointer;
                color: ${({ theme }) => theme.colors.primary};
            }
        }
    }
`;

const MENU_OPTIONS = [
    { label: "Home", value: "/" },
    { label: "My Bookings", value: "/my-bookings" },
];

export const Menu = ({ onSelect }: { onSelect: () => void }) => {
    return (
        <Container>
            <div>
                {
                    MENU_OPTIONS.map(({ label, value }) =>
                        <Link href={value}>
                            <MainTitle onClick={onSelect}>
                                {label}
                            </MainTitle>
                        </Link>
                    )
                }
            </div>
        </Container>
    );
};