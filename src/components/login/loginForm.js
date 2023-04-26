import { Col, Row, Button, Form } from "react-bootstrap";
function LoginForm(props) {
  const { values, errors, touched, handleSubmit, handleChange, serverErr } =
    props;
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Control
            type="email"
            placeholder="Your name"
            name="name"
            value={values.name}
            onChange={handleChange}
            isValid={touched.name && !errors.name && !serverErr}
            isInvalid={!!errors.name && !!serverErr}
          />

          <Form.Control.Feedback type="invalid">
            {errors.name + "\n" + serverErr}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col class="d-flex justify-content-center">
          <Button
            style={{ width: "100%" }}
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default LoginForm;
