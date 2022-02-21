import styled from 'styled-components';

export const Section = styled.section`
    padding: 3rem;
    label {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 1.8rem;
        font-weight: 700;
        opacity: 0.8;
        cursor: pointer;
        :hover {
            opacity: 1;
        }
        transition: opacity ease-in-out 250ms;
    }
    #file {
        position: absolute;
        overflow: hidden;
        z-index: -1;
        width: 0;
        height: 0;
        padding: 0;
        border: 0;
    }
    img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 1.5rem;
    }
`;
