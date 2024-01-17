import { useQuery } from "react-query";
import styled from "styled-components";
import { ITrendingDay, getTrendingDay, makeImagePath } from "../api";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { ReactComponent as Left } from "../image/left.svg";
import { ReactComponent as Right } from "../image/right.svg";
import { ReactComponent as Like } from "../image/like.svg";
import { ReactComponent as Share } from "../image/share.svg";
import { ReactComponent as Check } from "../image/Check.svg";
import { useSetRecoilState } from "recoil";
import { CheckListState } from "../atoms";

const Row = styled.div`
  position: relative;
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

const List = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  top: 100px;
  width: 100%;
  height: 300px;
`;

const BoxTitle = styled.h2`
  position: absolute;
  margin-left: 30px;
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.theme.white};
  font-family: "RixMomsBlanketR";
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  width: 400px;
  height: 250px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const BoxNumber = styled.div`
  h2 {
    font-size: 100px;
    font-family: "RixMomsBlanketR";
    color: ${(props) => props.theme.white};
  }
`;

const OverlayBack = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Overlay = styled(motion.div)<{ bgphoto2: string }>`
  top: 100px;
  left: 300px;
  position: fixed;
  width: 1000px;
  height: 500px;
  background-image: linear-gradient(rgba(0, 0, 0, 1), transparent),
    url(${(props) => props.bgphoto2});
  background-size: cover;
  background-position: center center;
  opacity: 0;
  border-radius: 10px;
`;

const Overdiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const OverInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${(props) => props.theme.white};

  font-family: "RixMomsBlanketR";
  width: 500px;
  margin-top: 50px;
`;

const OverTitle = styled.h2`
  font-size: 50px;
  margin-bottom: 100px;
`;

const Subscribe = styled.button`
  border: none;
  font-weight: bold;
  background-color: ${(props) => props.theme.accent};
  width: 200px;
  height: 30px;
  color: ${(props) => props.theme.white};
  border-radius: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 30px;
`;

const Icon = styled(motion.div)``;

const OverOverview = styled.span`
  width: 100%;
`;

const OverImage = styled.div<{ bgphoto2: string }>`
  width: 400px;
  height: 400px;
  background-image: url(${(props) => props.bgphoto2});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
  margin-top: 50px;
`;

const BoxVariants = { hover: { scale: 1.2 } };

const OverlayVariants = {
  ani: { opacity: 1 },
  ex: { opacity: 0 },
};

const ListVariants = {
  init: (back1: boolean) => ({
    x: back1 ? -window.outerWidth - 100 : window.outerWidth + 100,
  }),
  ani: { x: 0 },
  ex: (back1: boolean) => ({
    x: back1 ? window.outerWidth + 100 : -window.outerWidth - 100,
  }),
};

const ArrowVariants = {
  hover: { opacity: 1 },
};

const IconVariants = {
  hover: { scale: 1.2 },
  click: { opacity: 0 },
};

