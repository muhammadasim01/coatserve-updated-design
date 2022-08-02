import React from "react";
import { Button, Accordion, Card, CardGroup, Table } from "react-bootstrap";
import { CONSTANTS, LINKS } from "../../Utils";
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from "./Style";
import Select from "react-select";
const axios = require("axios");

const General = ({
  setStartDate,
  setStartTime,
  setEndDate,
  setEndTime,
  SelectedPRDocEntry,
  HeaderData,
}) => {
  const [IF, setIF] = React.useState();
  const [Cb, setCb] = React.useState();
  const [Priority, setPriority] = React.useState();
  const [ActivityLocation, setActivityLocation] = React.useState();
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
  };

  React.useEffect(async () => {
    let cook = await localStorage.getItem("cookie");
    Locations(cook);
    Priorities(cook);
  }, []);
  const Locations = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.Activity.ActivityLocations, cookie: cookie }
      )
      .then(function (res) {
        console.log(res.data.value);
        if (res.data.value) {
          let ItemsDropDown = [];

          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name,
            });
          });
          setActivityLocation(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Priorities = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.Activity.ActivityLocations, cookie: cookie }
      )
      .then(function (res) {
        console.log(res.data.value);
        if (res.data.value) {
          let ItemsDropDown = [];

          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name,
            });
          });
          setPriority(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="main_container">
        <div className="left">
          <div className="header_items_container">
            <label>Remarks</label>
            <textarea
              class="textArea"
              id="textAreaExample"
              placeholder={
                (SelectedPRDocEntry && SelectedPRDocEntry.Details) ||
                (HeaderData && HeaderData.Details)
              }
              //onChange={e => setRemarks(e.target.value)}
            ></textarea>
          </div>
          <div className="header_items_container">
            <label>Start Time</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type="date"
              class="input"
              id="number"
              aria-describedby="number"
              onChange={(e) => setStartDate(e.target.value)}
              value={
                (SelectedPRDocEntry && SelectedPRDocEntry.StartDate) ||
                (HeaderData && HeaderData.StartDate)
              }
            ></input>
          </div>
          <div className="header_items_container">
            <label> </label>

            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type="time"
              class="input"
              id="number"
              aria-describedby="number"
              onChange={(e) => setStartTime(e.target.value)}
              value={
                (SelectedPRDocEntry && SelectedPRDocEntry.StartTime) ||
                (HeaderData && HeaderData.StartTime)
              }
            ></input>
          </div>
          <div className="header_items_container">
            <label>End Time</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type="date"
              class="input"
              id="number"
              aria-describedby="number"
              onChange={(e) => setEndDate(e.target.value)}
              value={
                (SelectedPRDocEntry && SelectedPRDocEntry.EndDueDate) ||
                (HeaderData && HeaderData.EndDueDate)
              }
            ></input>
          </div>
          <div className="header_items_container">
            <label></label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type="time"
              class="input"
              id="number"
              aria-describedby="number"
              onChange={(e) => setEndTime(e.target.value)}
              value={
                (SelectedPRDocEntry && SelectedPRDocEntry.EndTime) ||
                (HeaderData && HeaderData.EndTime)
              }
            ></input>
          </div>
          <div className="header_items_container">
            <label>Duration</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type="text"
              class="input"
              id="Name"
              aria-describedby="Name"
              placeholder={
                (SelectedPRDocEntry && SelectedPRDocEntry.Duration) ||
                (HeaderData && HeaderData.Duration)
              }
            ></input>
          </div>
        </div>
        <div className="right">
          <div className="header_items_container">
            <label>Recurrence</label>
            <Select
              // value={ContactPersonDropdown.filter(

              //placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.Action  || HeaderData && HeaderData.Action}
              //options={ContactPersonDropdown} // Options to display in the dropdown
              // onSelect={GroupNo} // Function will trigger on select event
              // onRemove={GroupNo} Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>

          <div className="header_items_container">
            <label>Priority</label>
            <Select
              // value={ContactPersonDropdown.filter(
              options={Priority}
              placeholder={
                (SelectedPRDocEntry && SelectedPRDocEntry.Priority) ||
                (HeaderData && HeaderData.Priority)
              }
              //options={ContactPersonDropdown} // Options to display in the dropdown
              // onSelect={GroupNo} // Function will trigger on select event
              // onRemove={GroupNo} Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>

          <div className="header_items_container">
            <label>Meeting Location</label>
            <Select
              // value={ContactPersonDropdown.filter(
              options={ActivityLocation}
              placeholder={
                (SelectedPRDocEntry && SelectedPRDocEntry.Location) ||
                (HeaderData && HeaderData.Location)
              }
              //options={ContactPersonDropdown} // Options to display in the dropdown
              // onSelect={GroupNo} // Function will trigger on select event
              // onRemove={GroupNo} Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default General;
