import React from 'react'
import { Button, Accordion, Card, CardGroup, Table } from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../Utils'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import Select from 'react-select'

const Content = ({ ontextChanged,SearchNumberBody }) => {
  const [Interest, setInterest] = React.useState()
  const [LevelofInterest, setLevelofInterest] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`
  }

  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')
  }, [])

  return (
    <>
      <CardGroup>
        <div style={{ marginTop: '5%',marginRight:'5%' }}>
          <h4>
            <u>Roles</u>
          </h4>
          <div style={{ width: '50rem', height: 'auto' }}>
          <Table responsive striped bordered hover>
            <TableHead>
              <tr>
                <th>#</th>
                <th>Role</th>
              </tr>
            </TableHead>
            <tbody>
              <tr>
                <TD>1</TD>
                <TD>
                  <input
                    type='text'
                    class='form-control'
                    // name=''
                    // aria-describedby='emailHelp'
                    // onChange={e => ontextChanged(e)}
                    placeholder=''
                  />
                </TD>
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
        <div style={{ marginTop: '5%' }}>
          <h4>
            <u>Teams</u>
          </h4>
          <div style={{ width: '50rem', height: 'auto' }}>
          <Table responsive striped bordered hover>
            <TableHead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>Team Role</th>
              </tr>
            </TableHead>
            <tbody>
              <tr>
                <TD>1</TD>
                <TD>
                <Select
                placeholder='Select..'
                // options={WorkStateDropdown} // Options to display in the dropdown
                // onChange={e => ontextItemChanged(e, 'WorkStateCode')} // Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
                </TD>
                <TD>Member</TD>
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
      </CardGroup>
    </>
  )
}
export default Content
