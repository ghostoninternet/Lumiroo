import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PlaygroundInfoCard from '../../components/Card/PlaygroundInfoCard';
import {faker} from '@faker-js/faker';
// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

const Slider = ({playgroundsData,is_faker}) => {
  const [swiperRef, setSwiperRef] = useState(null);

  // Sample data for playgrounds (replace with real data)
const playgrounds = playgroundsData ? playgroundsData.map((playground) => {
    return {
        _id: playground._id,
        name: playground.name.length > 29 ? playground.name.substring(0, 29) + '...' : playground.name,
        address: playground.address.length > 30 ? playground.address.substring(0, 30) + '...' : playground.address,
        admissionFee: playground.admissionFee,
        imageUrl: is_faker==1 ? faker.image.url() : playground.imageUrl,
    };
}) : [];
return (
    <div >
        
        <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            spaceBetween={20}
            navigation={true}
            pagination={{
                type: 'fraction',
            }}
            modules={[Pagination, Navigation]}
            className="w-full h-[300px] py-2"
        >
            {/* Loop through the playground data and render slides */}
            {playgrounds.map((playground) => (
                <SwiperSlide key={playground.id}>
                    {/* <div className="bg-green-50 w-full h-full flex items-center justify-center "> */}
                        {/* <div className="bg-white w-11/12 h-11/12"> */}
                        
                        <PlaygroundInfoCard data={playground} />
        
                        {/* </div> */}
                    {/* </div> */}
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
);
};

export default Slider;
