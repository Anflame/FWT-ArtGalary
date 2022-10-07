export type TPainterProfile = {
  paintings: Paintings[];
  genres: {
    _id: string;
    name: string;
  }[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  avatar: {
    _id: string;
    src: string;
    webp: string;
    src2x: string;
    webp2x: string;
    original: string;
  };
  __v: 0;
  mainPainting: Paintings;
};

export type TPainters = {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  __v: number;
  mainPainting: Paintings;
};

export type PaintersParams = {
  url?: string;
  accessToken?: string;
};

export type Paintings = {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: {
    _id: string;
    src: string;
    webp: string;
    src2x: string;
    webp2x: string;
    original: string;
  };
  artist: string;
};

export type TAuth = {
  isAuth?: boolean;
  accessToken: string;
  refreshToken: string;
  fingerprint?: string;
};
