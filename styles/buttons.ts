import styled from 'styled-components';
export const TakePhotoBtn = styled.button`
    display: block;
    position: absolute;
    width: 100%;
    padding: 15px 5px;
    margin-bottom: 10px;
    max-width: 30px;
    bottom: 0;
    right: 45%;
    background-color: white;
    border-radius: 50%;
    border: none;
    color: white;
    opacity: 0.9;
    cursor: pointer;
    :hover {
        opacity: 0.7;
    }
    transition: opacity 250ms ease-in-out;
`;
