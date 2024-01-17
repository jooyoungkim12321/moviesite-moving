import { useQuery } from "react-query";
import styled from "styled-components";
import { IonAirTv, getonAirTV, makeImagePath } from "../api";
import { useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { ReactComponent as Left } from "../image/left.svg";
import { ReactComponent as Right } from "../image/right.svg";
import { ReactComponent as Like } from "../image/like.svg";
import { ReactComponent as Share } from "../image/share.svg";

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

const ListVariants2 = {
  init: (back2: boolean) => ({
    x: back2 ? -window.outerWidth - 100 : window.outerWidth + 100,
  }),
  ani: { x: 0 },
  ex: (back2: boolean) => ({
    x: back2 ? window.outerWidth + 100 : -window.outerWidth - 100,
  }),
};

const ArrowVariants = {
  hover: { opacity: 1 },
};

function Onair() {
  const { data: airData, isLoading: isLoading3 } = useQuery<IonAirTv>(
    ["tv", "onair"],
    getonAirTV
  );

  const [Index2, setIndex2] = useState(0);
  const [back2, setBack2] = useState(false);
  const [leaving2, setLeaving2] = useState(false);
  const toggleLeaving2 = () => {
    setLeaving2((prev) => !prev);
  };

  const IncreaseIndex2 = () => {
    if (airData) {
      if (leaving2) return;
      toggleLeaving2();
      setBack2(false);
      const total = airData.results.length;
      const maxIndex = Math.ceil(total / 4);
      setIndex2((prev) => (prev === maxIndex ? maxIndex : prev + 1));
    }
  };
  const DecreaseIndex2 = () => {
    if (airData) {
      if (leaving2) return;
      toggleLeaving2();
      setBack2(true);
      setIndex2((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };

  // 오버레이2
  const navigate = useNavigate();
  const onBoxClicked2 = (Id: number) => {
    navigate(`/MOVING/home/onair/${Id}`);
  };
  const onOverlayClicked = () => {
    navigate(`/MOVING/home`);
  };
  const match2 = useMatch(`/MOVING/home/onair/:Id`);
  const matchInfo2 = match2?.params.Id;
  const matchToData2 = airData?.results.find(
    (data) => data.id + "" === matchInfo2
  );

  return (
    <>
      <Row style={{ top: "1200px" }}>
        <AnimatePresence
          initial={false}
          custom={back2}
          onExitComplete={toggleLeaving2}
        >
          <BoxTitle>실시간 MOVING Top 20</BoxTitle>
          <SlideBanner>
            <SliderLeft
              variants={ArrowVariants}
              whileHover="hover"
              onClick={DecreaseIndex2}
            >
              <Left />
            </SliderLeft>
            <SliderRight
              variants={ArrowVariants}
              whileHover="hover"
              onClick={IncreaseIndex2}
            >
              <Right />
            </SliderRight>
          </SlideBanner>
          <List
            variants={ListVariants2}
            initial="init"
            animate="ani"
            exit="ex"
            transition={{ type: "tween", duration: 1.5 }}
            custom={back2}
            key={Index2}
          >
            {airData?.results.slice(Index2 * 4, Index2 * 4 + 4).map((data) => (
              <Box
                key={data.id}
                bgphoto={makeImagePath(data.backdrop_path, "w500")}
                variants={BoxVariants}
                whileHover="hover"
                transition={{ type: "spring" }}
                onClick={() => onBoxClicked2(data.id)}
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
      <AnimatePresence>
        {match2 ? (
          <>
            <OverlayBack onClick={onOverlayClicked} />
            {matchToData2 ? (
              <Overlay
                layoutId={matchInfo2}
                variants={OverlayVariants}
                animate="ani"
                exit="ex"
                bgphoto2={makeImagePath(matchToData2.backdrop_path)}
              >
                <Overdiv>
                  <OverInfo>
                    <OverTitle>{matchToData2.name}</OverTitle>
                    <Subscribe>멤버십 구독하기</Subscribe>
                    <Buttons>
                      <Like />
                      <Share />
                    </Buttons>
                    <OverOverview>{matchToData2?.overview}</OverOverview>
                  </OverInfo>
                  <OverImage
                    bgphoto2={makeImagePath(matchToData2?.backdrop_path)}
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

export default Onair;
