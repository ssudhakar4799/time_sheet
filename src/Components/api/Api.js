import { logDOM } from "@testing-library/react";
import axios from "axios";

const BASE_URL = 'http://localhost/React-js-php';

export const serverRegisterDatas=async(Payload)=>{
    const response = await axios
    .post(`${BASE_URL}/index.php`, Payload
    , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
// console.log(response);
}

// get all datas
export const ServerAllDatas=async(Payload)=>{
    const response = await axios
    .get(`${BASE_URL}/index.php`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
    
  return response;
//   console.log(response);
}

// delete task
export const serverDataDelet=async(Payload)=>{
    const response = await axios
    .delete(`${BASE_URL}/index.php/${Payload}`
    , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
// console.log(response);
}

//particular id get details && update task
export const editDataServer=async(Payload)=>{
    const response = await axios
    .get(`${BASE_URL}/index.php/${Payload}`
    , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
// console.log(response);
}

// update task
export const editSubmitDataServer=async(id,Payload)=>{
    const response = await axios
    .put(`${BASE_URL}/index.php/${id}`,Payload
    , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
// console.log(response);
}

// TIME-SHEET POST DATAS

export const serverTimeSheetDatas=async(Payload)=>{
    const response = await axios
    .post(`${BASE_URL}/time_sheet.php`, Payload
    , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
// console.log(response);
}

//particular id get details 
export const serverParticularData=async(Payload)=>{
    const response = await axios
    .get(`${BASE_URL}/time_sheet.php/${Payload}`
    , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
}