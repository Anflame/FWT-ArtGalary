import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../constants';
import type { TPainters } from '../../store/types';
import Card from '../../ui/Card';

type PainterItemProps = {
  painter: TPainters;
};

export const PainterItem: FC<PainterItemProps> = ({ painter }) => (
  <li key={painter._id}>
    <Link to={`/profile/${painter._id}}`}>
      <Card
        title={painter.name}
        img={API + painter.mainPainting.image.src}
        id={painter._id}
        year={painter.yearsOfLife}
      />
    </Link>
  </li>
);
