import CatalogueLinkBanner from '@components/catalogue/CatalogueLinkBanner';
import Carousel from '@components/carousel/Carousel';
import { INDEX_BANNER_IMAGES } from 'src/constant/constant';

function Home() {
  return (
    <div>
      <Carousel data={INDEX_BANNER_IMAGES} />
      <CatalogueLinkBanner />
    </div>
  );
}

export default Home;
