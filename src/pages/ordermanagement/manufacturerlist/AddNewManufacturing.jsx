import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Basicbutton from "../../../components/button/basicbutton";
import BasicModal from "../../../components/modal/basicmodal";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { makeStyles } from "@mui/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
} from "@fortawesome/free-solid-svg-icons";

import { createManufacturing, createManufacturingResponse, getManufactureDeskList ,getManufactureDeskListResponse } from "../../../store/ordermanagement/action";
  import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-awesome-modal';
import { CREATE_DRUG_MANUFACTURE, DELETE_DRUG_MANUFACTURE } from "../../../common/constant/constants";
import toastMessage from "../../../common/toastmessage/toastmessage";

//createManufacturingResponse

const AddNewManufacturing = ({
    openAddMfgModal ,
    handleCloseAddMfgModal
}) => {

    

  const dispatch = useDispatch();
  const manufacturingCreateResponse = useSelector((state) => state.ordermanaagement?.createManufacturingResponse)

  useEffect(() => {
    if (manufacturingCreateResponse && manufacturingCreateResponse?.status === 200) {
      dispatch(getManufactureDeskList());
      dispatch(createManufacturingResponse(""));
      handleCloseAddMfgModal();
    } else if (manufacturingCreateResponse && manufacturingCreateResponse?.status === 500) {
      dispatch(createManufacturingResponse(""));
      toastMessage("ADD NEW manufacturer", "Something went wrong", "");
    }
  }, [manufacturingCreateResponse]);

  const[newMfg,setNewMfg]=useState({
    name:"",
    remark:""
  })
  const [addError , setAddError] = useState({
    name:false,
    remark:false
  })


  const handleSumbit= (e)=>{
    e.preventDefault();

    
    if(newMfg.name===""){
      setAddError( { ...addError ,name:true})
      return
    }
    if(newMfg.remark===""){
      setAddError( { ...addError ,remark:true})
      return
    }
    setNewMfg({
      name:"",
      remark:""
    })
    setAddError({
      name:false,
      remark:false
    })
    
    dispatch(createManufacturing(newMfg))
  }
  const handleChangeNew=(event,property)=>{
    event.preventDefault()
     setNewMfg( { ...newMfg ,[property]:event.target.value})
     setAddError( { ...addError ,[property]:false})
  }

  useEffect( ()=>{
    console.log("newMfg",newMfg)
  } ,[newMfg])

  //delete  
  const handleClose=()=>{
    setNewMfg({
      name:"",
      remark:""
    })
    setAddError({
      name:false,
      remark:false
    })

    handleCloseAddMfgModal()
  }
  

  return (

   <>
               {/* <Modal visible={openAddMfgModal} width="600" height="400" effect="fadeInUp" onClickAway={handleCloseAddMfgModal}> */}
               <Modal visible={openAddMfgModal} width="500" height="300" effect="fadeInLeft" >
                <div className="row">
                    <div className="col-md-12">
                         <div className="row  mt-2 mb-4">
                               <div className="col-md-8  offset-3 ">
                                  <h4 className="text-primary">Add New Manufacturing</h4>
                               </div>
                               <div className="col-md-1">
                                <span 
                                   type="button"
                                   onClick={handleClose}>
                                 
                                 <FontAwesomeIcon
                                       icon={faClose}
                                     className="fa-2xl"
                                      color="red"
                                 />

                                </span>
                               </div>
                            <hr></hr>
                           </div>
                  
                    <div row offset-2>
                         <div className="col-md-10">
                           

                       <form>
                           <div className={`row offset-2 ${!addError.name ? "mb-3":"mb-2"}`}>
                              <div className="col-md-3">
                                 <label htmlFor="name"  className="col-form-label">Name :</label>
                              </div>
                                <div className="col-md-7">
                                  <input type="text" id="name" name="name" className="form-control shadow-none" value={newMfg.name} onChange={(e)=>handleChangeNew(e ,'name')} />
                              </div>
                           </div>
                              {addError.name && <div className="row offset-5 mb-1">
                                <div className="col-md-7">
                                  <label htmlFor="error" className="text-danger">name is empty</label>
                                </div>
                              </div> }
                             <div className={`row offset-2 ${!addError.remark ? "mb-3":"mb-2"}`}>
                                   <div className="col-md-3">
                                      <label htmlFor="remark"  className="col-form-label">remark :</label>
                                   </div>
                                  <div className="col-md-7">
                                     <input type="text" id="remark"   name="remark" className="form-control shadow-none" value={newMfg.remark}  onChange={(e)=>handleChangeNew(e ,'remark')}/>
                                  </div>
                              </div>
                              {addError.remark && <div className="row offset-5 mb-1">
                                <div className="col-md-7">
                                  <label htmlFor="error" className="text-danger">remark is empty</label>
                                </div>
                              </div> }

                               <div className="row offset-5">
                                <div className="col-md-3 " style={{marginRight:'20px'}}>
                                   <button  className="btn btn-primary"
                                      onClick={(e)=>handleSumbit(e)}
                                     type="button">
                                     Submit
                                   </button> 
                                </div>
                                <div className="col-md-3 ">
                                   <button 
                                     className="btn btn-secondary"
                                      onClick={handleClose}
                                     type="button">
                                     Close
                                   </button> 
                                </div>
                               </div>



                              {/* */}

                           </form>
   
                        </div>
                    </div>

                    </div>
                </div>
                </Modal>
   
   </>

  )
}

export default AddNewManufacturing