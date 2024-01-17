import { useQuery } from "react-query";
import styled from "styled-components";
import { ISearch, makeImagePath, multiSearch } from "./api";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
`;

const Boxes = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1500px;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 15px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 12px;
  height: 200px;
  margin: 10px;
`;

const BoxVariants = {
  hover: {
    scale: 1.15,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const BigScreen = styled(motion.div)<{ bgphoto2: string }>`
  position: fixed;
  width: 800px;
  height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 1), transparent),
    url(${(props) => props.bgphoto2});
  background-size: cover;
  background-position: center center;
  // 중앙정렬
  top: 0;
  left: 0;
  right: 0;
  margin: 100px auto;
  border-radius: 14px;
`;

const BigInfo = styled.div`
  position: relative;
  color: ${(props) => props.theme.white};
  font-family: "RixMomsBlanketR";
  margin: 30px;
`;

const BigTitle = styled.h2`
  position: absolute;
  top: 0;
  font-size: 50px;
`;

const BigOverview = styled.span`
  position: absolute;
  top: 250px;
  font-size: 20px;
`;

function Search() {
  // url로부터 keyword 따오는 과정
  const location = useLocation();
  //location.search는 한 세트
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { isLoading, data: searchData } = useQuery<ISearch>(
    ["all", "search"],
    () => multiSearch(keyword)
  );

  // 박스 클릭
  const navigate = useNavigate();
  const onBoxClicked = (Id: number) => {
    navigate(`/MOVING/search/result/${Id}`);
  };
  const match = useMatch(`/MOVING/search/result/:Id`);

  const AfterClick =
    match?.params.Id &&
    searchData?.results.find((data) => data.id + "" === match?.params.Id);
  console.log(AfterClick);

  const onOverlayClicked = () => {
    // 바로 전 페이지로 이동
    navigate(-1);
  };

  return (
    <Wrapper>
      <Boxes>
        {searchData?.results.slice(0, 12).map((data) => (
          <Box
            key={data.id}
            bgphoto={makeImagePath(data.backdrop_path, "w500")}
            variants={BoxVariants}
            whileHover="hover"
            onClick={() => onBoxClicked(data.id)}
            layoutId={data.id + ""}
          />
        ))}
      </Boxes>
      <AnimatePresence>
        {match ? (
          <>
            <Overlay onClick={onOverlayClicked} />
            {AfterClick ? (
              <BigScreen
                layoutId={match?.params.Id}
                bgphoto2={makeImagePath(AfterClick.backdrop_path)}
              >
                <BigInfo>
                  <BigTitle>{AfterClick.title}</BigTitle>
                  <BigOverview>{AfterClick.overview.slice(0, 100)}</BigOverview>
                </BigInfo>
              </BigScreen>
            ) : null}
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Search;
