
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Table, Button, Container, Modal, Tabs, Tab, CardGroup } from "react-bootstrap";
import Styled from "styled-components";
import { CONSTANTS, LINKS } from '../../../Utils'
import { GrUpdate } from 'react-icons/gr'
import { useAlert } from "react-alert";
import { MdDelete } from 'react-icons/md'
const Banks = () => {
  const alert = useAlert();
  const axios = require('axios');
  //------------------------Styled Component-----------------------
  const StyledDiv = Styled.div
    `
width:12rem;
`;
  //------------------------------Hooks-----------------------------
  const [CountriesDropdown, setCountriesDropdown] = useState()
  const [BankSetupData, setBankSetupData] = useState()
  const [confirmation, setconfirmation] = useState(false)
  const [update, setUpdate] = React.useState(1)
  const [gettaxcode, setgettaxcode] = useState()
  //-------------UseEffect Hook--------------
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    Delete: `${LINKS.api}/DeleteApi`,
  }
  useEffect(async () => {
    let cook = await localStorage.getItem('cookie');
    today()
    CountriesFun(cook)
    BankSetupFun(cook)
  }, []);
  //+++++++++++++++++++++++++_____Functions_____+++++++++++++++++++++++++++
  //--------Input data functions-----------
  const inputvalue = (e, index) => {
    let obj = BankSetupData;
    if (e.target.type === 'checkbox') {
      obj[index][e.target.name] = e.target.checked === true ? "tYES" : "tNO"
    }
    else {
      obj[index][e.target.name] = e.target.value
    }
    setBankSetupData(obj)
  }
  const selectvalue = (e, index, name) => {
    let obj = BankSetupData;
    obj[index][name] = e.value
    obj[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setBankSetupData(obj)
  }
  //---------API get functions--------
  const BankSetupFun = async (cook) => {
    const array = [{
      country_code: ' ', bank_code: ' ', bank_name: '',
      BIC_SWIFT_code: ' ', post_office: ' ', branch: ' ', next_check_no: ' '
    }]
    await axios
      .post(API_TYPES.GET, {
        api: `Banks`,
        cookie: cook
      })
      .then(res => {
        console.log(res)
        setBankSetupData(res.data.value.concat(array))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const CountriesFun = async (cook) => {
    let array = []
    await axios
      .post(API_TYPES.GET, {
        api: `Countries?$select=Code,Name`,
        cookie: cook
      })
      .then(res => {
        console.log(res)
        res.data.value.forEach(ele => {
          array.push({
            value: ele.Code,
            label: ele.Code + " : " + ele.Name
          })
        })
        setCountriesDropdown(array)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  //---------API POST functions--------
  const Submit = async () => {
    let lastIndex = BankSetupData[BankSetupData.length - 1];
    let body = {
      "BankCode": lastIndex.BankCode,
      "BankName": lastIndex.BankName,
      "BranchforOutgoingChecks": lastIndex.BranchforOutgoingChecks,
      "NextCheckNumber": lastIndex.NextCheckNumber,
      "SwiftNo": lastIndex.SwiftNo,
      "CountryCode": lastIndex.CountryCode,
      "PostOffice": lastIndex.PostOffice,
      // "AbsoluteEntry": 8
    }
    console.log('body', body)
    const cook = await localStorage.getItem('cookie');
    await axios
      .post(API_TYPES.POST, {
        api: `Banks`,
        cookie: cook,
        body: JSON.stringify(body),
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const deletefuntion = async () => {
    setconfirmation(false)
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.Delete, {
          api: `Banks(${gettaxcode})`,
          cookie: cook
        })
        .then(function (res) {
          // setTimeout(() => {
          //   window.location.reload()
          // }, 3000);
          console.log(res)
          // if (res.error) {
          //   alert.success('Operation completed successfully')
          // } else {
          //   alert.error("res.data.error.message.value")
          // }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const test = (code) => {
    console.log(code)
    setgettaxcode(code)
    setconfirmation(true)
  }
  const handleClose = () => {
    setconfirmation(false)
  }
  const submitPatch = async (code) => {
    console.log(code, BankSetupData)
    let itemDetail = BankSetupData
    let lastIndex = {}
    itemDetail.forEach(ele => {
      if (ele.AbsoluteEntry === code) {
        lastIndex = ele
      }
    })
    console.log("lastIndex", lastIndex)
    let body = {
      "BankCode": lastIndex.BankCode,
      "BankName": lastIndex.BankName,
      "BranchforOutgoingChecks": lastIndex.BranchforOutgoingChecks,
      "NextCheckNumber": lastIndex.NextCheckNumber,
      "SwiftNo": lastIndex.SwiftNo,
      "CountryCode": lastIndex.CountryCode,
      "PostOffice": lastIndex.PostOffice,
    }
    console.log("body", body)
    Patch(code, body)
  }
  const Patch = async (id, body) => {
    console.log(JSON.stringify(body))
    console.log(body)
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: body,
          api: `Banks(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          // if (res.data.DocNum) {
          //   alert.success('Operation completed successfully')
          // } else {
          //   alert.error("res.data.error.message.value")
          // }
        })
        .catch(function (error) {
        })

    }
  }
  const TotalMonths = [{label:'January',value:31},{label:'February',value:28},{label:'March',value:31},
  {label:'April',value:30},{label:'May',value:31},{label:'June',value:30},{label:'July',value:31},{label:'August',value:31},
  {label:'September',value:30},{label:'October',value:31},{label:'November',value:30},{label:'December',value:31}]
  const TotalYears = [{label:'2017',value:2017},{label:'2018',value:2018},{label:'2019',value:2019},
  {label:'2020',value:2020},{label:'2021',value:2021},{label:'2022',value:2022},{label:'2023',value:2023},{label:'2024',value:2024},
  {label:'2025',value:2025},{label:'2026',value:2026},{label:'2027',value:2027}]

  const today = () =>{
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    console.log("(year + "-" + month + "-" + day)", month )
    // setgetpostingdate(year + "-" + month + "-" + day)
    // setgetdeliverydate(year + "-" + month + "-" + day)
  }
  //---------------------------------Reutrn--------------------------------
  return (
    <>
      <Container fluid>
        <h1 className="text-center">Exchange Rates And Indexes</h1>
        <Tabs
          defaultActiveKey='ExchangeRates'
          transition={false}
          id='noanim-tab-example'
        >
          <Tab eventKey='ExchangeRates' title='Exchange Rates'>
          <CardGroup  style={{ width:'20rem', float:'right' }}>
            <div style={{ width:'10rem' }}>
              <Select
              placeholder='Select'
              options={TotalMonths}/>
            </div>
            <div style={{ width:'10rem' }}>
              <Select
              placeholder='Select'
              options={TotalYears}/>
            </div>
            </CardGroup>
            <div style={{marginTop:'2rem', width: '40%' }}>
              <Table striped bordered hover responsive style={{ textAlign: 'center' }}>
                <thead>
                  <tr >
                    <th>March</th>
                    <th>$</th>
                    <th>CAN</th>
                    <th>EUR</th>
                  </tr>
                </thead>
                <tbody>
                  {BankSetupData && BankSetupData.map((item, index) =>
                    <tr>
                      <td>{index + 1}</td>
                      <td><StyledDiv><input className="form-control" value={item.SwiftNo} name='SwiftNo' onChange={(e) => inputvalue(e, index)} /></StyledDiv></td>
                      <td><StyledDiv><input type='text' className="form-control" name='BankCode' defaultValue={item.BankCode} onChange={(e) => inputvalue(e, index)} /></StyledDiv></td>

                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>

          <Tab eventKey='Indexes' title='Indexes'>
            <CardGroup  style={{ width:'10rem', float:'right' }}>
            <div style={{ width:'10rem' }}>
              <Select
              placeholder="select"/>
            </div>
            </CardGroup>
            <div style={{marginTop:'2rem', width: '40%' }}>
              <Table striped bordered hover responsive style={{ textAlign: 'center' }}>
                <thead>
                  <tr >
                    <th>2022</th>
                    <th>CP</th>
                  </tr>
                </thead>
                <tbody>
                  {BankSetupData && BankSetupData.map((item, index) =>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{index + 1}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>
        <Modal show={confirmation} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">Are You Sure You Want To Delete This Tax-Group ?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant='secondary' onClick={deletefuntion}>Yes</Button>
            <Button variant='primary' onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>

        <Button style={{ margin: '2rem' }} onClick={Submit}>Add</Button>
        <Button variant='secondary' >Cancel</Button>
      </Container>
    </>
  )
}
export default Banks;
