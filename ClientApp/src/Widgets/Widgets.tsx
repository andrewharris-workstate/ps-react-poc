import React, { useState } from "react";
import { People, PeopleFormData } from "./People";
import "./Widgets.css";

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

  const onPeopleSubmit = () => {
    setPeopleWidgetLoading(true);

    try {
      // Request to API submission endpoint
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
    </div>
  );
};
