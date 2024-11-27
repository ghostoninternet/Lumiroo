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

const Slider = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  // Sample data for playgrounds (replace with real data)
const playgrounds = [
    { id: 1, name: '佐藤保険名会社', address: '156 Phùng Flats, フンイエン, ベトナム', admissionFee: 215000, imageUrl: faker.image.url() },
    { id: 2, name: '有限会社田中通信', address: '3245 Dan Quế Canyon, ハザン, ベトナム', admissionFee: 90000, imageUrl: faker.image.url() },
    { id: 3, name: '合同会社井上鉄業', address: '1792 Đào Lake, クアンニン, ベトナム', admissionFee: 365000, imageUrl: faker.image.url() },
    { id: 4, name: '合同会社加藤水産', address: '5637 Nguyễn Spur, タイビン, ベトナム', admissionFee: 345000, imageUrl: faker.image.url() },
    { id: 5, name: '株式会社木村情報', address: '2743 Phùng Shoal, タインホア, ベトナム', admissionFee: 285000, imageUrl: faker.image.url() },
    { id: 6, name: '株式会社山本通信', address: '3245 Dan Quế Canyon, ハザン, ベトナム', admissionFee: 90000, imageUrl: faker.image.url() },
    { id: 7, name: '株式会社山本通信', address: '3245 Dan Quế Canyon, ハザン, ベトナム', admissionFee: 90000, imageUrl: faker.image.url() },
];
console.log(playgrounds);

return (
    <div className="py-6">
        <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            spaceBetween={20}
            navigation={true}
            pagination={{
                type: 'fraction',
            }}
            modules={[Pagination, Navigation]}
            className="w-full h-[300px] py-4"
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
