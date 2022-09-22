import { createSlice } from '@reduxjs/toolkit';
import { CardProps } from '../../comon-types';
import img from '../../assets/images/cardImg.jpg';

type PaintersState = {
  painters: CardProps[];
};

const initialState: PaintersState = {
  painters: [
    {
      id: 1,
      title: 'Ludovico Anaudi',
      img,
    },
    {
      id: 2,
      title: 'Larry Minuti',
      img,
    },
    {
      id: 3,
      title: 'Marcus Aurelius',
      img,
    },
    {
      id: 4,
      title: 'Hans Zimmer',
      img,
    },
    {
      id: 5,
      title: 'Frodo Baggins',
      img,
    },
    {
      id: 6,
      title: 'Oswaldo Mobray',
      img,
    },
    {
      id: 7,
      title: 'Marty Mcfly',
      img,
    },
    {
      id: 8,
      title: 'Luke Skywalker',
      img,
    },
    {
      id: 9,
      title: 'Tomas Shelbi',
      img,
    },
  ],
};

const themeSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const paintersReducer = themeSlice.reducer;
