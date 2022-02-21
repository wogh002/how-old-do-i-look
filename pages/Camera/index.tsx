import React, { useCallback, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Section } from './styles';
import Video from '@components/video';
const Camera = () => {
    const [video, setVideo] = useState<HTMLVideoElement>();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef(null);
    const fileRef = useRef(null);
    const playVideo = () => {
        if (typeof global !== 'undefined') {
            const {
                screen: { width, height }
            } = global;
            const constraints = {
                video: {
                    width,
                    height
                }
            };
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                        setVideo(videoRef.current);
                    }
                })
                .catch((error) => console.log(error));
        }
    };
    useEffect(() => {
        playVideo();
    }, []);

    return (
        <Section>
            <Video video={video} setHasPhoto={setHasPhoto} videoRef={videoRef} canvasRef={canvasRef} />
            <div>
                <canvas ref={canvasRef}></canvas>
                {/* {hasPhoto && <img src="" ref={imageRef} alt="aaaaaaaaaaaa"></img>} */}
            </div>
        </Section>
    );
};

export default Camera;
