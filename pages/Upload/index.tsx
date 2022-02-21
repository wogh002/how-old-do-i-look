import React, { useCallback, useState, VFC } from 'react';
import { Section } from './styles';
import axios from 'axios';
const Upload: VFC = () => {
    const [imageSrc, setImageSrc] = useState(String);
    // const [file, setFile] = useState<React.SetStateAction<File | undefined>>(undefined);
    const getUserInfo = useCallback(async (formData: FormData) => {
        const config = {
            headers: {
                contentType: 'multipart/form-data',
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`
            }
        };
        try {
            const userData = await axios.post(`/v2/vision/face/detect/`, formData, config);
            console.log(userData);
        } catch (err) {
            console.log(err);
        }
    }, []);
    const createFormData = useCallback((fileObj: File): FormData => {
        const formData = new FormData();
        formData.append('image', fileObj);
        return formData;
    }, []);
    const onloadend = useCallback(
        (reader: FileReader, fileObj: File) => {
            reader.onload = () => {
                setImageSrc(reader.result as string);
                getUserInfo(createFormData(fileObj));
            };
        },
        [createFormData, getUserInfo]
    );
    // 데이터 URL로 만드는 방법입니다.
    //  base64로 인코딩했다는 뜻인데,
    // base64로 인코딩한 경우 브라우저가 이 문자열을 인식해서 원래 데이터로 만들어줍니다.
    const encodeFileToBase64 = useCallback(
        (fileObj: File | undefined) => {
            const reader: FileReader = new FileReader();
            if (fileObj) {
                reader.readAsDataURL(fileObj);
                onloadend(reader, fileObj);
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
            {imageSrc && <img src={imageSrc} alt="picture" />}
        </Section>
    );
};

export default Upload;
