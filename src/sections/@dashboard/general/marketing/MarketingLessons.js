import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { m } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography, Link } from '@mui/material';

// components
import Image from '../../../../components/Image';
import { MotionContainer, varFade } from '../../../../components/animate';
import { CarouselDots, CarouselArrows } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

const QwikshopLearn = [
  {
    id: '89292j93u',
    title: 'How to do SMS marketing?',
    description: 'In this article you can learn how to setup and launch SMS marketing...',
    image: 'https://dexatel.com/images/blog/4/cover/sms-marketing-campaign-image.jpg',
    href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ',
  },
  {
    id: '89292j93u',
    title: 'How to do WhatsApp Marketing?',
    description: 'In this article you can learn how to setup and launch WhatsApp Marketing...',
    image: 'https://www.delhicourses.in/blog/wp-content/uploads/2020/02/WhatsApp-Marketing.jpg',
    href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ',
  },
  {
    id: '89292j93u',
    title: 'How to run Google Ads?',
    description: 'In this article you can learn how to promote your online business on QwikShop with Google Adwords...',
    image:
      'https://cdn.searchenginejournal.com/wp-content/uploads/2019/09/ec005aa3-f826-4ea6-9f0e-8e9152806289-760x400.jpeg',
    href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ',
  },
  {
    id: '89292j93u',
    title: 'How to run Facebook Ads?',
    description: 'In this article you can learn how to promote your online business on QwikShop with Facebook Ads...',
    image: 'https://www.techtrainees.com/wp-content/uploads/2019/11/facebook.png',
    href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ',
  },
  {
    id: '89292j93u',
    title: 'How to measure marketing performance?',
    description: 'In this article you can learn how to create discount and promote your sales?',
    image:
      'https://www.thebalancecareers.com/thmb/dNnKO3lTJ90ZNrD7HAXBUJj2O4U=/2121x1414/filters:fill(auto,1)/digital-marketing-1222811180-3968de5d1f19400a88b1e5e44cd9fae4.jpg',
    href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ',
  },
];

// ----------------------------------------------------------------------

export default function MarketingLessons() {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? QwikshopLearn.length - 1 : 0);

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      zIndex: 9,
      top: 24,
      left: 24,
      position: 'absolute',
    }),
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {QwikshopLearn.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrevious}
        spacing={0}
        sx={{
          top: 16,
          right: 16,
          position: 'absolute',
          '& .arrow': {
            p: 0,
            width: 32,
            height: 32,
            opacity: 0.48,
            color: 'common.white',
            '&:hover': { color: 'common.white', opacity: 1 },
          },
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  const { image, title, description } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          bottom: 0,
          width: 1,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" component="div" sx={{ mb: 1, opacity: 0.48 }}>
            Learn Qwikshop
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Link component={RouterLink} to="#" color="inherit" underline="none">
            <Typography variant="h5" gutterBottom noWrap>
              {title}
            </Typography>
          </Link>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </m.div>
      </CardContent>
      <OverlayStyle />
      <Image alt={title} src={image} sx={{ height: { xs: 280, xl: 320 } }} />
    </Box>
  );
}
