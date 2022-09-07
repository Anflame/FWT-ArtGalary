import { FC, useContext } from 'react';
import facebookImg from '../assets/images/facebook.svg';
import vkImg from '../assets/images/vk.svg';
import instargamImg from '../assets/images/instagram.svg';
import facebookImgLight from '../assets/images/facebookLight.svg';
import vkImgLight from '../assets/images/vkLight.svg';
import instargamImgLight from '../assets/images/instagramLight.svg';
import { ThemeContext } from '../utils/ThemeContext';
import Links from '../Links';

type SocNetWorksProps = {
  href: string;
  title: string;
};

export const SocNetWorks: FC<SocNetWorksProps> = ({ href, title }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Links
      href={href}
      children={
        <>
          {title === 'facebook' && (
            <img src={theme === 'dark' ? facebookImg : facebookImgLight} />
          )}
          {title === 'vk' && (
            <img src={theme === 'dark' ? vkImg : vkImgLight} />
          )}
          {title === 'instagram' && (
            <img src={theme === 'dark' ? instargamImg : instargamImgLight} />
          )}
        </>
      }
    />
  );
};
