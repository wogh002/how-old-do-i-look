import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Upload from '@pages/Upload';
const Home: NextPage = () => {
    return (
        <div>
            <NextSeo
                openGraph={{
                    type: 'website',
                    url: 'https://www.example.com/page',
                    title: 'Open Graph Title',
                    description: 'Open Graph Description',
                    images: [
                        {
                            url: 'https://www.example.ie/og-image.jpg',
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt'
                        },
                        {
                            url: 'https://www.example.ie/og-image-2.jpg',
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt 2'
                        }
                    ]
                }}
            />
            <Upload />
        </div>
    );
};
export default Home;
