import { useQuery } from "react-query";
import styled from "styled-components";
import {
  IPopularMovies,
  IonAirTv,
  getPopularMovies,
  getonAirTV,
  makeImagePath,
} from "./api";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";

const Wrapper = styled.div`
  background: ${(props) => props.theme.black.normal};
  height: 300vh;
  position: relative;
`;

const Box1 = styled.div`
  position: relative;
  top: 120px;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
`;

const ImageBox = styled.div`
  position: absolute;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
`;

const Cover = styled.div<{ bgphoto: string }>`
  height: 120px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), transparent),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
  filter: blur(1px);
`;

const Intro = styled.div`
  position: absolute;
  top: 50%;
  left: 32%;
  display: flex;
  flex-direction: column;
  background: transparent;
  z-index: 999;
  font-weight: bold;
  color: ${(props) => props.theme.white};
  h2 {
    width: 52%;
    margin-bottom: 25px;
    font-size: 30px;
  }
  button {
    border: none;
    background: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.white};
    border-radius: 12px;
    width: 140px;
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
    margin-left: 200px;
    margin-top: 40px;
  }
`;

const Box2 = styled.div`
  position: absolute;
  top: 700px;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Box2Intro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  text-align: center;
  font-weight: bold;
  gap: 10px;
  color: ${(props) => props.theme.white};
  h2 {
    font-size: 25px;
  }
  span {
    font-size: 15px;
  }
`;

// 상위에 relative 하위에 absolute 입력하면 클릭 시 두 줄로 보이지 않음

const Row = styled.div`
  position: relatvie;
`;

const Box2Slider1 = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 150px;
`;

const Box2Slider2 = styled(motion.div)`
  width: 100%;
  height: 150px;
`;

const Box2box = styled.div``;

const Box3 = styled.div`
  position: absolute;
  top: 1300px;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Box3Intro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  text-align: center;
  font-weight: bold;
  gap: 10px;
  color: ${(props) => props.theme.white};
  h2 {
    font-size: 25px;
  }
  span {
    font-size: 15px;
  }
`;

const Box3Slider = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 150px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // grid 중앙 정렬
  place-items: center;
`;

const Box3box = styled.div<{ bgphoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), transparent),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 400px;
  height: 300px;
  margin: 5px;
  border-radius: 10px;
  &:first-child {
    width: 300px;
    height: 200px;
    margin-top: 50px;
  }
  &:last-child {
    width: 300px;
    height: 200px;
    margin-top: 50px;
  }
`;

const offset = 3;

function HomeB() {
  const { data: PopMvData, isLoading: isLoading1 } = useQuery<IPopularMovies>(
    ["movies", "popularmovies"],
    () => getPopularMovies(1)
  );

  const { data: AirTvData, isLoading: isLoading2 } = useQuery<IonAirTv>(
    ["tv", "onairtv"],
    getonAirTV
  );

  const [Index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const IncreaseIndex = () => {
    if (AirTvData) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();
      const total = AirTvData.results.length;
      const maxIndex = Math.floor(total / offset);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  // const DecreaseIndex = () => {
  //   if (AirTvData) {
  //     if (leaving) return;
  //     setBack(true);
  //     toggleLeaving();
  //     const total = AirTvData.results.length;
  //     const minIndex = Math.floor(total / offset);
  //     setIndex((prev) => (prev === 0 ? 0 : prev - 1));
  //   }
  // };

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/MOVING/login`);
  };

  return (
    <Wrapper>
      <Box1>
        <ImageBox>
          {PopMvData?.results.map((movie) => (
            <Cover
              key={movie.id}
              bgphoto={makeImagePath(movie.backdrop_path, "w500")}
            />
          ))}
        </ImageBox>
        <Intro>
          <h2>
            MOVING 오리지널부터 드라마, 영화까지 무제한으로 스트리밍해 보세요
          </h2>
          <button onClick={onClick}>로그인하기</button>
        </Intro>
      </Box1>
      <Box2>
        <Box2Intro>
          <h2>트렌디한 콘텐츠</h2>
          <span>국내외 영화, 드라마 시리즈 및 오리지널 독점 시리즈까지</span>
        </Box2Intro>
        <Row>
          <Box2Slider1></Box2Slider1>
        </Row>
        <Row>
          <Box2Slider2></Box2Slider2>
        </Row>
      </Box2>
      <Box3>
        <Box3Intro>
          <h2>MOVING 오리지널 시리즈</h2>
          <span>
            오직 MOVING에서만 만날 수 있는 오리지널 콘텐츠를 감상해 보세요
          </span>
        </Box3Intro>
        <Row>
          <Box3Slider>
            {AirTvData?.results
              .slice(offset * Index, offset * Index + offset)
              .map((tv) => (
                <Box3box
                  key={tv.id}
                  bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                />
              ))}
          </Box3Slider>
        </Row>
      </Box3>
    </Wrapper>
  );
}

export default HomeB;