function Today() {
  const { data: dayData, isLoading: isLoading2 } = useQuery<ITrendingDay>(
    ["all", "trendingday"],
    getTrendingDay
  );

  const [Index1, setIndex1] = useState(0);
  const [back1, setBack1] = useState(false);
  const [leaving1, setLeaving1] = useState(false);
  const toggleLeaving1 = () => {
    setLeaving1((prev) => !prev);
  };

  const IncreaseIndex1 = () => {
    if (dayData) {
      if (leaving1) return;
      toggleLeaving1();
      setBack1(false);
      const total = dayData.results.length;
      const maxIndex = Math.ceil(total / 4);
      setIndex1((prev) => (prev === maxIndex ? maxIndex : prev + 1));
    }
  };
  const DecreaseIndex1 = () => {
    if (dayData) {
      if (leaving1) return;
      toggleLeaving1();
      setBack1(true);
      setIndex1((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };

  //오버레이1
  const navigate = useNavigate();
  const onBoxClicked = (Id: number) => {
    navigate(`/MOVING/home/today/${Id}`);
  };
  const onOverlayClicked = () => {
    navigate(`/MOVING/home`);
  };
  const match = useMatch(`/MOVING/home/today/:Id`);
  const matchInfo = match?.params.Id;
  const matchToData = dayData?.results.find(
    (data) => data.id + "" === matchInfo
  );
  console.log(match);

  // 클릭 시 나중에 볼 콘텐츠 등록
  const setLists = useSetRecoilState(CheckListState);
  const onCheckClick = () => {
    const newList = {
      id: matchToData?.id,
      title: matchToData?.title,
      image: matchToData?.backdrop_path,
    };
    setLists((allBoards) => {
      return {
        ...allBoards,
        //atom의 key 값이 checkVideo인 배열에 추가
        ["나중에 볼 콘텐츠"]: [...allBoards["나중에 볼 콘텐츠"], newList],
      };
    });
  };

  // 클릭 시 찜 목록 등록
  const onLikeClick = () => {
    const newList = {
      id: matchToData?.id,
      title: matchToData?.title,
      image: matchToData?.backdrop_path,
    };
    setLists((allBoards) => {
      return {
        ...allBoards,
        ["찜한 콘텐츠"]: [...allBoards["찜한 콘텐츠"], newList],
      };
    });
  };

  return (
    <>
      <Row style={{ top: "700px" }}>
        <AnimatePresence
          initial={false}
          custom={back1}
          onExitComplete={toggleLeaving1}
        >
          <BoxTitle>오늘의 MOVING Top 20</BoxTitle>
          <SlideBanner>
            <SliderLeft
              variants={ArrowVariants}
              whileHover="hover"
              onClick={DecreaseIndex1}
            >
              <Left />
            </SliderLeft>
            <SliderRight
              variants={ArrowVariants}
              whileHover="hover"
              onClick={IncreaseIndex1}
            >
              <Right />
            </SliderRight>
          </SlideBanner>
          <List
            variants={ListVariants}
            initial="init"
            animate="ani"
            exit="ex"
            transition={{ type: "tween", duration: 1.5 }}
            custom={back1}
            key={Index1}
          >
            {dayData?.results.slice(Index1 * 4, Index1 * 4 + 4).map((data) => (
              <Box
                key={data.id}
                bgphoto={makeImagePath(data.backdrop_path, "w500")}
                variants={BoxVariants}
                whileHover="hover"
                transition={{ type: "spring" }}
                onClick={() => onBoxClicked(data.id)}
                layoutId={data.id + ""}
              >
                <BoxNumber>
                  <h2></h2>
                </BoxNumber>
              </Box>
            ))}
          </List>
        </AnimatePresence>
      </Row>
      {/* // 오버레이 */}
      <AnimatePresence>
        {match ? (
          <>
            <OverlayBack onClick={onOverlayClicked} />
            {matchToData ? (
              <Overlay
                layoutId={matchInfo}
                variants={OverlayVariants}
                animate="ani"
                exit="ex"
                bgphoto2={makeImagePath(matchToData.backdrop_path)}
              >
                <Overdiv>
                  <OverInfo>
                    <OverTitle>{matchToData?.title}</OverTitle>
                    <Subscribe>멤버십 구독하기</Subscribe>
                    <Buttons>
                      <Icon
                        variants={IconVariants}
                        whileHover="hover"
                        whileTap="click"
                      >
                        <Like onClick={onLikeClick} />
                      </Icon>
                      <Icon
                        variants={IconVariants}
                        whileHover="hover"
                        whileTap="click"
                      >
                        <Check onClick={onCheckClick} />
                      </Icon>
                      <Share />
                    </Buttons>
                    <OverOverview>{matchToData?.overview}</OverOverview>
                  </OverInfo>
                  <OverImage
                    bgphoto2={makeImagePath(matchToData?.backdrop_path)}
                  />
                </Overdiv>
              </Overlay>
            ) : null}
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
export default Today;
