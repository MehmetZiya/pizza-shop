import Carousel from 'react-bootstrap/Carousel'
import cr1 from '../../assets/carousel/carousel1.png'
import cr2 from '../../assets/carousel/carousel2.png'
import cr3 from '../../assets/carousel/carousel3.png'
const HomeCarousel = () => {
  return (
    <div className='carouselWrapper'>
      <Carousel controls={false} indicators={false}>
        <Carousel.Item interval={3500}>
          <img src={cr1} alt='First slide' className='d-block w-100' />
        </Carousel.Item>
        <Carousel.Item interval={3500}>
          <img src={cr2} alt='Second slide' className='d-block w-100' />
        </Carousel.Item>
        <Carousel.Item interval={3500}>
          <img src={cr3} alt='Third slide' className='d-block w-100' />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default HomeCarousel
