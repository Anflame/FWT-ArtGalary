import React, { FC } from 'react';

import type { Paintings } from '../../store/types';

import Card from '../../ui/Card';

import { BASE_URL } from '../../constants';

type PaintingItemProps = {
  painting: Paintings;
  onClick: () => void;
};

export const PaintingItem: FC<PaintingItemProps> = ({ painting, onClick }) => (
  <li key={painting._id} onClick={onClick}>
    <Card
      title={painting.name}
      img={BASE_URL + painting.image.src}
      id={painting._id}
      year={painting.yearOfCreation}
    />
  </li>
);
