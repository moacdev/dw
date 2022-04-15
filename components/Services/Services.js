import React, { useEffect, useRef } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Carousel from 'react-slick';
import PrevIcon from '@material-ui/icons/ArrowBack';
import NextIcon from '@material-ui/icons/ArrowForward';
import { withTranslation } from '~/i18n';
import imgApi from '~/public/images/imgAPI';
import useStyles from './services-style';
import TitleIcon from '../Title/WithIcon';
import Card from '../Cards/Default';
import DotsParallax from '../Parallax/Dots';


function Services(props) {
  const { t } = props;
  const servicesList = [
    {
      title: t('common:services.consulting.title'),
      desc: t('common:services.consulting.desc'),
      img: imgApi.agency[2]
    }, {
      title: t('common:services.our_products.title'),
      desc: t('common:services.our_products.desc'),
      img: imgApi.agency[3]
    }
  ];
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();
  const slider = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [{
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      }
    }]
  };

  useEffect(() => {
    if (theme.direction === 'ltr' && window.innerWidth > 1200) {
      const limit = window.innerWidth > 1400 ? 3 : 2;
      const lastSlide = Math.floor(servicesList.length - limit);
      slider.current.slickGoTo(lastSlide);
    }
  }, [servicesList.length, theme.direction]);

  return (
    <div className={classes.root}>
      <DotsParallax />
      <div className={classes.carouselHandle}>
        <div className={classes.carouselWrap}>
          <Carousel ref={slider} {...settings}>
            {isDesktop && (
              <div className={classes.item}>
                <div className={classes.carouselProp}>
                  <div />
                </div>
              </div>
            )}
            <div className={classes.item}>
              <Card
                title={t('common:services.consulting.title')}
                desc={t('common:services.consulting.desc')}
                img={imgApi.agency[2]}
                button={t('common:agency-landing.services_button')}
              />
            </div>
            <div className={classes.item}>
              <Card
                title={t('common:services.our_products.title')}
                desc={t('common:services.our_products.desc')}
                img={imgApi.agency[3]}
                button={t('common:agency-landing.services_button')}
              />
            </div>
            {isDesktop && (
              <div className={classes.item}>
                <div className={classes.carouselProp}>
                  <div />
                </div>
              </div>
            )}
          </Carousel>
        </div>
      </div>
      <div className={classes.floatingTitle}>
        <Container fixed>
          <div className={classes.title}>
            <TitleIcon text={t('common:agency-landing.services_title')} icon="apps" extended />
            <nav className={classes.arrow}>
              <Fab size="small" onClick={() => slider.current.slickNext()} aria-label="prev" className={classes.margin}>
                <PrevIcon />
              </Fab>
              <Fab size="small" onClick={() => slider.current.slickPrev()} aria-label="next" className={classes.margin}>
                <NextIcon />
              </Fab>
            </nav>
          </div>
        </Container>
      </div>
    </div>
  );
}

Services.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['agency-landing'])(Services);
