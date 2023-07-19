import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ServerAllDatas, serverDataDelet } from '../api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { deletDataUi, getAlldataStore, logout } from '../Store/Redux/auth/action';

const EmployeeList = () => {
    const { getALLdatas } = useSelector((state) => state.auth);
    const state=useSelector((state)=>state);
    console.log(state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [employee, setEmployee] = useState(getALLdatas);
    // console.log(employee);
    const [del, setDel] = useState([]);
    console.log(del);


    useEffect(() => {

        const employeList = async () => {
            //    await axios.get("http://localhost/React-js-php/index.php")
            //         .then((res) => { setEmployee(res.data) })
            //         .catch((error) => console.log("error", error))

            let response = await ServerAllDatas()
                .then((res) => {
                    dispatch(getAlldataStore(res)
                    )
                })
                .catch((error) => error)
        }
        employeList();




    }, [])


    let deletes = async (items) => {

        //    await axios.delete(`http://localhost/React-js-php/index.php/${items}`)
        //     .then((res) => { setDel(res.data.result) })
        //     .catch((error) => console.log("error", error))

        let response = await serverDataDelet(items)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => error)
            dispatch(deletDataUi(items))

    }

    const logouts=()=>{
        dispatch(logout(false));
    }

    return (
        <>
            <h1>list</h1>
            <button className='btn btn-primary' onClick={()=>logouts()}>LOGOUT</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">email</th>
                        <th scope="col">password</th>
                        <th scope="col">mobile</th>
                        <th scope="col">branch</th>
                        <th scope="col">gender</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        getALLdatas?.map((data, index) => {
                            return (<>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.first_Name}</td>
                                    <th scope="row">{data.last_Name}</th>
                                    <td>{data.email}</td>
                                    <th scope="row">{data.password}</th>
                                    <td>{data.mobile}</td>
                                    <th scope="row">{data.branch}</th>
                                    <td>{data.gender}</td>
                                    <td><button className='btn btn-danger' onClick={() => deletes(data.id)}>delete</button>
                                        <button className='btn btn-warning ' onClick={() => navigate(`/Edit-Details/${data.id}`)}>edit</button>
                                    </td>


                                </tr>
                            </>)
                        })
                    }

                </tbody>
            </table>

        </>
    )
}

export default EmployeeList
