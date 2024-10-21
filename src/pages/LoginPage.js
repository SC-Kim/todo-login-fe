import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react"

import { Link } from "react-router-dom";
import api from "../utils/api"
import { useNavigate, Navigate } from "react-router-dom";


const LoginPage = ({user, setUser}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // 로그인 했다면, 로그인 페이지로 돌아갈 수 없다. 
  // 로그인 성공하면 토큰 저장
  // 토큰값 읽어온다
  // 토큰이 사용 가능한 토큰인지 체크한다.
  // 토큰이 사용 가능하면 유저 정보 가져온다.
  // 유저가 있다면 투두 페이지를 보여준다.
  // 로그인을 안했다면 Todo 페이지로 들어갈 수 없다.

  // 컬렉션의 컬럼을 추가한다. (author)
  // 현재 로그인한 유저가 누군지 유저 정보를 알아야 한다. 
  // 할일 생성시 author을 추가한다.
  // 프론트엔드는 작성자 이름도 함께 보여준다. 

  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      const response = await api.post('/user/login', { email, password })

      if (response.status === 200) {
        setUser(response.data.user)
        sessionStorage.setItem("token", response.data.token)
        api.defaults.headers["authorization"] = "Bearer " + response.data.token
        setError("")  // 기존 에러값이 있었다면 초기화 
        navigate('/')
         
      }
      throw new Error(response.message)


    } catch (error) {
      setError(error.message)

    }
  }

  // 이메일주소, 패스워드 일치하면 TodoPage로 넘어간다
  // 일치하지 않으면 로그인창 상단에 에러메시지 보여준다.
  // 로그인 성공할 경우 유저정보를 state에 저장한다.
  
  if (user){
    return <Navigate to="/" />
  }


  return (
    <div className="display-center">
      {error && <div className="red-error"> {error} </div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
