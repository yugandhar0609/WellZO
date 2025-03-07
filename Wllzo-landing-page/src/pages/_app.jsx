import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      mirror: false,
      offset: 80,
      easing: 'ease-out',
      disable: window.innerWidth < 768 ? true : false,
      throttleDelay: 99
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp; 