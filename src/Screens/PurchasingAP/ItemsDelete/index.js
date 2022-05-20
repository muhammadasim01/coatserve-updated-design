import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
import {
  Button,
  Card,
  CardGroup,
  Table,
  Container,
  Modal,
  Tabs,
  Tab,
  Form
} from 'react-bootstrap'
import { Logistics, Accounting } from '../../../Component/PurchaseQuotation'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { Attachment } from '../../../Component/APDownPaymentRequest'
import { useAlert } from 'react-alert'
import { ArrowRight, Filter, MenuUp } from 'react-bootstrap-icons'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles'
import { Backdrop } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CONSTANTS, LINKS } from '../../../Utils'
import { Navbar } from '../../../Component/Global'
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'

import MaterialTable from 'material-table'
import XLSX from 'xlsx'

import Switch from 'react-switch'

const axios = require('axios')
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

export default function ItemsDelete () {
  const alert = useAlert()
  const classes = useStyles()
  const [show, setShow] = React.useState(false)
  const [getres, setgetres] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  
  const [modalTwo, setModalTwo] = React.useState()
  const [PrRe145, setPrRe145] = React.useState()
  const [PrRe150, setPrRe150] = React.useState()

  const handleCloseee = () => setModalTwo(false)
  const handleShowModalTwo = () => {
    setModalTwo('modal-two')
  }

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    Delete:`${LINKS.api}/DeleteApi`
  }

  React.useEffect(async () => {

    let cook = await localStorage.getItem('cookie')
      console.log("cook",cook)
      if (cook) 
      PurchaseRequest150(cook)
      PurchaseRequest145(cook)
      console.log("Hello")
    setTimeout(() => {
      window.location.reload();
    
    },9000 );
  
   
  }, [])

  const handleClose = () => {
    setShow(false)
  }
  const PurchaseRequest150 = async (cookie) => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let SAPapi = `Items?$filter=Series eq 150`
    console.log(SAPapi)

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setPrRe150(res.data.value)
        console.log(res.data.value)
        submitPQ150(res.data.value)
      })
      .catch({})
    setShow(true)
  }
   const PurchaseRequest145 = async (cookie) => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let SAPapi = `Items?$filter=Series eq 145`
    console.log(SAPapi)

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setPrRe145(res.data.value)
        console.log(res.data.value)
        submitPQ145(res.data.value)
      })
      .catch({})
    setShow(true)
  }

  const submitPQ150 = async (value) => {
    let count =0
    count=count + 1
    console.log(count)
    // {PQDocumentLines && PQDocumentLines.map((PrReItem, PrReIndex) => (
    //   PrReItem.isSelected &&
    //   PrReItem.DocumentLines.map((item, index) => (
    //     item.isSelected &&
    //       item.LineStatus === "bost_Open" &&

    console.log("PrRe150",value)
    
    let cook = await localStorage.getItem('cookie')
    
    value.forEach(element => {
      // console.log("element",element)
      let sapapi = `Items('${element.ItemCode}')`
      console.log(sapapi)
      if (cook)  {
       axios
        .post(API_TYPES.Delete, {
          api:sapapi,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          
          //   window.location.reload();
          // }
       
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    })
   
  }
  const submitPQ145 = async (value1) => {
    console.log("PrRe150",PrRe145)
    
    let cook = await localStorage.getItem('cookie')
   
    value1.forEach(element => {
      // console.log("element",element)
      let sapapi = `Items('${element.ItemCode}')`
      console.log(sapapi)
      if (cook)  {
       axios
        .post(API_TYPES.Delete, {
          api:sapapi,
          cookie: cook
        })
        .then(function (res) {
          if( Array.isArray(res) && res.length>20){
            window.location.reload();
          }
          setgetres(res)
          console.log(res)
       
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    })
  }


  

  return (
    <>
      <Navbar />
    
      <h1 style={{ textAlign: 'center' }}>Items Delete</h1>
      <Form >
        <CardGroup>
          <DIV3>
         
            <Container fluid>
              {/* Upper Side++++++++ */}
              <Button variant='primary' onClick={PurchaseRequest145}>
               Show Data S 145
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                className='Modal-big'
                size='lg'
              >
                <Modal.Header closeButton>
                  <Modal.Title id='example-modal-sizes-title-lg'>
                   Items Data
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {PrRe145 && (
                    <Table responsive>
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Item Code</th>
                          <th>Item Name</th>
                        
                        </tr>
                      </TableHead>
                      <tbody>
                        {PrRe145.map((item, index) => (
                          <tr key={`${index}`}>
                            <TD>
                              {index + 1}
                            </TD>
                            <TD>{item.ItemCode}</TD>
                            <TD>{item.ItemName}</TD>
                           
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      // handleShowModalTwo()
                      // handleClose()
                    }}
                  >
                    Choose
                  </Button>
                  <Button variant='primary' onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
              <br />  <br />  <br />  <br />  
  <Button variant='primary' onClick={PurchaseRequest150}>
               Show Data S 150
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                className='Modal-big'
                size='lg'
              >
                <Modal.Header closeButton>
                  <Modal.Title id='example-modal-sizes-title-lg'>
                   Items Data
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {PrRe150 && (
                    <Table responsive>
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Item Code</th>
                          <th>Item Name</th>
                        
                        </tr>
                      </TableHead>
                      <tbody>
                        {PrRe150.map((item, index) => (
                          <tr key={`${index}`}>
                            <TD>
                              {index + 1}
                            </TD>
                            <TD>{item.ItemCode}</TD>
                        
                            <TD>{item.ItemName}</TD>
                           
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      // handleShowModalTwo()
                      // handleClose()
                    }}
                  >
                    Choose
                  </Button>
                  <Button variant='primary' onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
              <br />



            </Container>
          </DIV3>
          <DIV4></DIV4>
          <DIV3>
            <Container>
             
            </Container>
          </DIV3>
        </CardGroup>
     
      
        {/* Table+++++++++ */}

        {/* Bottom Side+++++++++ */}
        <CardGroup>
          <DIV3>
            <Container fluid>
            
              <br />
              <br />
              <br />
              <br />
              <div>
                <Button
                  style={{ marginLeft: '5%' }}
                  type='reset'
                  onClick={() => {
                    // submitPQ150()
                  }}
                >
                 150
                </Button>

                <Button 
                 onClick={() => {
                    // submitPQ145()
                  }}
                 style={{ marginLeft: '5%' }}>145</Button>
                {/* <Button
               
              >
               {ButtonName}
              </Button> */}
              </div>
            </Container>
          </DIV3>
          <DIV4></DIV4>
          <DIV3>
         
          </DIV3>
        </CardGroup>
      </Form>
    </>
  )
}
