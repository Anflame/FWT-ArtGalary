import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import PaintingItem from '../PaintingItem';
import Slider from '../Slider';
import { useAppSelector } from '../../hooks/useRedux';
import { Paintings } from '../../store/types';
import Button from '../../ui/Button';
import EditPainting from '../../ui/EditPainting';
import List from '../../ui/List';
import Pagination from '../../ui/Pagination';
import { ReactComponent as PlusIcon } from '../../assets/images/plus.svg';
import { ReactComponent as WithoutPainterPhotoIcon } from '../../assets/images/withoutPainterPhoto.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const PainterArtWorks: FC = () => {
  const { paintings } = useAppSelector(
    ({ painterProfile: { painterProfileInfo } }) => painterProfileInfo,
  );
  const [isShowEditPainting, setIsShowEditPainting] = useState(false);
  const [isShowSlider, setIsShowSlider] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div className={cx('artWorks')}>
        <div className={cx('artWorksHeaderWrapp')}>
          <div className={cx('container')}>
            <h2 className={cx('artWorksHeader')}>Artworks</h2>
          </div>
        </div>
        <div className={cx('container')}>
          <Button
            className="linkBtn"
            handleClick={() => setIsShowEditPainting(true)}
            title="add picture"
          >
            add picture
          </Button>
        </div>
        {paintings.length !== 0 ? (
          <>
            <List
              items={paintings}
              renderItem={(painting: Paintings) => (
                <PaintingItem
                  painting={painting}
                  key={painting._id}
                  onClick={() => setIsShowSlider(true)}
                />
              )}
            />
            <Pagination
              currentPage={currentPage}
              maxPages={paintings.length}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <div className={cx('withoutPaintingsWrapp')}>
            <div className={cx('container')}>
              <div className={cx('editPainting')}>
                <WithoutPainterPhotoIcon
                  fill="#DEDEDE"
                  className={cx('addPhotoIcon')}
                />
                <button
                  className={cx('editPaintingBtn')}
                  onClick={() => setIsShowEditPainting(true)}
                >
                  <PlusIcon fill="#DEDEDE" width="16px" height="16px" />
                </button>
              </div>
              <h3 className={cx('withOutPainingsText')}>
                The paintings of this artist have not been uploaded yet.
              </h3>
            </div>
          </div>
        )}
      </div>

      <EditPainting
        isShowEditPainting={isShowEditPainting}
        setIsShowEditPaintings={() => setIsShowEditPainting(false)}
      />
      <Slider
        isShowSlider={isShowSlider}
        setIsShowSlider={setIsShowSlider}
        slides={paintings}
      />
    </>
  );
};
