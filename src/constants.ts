import { TemporaryPaintings } from './comon-types';
import CardImg from './assets/images/cardImg.jpg';
import SecondCardImg from './assets/images/secondCardImg.jpg';

export const socNetworks = [
  {
    id: 1,
    title: 'facebook',
    href: 'https://facebook.com/framework.team/',
  },
  {
    id: 2,
    title: 'vk',
    href: 'https://vk.com/frameworkteam',
  },
  {
    id: 3,
    title: 'instagram',
    href: 'https://www.instagram.com/framework.team/',
  },
];

export const BASE_URL = 'https://internship-front.framework.team';

export const pages: Array<number> = [];

export const genres = [
  {
    id: 1,
    name: 'Romanticism',
    isChecked: false,
  },
  {
    id: 2,
    name: 'Art',
    isChecked: false,
  },
  {
    id: 3,
    name: 'Nature',
    isChecked: false,
  },
  {
    id: 4,
    name: 'Bataille',
    isChecked: false,
  },
  {
    id: 5,
    name: 'Realistic',
    isChecked: false,
  },
];

export const sort = [
  {
    _id: '1',
    name: 'Recently added',
    isChecked: false,
  },
  {
    _id: '2',
    name: 'A-Z',
    isChecked: false,
  },
  {
    _id: '3',
    name: 'Z-A',
    isChecked: false,
  },
];

export const biography =
  'Ivan Konstantinovich Aivazovsky was a Russian Romantic painter who is considered one of the greatest masters of marine art. Baptized as Hovhannes Aivazian, he was born into an Armenian family in the Black Sea port of Feodosia in Crimea and was mostly based there...Following his education at the Imperial Academy of Arts in Saint Petersburg, Aivazovsky traveled to Europe and lived briefly in Italy in the early 1840s.He then returned to Russia and was appointed the main painter of the Russian Navy.Aivazovsky had close ties with the military and political elite of the Russian Empire and often attended military maneuvers.He was sponsored by the state and was well - regarded during his lifetime.The saying "worthy of Aivazovsky\'s brush", popularized by Anton Chekhov, was used in Russia for describing something lovely.He remains highly popular in Russia in the 21st century./nOne of the most prominent Russian artists of his time, Aivazovsky was also popular outside Russian Empire.He held numerous solo exhibitions in Europe and the United States.During his almost 60 - year career, he created around 6, 000 paintings, making him one of the most prolific artists of his time.The vast majority of his works are seascapes, but he often depicted battle scenes, Armenian themes, and portraiture.Most of Aivazovsky\'s works are kept in Russian, Ukrainian and Armenian museums as well as private collections.';

export const selectListArray = [
  {
    _id: '1',
    name: 'Albert',
    isChecked: false,
  },
  {
    _id: '2',
    name: 'Ludovic',
    isChecked: false,
  },
  {
    _id: '3',
    name: 'Aurelius',
    isChecked: false,
  },
  {
    _id: '4',
    name: 'Viktor',
    isChecked: false,
  },
  {
    _id: '5',
    name: 'Lembrant',
    isChecked: false,
  },
  {
    _id: '6',
    name: 'Hanz',
    isChecked: false,
  },
  {
    _id: '7',
    name: 'Lanselot',
    isChecked: false,
  },
];

export const slides: TemporaryPaintings[] = [
  {
    _id: '1',
    image: {
      src: CardImg,
    },
    name: 'Alibaba',
    yearOfCreation: '1929',
  },
  {
    _id: '2',
    image: {
      src: SecondCardImg,
    },
    name: 'Anuta',
    yearOfCreation: '1899',
  },
  {
    _id: '3',
    image: {
      src: CardImg,
    },
    name: 'House',
    yearOfCreation: '1465',
  },
  {
    _id: '4',
    image: {
      src: SecondCardImg,
    },
    name: 'Angelina Jolie',
    yearOfCreation: '1549',
  },
  {
    _id: '5',
    image: {
      src: CardImg,
    },
    name: 'Anheim',
    yearOfCreation: '1745',
  },
];

export const modalNode = document.getElementById('modal') as HTMLElement;
