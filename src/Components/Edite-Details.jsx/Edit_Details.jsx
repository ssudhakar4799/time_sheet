import React, { useEffect, useState } from 'react'
import "./Edit_Details.css"
import { useForm } from "react-hook-form"
import axios from "axios"
// import { v4 as uuid } from "uuid"
import { useNavigate, useParams } from 'react-router-dom'
import { editDataServer, editSubmitDataServer } from '../api/Api'

const Edit_Details = () => {
    const navigate = useNavigate();
    const [details, editEmployee] = useState();
    const { id } = useParams();


    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        // const editing= async()=>{
        // await axios.get(`http://localhost/React-js-php/index.php/${id}`)
        // .then((res) => { editEmployee(res.data) })
        // .catch((error) => console.log("error", error))

        const editing = async () => {
            let response = await editDataServer(id)
                .then((res) => {
                    // console.log(Object.assign({}, res[0]));
                    editEmployee(res);
                })
                .catch((error) => error)
        }
        editing();

    }, [id])

    const submit = async () => {

        let Payload = {
            branch: details.branch,
            email: details.email,
            firstName: details.first_Name,
            // gender:details.gender,
            id:id,
            lastName: details.last_Name,
            phoneNumber: details.mobile,
            password: details.password,
        }
        //   let res=  await axios.put(`http://localhost/React-js-php/index.php/${id}`,Payload)
        //     .then((res) => { editEmployee(res.data);
        //          if(res.status==200){
        //         navigate("/Employee-List")
        //     } })
        //     .catch((error) => console.log("error", error))
        let response = await editSubmitDataServer(id, Payload)
            .then((res) => {
                editEmployee(res.data);
                if (res.status == 202) {
                    navigate("/Employee-List")
                }
            })
            .catch((error) => console.log("error", error))


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
                                                <input type="text" id="firstName" className="form-control form-control-lg"
                                                    value={details ? details.first_Name : ""}
                                                    onChange={(e) =>
                                                        editEmployee({
                                                            ...details,
                                                            first_Name: e.target.value,
                                                        })
                                                    }
                                                />
                                                <label className="form-label pt-5" htmlFor="firstName" >First Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="lastName" className="form-control form-control-lg"
                                                    value={details ? details.last_Name : ""}
                                                    onChange={(e) =>
                                                        editEmployee({
                                                            ...details,
                                                            last_Name: e.target.value,
                                                        })
                                                    } />
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
                                                <input type="email" id="emailAddress" className="form-control form-control-lg"
                                                    value={details ? details.email : ""}
                                                    onChange={(e) =>
                                                        editEmployee({
                                                            ...details,
                                                            email: e.target.value,
                                                        })
                                                    } />
                                                <label className="form-label" htmlFor="emailAddress">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <div className='text-danger'>{errors.password?.message} </div>
                                                <input type="password" id="password" className="form-control form-control-lg"
                                                    value={details ? details.password : ""}
                                                    onChange={(e) =>
                                                        editEmployee({
                                                            ...details,
                                                            password: e.target.value,
                                                        })
                                                    } />
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* <div className="col-md-6 mb-4 pb-2">
                                    <div className='text-danger'>{errors.bloodGroup?.message} </div>
                                    <select className="select form-control-lg" {...register("bloodGroup", {
                                        required: "Select Your BloodGROUP"
                                    })}>
                                        <option value="">Choose option</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                    <br />
                                    <label className="form-label select-label">Blood Group</label>
                                </div> */}
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
                                                <input type="number" id="phoneNumber" className="form-control form-control-lg" placeholder='Enter Your Phone-Number'
                                                    value={details ? details.mobile : ""}
                                                    onChange={(e) =>
                                                        editEmployee({
                                                            ...details,
                                                            mobile: e.target.value,
                                                        })
                                                    } />
                                                <label className="form-label" htmlhtmlFor="phoneNumber">Phone Number</label>
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <select className="select form-control-lg"
                                                value={details ? details.branch : ""}
                                                onChange={(e) =>
                                                    editEmployee({
                                                        ...details,
                                                        branch: e.target.value,
                                                    })
                                                } >
                                                <option value="" >Choose option</option>
                                                <option value="Thoraipakam">Thoraipakam</option>
                                                <option value="Pavoorchatram">Pavoorchatram</option>
                                                <option value="Tenkasi">Tenkasi</option>
                                                <option value="kurumbalaperi">kurumbalaperi</option>
                                            </select>
                                            <br />
                                            <label className="form-label select-label">Branch</label>
                                        </div>
                                        {/* <div className="col-md-6 mb-4">
                                    <h6 className="mb-2 pb-1">Gender: </h6>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                            // value="female"
                                            value={details?details.gender=="f"?"female":"":""}
                                            onChange={(e) =>
                                                editEmployee({
                                                ...details,
                                                gender: e.target.value,
                                              })
                                            } 
                                            />
                                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                            value={details?details.gender=="m"?"male":"":""}
                                            onChange={(e) =>
                                                editEmployee({
                                                ...details,
                                                gender: e.target.value,
                                              })
                                            } 
                                             />
                                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                                           value={details?details.gender=="o"?"other":"":""}
                                           onChange={(e) =>
                                               editEmployee({
                                               ...details,
                                               gender: e.target.value,
                                             })
                                           }
                                             />
                                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                                    </div>
                                </div> */}
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

export default Edit_Details
