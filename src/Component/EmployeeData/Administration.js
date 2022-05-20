import React from 'react'
import {
  Button,
  Accordion,
  Card,
  CardGroup,
  Table,
  Modal
} from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../Utils'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import Select from 'react-select'
//import { Modal } from 'bootstrap';
const axios = require('axios')

const Administration = ({
  ontextItemChanged,
  ontextChanged,
  SearchNumberBody,
  onmodaltextChanged
}) => {
  const [StatusDropDown, setStatusDropDown] = React.useState()
  const [
    TerminationReasonDropDown,
    setTerminationReasonDropDown
  ] = React.useState()
  const [show, setShow] = React.useState(false)
  const [Showeducation, setShoweducation] = React.useState(false)
  const [showReviews, setShowReviews] = React.useState(false)
  const [showEmployee, setShowEmployee] = React.useState(false)
  const [showTimeSheet, setShowTimeSheet] = React.useState(false)
  const [ApprovedByDropdown, setApprovedByDropdown] = React.useState()

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`
  }

  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')
    Status(cook)
    TerminationReason(cook)
    ApprovedBy(cook)
  }, [])

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleshoweducation = () => setShoweducation(true)
  const educationhandleClose = () => setShoweducation(false)

  const handleShowReviews = () => setShowReviews(true)
  const ReviewshandleClose = () => setShowReviews(false)

  const handleShowEmployee = () => setShowEmployee(true)
  const EmployeehandleClose = () => setShowEmployee(false)

  const handleShowTimeSheet = () => setShowTimeSheet(true)
  const TimeSheethandleClose = () => setShowTimeSheet(false)

  const Status = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.EmployeeMasterData.EmployeeStatus, cookie: cookie }
      )
      .then(function (res) {
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.StatusId,
              label: element.Name
            })
          })
          setStatusDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const TerminationReason = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.EmployeeMasterData.TerminationReason, cookie: cookie }
      )
      .then(function (res) {
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.ReasonID,
              label: element.Name
            })
          })
          setTerminationReasonDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const ApprovedBy = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ActiveEmplyeeInfo, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          console.log(res.data.value)
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.EmployeeID,
              label: element.FirstName+" : "+element.FirstName
            })
          })
          setApprovedByDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <CardGroup>
        <DIV3 style={{ marginTop: '5%' }}>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Start Date</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='date'
              class='form-control'
              name='StartDate'
              aria-describedby='number'
              onChange={e => ontextChanged(e)}
              placeholder={SearchNumberBody && SearchNumberBody.StartDate}
            />
          </div>
          <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Status</label>
            <Select
              placeholder={SearchNumberBody && SearchNumberBody.StatusCode}
              options={StatusDropDown} // Options to display in the dropdown
              onChange={e => ontextItemChanged(e, 'StatusCode')} // Function will trigger on select event
              displayValue='name' // Property name to display in the dropdown options
            />
          </div>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Termination Date</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='date'
              class='form-control'
              name='TerminationDate'
              aria-describedby='Name'
              onChange={e => ontextChanged(e)}
              placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
            ></input>
          </div>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Termination Reason</label>
            <Select
              placeholder={SearchNumberBody && SearchNumberBody.StatusCode}
              options={TerminationReasonDropDown} // Options to display in the dropdown
              onChange={e => ontextItemChanged(e, 'TreminationReason')} // Function will trigger on select event
              displayValue='name' // Property name to display in the dropdown options
            />
          </div>
        </DIV3>
        <DIV4></DIV4>
        <DIV3 style={{ marginTop: '5%' }}>
          <div>
            <Button
              variant='primary'
              style={{ width: '22rem', height: '3rem' }}
              onClick={handleShow}
            >
              Absence
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title> Absence</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Table responsive striped bordered hover>
                  <TableHead>
                  <tr>
                      <th>#</th>
                      <th>Date From</th>
                      <th>To</th>
                      {/* <th>Absence Type</th> */}
                      <th>Reason</th>
                      <th>Approved By</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    <tr>
                      <TD>1</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].FromDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].ToDate}
                        />
                      </TD>
                      {/* <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absAbsenceType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].AbsenceType}
                        />
                      </TD> */}
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absReason'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].Reason}
                        />
                      </TD>
                      <TD>
                      <Select
                        //placeholder={SearchNumberBody && SearchNumberBody.StatusCode}
                        options={ApprovedByDropdown} // Options to display in the dropdown
                        onChange={e => ontextItemChanged(e,  'absApprovedBy')} // Function will trigger on select event
                        displayValue='name' // Property name to display in the dropdown options
                      />
                      </TD>
                    
                    </tr>
                    <tr>
                      <TD>2</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].FromDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].ToDate}
                        />
                      </TD>
                      {/* <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absAbsenceType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].AbsenceType}
                        />
                      </TD> */}
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absReason'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           //placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].Reason}
                        />
                      </TD>
                      <TD>
                      <Select
                        //placeholder={SearchNumberBody && SearchNumberBody.StatusCode}
                        options={ApprovedByDropdown} // Options to display in the dropdown
                        onChange={e => ontextItemChanged(e,'absApprovedBy')} // Function will trigger on select event
                        displayValue='name' // Property name to display in the dropdown options
                      />
                      </TD>
                    </tr>
                    <tr>
                      <TD>3</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].FromDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].ToDate}
                        />
                      </TD>
                      {/* <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absAbsenceType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].AbsenceType}
                        />
                      </TD> */}
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absReason'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           //placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].Reason}
                        />
                      </TD>
                      <TD>
                      <Select
                        //placeholder={SearchNumberBody && SearchNumberBody.StatusCode}
                        options={ApprovedByDropdown} // Options to display in the dropdown
                        onChange={e => ontextItemChanged(e, 'absApprovedBy')} // Function will trigger on select event
                        displayValue='name' // Property name to display in the dropdown options
                      />
                      </TD>
                    </tr>
                    <tr>
                      <TD>4</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].FromDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].ToDate}
                        />
                      </TD>
                      {/* <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absAbsenceType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].AbsenceType}
                        />
                      </TD> */}
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absReason'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          //  placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].Reason}
                        />
                      </TD>
                      <TD>
                      <Select
                        //placeholder={SearchNumberBody && SearchNumberBody.StatusCode}
                        options={ApprovedByDropdown} // Options to display in the dropdown
                        onChange={e => ontextItemChanged(e,'absApprovedBy')} // Function will trigger on select event
                        displayValue='name' // Property name to display in the dropdown options
                      />
                      </TD>
                    </tr>
                    <tr>
                      <TD>5</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].FromDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='absToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           //value={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].ToDate}
                        />
                      </TD>
                      {/* <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absAbsenceType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                           placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].AbsenceType}
                        />
                      </TD> */}
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='absReason'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          //  placeholder={SearchNumberBody && SearchNumberBody.EmployeeAbsenceInfoLines[0].Reason}
                        />
                      </TD>
                      <TD>
                      <Select
                        //placeholder={SearchNumberBody && SearchNumberBody.StatusCode}
                        options={ApprovedByDropdown} // Options to display in the dropdown
                        onChange={e => ontextItemChanged(e, 'absApprovedBy')} // Function will trigger on select event
                        displayValue='name' // Property name to display in the dropdown options
                      />
                      </TD>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                 Add
                </Button>
                <Button variant='primary' onClick={handleClose}>
                 Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <br />
          <br />
          <br />
          <div>
            <Button
              variant='primary'
              style={{ width: '22rem', height: '3rem' }}
              onClick={handleshoweducation}
            >
              Education
            </Button>

            <Modal show={Showeducation} onHide={educationhandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Education</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Table responsive striped bordered hover>
                  <TableHead>
                    <tr>
                    <th>#</th>
                      <th>Date From</th>
                      <th>To</th>
                      <th>Education Type</th>
                      <th>Institute</th>
                      <th>Major</th>
                      <th>Diploma</th>
                    </tr>
                  </TableHead>
                  <tbody> 
                    <tr>
                      <TD>1</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduEducationType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduInstitute'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduMajor'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduDiploma'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>2</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduEducationType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduInstitute'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduMajor'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduDiploma'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>3</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduEducationType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduInstitute'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduMajor'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduDiploma'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>4</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduEducationType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduInstitute'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduMajor'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduDiploma'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>5</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduFromDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='eduToDate'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduEducationType'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduInstitute'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduMajor'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='eduDiploma'
                          aria-describedby='Name'
                           onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={educationhandleClose}>
                Add
                </Button>
                <Button variant='primary' onClick={educationhandleClose}>
                 Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <br />
          <div>
            <Button
              variant='primary'
              style={{ width: '22rem', height: '3rem' }}
              onClick={handleShowReviews}
            >
              Reviews
            </Button>
            <Modal show={showReviews} onHide={ReviewshandleClose}>
              <Modal.Header closeButton>
                <Modal.Title> Reviews</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Table responsive striped bordered hover>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Date </th>
                      <th>Description</th>
                      <th>Manager</th>
                      <th>Grade</th>
                      <th>Remarks</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    <tr> 
                      <TD>1</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='revDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revReviewDescription'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revManager'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revGrade'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>2</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='revDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revReviewDescription'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revManager'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revGrade'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>3</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='revDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revReviewDescription'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revManager'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revGrade'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>4</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='revDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revReviewDescription'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revManager'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revGrade'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>5</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='revDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revReviewDescription'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revManager'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revGrade'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='revRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={ReviewshandleClose}>
                  Add
                </Button>
                <Button variant='primary' onClick={ReviewshandleClose}>
                 Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <br />
          <div>
            <Button
              variant='primary'
              style={{ width: '22rem', height: '3rem' }}
              onClick={handleShowEmployee}
            >
            Previous Employment
            </Button>

            <Modal show={showEmployee} onHide={EmployeehandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Previous Employment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Table responsive striped bordered hover>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Date From</th>
                      <th>To</th>
                      <th>Employer</th>
                      <th>Position</th>
                      <th>Remarks</th>
                    </tr>
                  </TableHead>
                  <tbody> 
                    <tr>
                      <TD>1</TD>
                     
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvFromDtae'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvToDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvEmployer'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvPosition'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>2</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvFromDtae'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvToDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvEmployer'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvPosition'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>3</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvFromDtae'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvToDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvEmployer'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvPosition'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>4</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvFromDtae'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvToDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvEmployer'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvPosition'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>5</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvFromDtae'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='date'
                          class='form-control'
                          name='prvToDate'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvEmployer'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvPosition'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='prvRemarks'
                          aria-describedby='Name'
                          onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={EmployeehandleClose}>
                  Add
                </Button>
                <Button variant='primary' onClick={EmployeehandleClose}>
                 Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <br />
          <div>
            <Button
              style={{ variant: 'primary', width: '22rem', height: '3rem' }}
              onClick={handleShowTimeSheet}
            >
              TimeSheet
            </Button>

            <Modal show={showTimeSheet} onHide={TimeSheethandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>TimeSheet</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Table responsive striped bordered hover>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>EmployeeID</th>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>eMail</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    <tr>
                      <TD>1</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>2</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>3</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>4</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                    <tr>
                      <TD>5</TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                      <TD>
                        <input
                          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                          type='text'
                          class='form-control'
                          name='TerminationDate'
                          aria-describedby='Name'
                          // onChange={e => ontextChanged(e)}
                          // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
                        />
                      </TD>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={TimeSheethandleClose}>
                  Add
                </Button>
                <Button variant='primary' onClick={TimeSheethandleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <br />
        </DIV3>
      </CardGroup>
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

export default Administration
