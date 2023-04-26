import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { object, string, number, date, InferType } from "yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice";
import { useLoginMutation } from "../../redux/auth/authApiSlice";
import { Formik } from "formik";
import LoginForm from "./loginForm";
import { Col, Row, Container } from "react-bootstrap";
const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, []);

  const handleSubmit = async (e) => {
    const name = e.name;
    try {
     
      const userData = await login({ name: name }).unwrap();
      dispatch(setCredentials({ ...userData, name }));
      navigate("/member");
    } catch (err) {
      console.log(err)
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  const schema = object({
    name: string().required(),
  });

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Container
      className="justify-content-md-center bg-white"
      style={{ width: "25%" }}
    >
      <Row className=" mt-5 mx-3 py-5">
        <Col className="justify-content-md-center align-items-center">
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {(props) => <LoginForm {...props} serverErr={errMsg}></LoginForm>}
          </Formik>
        </Col>
      </Row>
    </Container>
  );

  return content;
};
export default Login;
