import axios from 'axios';
const fetcher = (url: string): Promise<any> => {
    console.log('fetcher 함수 실행');
    return axios.get(url).then((response) => response.data);
};

export default fetcher;
