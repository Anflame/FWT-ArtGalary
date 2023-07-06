import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import type { TPainters } from '../../store/types';

import Card from '../../ui/Card';

import { useFormatDate } from '../../hooks/useFormatDate';
import { useAppSelector } from '../../hooks/useRedux';

type PainterItemProps = {
  painter: TPainters;
};

const PainterItem: FC<PainterItemProps> = ({ painter }) => {
  const { isAuth } = useAppSelector(({ auth }) => auth);
  return (
    <li key={painter._id}>
      {isAuth ? (
        <Link to={`/profile/${painter._id}`}>
          <Card
            title={painter.name}
            image={painter.mainPainting && painter.mainPainting.image}
            id={painter._id}
            year={useFormatDate(painter.yearsOfLife)}
          />
        </Link>
      ) : (
        <Card
          title={painter.name}
          image={painter.mainPainting && painter.mainPainting.image}
          id={painter._id}
          year={painter.yearsOfLife}
        />
      )}
    </li>
  );
};

export default PainterItem;
