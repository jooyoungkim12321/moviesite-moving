import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;

const Board = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  // 상하좌우 중앙 정렬
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 50px;
`;

const Title = styled.h2`
  top: -30px;
  color: white;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  margin: 10px;
`;

const Log = styled.form`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 50px;
  margin: 10px;
  background-color: ${(props) => props.theme.black.darker};
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  color: ${(props) => props.theme.white};
  // 클릭 시 Outline 제거
  &:focus {
    outline: none;
  }
`;

const Check = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
  label {
    margin-left: 5px;
    color: ${(props) => props.theme.black.light};
    font-size: 14px;
    font-weight: bold;
  }
`;

const LoginBut = styled.button`
  height: 50px;
  margin: 10px;
  background-color: ${(props) => props.theme.accent};
  border: none;
  border-radius: 10px;
  color: ${(props) => props.theme.white};
  font-weight: bold;
  font-size: 15px;
`;

const Find = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    border: none;
    padding: 5px;
    background: transparent;
    color: ${(props) => props.theme.white};
    font-weight: bold;
  }
`;

const Sign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${(props) => props.theme.black.darker};
  }
  button {
    border: none;
    padding: 5px;
    background: transparent;
    color: ${(props) => props.theme.black.light};
    font-weight: bold;
  }
`;

function Login() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onValid = (data: any) => {
    console.log(data);
    navigate(`/MOVING/home`);
  };

  return (
    <Wrapper>
      <Board>
        <Title>MOVING ID 로그인</Title>
        <Log onSubmit={handleSubmit(onValid)}>
          <Input {...register("id", { required: true })} placeholder="아이디" />
          <Input
            {...register("password", { required: true })}
            placeholder="비밀번호"
          />
          <Check>
            <input type="checkbox" />
            <label htmlFor="checkbox">자동 로그인</label>
          </Check>
          <LoginBut>로그인하기</LoginBut>
          <Find>
            <button>아이디 찾기</button>
            <button>비밀번호 찾기</button>
          </Find>
          <Sign>
            <span>아직 계정이 없으신가요?</span>
            <button>회원가입하기</button>
          </Sign>
        </Log>
      </Board>
    </Wrapper>
  );
}

export default Login;
