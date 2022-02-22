import React, { useCallback, useState, VFC } from 'react';
import { Section } from './styles';
import axios, { AxiosResponse } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { IUserFace } from '@typings/db';
import { FileType } from '@typings/enum';
import 'react-toastify/dist/ReactToastify.css';
import Image from '@components/Image';
const Upload: VFC = () => {
    const [imageSrc, setImageSrc] = useState(String);
    const [userData, setUserData] = useState<IUserFace | null>();
    const [userDataReq, setUserDataReq] = useState(false);
    const getUserInfo = useCallback(async (formData: FormData) => {
        const config = {
            headers: {
                contentType: 'multipart/form-data',
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`
            }
        };
        try {
            const {
                data: { result }
            }: AxiosResponse<any, any> = await axios.post(
                `/v2/vision/face/detect/`,
                formData,
                config
            );

            if (result.faces.length !== 0) {
                setUserDataReq(false);
                setUserData(result.faces[0].facial_attributes);
            } else {
                toast.error(`얼굴인식이 되지 않습니다. 다른 사진을 올려주세요`, {
                    position: 'top-center',
                    autoClose: 2500
                });
                setUserDataReq(false);
                setImageSrc('');
                setUserData(null);
            }
        } catch (err: any) {
            toast.error(err.msg as string, { position: 'top-center', autoClose: 2500 });
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
    const fileTypeCheck = useCallback((filePath: string): boolean => {
        const pathPoint: number = filePath.lastIndexOf('.');
        const fileType: string = filePath.substring(pathPoint + 1, filePath.length).toUpperCase();
        if (fileType === FileType.JPG || fileType === FileType.PNG) {
            return true;
        } else {
            toast.error('이미지 파일만 업로드 해주세요 :)', {
                position: 'top-center',
                autoClose: 2500
            });
            setUserDataReq(false);
            return false;
        }
    }, []);

    const onChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setUserDataReq(true);
            if (fileTypeCheck((e.target as HTMLInputElement).value)) {
                encodeFileToBase64((e.target as HTMLInputElement).files?.[0]);
            }
        },
        [encodeFileToBase64, fileTypeCheck]
    );

    return (
        <Section>
            {userDataReq ? (
                <div id="spinner"></div>
            ) : (
                <label htmlFor="file"> ⭐ How old do i look (Click) </label>
            )}
            <input type="file" id="file" onChange={onChange} />
            {userData && imageSrc && <Image imageSrc={imageSrc} userData={userData} alt="person" />}
            <ToastContainer />
            <div id="spinner"></div>
        </Section>
    );
};
export default Upload;
