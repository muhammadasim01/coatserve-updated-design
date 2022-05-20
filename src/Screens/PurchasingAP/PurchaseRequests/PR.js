import React from 'react';
import Select from "react-dropdown-select";
import {CARDGROUP} from './Component/Style';
import { Card, CardGroup, Table, Button } from 'react-bootstrap';
import {CONSTANT } from '../'
const SearchAble = [
    { label: 'User', value: 'User' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Whale', value: 'Whale' },

];

export default function PurchaseRequest() {

    React.useEffect(() => {
        console.log("Purchase request");
        GetItems();
      });

    const GetItems = async () => {
        // -------------------------    Items API GET DATA   -----------------------------------------------------------
       await axios.post('/GetApi', { api: SapAPiItems, cookie: that.state.cookie }).then(function (ItemsResponse) {
            ItemsResponseResult = ItemsResponse
        }).catch(function (error) {
            console.log(error);
        });
        console.log(ItemsResponseResult)
        if (ItemsResponseResult) {
            if (ItemsResponseResult.data.value) {
                let ItemsDropDown = []
                let ItemsDetails = []

                ItemsResponseResult.data.value.forEach(element => {
                    ItemsDetails[element.ItemCode] = {
                        ItemCode: element.ItemCode,
                        ItemName: element.ItemName,
                        SalesUnit: element.SalesUnit,
                        ItemPrices: element.ItemPrices,
                        Quantity: 1,
                        Serials: []
                    }
                    ItemsDropDown.push({ value: element.ItemCode, text: (element.ItemCode + " : " + element.ItemName) });
                });
                that.setState({
                    ItemsDropDownState: ItemsDropDown,
                    ItemsDetailsState: ItemsDetails,
                });
            }
            else {
                alert("Items Details Response Error " + ItemsResponseResult.data.error.message.value)
            }
        }
    }
    return (
        <>
            <div>Purchase Request</div>
            <CardGroup  >

                <CARDGROUP style={{ width: '18rem' }}>
                    <div style={{ align: 'right' }}>
                        <div style={{ marginTop: '10%' }} >
                            <p>Requester
                                    <div  >
                                    <Select
                                        options={SearchAble}
                                    />
                                </div>
                            </p>
                        </div>
                        <div >
                            <p >Department </p>
                            <div >
                                <Select
                                    options={SearchAble}
                                />
                            </div>
                        </div><br />

                        <p>Branch <div  >
                            <Select
                                options={SearchAble}
                            />
                        </div></p><br />
                        <p>Email  : <input size="sm" type="text" value="" placeholder="Email"></input></p>


                    </div>

                </CARDGROUP>
                <Card style={{ width: '20rem', }}>
                </Card>
                <Card style={{ width: '20rem' }}>
                    <div style={{
                        display: 'inline-block',
                        float: 'right'
                    }} >

                        <p style={{ marginTop: '10%' }}>No: <input style={{ float: 'Right', }} type="text" placeholder="text" /><input style={{ float: 'Right', }} type="Number" placeholder="Number" /></p>
                        <p >Status:<input style={{ float: 'Right', }} type="text" placeholder="Status" /></p>
                        <p >Posting Date:<input style={{ float: 'Right', }} type="text" placeholder="DD/MM/YYYY" /></p>
                        <p >Valid Date:<input style={{ float: 'Right', }} type="text" placeholder="DD/MM/YYYY" /></p>
                        <p >Document Date:<input style={{ float: 'Right', }} type="text" placeholder="DD/MM/YYYY" /></p>
                        <p  >Required Date:<input style={{ float: 'Right', }} type="text" placeholder="DD/MM/YYYY" /></p>
                    </div>
                </Card>
            </CardGroup>
            <Table striped bordered hover
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Bar Code</th>
                        <th>Item No.</th>
                        <th>Project Entry</th>
                        <th>Project Base Line</th>
                        <th>Project Object</th>
                        <th>Item Description</th>
                        <th>UoM Name</th>
                        <th>Required Date</th>
                        <th>Required Qty</th>
                        <th>Ordered</th>
                        <th>Open Qty</th>
                        <th>Open Qty</th>

                        <th>Whse</th>
                        <th>In Sto..</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </tbody>

            </Table>
            <CardGroup>
                <Card style={{ width: '30rem' }}>

                    <p style={{ marginTop: '10%' }}>Owner:<input style={{ float: 'Right', }} type="text" placeholder="" /></p>
                    <p style={{ marginTop: '10%' }} >Remarks:<input style={{ float: 'Right', padding: '10%' }} type="text" placeholder=" " /></p>
                    <div >
                        <Button variant="primary" style={{ marginRight: '10%' }}>Add</Button>
                        <Button variant="danger">Cancel</Button>
                    </div>
                </Card>

                <Card style={{ width: '30rem' }}>
                </Card>
                <div style={{ display: 'inline-block', float: 'right' }} >
                    <Card style={{ width: '30rem', }}>

                        <p style={{ marginTop: '10%' }}>Total Before Discount:<input style={{ float: 'Right', }} type="text" placeholder="" /></p>
                        <p  >Frieght:<input style={{ float: 'Right', }} type="text" placeholder="" /></p>

                        <p >Tax:<input style={{ float: 'Right', }} type="text" placeholder="" /></p>
                        <p  >Total Payment Due:<input style={{ float: 'Right', }} type="text" placeholder="" /></p>dd


                    </Card>
                    <Button variant="primary" style={{ marginRight: '10%' }}>Copy To</Button>
                    <Button variant="primary">Copy From</Button>
                </div>

            </CardGroup>


        </>
    );
}
