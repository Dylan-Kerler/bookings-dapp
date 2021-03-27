import { RoomCard } from "./RoomCard";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    row-gap: 12px;
`;

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    > div {
        margin-right: 12px;
        margin-bottom: 12px;
    }
`;

interface Props {
    onChange: (value: number) => void,
    value: number,
    options: { name: string, waiting: number }[],
}

export const RoomSelect = ({ value, onChange, options }: Props) => {
    return (
        <Container>
            <div>Select a room</div>
            <CardsContainer>
                {
                    options.map(({ waiting, name }, index) => 
                        <RoomCard
                            onClick={() => onChange(index)}
                            isSelected={value === index}
                            waiting={waiting}
                            name={name}
                        />
                    )
                }
            </CardsContainer>
        </Container>
    );
}