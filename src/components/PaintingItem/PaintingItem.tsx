import React, { FC } from 'react';
import { API } from '../../constants';
import type { Paintings } from '../../store/types';
import Card from '../../ui/Card';

type PaintingItemProps = {
  painting: Paintings;
};

export const PaintingItem: FC<PaintingItemProps> = ({ painting }) => (
  <li key={painting._id}>
    <Card
      title={painting.name}
      img={API + painting.image.src}
      id={painting._id}
      year={painting.yearOfCreation}
    />
  </li>
);
