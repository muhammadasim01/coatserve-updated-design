import React from 'react'
import { CONSTANTS, LINKS } from '../../../Utils'
import { Button, CardGroup, Table,Tabs,Tab, Container,Form,Card } from 'react-bootstrap'
import NavBar from '../../../Component/Global/Navbar'
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import MaterialTable from 'material-table'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Select from 'react-select'
import { Logo, TextInput, Alert } from '../../../Component/Global'
import { useAlert } from "react-alert";
import XLSX from 'xlsx'
const axios = require('axios')
export default function TimeSheet () {
  const alert = useAlert();
  const [loading, setLoading] = React.useState(false)
  const [getTimesheettype, setgetTimesheettype] = React.useState()
  const [getUserid, setgetUserid] = React.useState()
  const [getvalues, setgetvalues] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState(false)
  const [BrancheCodeDropdown, setBrancheCodeDropdown] = React.useState()
  const [colDefs, setColDefs] = React.useState()
  const [data, setData] = React.useState()
  const [getvaluesfromarray, setgetvaluesfromarray] = React.useState([0])
  const [HeaderData, setHeaderData] = React.useState()
  const [ActivityDropdown, setActivityDropdown] = React.useState()
  const [CollectionLines, setCollectionLines] = React.useState()
  const [CollectionLinesvalue, setCollectionLinesvalue] = React.useState()
  const [CostCenterDropdown, setCostCenterDropdown] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [ProjectDropdown, setProjectDropdown] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [DateTo, setDateTo] = React.useState()
  const [TimeSheetType, setTimeSheetType] = React.useState()
  const [LocationsDropdown, setLocationsDropdown] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const [Departments, setDepartments] = React.useState()
  const [DateFrom, setDateFrom] = React.useState()
  const [DepartmentsDropdown, setDepartmentsDropdown] = React.useState()
  
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  const Home = () => {
    const alert = useAlert();
  
  }; 
  React.useEffect(async () => {
    setButtonName("Add") 
    let cook = await localStorage.getItem('cookie')
    ActiveDepartments(cook)
    TaxRuleTableData(cook)
    TableActivityType(cook)
    Branches(cook)
    ActiveCostCenter(cook)
    ActiveLocation(cook)
    ActiveProjects(cook)
   
  }, [])

  const importExcel = (e) => {
    console.log("ZZZZZZZZZ",e.target.files)
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        //parse data
        const bstr = event.target.result
        const workBook = XLSX.read(bstr, { type: "binary" })
  
        //get first sheet
        const workSheetName = workBook.SheetNames[0]
        const workSheet = workBook.Sheets[workSheetName]
        //convert to array
        const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
        console.log("fileData",fileData)
        const headers = fileData[0]
        const heads = headers.map(head => ({ title: head, field: head }))
        setColDefs(heads)
        console.log("heads",heads)
        // removing header
        fileData.splice(0, 1)
        setData(convertToJson(headers, fileData))
        console.log("data",convertToJson(headers, fileData))
      }
      reader.readAsBinaryString(file)
    }
    const convertToJson = (headers, data) => {
      const rows = []
      data.forEach(row => {
        let rowData = {}
        row.forEach((element, index) => {
          rowData[headers[index]] = element
        })
        rows.push(rowData)
  
      });
      return rows
    }
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `ProjectManagementTimeSheet(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocNumber) {
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
   
    let body={
      TimeSheetType:CollectionLines.TimeSheetType ,
      Department:Departments,
      DateFrom: DateFrom,
      DateTo:DateTo,
    }
    let DocLines = []
    CollectionLines.forEach(element => {
      DocLines.push({
        ActivityType:element.ActivityType,
        BillableTime:element.BillableTime, 
        Branch:element.Branch, 
        Break:element.Break, 
        CostCenter:element.CostCenter, 
        Date:element.Date, 
        EndTime:element.EndTime, 
        FinancialProject:element.FinancialProject, 
        GPSData:element.GPSData, 
        // Location:element.Location, 
        NonBillableTime:element.NonBillableTime, 
        ServiceCall:element.ServiceCall, 
        StartTime:element.StartTime, 
      })
    })
    body["PM_TimeSheetLineDataCollection"]= DocLines

    Patch(HeaderData.AbsEntry, body)
    console.log(HeaderData.AbsEntry, body)
  }
  const ontextItemChanged = e => {
    setTextItemChangedObject(e.target.value)
    console.log(e.target.value)
  }
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `ProjectManagementTimeSheet(${TextItemChangedObject})`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data)
        console.log(res.data)
        setCollectionLines(res.data.PM_TimeSheetLineDataCollection)
        console.log(res.data.PM_TimeSheetLineDataCollection)
        if (HeaderData != '') {
          setButtonName('Update')
        }
      })
      .catch({})
  }
  const submitTimeSheet = async () => {
    console.log(getUserid)
    console.log(getTimesheettype)
    let body={
      UserID:getUserid.UserID ,
      // UserID:704,
      // TimeSheetType:getTimesheettype ,
      Department:Departments,
      DateFrom: DateFrom,
      DateTo:DateTo,
    }
    let DocLines = []
    getvalues.forEach(element => {
      DocLines.push({
        ActivityType:element.ActivityType,
        BillableTime:element.BillableTime, 
        Branch:element.Branch, 
        Break:element.Break, 
        CostCenter:element.CostCenter, 
        Date:element.Date, 
        EndTime:element.OutTime, 
        FinancialProject:element.FinancialProject, 
        GPSData:element.GPSData, 
        Location:element.Location, 
        NonBillableTime:element.NonBillableTime, 
        ServiceCall:element.ServiceCall, 
        StartTime:element.InTime, 
    })
})
    body["PM_TimeSheetLineDataCollection"]= DocLines
    console.log(body)
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body:  JSON.stringify(body),
          api: LINKS.sap.HumanResources.TimeSheet,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocNumber) {
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
  const TaxRuleTableData = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.HumanResources.TimeSheet,
        cookie: cookie
      })
      .then(function (res) {
        setCollectionLinesvalue(res.data.value)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const tabletextchange2 = (e) => {
    let obj={}
    obj[e.target.name]=e.target.value
    console.log(obj)
    setgetvalues(obj)
  }
  const tabletextchange = (e,index) => {
    let obj=CollectionLines
    obj[index][e.target.name]=e.target.value
    console.log(obj)
    setCollectionLines(obj)
  }
  const tableDropDownchange2 = (e,name) => {
    console.log(e)
    let obj=getvalues
    obj[name]=e.value
    console.log(obj)
    setgetvalues(obj)
  }
  const tableDropDownchange = (e,index,name) => {
    console.log(e,index)
    let obj=CollectionLines
    obj[index][name]=e.value
    console.log(obj)
    setCollectionLines(obj)
  }
  const GetRequesterDetail = async (cookie, api) => {
    let response = {}
    // -------------------------    Items API GET DATA   -----------------------------------------------------------
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (res) {
        response = res
      })
      .catch(function (error) {
        console.log(error)
      })
    let res = apiProcessing(response)
    if (res) {
      let dropdown = []
      res.forEach(element => {
        if (element.UserCode) {
          dropdown.push({ value: element.InternalKey, label: element.UserCode+"  : "+element.UserName })
        } else {
          dropdown.push({
            value: element.EmployeeID,
            label:
              element.FirstName +
              '  ' +
              element.MiddleName +
              '  ' +
              element.LastName
          })
        }
      })
      await setRequesterCodeDropdown(dropdown)
      await setItemsDetails(ItemsDetails)
    }
  }
  const apiProcessing = res => {
    if (res) {
      if (res.data.value) {
        return res.data.value
      } else {
        alert(
          `Items Details Response Error : <-- ${res.data.error.message.value} -->`
        )
        return null
      }
    }
  }
  const ActiveProjects = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,
        { api: LINKS.sap.MasterData.ACtiveCostingCode, cookie: cookie }
      )
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CenterCode,
              label: element.CenterName
            })
          })
          setProjectDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const ActiveCostCenter = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ACtiveCostingCode, cookie: cookie }
      )
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CenterCode,
              label: element.CenterName
            })
          })
          setCostCenterDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const ActiveLocation = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.Activity.ActivityLocations, cookie: cookie }
      )
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name
            })
          })
          setLocationsDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const ActiveDepartments = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.Departments, cookie: cookie }
      )
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name
            })
          })
          setDepartmentsDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Branches = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveBranches,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.BPLID,
              label: element.BPLID + ' : ' + element.BPLName
            })
          })
          setBrancheCodeDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const TableActivityType = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,
        { api: LINKS.sap.Activity.ActivityTypes, cookie: cookie }
      )
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name
            })
          })
          setActivityDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const requesterDropDownfunc = async selectedOption => {
    console.log(selectedOption)
    let prBody = {}
    prBody['TimeSheetType'] = `${selectedOption.label}`
    console.log(prBody)
    setgetTimesheettype(prBody)
    let api = ''
    if (selectedOption.value === 171) {
      api = LINKS.sap.PurchaseRequest.emplyeeInfo
    } else {
      api = LINKS.sap.PurchaseRequest.users
    }
    let cook = await localStorage.getItem('cookie')
    if (cook) GetRequesterDetail(cook, api)
  }
  const RequesterCodeDropdownfunc = async (selectedList, selectedItem) => {
    console.log(selectedList)
    let prBody = {}    
    prBody['UserID'] = `${selectedList.value}`
    console.log(prBody)
    setgetUserid(prBody)
  }
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submitTimeSheet()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
  //--------------Attendance Function
//   const submitAttendance = async () => {
//     // "DateFrom": "2016-08-31",
//     // "DateTo": "2016-08-31",
//     "PM_TimeSheetLineDataCollection": [
//         {
//             // "ActivityType": "1",
//             "Date": "2016-08-31",
//             "EndTime": "18:00",
//             "StartTime": "09:00"
//         }
//     ],
//     // "UserID": "2"
//     let body={
//       UserID:CollectionLines.UserID ,
//       // UserID:704,
//       TimeSheetType:CollectionLines.TimeSheetType ,
//       Department:Departments,
//       DateFrom: DateFrom,
//       DateTo:DateTo,
//     }
//     let DocLines = []
//     CollectionLines.forEach(element => {
//       DocLines.push({
//         ActivityType:element.ActivityType,
//         BillableTime:element.BillableTime, 
//         Branch:element.Branch, 
//         Break:element.Break, 
//         CostCenter:element.CostCenter, 
//         Date:element.Date, 
//         EndTime:element.OutTime, 
//         FinancialProject:element.FinancialProject, 
//         GPSData:element.GPSData, 
//         Location:element.Location, 
//         NonBillableTime:element.NonBillableTime, 
//         ServiceCall:element.ServiceCall, 
//         StartTime:element.InTime, 
//     })
// })

//     body["PM_TimeSheetLineDataCollection"]= DocLines
   
 
//     console.log(body)

//     let cook = await localStorage.getItem('cookie')
//     if (cook) {
//       await axios
//         .post(API_TYPES.POST, {
//           body: body,
//           api: LINKS.sap.HumanResources.TimeSheet,
//           cookie: cook
//         })
//         .then(function (res) {
//           console.log(res)
//           if (res.data.DocNumber) {
//             alert.success('Operation completed successfully')
//             window.location.reload();
//           } else {
//             alert.error(JSON.stringify(res.data.error.message.value))
//           }
//         })
//         .catch(function (error) {
//           console.log(error)
//         })
//     }
//   }
 
  return (
    <>
      <NavBar />
      <h1 style={{ textAlign: 'center' }}>Time Sheet</h1>
      <Form onSubmit={handleSubmitted}>
      <CardGroup>
        <DIV3>
          <Container fluid>
            <label>Type</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder={HeaderData && HeaderData.TimeSheetType}
                options={[
                  { label: 'User', value: 12 },
                  { label: 'Employee', value: 171 }
                ]} // Options to display in the dropdown
                onChange={requesterDropDownfunc} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <label>Name</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
               placeholder={HeaderData && HeaderData.FirstName+" "+HeaderData.LastName}
               
                options={RequesterCodeDropdown} // Options to display in the dropdown
                onChange={RequesterCodeDropdownfunc}
                // onSelect={RequesterCodeDropdownfunc} // Function will trigger on select event
                // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>ID</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                 value={CollectionLines && CollectionLines.UserID}
                type='text'
                class='form-control'
                name='FirstName'
                aria-describedby='emailHelp'
                // onChange={e => ontextChanged(e)}
              />
            </div>
            {/* <label>First Name</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                placeholder={RequesterCodeDropdown && RequesterCodeDropdown.FirstName}
                type='text'
                class='form-control'
                name='FirstName'
                aria-describedby='emailHelp'
                // onChange={e => ontextChanged(e)}
              />
            </div> */}
            <label>Department</label>
            <div style={{ width: '23.5rem', height: 'auto'  }}>
              <Select
                  placeholder={HeaderData && HeaderData.Department}
                options={DepartmentsDropdown} // Options to display in the dropdown
                onChange={e => setDepartments(e.value)} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          </Container>
        </DIV3>
        <DIV4>
        {DepartmentsDropdown ?null:(
          <Card style={{border:'none'}} >
    
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
       </Card>
       )}
        </DIV4>
        <DIV3>
          <Container fluid> 
          <div style={{ width: '23.5rem',marginLeft:'3rem' }}>
              <input
                name={'SearchPRNumber'}
                type='Number'
                placeholder=''
                class='form-control'
                onChange={e => {
                 
                  ontextItemChanged(e)
                }}
              />
            <br />
            <Button
              onClick={e => {
                SearchPRNumberFilter()
              }}
            >
              Search
            </Button>
            <br />
              </div>
              <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
            <label>No</label>
           
              <input
               defaultValue={HeaderData && HeaderData.DocNumber}
                type='text'
                class='form-control'
                name='FirstName'
                readOnly='readOnly'
                aria-describedby='emailHelp'
                // onChange={e => ontextChanged(e)}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto'  ,marginLeft:'3rem'}}>
            <label>Date From</label>
           
              <input
                // placeholder={SearchNumberBody && SearchNumberBody.FirstName}
                type='date'
                class='form-control'
                name='FirstName'
                onChange={e=>setDateFrom(e.target.value)}
                aria-describedby='emailHelp'
                defaultValue={HeaderData && HeaderData.DateFrom}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
            <label>Date To</label>
           
              <input
                // placeholder={SearchNumberBody && SearchNumberBody.FirstName}
                type='date'
                class='form-control'
                name='FirstName'
                onChange={e=>setDateTo(e.target.value)}
                aria-describedby='emailHelp'
                defaultValue={HeaderData && HeaderData.DateTo}
              />
            </div>
          </Container>
        </DIV3>
      </CardGroup>
      <Tabs
          defaultActiveKey='Contents'
          transition={false}
          id='noanim-tab-example'
        >
          <Tab eventKey='Contents' title='Contents'>
          <div>
            <h5>Time Recording</h5>
            {getvaluesfromarray && (
      <Table responsive striped bordered hover>
        <TableHead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Activity Type</th>
            <th>Work Order No</th>
            <th>Financial Project</th>
            <th>Cost Center</th>
            <th>Stage</th>
            <th>Location</th>
            <th>GPS Data</th>
            <th>Branch</th>
            <th>Service Call No.</th>
            <th>Break</th>
            <th>Nonbillable Time</th>
            <th>Billable Time</th>
            <th>Status</th>
          </tr>
        </TableHead>
        <tbody>
        {getvaluesfromarray.map((item, index) => (
                <tr key={`${index}`}>
                  <td> {index + 1}</td>
            <TD>
             <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='date'
                class='form-control'
                name='Date'
                aria-describedby='Name'
                defaultValue={item.Date}
                onChange={e => {
                  tabletextchange2(e)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='InTime'
                //value={item.NonBillableTime}
                aria-describedby='Name'
                onChange={e => {
                  tabletextchange2(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              /></div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='OutTime'
               // value={item.BillableTime}
                onChange={e => {
                  tabletextchange2(e,index)
                }}
                aria-describedby='Name'
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
            <Select
               placeholder={item.ActivityType}
                options={ActivityDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange2(e,'ActivityType')
                }}
                // onChange={e => ontextItemChanged(e, 'Departments')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
            <TD> 
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                name='Workorder'
                defaultValue={item.Workorder}
                readOnly='readOnly'
                aria-describedby='Name'
                onChange={e => {
                  tabletextchange2(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
             <Select
                 placeholder={HeaderData && HeaderData.FinancialProject}
                options={ProjectDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange2(e,index,'FinancialProject')
                }}
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <Select
                 placeholder={HeaderData && HeaderData.CostCenter}
                options={CostCenterDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange2(e,index,'CostCenter')
                }}
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                name='Stage'
                aria-describedby='Name'
                defaultValue={item.Stage}
                readOnly='readOnly'
                onChange={e => {
                  tabletextchange2(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
            <Select
                 placeholder={HeaderData && HeaderData.Department}
                options={LocationsDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange2(e,index,'Location')
                }}
                displayValue='name' // Property name to display in the dropdown options
              />
               </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                name='GPSData'
                defaultValue={item.GPSData}
                onChange={e => {
                  tabletextchange2(e,index)
                }}
                aria-describedby='Name'
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
            <Select
               placeholder={item.Branch}
                options={BrancheCodeDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange2(e,index,'Branch')
                }}
                // onChange={e => ontextItemChanged(e, 'Departments')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='number'
                class='form-control'
                name='ServiceCall'
                defaultValue={item.ServiceCall}
                onChange={e => {
                  tabletextchange2(e,index)
                }}
                aria-describedby='Name'
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='Break'
                defaultValue={item.Break}
                aria-describedby='Name'
                onChange={e => {
                  tabletextchange2(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='NonBillableTime'
                defaultValue={item.NonBillableTime}
                aria-describedby='Name'
                onChange={e => {
                  tabletextchange2(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='BillableTime'
                defaultValue={item.BillableTime}
                onChange={e => {
                  tabletextchange2(e,index)
                }}
                aria-describedby='Name'
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
            <Select
              // placeholder={item.Branch}
              options={[
                { label: '0 - Absent', value: 0 },
                { label: '1 - Present', value: 1 },
                { label: '2 - Weekly Off', value: 2 },
                { label: '3 - Gazetted Holiday', value: 3 },
                { label: '4 - Paid Leave', value: 4 },
                { label: '5 - Un-Paid Leave', value: 5 },
                { label: '6 - Earned Leave', value: 6 },
                { label: '7 - Official Tour', value: 7 },
                
              ]}  // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange2(e,index,'Status')
                }}
                // onChange={e => ontextItemChanged(e, 'Departments')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
        
          </tr>
         ))}
        </tbody>
      </Table>
       )}
      {CollectionLines && (
      <Table responsive striped bordered hover>
           { Array.isArray(CollectionLines) && CollectionLines.length>0?(
        <TableHead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Activity Type</th>
            <th>Work Order No</th>
            <th>Financial Project</th>
            <th>Cost Center</th>
            <th>Stage</th>
            <th>Location</th>
            <th>GPS Data</th>
            <th>Branch</th>
            <th>Service Call No.</th>
            <th>Break</th>
            <th>Nonbillable Time</th>
            <th>Billable Time</th>
            <th>Status</th>
          </tr>
        </TableHead>
           ):null}
        <tbody>
        {CollectionLines.map((item, index) => (
                <tr key={`${index}`}>
                  <td> {index + 1}</td>
            <TD>
             <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='date'
                class='form-control'
                name='Date'
                aria-describedby='Name'
                defaultValue={item.Date}
                onChange={e => {
                  tabletextchange(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='InTime'
                //value={item.NonBillableTime}
                aria-describedby='Name'
                onChange={e => {
                  tabletextchange(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              /></div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='OutTime'
               // value={item.BillableTime}
                onChange={e => {
                  tabletextchange(e,index)
                }}
                aria-describedby='Name'
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
            <Select
               placeholder={item.ActivityType}
                options={ActivityDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange(e,index,'ActivityType')
                }}
                // onChange={e => ontextItemChanged(e, 'Departments')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
            <TD> 
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                name='Workorder'
                defaultValue={item.Workorder}
                readOnly='readOnly'
                aria-describedby='Name'
                onChange={e => {
                  tabletextchange(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
             <Select
                 placeholder={HeaderData && HeaderData.FinancialProject}
                options={ProjectDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange(e,index,'FinancialProject')
                }}
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <Select
                 placeholder={HeaderData && HeaderData.CostCenter}
                options={CostCenterDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange(e,index,'CostCenter')
                }}
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                name='Stage'
                aria-describedby='Name'
                defaultValue={item.Stage}
                readOnly='readOnly'
                onChange={e => {
                  tabletextchange(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
            <Select
                 placeholder={HeaderData && HeaderData.Department}
                options={LocationsDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange(e,index,'Location')
                }}
                displayValue='name' // Property name to display in the dropdown options
              />
               </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                name='GPSData'
                defaultValue={item.GPSData}
                onChange={e => {
                  tabletextchange(e,index)
                }}
                aria-describedby='Name'
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
            <Select
               placeholder={item.Branch}
                options={BrancheCodeDropdown} // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange(e,index,'Branch')
                }}
                // onChange={e => ontextItemChanged(e, 'Departments')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
           
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='number'
                class='form-control'
                name='ServiceCall'
                defaultValue={item.ServiceCall}
                onChange={e => {
                  tabletextchange(e,index)
                }}
                aria-describedby='Name'
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='Break'
                defaultValue={item.Break}
                aria-describedby='Name'
                onChange={e => {
                  tabletextchange(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='NonBillableTime'
                defaultValue={item.NonBillableTime}
                aria-describedby='Name'
                onChange={e => {
                  tabletextchange(e,index)
                }}
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='time'
                class='form-control'
                name='BillableTime'
                defaultValue={item.BillableTime}
                onChange={e => {
                  tabletextchange(e,index)
                }}
                aria-describedby='Name'
                // onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.TerminationDate}
              />
              </div>
            </TD>
            <TD>
            <div style={{width:'15rem'}}>
            <Select
              // placeholder={item.Branch}
              options={[
                { label: '0 - Absent', value: 0 },
                { label: '1 - Present', value: 1 },
                { label: '2 - Weekly Off', value: 2 },
                { label: '3 - Gazetted Holiday', value: 3 },
                { label: '4 - Paid Leave', value: 4 },
                { label: '5 - Un-Paid Leave', value: 5 },
                { label: '6 - Earned Leave', value: 6 },
                { label: '7 - Official Tour', value: 7 },
                
              ]}  // Options to display in the dropdown
                onChange={e => {
                  tableDropDownchange(e,index,'Status')
                }}
                // onChange={e => ontextItemChanged(e, 'Departments')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
            </TD>
        
          </tr>
         ))}
        </tbody>
      </Table>
       )}
       </div>
     </Tab>
      <Tab eventKey="Import_Data" title="Import_Data">
             <input type="file" onChange={(e)=>importExcel(e)} />
      <MaterialTable title="" data={data}
       id="table-to-xls" columns={colDefs} />
         <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="PurchaseQuotation"
            sheet="PurchaseQuotation"
            buttonText="XLS"/>
      </Tab>
        </Tabs>

      
    <div style={{marginTop:'5%'}}>
    <Button 
               style={{ marginLeft: '5%' }}
              
               onClick={() => {
                Submit_PatchFunc()
              }}
              >{ButtonName}</Button>
              <Button 
            style={{ marginLeft: '5%' }}
            onClick={() => {
                  window.location.href="/Home"
                }}
            >Cancel</Button>
            </div>
            </Form>
    </>

  )
}
