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

export type TPaintingInfo = {
  name: string;
  yearOfCreation: string;
  image: File;
};

export type TAddPaintingParams = {
  id?: string;
  accessToken?: string;
  imageInfo: TPaintingInfo;
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

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TAuth = {
  isAuth: boolean;
  token: TTokens;
  fingerprint?: string;
};

export type TAddPainting = {
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
};

export type TGenre = {
  _id: string;
  name: string;
};

export type TGenresState = {
  isLoading: boolean;
  error: string;
  genres: TGenre[];
};

export type TPaintersParams = {
  genres: string[];
  sorting: string[];
};

export type TPainterAuthorizedPerson = {
  data: TPainters[];
  meta: {
    count: number;
    perPage: number;
    pageNumber: number;
  };
};
