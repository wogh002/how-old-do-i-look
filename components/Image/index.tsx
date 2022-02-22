import React, { VFC } from 'react';
import SpeechBubble from '@components/SpeechBubble';
import { IUserFace } from '@typings/db';
import { Div } from './styles';
interface Props {
    imageSrc: string;
    userData: IUserFace;
    alt: string;
}

const Image: VFC<Props> = ({ imageSrc, userData, alt }) => {
    return (
        <Div>
            <img src={imageSrc} accept="image/jpg,image/png" alt={alt} />
            <SpeechBubble userData={userData} />
        </Div>
    );
};

export default Image;
