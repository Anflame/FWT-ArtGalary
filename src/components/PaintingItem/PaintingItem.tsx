import React, { FC } from 'react';

import type { Paintings } from '../../store/types';

import Card from '../../ui/Card';

type PaintingItemProps = {
  painting: Paintings;
  onClick: () => void;
};

const PaintingItem: FC<PaintingItemProps> = ({ painting, onClick }) => (
  <li key={painting._id} onClick={onClick}>
    <Card
      title={painting.name}
      image={painting.image}
      id={painting._id}
      year={painting.yearOfCreation}
    />
  </li>
);

export default PaintingItem;
