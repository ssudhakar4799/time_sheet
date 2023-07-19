import React, { useState } from 'react'
import "./Registration.css"
import { useForm } from "react-hook-form"
import axios from "axios"
import { v4 as uuid } from "uuid"
import { useNavigate } from 'react-router-dom'

//
import { serverRegisterDatas } from "../api/Api"
import { useDispatch, useSelector } from 'react-redux'
import { registerStoreDetails } from '../Store/Redux/auth/action'
//
const Registration = () => {

    const state =useSelector((state)=>state);
    console.log(state);
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    const datenow=Date.now();
    console.log(typeof datenow);

    const { register, handleSubmit, formState: { errors } } = useForm();


    const Role=["Tech Trainer","Executive - Accountant","Business Development Executive","Quality Assurance Expert","Operations Executive","Creative Designer","Program Co-ordinator","Head of Operations","Software Engineer","Software Engineer Trainee","Managing Director","Director of HR Operations","Admin"]

    const submit =  async (data) => {
        console.log(data);
        let finalData = {...data,emp_id:datenow}
        console.log(finalData);
        let response = await serverRegisterDatas (finalData)
        .then((res)=>res)
        .catch((error)=>error)
        if(response.status==202){
            navigate("/Employee-List")
        }
    }

    return (
        <section className="vh-150 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5" >Registration Form</h3>
                                <form onSubmit={handleSubmit(submit)}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <div className='text-danger'>{errors.firstName?.message} </div>
                                                <input type="text" id="firstName" className="form-control form-control-lg"
                                                    {...register("firstName", {
                                                        required: "Enter Your First Name"
                                                    })} />
                                                <label className="form-label" htmlFor="firstName">First Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <div className='text-danger'>{errors.lastName?.message} </div>
                                                <input type="text" id="lastName" className="form-control form-control-lg"
                                                    {...register("lastName", {
                                                        required: "Enter Your LastName"
                                                    })} />
                                                <label className="form-label" htmlFor="lastName">Last Name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div className="form-outline datepicker w-100">
                                                <div className='text-danger'>{errors.dob?.message} </div>
                                                <input type="date" className="form-control form-control-lg" id="birthdayDate"
                                                    {...register("dob", {
                                                        required: "Enter Your DOB"
                                                    })} />
                                                <label htmlFor="birthdayDate" className="form-label"></label>
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-6 mb-4">
                                            <h6 className="mb-2 pb-1">Gender: </h6>
                                            <div className="form-check form-check-inline">
                                                <div className='text-danger'>{errors.gender?.message} </div>
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                                    value="female"
                                                    {...register("gender", {
                                                        required: "Select Your Gender"
                                                    })} />
                                                <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                                    value="male"
                                                    {...register("gender", {
                                                        required: "Select Your Gender"
                                                    })} />
                                                <label className="form-check-label" htmlFor="maleGender">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                                                    value="other"
                                                    {...register("gender", {
                                                        required: "Select Your Gender"
                                                    })} />
                                                <label className="form-check-label" htmlFor="otherGender">Other</label>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <div className='text-danger'>{errors.email?.message} </div>
                                                <input type="email" id="emailAddress" className="form-control form-control-lg"
                                                    {...register("email", {
                                                        required: "Email is Required",
                                                        pattern: {
                                                            value:
                                                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                            message: "Please enter a valid email",
                                                        },
                                                    })} />
                                                <label className="form-label" htmlFor="emailAddress">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <div className='text-danger'>{errors.password?.message} </div>
                                                <input type="password" id="password" className="form-control form-control-lg"
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
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <select className="select form-control-lg" {...register("role", {
                                                required: "Select Your Role"
                                            })}>
                                             <option >Choose Your Role</option>
                                                {
                                                    Role.map((list)=>{
                                                        return(
                                                            <option >{list}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <br />
                                            <label className="form-label select-label">Role</label>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <h6 className="mb-2 pb-1">Gender: </h6>
                                            <div className="form-check form-check-inline">
                                                <div className='text-danger'>{errors.gender?.message} </div>
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                                    value="female"
                                                    {...register("gender", {
                                                        required: "Select Your Gender"
                                                    })} />
                                                <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                                    value="male"
                                                    {...register("gender", {
                                                        required: "Select Your Gender"
                                                    })} />
                                                <label className="form-check-label" htmlFor="maleGender">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                                                    value="other"
                                                    {...register("gender", {
                                                        required: "Select Your Gender"
                                                    })} />
                                                <label className="form-check-label" htmlFor="otherGender">Other</label>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-6 mb-4">
                                            <h6 className="mb-2 pb-1">Type: </h6>
                                            <div className="form-check form-check-inline">
                                                <div className='text-danger'>{errors.type?.message} </div>
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="staf"
                                                    value="staff"
                                                    {...register("type", {
                                                        required: "Select Your type"
                                                    })} />
                                                <label className="form-check-label" htmlFor="staf">Staff</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="student"
                                                    value="student"
                                                    {...register("type", {
                                                        required: "Select Your type"
                                                    })} />
                                                <label className="form-check-label" htmlFor="student">Student</label>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="row">
                                        {/* <div className="col-md-6 mb-4 pb-2">
                                            <div className='text-danger'>{errors.branch?.message} </div>
                                            <select className="select form-control-lg"
                                                {...register("branch", {
                                                    required: "Select Your Branch"
                                                })}>
                                                <option value="" >Choose option</option>
                                                <option value="Thoraipakam">Thoraipakam</option>
                                                <option value="Pavoorchatram">Pavoorchatram</option>
                                                <option value="Tenkasi">Tenkasi</option>
                                                <option value="kurumbalaperi">kurumbalaperi</option>
                                            </select>
                                            <br />
                                            <label className="form-label select-label">Branch</label>
                                        </div> */}
                                        {/* <div className="col-md-6 mb-4">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <div className='text-danger'>{errors.age?.message} </div>
                                                    <input type="number" id="Age" className="form-control form-control-lg"
                                                        {...register("age", {
                                                            required: "Enter Your Age"
                                                        })} />
                                                    <label className="form-label" htmlFor="Age">Age</label>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className='row'>
                                        {/* <div className='col-md-6 mb-4 pb-2'>
                                            <div className="form-outline">
                                                <div className='text-danger'>{errors.address?.message} </div>
                                                <input type="text" id="address" className="form-control form-control-lg"
                                                    {...register("address", {
                                                        required: "Enter Your Adress"
                                                    })} />
                                                <label className="form-label" htmlFor="address">Address</label>
                                            </div>
                                        </div> */}
                                        <div className='col-md-6 mb-4 pb-2'>
                                            <div className='form-outline'>
                                                <div className='text-danger'>{errors.phoneNumber?.message} </div>
                                                <input type="number" id="phoneNumber" className="form-control form-control-lg" placeholder='Enter Your Phone-Number'
                                                    {...register("phoneNumber", {
                                                        required: "phoneNumber is Required",
                                                        maxLength: {
                                                            value: 10,
                                                            message: "must be max 10 chars",
                                                        },
                                                        pattern: {
                                                            value:
                                                                /^(0|[1-9]\d*)(\.\d+)?$/,
                                                            message: "Please enter a valid Phone Number",
                                                        },
                                                    })} />
                                                <label className="form-label" htmlhtmlFor="phoneNumber">Phone Number</label>
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className='text-danger'>{errors.branch?.message} </div>
                                            <select className="select form-control-lg"
                                                {...register("branch", {
                                                    required: "Select Your Branch"
                                                })}>
                                                <option value="" >Choose option</option>
                                                <option value="Thoraipakam">Thoraipakam</option>
                                                <option value="Pavoorchatram">Pavoorchatram</option>
                                                <option value="Tenkasi">Tenkasi</option>
                                                <option value="kurumbalaperi">kurumbalaperi</option>
                                            </select>
                                            <br />
                                            <label className="form-label select-label">Branch</label>
                                        </div>

                                    </div>
                                    <div className="mt-4 pt-2">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Register" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration
