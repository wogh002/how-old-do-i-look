import React, { useCallback, useEffect, useState, VFC } from 'react';
import { Section } from './styles';
import Image from 'next/image';

const Upload: VFC = () => {
    const [imageSrc, setImageSrc] = useState('');
    // const [file, setFile] = useState<File | undefined>(undefined);
    const onloadend = useCallback((reader: FileReader) => {
        console.log(reader);
        reader.onload = () => {
            setImageSrc(reader.result as string);
        };
    }, []);
    // 데이터 URL로 만드는 방법입니다.
    //  base64로 인코딩했다는 뜻인데,
    // base64로 인코딩한 경우 브라우저가 이 문자열을 인식해서 원래 데이터로 만들어줍니다.
    const encodeFileToBase64 = useCallback(
        (fileObj: File | undefined) => {
            const reader: FileReader = new FileReader();
            if (fileObj) {
                reader.readAsDataURL(fileObj);
                onloadend(reader);
            }
        },
        [onloadend]
    );
    const onChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            encodeFileToBase64((e.target as HTMLInputElement).files?.[0]);
        },
        [encodeFileToBase64]
    );

    return (
        <Section>
            <label htmlFor="file">How old do i look (Click) </label>
            <input type="file" id="file" accept="image/jpg,image/png" onChange={onChange} />
            {imageSrc && <Image src={imageSrc} alt="picture" width="200" height="200" />}
        </Section>
    );
};

export default Upload;
