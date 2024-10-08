import { LocksInterface } from "../../interfaces/ILock";
import { ReservesInterface } from "../../interfaces/IReserve";
import { ReserveDetailsInterface } from "../../interfaces/IReserveDetails";
import { ShopsInterface } from "../../interfaces/IShop";
import { UsersInterface } from "../../interfaces/IUser";
import { PaymentInterface } from "../../interfaces/IPayment";
import { SignInInterface } from "../../interfaces/SignIn";
import { ReviewInterface } from "../../interfaces/IReview";


import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

  },

};


async function SignIn(data: SignInInterface) {

  return await axios

    .post(`${apiUrl}/signin`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}



async function GetLocks() {

  return await axios

    .get(`${apiUrl}/locks`, requestOptions)

    .then((res) => res.data)

    .catch((e) => e.response);

}


async function GetUsersById(id: string) {

  return await axios

    .get(`${apiUrl}/user/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReservesByShopId(id: number) {

  return await axios

    .get(`${apiUrl}/reserves/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReservesDetailsByReserveId(id: number) {

  return await axios

    .get(`${apiUrl}/reservesdetails/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetShopByUserId(id: string) {

  return await axios

    .get(`${apiUrl}/shopbyuser/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}



async function UpdateUsersById(id: string, data: UsersInterface) {

  return await axios

    .put(`${apiUrl}/user/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function CreateUser(data: UsersInterface) {

  return await axios

    .post(`${apiUrl}/signup`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateReserveDetails(data: ReserveDetailsInterface) {

  return await axios

    .post(`${apiUrl}/createdetails`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateReserve(data: ReservesInterface) {
  return await axios
    .post(`${apiUrl}/createreserve`, data, requestOptions)

    .then((res) => res.data)  // คืนเฉพาะ res.data ซึ่งเป็นข้อมูลที่เราสนใจ

    .catch((e) => {

      return e.response;
    });
}

async function UpdateLocksById(id: string | undefined, data: LocksInterface) {

  return await axios

    .put(`${apiUrl}/updatelock/${id}`,data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CancelLockById(id: string, data: LocksInterface) {

  return await axios

    .put(`${apiUrl}/cancelLock/${id}`,data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function cancelReserveById(id: number, data: ReservesInterface) {

  return await axios

    .put(`${apiUrl}/cancelReserve/${id}`,data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetMaps() {

  return await axios

    .get(`${apiUrl}/getmaps`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

//ของโอ๊ตต

async function CreateShop(data: ShopsInterface) {

  return await axios

    .post(`${apiUrl}/createshop`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


// jibbb

async function GetShops() {
  return await axios
  .get(`${apiUrl}/getshops`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
 }
 async function GetCategories() {
  return await axios
  .get(`${apiUrl}/categories`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
 }
 async function GetReviewsByShopId(id: string | undefined ) {
  return await axios
  .get(`${apiUrl}/shop/${id}/review`, requestOptions)
  .then((res) => res.data)
  .catch((e) => e.response);
 }
 async function GetShopById(id: string) {
  return await axios
  .get(`${apiUrl}/shop/${id}`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
 }
 async function CreateReview(data: ReviewInterface) {
  return await axios
  .post(`${apiUrl}/createreview`, data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
 } 

//payment

async function CreatePayment(data: PaymentInterface) {

  return await axios

    .post(`${apiUrl}/payments`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetPaymentByShopId(id: number) {

  return await axios

    .get(`${apiUrl}/payments/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReservesByReseveId(id: string) {

  return await axios

    .get(`${apiUrl}/reserve/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function UpdateReserveStatus(id: string, data: string) {

  return await axios

    .put(`${apiUrl}/reserve/${id}`,data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}




export {

  //users
  SignIn,
  GetUsersById,
  UpdateUsersById,
  CreateUser,


  //shop
  GetShopByUserId,


  //Reserve
  CreateReserve,
  CreateReserveDetails,
  GetReservesByShopId,
  GetReservesDetailsByReserveId,
  cancelReserveById,

  //Lock
  GetLocks,
  UpdateLocksById,
  CancelLockById,
  //ResetLocks,

  //Map
  GetMaps,

  //Payment
  CreatePayment,
  GetPaymentByShopId,
  GetReservesByReseveId,
  UpdateReserveStatus,

  //shop
  CreateShop,

  //review
  GetShops,
  GetCategories,
  GetReviewsByShopId,
  GetShopById,
  CreateReview,


};