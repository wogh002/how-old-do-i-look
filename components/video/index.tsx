import React, {
    useCallback,
    MutableRefObject,
    RefObject,
    Dispatch,
    SetStateAction,
    VFC,
    useRef,
    useState
} from 'react';
import { Div } from './styles';
import { TakePhotoBtn } from '@styles/buttons';
import axios from 'axios';
interface Props {
    video: HTMLVideoElement | undefined;
    setHasPhoto: Dispatch<SetStateAction<boolean>>;
    videoRef: RefObject<HTMLVideoElement>;
    canvasRef: RefObject<HTMLCanvasElement>;
}

const Video: VFC<Props> = ({ video, setHasPhoto, videoRef, canvasRef }) => {
    const [files, setFiles] = useState([]);
    const onClosePhoto = useCallback(() => {
        setHasPhoto((prev) => !prev);
    }, [setHasPhoto]);

    // blob -> 큰 미디어 파일 (이미지,비디오) 등을 저장 할 경우 사용
    // 데이터 송수신 작업에 사용됩니다.
    const dataURItoBlob = (dataURI: string) => {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
        else byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    };

    const getDataURL = useCallback(() => {
        if (canvasRef.current) {
            const image: HTMLImageElement = new Image(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
            image.src = canvasRef.current.toDataURL('image/png');
            console.log(image.src.replace(/^data:image\/(png|jpg);base64,/, ''));
            const blob = dataURItoBlob(image.src);
            console.log('URL -> ', URL.createObjectURL(blob));
            // console.log('canvas', canvasRef.current.toDataURL('image/png') as string);
            return image;
        }
        // return canvasRef.current?.toDataURL('image/png') as string;
    }, [canvasRef]);

    const getAgeAndGender = () => {
        const formData = new FormData();
        getDataURL();
        // if (image) {

        // }

        // const file = new File([blob], 'person.png', {
        //     type: 'image/png'
        // });
        // formData.append('image', file);
        // formData.append('threshold', '1.0');
        // const config = {
        //     headers: {
        //         contentType: 'multipart/form-data',
        //         Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`
        //     }
        // };
        // axios
        //     .post('/v2/vision/face/detect', formData, config)
        //     .then((result) => console.log(result))
        //     .catch((error) => console.log(error));
    };

    const takePhoto = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (video) {
            ctx?.drawImage(video, 0, 0, 300, 160);
            setHasPhoto((prev) => !prev);
            getAgeAndGender();
        }
    }, [canvasRef, video, setHasPhoto, getDataURL]);

    const onChange = (e: any) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        console.log('onChange => ', e.target.files[0]);
        // const config = {
        //     headers: {
        //         contentType: 'multipart/form-data',
        //         Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`
        //     }
        // };
        // axios
        //     .post(`/v2/vision/face/detect/`, formData, config)
        //     .then((result) => console.log(result))
        //     .catch((error) => console.log(error));
    };

    return (
        <Div>
            <video ref={videoRef}></video>
            <input type="file" onChange={onChange} />
            <TakePhotoBtn onClick={takePhoto} />
        </Div>
    );
};

export default Video;
