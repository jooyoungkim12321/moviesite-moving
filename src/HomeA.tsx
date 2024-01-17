import { useQuery } from "react-query";
import styled from "styled-components";
import { ITrendingWeek, getTrendingWeek, makeImagePath } from "./api";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ReactComponent as Left } from "./image/left.svg";
import { ReactComponent as Right } from "./image/right.svg";
import Today from "./HomeComponent/Today";
import Onair from "./HomeComponent/Onair";

const Wrapper = styled.div`
  position: relative;
  height: 200vh;
  width: 100vw;
`;

const Banner = styled.div`
  position: absolute;
  top: 80px;
  width: 100%;
  height: 500px;
`;

const Row = styled.div`
  position: relative;
`;

const Slide = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 10px;
`;

const CoverImage = styled.div<{ bgphoto: string }>`
  width: 800px;
  height: 500px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${(props) => props.theme.white};
`;

const Title = styled.h2`
  font-size: 60px;
`;

const Overview = styled.span`
  width: 50%;
`;

const SlideBanner = styled.div`
  position: absolute;
  top: 190px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
`;

const SliderLeft = styled(motion.div)`
  margin: 10px;
  opacity: 0;
`;

const SliderRight = styled(motion.div)`
  margin: 10px;
  opacity: 0;
`;

const SlideVariants = {
  init: (slideBack: boolean) => ({
    x: slideBack ? -window.outerWidth - 200 : window.outerWidth + 200,
  }),
  ani: { x: 0 },
  ex: (slideBack: boolean) => ({
    x: slideBack ? window.outerWidth + 200 : -window.outerWidth - 200,
  }),
};

const ArrowVariants = {
  hover: { opacity: 1 },
};

function HomeA() {
  const { data: weekData, isLoading: isLoading1 } = useQuery<ITrendingWeek>(
    ["all", "trendingweek"],
    getTrendingWeek
  );

  // 슬라이드
  const [slideIndex, SetSlideIndex] = useState(0);
  const [slideLeaving, setSlideLeaving] = useState(false);
  const [slideBack, setSlideBack] = useState(false);
  const slideToggleLeaving = () => {
    setSlideLeaving((prev) => !prev);
  };
  const IncreaseSlideIndex = () => {
    if (weekData) {
      if (slideLeaving) return;
      slideToggleLeaving();
      setSlideBack(false);
      const total = weekData.results.length;
      const maxIndex = Math.floor(total / 2);
      SetSlideIndex((prev) => (prev === maxIndex ? maxIndex : prev + 1));
    }
  };
  const DecreaseSlideIndex = () => {
    if (weekData) {
      if (slideLeaving) return;
      slideToggleLeaving();
      setSlideBack(true);
      SetSlideIndex((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };

  return (
    <Wrapper>
      <Banner>
        {/* 배너 슬라이더 */}
        <Row>
          <AnimatePresence
            initial={false}
            onExitComplete={slideToggleLeaving}
            custom={slideBack}
          >
            <SlideBanner style={{ top: "220px" }}>
              <SliderLeft
                variants={ArrowVariants}
                whileHover="hover"
                onClick={DecreaseSlideIndex}
              >
                <Left />
              </SliderLeft>
              <SliderRight
                variants={ArrowVariants}
                whileHover="hover"
                onClick={IncreaseSlideIndex}
              >
                <Right />
              </SliderRight>
            </SlideBanner>
            <Slide
              key={slideIndex}
              variants={SlideVariants}
              custom={slideBack}
              initial="init"
              animate="ani"
              exit="ex"
              transition={{
                duration: 5,
              }}
            >
              {weekData?.results
                .slice(slideIndex * 2, slideIndex * 2 + 2)
                .map((data) => (
                  <CoverImage
                    key={data.id}
                    bgphoto={makeImagePath(data.backdrop_path)}
                  >
                    <Info>
                      <Title>{data.title}</Title>
                      <Overview>{data.overview.slice(0, 200)}</Overview>
                    </Info>
                  </CoverImage>
                ))}
            </Slide>
          </AnimatePresence>
        </Row>
      </Banner>
      {/* 첫 번째 Row */}
      <Today />
      {/* 두번째 Row */}
      <Onair />
      {/* 오버레이 */}
    </Wrapper>
  );
}

export default HomeA;
