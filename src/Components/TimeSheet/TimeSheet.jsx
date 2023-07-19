import React, { useEffect, useRef, useState } from 'react'
import "./TimeSheet.css"
import { useDispatch, useSelector } from 'react-redux';
import { logout, timeSheet } from '../Store/Redux/auth/action';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from "uuid"
import { serverParticularData, serverTimeSheetDatas } from '../api/Api';

const TimeSheet = () => {
  //---useState---//
  const [addDate, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [course, setCourses] = useState();
  const [batch, setBatch] = useState();
  const [task, setTask] = useState();
  const [timeSheet, setTimeSheet] = useState([]);
  console.log(timeSheet);
  const [serverResponse,setResponse]=useState();


  //---useRef---//
  const inputref = useRef(null);


  //---useNavigate---//
  const navigate = useNavigate();


  //---State Data Reading---//
  const state = useSelector((state) => state);
  console.log(state);



  //---Login User Name---//
  let userName = state.auth.LoginDetails.first_Name
  const fetchEmploye_id = state.auth.LoginDetails.emp_id;
  console.log(fetchEmploye_id);


  //---update in State---//
  const dispatch = useDispatch()


  //---display in timeSheets---//
//   const timeSheetData = state.auth.timesheet
//   const emoloye_particularcrt = timeSheetData.filter((e) => e.emp_id == fetchEmploye_id)


  // random id generator
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);


  let listOfBatch = ["FED04", "FED05", "FED06", "FED07", "FED08", "FED09", "FED10", "FSD11", "FCS01", "FCS02", "BED01", "BED02", "UID01", "UID02"]


  useEffect(()=>{

        let response = serverParticularData(fetchEmploye_id)
            .then((res) => {
                // console.log(res);
                setTimeSheet(res);
            })
            .catch((error) => error)

  },[fetchEmploye_id,serverResponse])


  let logouts = () => {
    dispatch(logout(false))
  }

  let avatar = () => {
    let main = document.getElementsByClassName("containers")[0]
    main.classList.toggle("active")
  }


  let submit = async() => {
    //---starting time---//
    let stT = startTime.split(":")
    let hr = parseInt(stT[0])
    let min = parseInt(stT[1])
    //---end time---//
    let stT1 = endTime.split(":")
    let hr1 = parseInt(stT1[0])
    let min1 = parseInt(stT1[1])
    //start and end hours
    let convertMilliSec = hr * 60 * 60 * 1000
    let convertMilliSec1 = hr1 * 60 * 60 * 1000
    let remain = convertMilliSec1 - convertMilliSec
    remain = remain / (1000 * 60 * 60)
    let minuteConvertMilliSec = min * 60000
    let minuteConvertMilliSec1 = min1 * 60000
    let remain1 = minuteConvertMilliSec1 - minuteConvertMilliSec
    remain1 = remain1 / 60000

    //finl data submiting---//
    let finalSubmition = {
      date: addDate,
      stTime: startTime,
      edTime: endTime,
      sltcrs: course,
      sltbts: batch,
      astask: task,
      time: startTime + "to" + endTime,
      timeDurations: remain + "hr" + remain1 + "mins",
      crtId: small_id,
      emp_id: fetchEmploye_id
    }


    const response = await serverTimeSheetDatas(finalSubmition)
    .then((res)=>{
        console.log(res);
        setResponse(res);

    })
    .catch((error)=>error)
    console.log(response);
    setDate("");
    setStartTime("");
    setEndTime("");
    setCourses("");
    setBatch("");
    setTask("");



    //---push of create timeSheet details---//
    // let empty = [];
    // if (state.auth.timesheet.length) {
    //   empty = [...state.auth.timesheet, finalSubmition]
    // }
    // else {
    //   empty = [finalSubmition]
    // }
    //---state in value pass & update---//
    // console.log(empty);
    // dispatch(timeSheet(empty))
    //---reset form fill details---//
    inputref.current.reset()
  }
  return (
    <>
      {/* <EmployeSideNav /> */}
      <div className='content-section'>
        <header className='header ps-5 pe-5'>
          <div class="d-flex header-sections">
            <div className='input-search'>
              <input type="search" placeholder="search" className='search-boxs' />
            </div>
            <div className="containers">
              <div className='avatar-size'>
                <span className='p-5'><i class="fa-solid fa-bell"></i></span>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp" class="rounded-circle"
                  height="30px" width="30px" alt="Avatar" loading="lazy" onClick={() => avatar()} />
                <span className='ms-3'>{userName}</span>
                <span></span>
              </div>
              <div class="para">
                <div>Profile</div>
                <div onClick={() => logouts()}>Logout</div>
              </div>
            </div>
          </div>
        </header>
        <div className='main-content-sec'>
          <div className='title'>
            <h1>TimeSheet</h1>
            <h3 className='text-center  
             pb-5' style={{textTransform:"uppercase"}}>{userName}</h3>
          </div>
          <form ref={inputref}>
            <div className="input-group mb-3 " >
              <input
                type="date"
                className="btn input-setup"
                placeholder=""
                aria-label="Example text with two button addons"
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="time"
                className="btn input-setup"
                placeholder=""
                aria-label="Example text with two button addons"
                onChange={(e) => setStartTime(e.target.value)}
              />
              <input
                type="time"
                className="btn input-setup"
                placeholder=""
                aria-label="Example text with two button addons"
                onChange={(e) => setEndTime(e.target.value)}
              />
              <select onChange={(e) => setCourses(e.target.value)}
                className="btn input-setup">
                <option>Select</option>
                <option>Train</option>
                <option>Review</option>
                <option>Coordinate</option>
                <option>Clarifying</option>
                <option>Materials</option>
                <option>Leave</option>
                <option>Others</option>
              </select>
              <select onChange={(e) => setBatch(e.target.value)}
                className="btn input-setup">
                <option>...</option>
                {
                  listOfBatch.map((btc) => {
                    return (
                      <option>{btc}</option>
                    )
                  })
                }
              </select>
              <input
                className="form-control input-color input-setup"
                placeholder='...Enter Your Task...'
                type="text"
                onChange={(e) => setTask(e.target.value)}
              />
              <button className="btn  btn-add" type="button" data-mdb-ripple-color="dark" onClick={() => submit()}>
                Add
              </button>
            </div>
          </form>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Batch</th>
              <th scope="col">Task Type</th>
              <th scope="col">Task</th>
              <th scope="col">Time</th>
              <th scope="col">Durations</th>
              <th scope="col">Status</th>
              <th scope="col">Verify</th>
            </tr>
          </thead>
          <tbody>
            {
              timeSheet?.map((item) => {
                return (
                  <tr className='list-items table-primary'>
                    <td>{item.date}</td>
                    <td>{item.slt_bts}</td>
                    <td>{item.slt_crs}</td>
                    <td>{item.as_task}</td>
                    <td>{item.time}</td>
                    <td>{item.time_duration}</td>
                    <td>{"complete"}</td>
                    <td><button onClick={() => navigate(`/Download/${item.astask}`)} className="btn btn-view">View</button></td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>

      </div>
    </>
  )
}

export default TimeSheet
