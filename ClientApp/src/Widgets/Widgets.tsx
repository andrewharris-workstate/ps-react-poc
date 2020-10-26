import React, { useState } from "react";
import { Fees } from "./Fees";
import { People, PeopleFormData } from "./People";
import { DataGrid } from "./DataGrid";
import "./Widgets.css";
import { postData } from "../helpers/fetch";

export const postStatuses = {
  'POST_SUCCESS' : 1,
  'POST_FAILURE' : 2,
  'DIRTY': 3
}

export const Widgets = () => {
  const defaultPeopleForm: PeopleFormData = {
    name: "",
    fullTime: false,
    startDate: new Date().toISOString().substr(0, 10),
    ssn: "",
  };

  const [peopleFormData, setPeopleFormData] = useState(defaultPeopleForm);
  const [peopleWidgetLoading, setPeopleWidgetLoading] = useState(false);
  const [peoplePostStatus, setPeoplePostStatus] = useState(postStatuses['DIRTY']);

  const onFormChange = (field: string, value: string) => {
    setPeopleFormData({
      ...peopleFormData,
      [field]: value,
    });

    setPeoplePostStatus(postStatuses['DIRTY']);
  };

  const onPeopleSubmit = async () => {
    setPeopleWidgetLoading(true);
    // Request to API submission endpoint
    await postData("Employee", peopleFormData)
      .then(response => {
        if (response.status === 200) {
          setPeoplePostStatus(postStatuses['POST_SUCCESS']);
        } else if (response.status === 400 && response.headers.get("content-type")?.indexOf("javascript")) {
          setPeoplePostStatus(postStatuses['POST_FAILURE']);
        }
      })
      .catch(() => {
        console.log("Unhandled error");
      })
      .finally(() => {
        setPeopleWidgetLoading(false);
      });
  };

  return (
    <div className="widgets">
      <People
        formData={peopleFormData}
        loading={peopleWidgetLoading}
        postStatus={peoplePostStatus}
        onFormSubmit={onPeopleSubmit}
        onFormChange={onFormChange}
      ></People>
      <Fees/>
      <DataGrid />
    </div>
  );
};
