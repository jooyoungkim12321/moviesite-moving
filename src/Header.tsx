import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ReactComponent as MovingLogo } from "./image/Logo.svg";

const Wrapper = styled(motion.div)`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  background: transparent;
  z-index: 10;
`;

const Logo = styled.div`
  width: 180px;
  height: 60px;
  margin: 10px;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Item = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  background: ${(props) => props.theme.accent};
  border: none;
  color: ${(props) => props.theme.white};
  margin: 0 5px;
`;

const SearchDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  left: 800px;
`;

const Search = styled.form`
  position: absolute;
`;

const Input = styled(motion.input)`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.white};
`;

const MoveBanner = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const MoveDrama = styled.div`
  width: 100px;
  span {
    font-weight: bold;
    color: ${(props) => props.theme.white};
  }
`;

const MoveMovie = styled.div`
  width: 100px;
  span {
    font-weight: bold;
    color: ${(props) => props.theme.white};
  }
`;

const MoveCheck = styled.div`
  width: 100px;
  span {
    font-weight: bold;
    color: ${(props) => props.theme.white};
  }
`;

const WrapperVariant = {
  up: { backgroundColor: "rgba(0,0,0,1)" },
  scroll: { backgroundColor: "rgba(0,0,0,0)" },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const { register, handleSubmit } = useForm<{ keyword: string }>();
  const onValid = (data: IForm) => {
    navigate(`/MOVING/search?keyword=${data.keyword}`);
  };

  const match1 = useMatch("/MOVING");
  const match2 = useMatch("/MOVING/home");

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/MOVING/login`);
  };

  // 스크롤에 따라
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("up");
      }
    });
  }, [scrollY]);

  return (
    <Wrapper variants={WrapperVariant} initial="up" animate={navAnimation}>
      {/* 로그인 전 로고 클릭 시 homeB 이동, 로그인 후 로고 클릭 시 homeA 이동 */}
      {match1 !== null ? (
        <Link to="/MOVING">
          <Logo>
            <MovingLogo />
          </Logo>
        </Link>
      ) : (
        <Link to="/MOVING/home">
          <Logo>
            <MovingLogo />
          </Logo>
        </Link>
      )}
      {/* Link는 해당 URL에서 바로 이동하기 때문에 현재 페이지 URL 다시 작성 불필요 */}
      {match2 !== null && (
        <MoveBanner>
          <MoveDrama>
            <Link to="drama">
              <span>시리즈</span>
            </Link>
          </MoveDrama>
          <MoveMovie>
            <Link to="movie">
              <span>영화</span>
            </Link>
          </MoveMovie>
          <MoveCheck>
            <Link to="checklist">
              <span>찜 목록</span>
            </Link>
          </MoveCheck>
        </MoveBanner>
      )}
      {match2 && (
        <SearchDiv>
          <motion.svg
            onClick={toggleSearch}
            initial={{ x: 0 }}
            animate={{ x: searchOpen ? -20 : 250 }}
            transition={{ type: "spring" }}
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path
              fill="white"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </motion.svg>
          <Search onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("keyword", { required: true, minLength: 2 })}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: searchOpen ? 1 : 0 }}
              transition={{ type: "linear" }}
              placeholder="Search for movie or tv shows... "
            />
          </Search>
        </SearchDiv>
      )}

      {match1 !== null && (
        <Items>
          <Item onClick={onClick}>지금 가입</Item>
          <Item onClick={onClick}>로그인</Item>
        </Items>
      )}
    </Wrapper>
  );
}

export default Header;
