import React, { useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import '../index.css'
import './SignIn.css'

const generateRequestToken = async () => {
  const result = await Axios({
    method: "get",
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=d16f4dafe652594029c33c9a44e3462f`,
  });
  return result.data.request_token
}

function SignIn() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },

    validationSchema: Yup.object({
      username: Yup.string().required('*Required'),
      password: Yup.string().required('*Required'),
    }),

    onSubmit: values => {
      generateRequestToken().then((requestToken) => {
        Axios({
          method: "post",
          url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=d16f4dafe652594029c33c9a44e3462f`,
          data: {
            request_token: requestToken,
            username: values.username,
            password: values.password
          },
        })
        .then((response) => {
          const validateRequestToken = response.data.request_token;
          Axios({
            method: "post",
            url: `https://api.themoviedb.org/3/authentication/session/new?api_key=d16f4dafe652594029c33c9a44e3462f`,
            data: {
              request_token: validateRequestToken
            },
          })
          .then((response) => {
            const sessionID = response.data.session_id;
            localStorage.setItem("sessionID", sessionID);
            window.location.assign("/");
          })
        })
      });
    },
  });

  useEffect(() => {
    console.log(localStorage.getItem("sessionID"));
  }, []);

  return (
    <div className="signin_box">
      <Container fluid className='signin_wrapper'>
        <h2 className="signin-title">Welcome!</h2>
        <Form onSubmit={formik.handleSubmit}>
          <div class="mb-2">
            <Form.Label className="label_style" htmlFor="username">Username</Form.Label>
            <Form.Control 
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              className="form_style"
              placeholder="Enter username"
            />
            {formik.touched.username && formik.errors.username ? (
              <div style={{ color: '#e6283e'}}>{formik.errors.username}</div>
            ) : null}
          </div>
          <div class="mb-2 mt-3">
            <Form.Label className="label_style" htmlFor="password">Password</Form.Label>
            <Form.Control 
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="form_style"
              placeholder="Enter password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: '#e6283e'}}>{formik.errors.password}</div>
            ) : null}
          </div>
          <Button type="submit" variant="danger" className='btn_signin'>Sign In</Button>
        </Form>
      </Container>
    </div>
  )
}

export default SignIn