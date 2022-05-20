import React from 'react'
import { Button, Accordion, Table,Modal, CardGroup, Container,Form ,Card} from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../../Utils'
import NavBar from '../../../Component/Global/Navbar'
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import Select from 'react-select'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function Potential () {
  const [Code, setCode] = React.useState()
  const [AllowanceType, setAllowanceType] = React.useState()
  const [Taxable, setTaxable] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState()
  const [PercentType, setPercentType] = React.useState()
  const [Process, setProcess] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [Percentage, setPercentage] = React.useState()
  const [Name, setName] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add");
  const [Amount, setAmount] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [CalculationType, setCalculationType] = React.useState()
  const alert = useAlert();
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  React.useEffect(async () => {
    setButtonName("Add")
    let cook = await localStorage.getItem('cookie')
   
    
  }, [])
  const Home = () => {
    const alert = useAlert();
  
  }; 
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body:  JSON.stringify(body),
          api: `OAED(${id})`,
          cookie: cook
        })

        .then(function (res) {
          console.log(res)
          if (res.data.DocEntry) {
            alert.success('Operation completed successfully')
            window.location.reload();
          } else {
            alert.error(JSON.stringify(res.data.error.message.value))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const submitPatch = async () => {
   
    let body = {
      U_Type: AllowanceType,
      U_PercentType: PercentType,
      U_Percent: Percentage,
      U_Amount: Amount,
      U_Taxable: Taxable,
      U_Process: Process,
      U_CalculationType:CalculationType
    }

    Patch(HeaderData.DocEntry, body)
    console.log(HeaderData.DocEntry, body)
  }
  const ontextItemChanged = e => {
    setTextItemChangedObject(e.target.value)
    console.log(e.target.value)
  }
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `OAED?$filter=Code eq '${SearchNumber}'`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data)
        console.log(res.data)
        if(HeaderData!=""){
          setButtonName("Update")
        }
        // setPQDocumentLines(res.data.value[0].DocumentLines)
        // console.log(res.data.value[0].DocumentLines)
      })
      .catch({})
  }
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submitAllowance()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
  const submitAllowance = async () => {
    let body = {
      Code: Code,
      Name: Name,
      U_Type: AllowanceType,
      U_PercentType: PercentType,
      U_Percent: Percentage,
      U_Amount: Amount,
      U_Taxable: Taxable,
      U_Process: Process,
      U_CalculationType:CalculationType
    }
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: LINKS.sap.HumanResources.Allowance,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocEntry) {
            alert.success('Operation completed successfully')
            window.location.reload();
          } else {
            alert.error(JSON.stringify(res.data.error.message.value))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const handleSubmitted = ({ res, fields,Dropdown, form }) => {
 
    form.reset() 
    Dropdown.reset()
  }
  const SearchAll_Filter_Data = async () => {
    if(SearchNumber==="0"){
      console.log("Show All Data")
      SearchPRNumberAll()
    }
    else{
      console.log("Show Filter Data")
      SearchPRNumberFilter()
    }
  }
  const SearchPRNumberAll = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `OAED` 
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data)
        console.log(res.data)
        if (ModalHeaderData != '') {
          setButtonName('Update')
        }
      })
      .catch({})
      
    setShow1(true)
  }
  const handleClose2 = () => {
    setShow1(false)
  }
  const selectPR = async item => {
    setShow1(false)
    setSelectedPRDocEntry(item)
    console.log("zzzzzzz")
    console.log(item)
    setPQDocumentLines(item.DocumentLines)
    console.log(item.DocumentLines)

  }
  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: 'center' }}>Allowance Setup</h2>
      <Form onSubmit={handleSubmitted}>
      <CardGroup>
        <DIV3>
        <Container fluid>
          <div style={{ marginRight: '5rem' }}>
            <card>
            <br/>
            <div className="Order"
              style={{ width: '23.5rem', height: 'auto' ,border:'1px solid',borderColor:'lightgray',borderRadius:'4px'}}
            >
              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon13" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
          <input
              name={'SearchPRNumber'}
              type='Number'
              placeholder='Number'
              class='form-control13'
              onChange={e => {
                setSearchNumber(e.target.value)
              }}
            />
              </div>
            <br/>
            <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Open Purchase Quotation List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ModalHeaderData && (
            <Table responsive>
              <TableHead>
                <tr>
                  <th>#</th>
                  <th>Document Status</th>
                  <th>DocNum</th>
                  <th>DocEntry</th>
                  <th>Vendor Code</th>
                  <th>Posting Date</th>
                  
                </tr>
              </TableHead>
              <tbody>
                {ModalHeaderData.map((item, index) => (
                  <tr key={`${index}`} onClick={e => {
                    console.log(item)
                    selectPR(item)
                    handleClose2()
                  }}>
                    <TD>
                      {index + 1}
                      
                    </TD>
                    <TD>{item.DocumentStatus === "bost_Open" ? (<p style={{ background: 'gray', color: 'white' }}>Open</p>) : item.DocumentStatus === "bost_Close" ? (<p style={{ background: 'red', color: 'white' }}>Closed</p>) : null}</TD>
                         
                    <TD>{item.DocNum}</TD>
                    <TD>{item.DocEntry}</TD>
                    <TD>{item.CardCode}</TD>
                    <TD>{item.BPLName}</TD>
                    <TD>{item.DocDate}</TD>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose2}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose2}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
             
              <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                <label>Allowance Type</label>
                <Select
                  // placeholder={HeaderData && HeaderData.ReqType}
                  options={[
                    { label: '0 - Percentage', value: 0 },
                    { label: '1 - Fixed', value: 1 }
                  ]} // Options to display in the dropdown
                  placeholder={HeaderData && HeaderData.U_Type}
                  onChange={e => {
                    setAllowanceType(e.value)
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                <label>Percentage</label>
                <input
                  type='Number'
                  class='form-control'
                  defaultValue={HeaderData && HeaderData.U_Percent}
                  id='Number'
                  onChange={e => {
                    setPercentage(e.target.value)
                  }}
                  aria-describedby='Number'
                ></input>
              </div>

              <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                <label>Taxable</label>
                <Select
                  // placeholder={HeaderData && HeaderData.ReqType}
                  options={[
                    { label: '0 - N', value: 0 },
                    { label: '1 - Y', value: 1 }
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    setTaxable(e.value)
                  }} // Function will trigger on select event
                  placeholder={HeaderData && HeaderData.U_Taxable}
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                <label>Calculation Type</label>
                <Select
                  options={[
                    { label: '1 - Proportionate', value: 1 },
                    { label: '2 - Lump Sum', value: 2 }
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    setCalculationType(e.value)
                  }} // Function will trigger on select event
                 // placeholder={HeaderData && HeaderData.U_Taxable}
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
              </div>
            </card>
          </div>
</Container>
</DIV3>
<DIV4>
{/* <Card style={{border:'none'}} >
    
    <div className="inside">
    <img src="/Image/2.png" style={{width:'2.5rem ' ,height:'2.5rem',marginLeft:'15.5rem', marginTop:'10.5rem'}}   class="spine"/>
    <div className="inside">
    <img src="/Image/3.png" style={{width:'2rem' ,height:'2rem',marginLeft:'14rem',marginTop:'9rem'}}  class="spin" />
    <div className="inside">
    <img src="/Image/Logo8.png" style={{width:'1rem' ,height:'1rem',marginLeft:'12.6rem',marginTop:'7.6rem'}}  class="" /> 
    </div>
    </div>
    </div>
       <img src="/Image/1.png" style={{width:'3rem',height:'3rem',marginLeft:'17rem',marginTop:'12rem'}} class="spin"/>  
       </Card> */}
</DIV4>
          <br />
          <DIV3>
<Container>
          <card>
            <div style={{ width: '23.5rem' ,marginLeft:'2rem'}}>
              <label>Name</label>
              <input
                type='text'
                class='form-control'
                id='Text'
                aria-describedby='Number'
                placeholder=''
                defaultValue={HeaderData && HeaderData.Name}
                onChange={e => {
                  setName(e.target.value)
                }}
              ></input>
            </div>
            <div style={{ width: '23.5rem'  ,marginLeft:'2rem'}}>
              <label>Percent Type</label>
              <Select
                // placeholder={HeaderData && HeaderData.ReqType}
                options={[
                  { label: '0 - Basic Salary', value: 0 },
                  { label: '1 - Gross Salary', value: 1 }
                ]} // Options to display in the dropdown
                onChange={e => {
                  setPercentType(e.value)
                }} // Function will trigger on select event
                placeholder={HeaderData && HeaderData.U_PercentType}
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>

            <div style={{ width: '23.5rem'  ,marginLeft:'2rem'}}>
              <label>Amount</label>
              <input
                type='Number'
                class='form-control'
                id='Number'
                onChange={e => {
                  setAmount(e.target.value)
                }}
                defaultValue={HeaderData && HeaderData.U_Amount}
                aria-describedby='Number'
              ></input>
            </div>

            <div style={{ width: '23.5rem' ,marginLeft:'2rem' }}>
              <label>Process</label>
              <Select
                  placeholder={HeaderData && HeaderData.U_Process}
                options={[
                  { label: '0 - Manual', value: 0 },
                  { label: '1 - Automatic', value: 1 }
                ]} // Options to display in the dropdown
                onChange={e => {
                  setProcess(e.value)
                }} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
          </card>

         
        </Container>
        </DIV3>
      </CardGroup>
      <br/>
      <br/>
      <div style={{marginLeft:'1rem'}}>
      <Button 
               style={{ marginLeft: '3%' }}
              
               onClick={() => {
                Submit_PatchFunc()
              }}
              >{ButtonName}</Button>
            <Button style={{ marginLeft: '3%' }}
             onClick={() => {
                  window.location.href="/Home"
                }}
            >Cancel</Button>

          </div>
          </Form>
    </>
  )
}
