import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react"
import api from "../utils/api"
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (event) => {   
    event.preventDefault()  // 웹페이지 리로드 반복 방지

    try {

      if (password !== rePassword) {
        throw new Error("패스워드가 일치 하지 않습니다. 다시 입력해 주세요.")
      }

      if (!name || !email || !password || !rePassword) {
        throw new Error("입력란을 모두 채워주세요. 빈 칸이 있습니다.")
      }
    
      // api
      const response = await api.post('/user', { name, email, password })
      // console.log("SC response: ", response)
      if(response.status == 200){
        navigate('/login')
      } else {
        throw new Error(response.data.error)
      }

    } catch (error) {
      setError(error.message)
    }
  }


  return (
    <div className="display-center">
      {error && <div className="red-error"> {error} </div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(event) => setName(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event) => setRePassword(event.target.value)} />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
