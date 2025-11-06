import { Link, useMediaQuery } from '@mui/material';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link as RouterLink } from 'react-router-dom';

import useMoviesQuery from '../../../hooks/useMoviesQuery';

export default function Movies() {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  } = useMoviesQuery();

  // Определяем размеры экрана
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1199px)');
  const isMobileMedium = useMediaQuery(
    '(min-width: 425px) and (max-width: 767px)',
  );

  // Определяем настройки карусели в зависимости от размера экрана
  const getCarouselSettings = () => {
    if (isDesktop)
      return {
        centerSlidePercentage: 20, // 5 элементов (100% / 5 = 20%)
        selectedItem: 2,
        centerMode: true,
      };
    if (isTablet)
      return {
        centerSlidePercentage: 33.3, // 3 элемента (100% / 3 = 33.3%)
        selectedItem: 1,
        centerMode: true,
      };
    if (isMobileMedium)
      return {
        centerSlidePercentage: 50, // 2 элемента (100% / 2 = 50%)
        selectedItem: 0,
        centerMode: true,
      };
    return {
      centerSlidePercentage: 100, // 1 элемент
      selectedItem: 0,
      centerMode: false, // Отключаем centerMode для мобильных
    };
  };

  const carouselSettings = getCarouselSettings();

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Error</p>;

  const serializeDataForCarousel = data =>
    data.map(row => (
      <div
        key={row.kinopoiskId || row.id}
        style={{
          position: 'relative',
          height: '320px', // Добавляем высоту для контейнера
        }}
      >
        <RouterLink
          to={`/movie/${row.kinopoiskId}`}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            textDecoration: 'none',
            position: 'relative',
            zIndex: 1, // Убедимся что ссылка выше других элементов
          }}
        >
          <img
            src={row.posterUrlPreview}
            alt={row.nameRu || row.nameEn}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              background: '#1c232b',
              padding: '10px',
              boxSizing: 'border-box',
              cursor: 'pointer', // Добавляем курсор указатель
            }}
          />
        </RouterLink>
      </div>
    ));

  const carouselArr = [
    {
      title: 'Популярные фильмы',
      url: '/popular',
      data: responsePopular?.data?.items || [],
    },
    {
      title: 'Лучшие фильмы',
      url: '/best',
      data: responseBest?.data?.items || [],
    },
    {
      title: 'Фильмы',
      url: '/films',
      data: responseFilms?.data?.items || [],
    },
    {
      title: 'Сериалы',
      url: '/serials',
      data: responseSerials?.data?.items || [],
    },
    {
      title: 'Мультфильмы',
      url: '/cartoons',
      data: responseCartoons?.data?.items || [],
    },
  ];

  return (
    <>
      {carouselArr.map(carousel => (
        <div key={carousel.title} style={{ marginBottom: '40px' }}>
          <Link
            component={RouterLink}
            to={carousel.url}
            style={{
              display: 'block',
              marginBottom: '20px',
              fontSize: '24px',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            {carousel.title}
          </Link>

          {carousel.data.length > 0 && (
            <Carousel
              showArrows={true}
              showStatus={false}
              showThumbs={false}
              showIndicators={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={6000}
              stopOnHover={true}
              swipeable={false}
              dynamicHeight={false}
              emulateTouch={false}
              centerMode={carouselSettings.centerMode}
              centerSlidePercentage={carouselSettings.centerSlidePercentage}
              selectedItem={carouselSettings.selectedItem}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: 'absolute',
                      zIndex: 3, // Стрелки выше контента
                      top: '50%',
                      left: '15px',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                    }}
                  >
                    ‹
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: 'absolute',
                      zIndex: 3, // Стрелки выше контента
                      top: '50%',
                      right: '15px',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                    }}
                  >
                    ›
                  </button>
                )
              }
            >
              {serializeDataForCarousel(carousel.data)}
            </Carousel>
          )}
        </div>
      ))}
    </>
  );
}
