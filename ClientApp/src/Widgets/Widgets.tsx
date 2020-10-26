import React, { useState } from "react";
import { Fees } from "./Fees";
import { People, PeopleFormData } from "./People";
import { DataGrid } from "./DataGrid";
import "./Widgets.css";
import { postData } from "../helpers/fetch";

export const Widgets = () => {
  const defaultPeopleForm: PeopleFormData = {
    name: "",
    fullTime: false,
    startDate: new Date().toISOString().substr(0, 10),
    ssn: "",
  };

  const [peopleFormData, setPeopleFormData] = useState(defaultPeopleForm);
  const [peopleWidgetLoading, setPeopleWidgetLoading] = useState(false);

  const onFormChange = (field: string, value: string) => {
    setPeopleFormData({
      ...peopleFormData,
      [field]: value,
    });
  };

  const onPeopleSubmit = async () => {
    setPeopleWidgetLoading(true);

    try {
      // Request to API submission endpoint
      await postData("Employee", peopleFormData);
    } catch (e) {
      // Handle error
    } finally {
      setPeopleWidgetLoading(false);
    }
  };

  return (
    <div className="widgets">
      <People
        formData={peopleFormData}
        loading={peopleWidgetLoading}
        onFormSubmit={onPeopleSubmit}
        onFormChange={onFormChange}
      ></People>
      <Fees/>
      <DataGrid />
    </div>
  );
};
