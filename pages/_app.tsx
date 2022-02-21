import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import GlobalStyle from '@styles/global-styles';
// url을 통해 특정 페이지에 진입하기 전 거치는 인터셉터 페이지입니다.
// Component -> pages/index.tsx
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
export default MyApp;
