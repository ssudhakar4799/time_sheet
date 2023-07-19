import React, { useEffect, useState } from 'react'
import "./Login.css";

// useForm
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ServerAllDatas } from '../api/Api';
import { getAlldataStore, login, loginData } from '../Store/Redux/auth/action';
// import { ServerAllDatas } from '../api/Api';
// import { getAlldataStore } from '../Store/Redux/auth/action';

const Login = () => {
  const state = useSelector((state) => state);
  console.log(state);
  const { getALLdatas } = useSelector((state) => state.auth);

  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  console.log(user);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {

    //   const employeList = async () => {
    //     await axios.get("http://localhost/React-js-php/index.php")
    //          .then((res) => { setUser(res.data) })
    //          .catch((error) => console.log("error", error))
    //  }
    //  employeList();

    const employeList = async () => {
      //    await axios.get("http://localhost/React-js-php/index.php")
      //         .then((res) => { setEmployee(res.data) })
      //         .catch((error) => console.log("error", error))

      let response = await ServerAllDatas()
          .then((res) => {
              dispatch(setUser(res)
              // console.log(res)
              )
          })
          .catch((error) => error)
  }
  employeList();


    // const employeList = async () => {
    //   let response = await serverAllDatas();
    //   console.log(response);
    //   if (response && response.statusCode === 200) {
    //     dispatch(registerStoreDetails(response.data));
    //     console.log(response.data);
    //     alert(response.message);
    //     navigate('/Employee-List')
    //   }
    // }
    // employeList();
  }, [])

  const submit = (data) => {

    console.log(data);
    let findUser = user.find((e) => e.email == data.email && e.password == data.password);
    console.log(findUser);
    if (findUser !== undefined) {
      dispatch(login(true));
      dispatch(loginData(findUser));
      navigate("/TimeSheet");
    }
    else {
      alert("go to registration");
    }

  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100" >
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form onSubmit={handleSubmit(submit)}>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                        <span className="h1 fw-bold mb-0">Logo</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                      <div className="">
                        <input type="email" id="form2Example17" className="form-control form-control-lg"
                          {...register("email", {
                            required: "Email is Required",
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Please enter a valid email",
                            },
                          })} />
                        <label className="form-label" for="form2Example17">Email address</label>
                      </div>
                      <div className='text-danger'>{errors.email?.message} </div>

                      <div className=" ">
                        <input type="password" id="form2Example27" className="form-control form-control-lg"
                          {...register("password", {
                            required: "password is Required",
                            maxLength: {
                              value: 15,
                              message: "must be max 15 chars",
                            },
                            validate: (value) => {
                              return (
                                [/[a-z]/, /[A-Z]/, /[0-9]/].every((pattern) =>
                                  pattern.test(value)
                                ) ||
                                "cannot special chars, only lower, upper, number"
                              );
                            },
                          })} />
                        <label className="form-label" for="form2Example27">Password</label>
                      </div>
                      <div className='text-danger'>{errors.password?.message} </div>


                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                      </div>

                      <a className="small text-muted" href="#!">Forgot password?</a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <span 
                        style={{ color: "#393f81" }} onClick={()=>navigate("/Registration")}>Register here</span></p>
                      <a href="#!" className="small text-muted">Terms of use.</a>
                      <a href="#!" className="small text-muted">Privacy policy</a>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
