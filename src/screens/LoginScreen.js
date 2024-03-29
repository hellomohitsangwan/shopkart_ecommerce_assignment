import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Header from "../components/Header";
import FormContainer from "../components/FormContainer";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="register-wrapper justify-content-md-center">
      <h1>Log In</h1>
      {error && <Message variant="danger" children={error} />}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="form-gap"></div>
        <div className="log-wrapper">
          <>
            New User?
            <Link to={"/register"}>
              <span className="login" style={{ color: "#1d73e8" }}>
                Register
              </span>
            </Link>
          </>
          <Button className="logIn" type="submit" variant="primary">
            Log In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
