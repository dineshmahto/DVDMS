import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styled from "styled-components";
// import required modules
import { Autoplay, FreeMode } from "swiper";
interface swiperProps {
  data: any[];
}
const SwiperComponent: React.FC<swiperProps> = ({ data }) => {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={2}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode]}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        className="mySwiper pb-2"
      >
        {data &&
          data.length > 0 &&
          data?.map((ele: any, i: number) => {
            return (
              <SwiperSlide key={i}>
                <CardWrapper>
                  <div className="card border-0">
                    <div className="card-body text-dark">
                      <div className="d-flex justify-content-center">
                        <div className="d-flex flex-row p-2">
                          <div>
                            <FontAwesomeIcon
                              size="3x"
                              className="me-3"
                              icon={ele?.icon}
                              style={{ color: "#2acf35" }}
                            />
                          </div>
                          <div className="d-flex flex-column">
                            <h6>{ele?.header}</h6>
                            <p>{ele?.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};
export default SwiperComponent;
const CardWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
