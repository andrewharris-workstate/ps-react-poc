import React, { useEffect, useState } from "react";
import { getData } from "../../helpers/fetch";
import { FeesForm, FeesFormData, SelectOption } from "./Fees.Form";

export const Fees = () => {
  const defaultFeesForm: FeesFormData = {
    name: "",
    amount: 0.0,
    type: undefined,
    trigger: undefined,
  };

  const [feesFormData, setFeesFormData] = useState(defaultFeesForm);
  const [typeOptions, setTypeOptions] = useState<SelectOption[]>([]);
  const [triggerOptions, setTriggerOptions] = useState<SelectOption[]>([]);

  const [loading, setLoading] = useState(false);

  const onFormChange = (field: string, value: string) => {
    setFeesFormData({
      ...feesFormData,
      [field]: value,
    });
  };

  const onFormSubmit = () => {
    // validate form
    try {
      setLoading(true);
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const loadTriggerTypes = async () => {
    const response = await getData("TriggerTypes");
    const data = await response.json();
    const options = data as SelectOption[];
    setTypeOptions(options);
  };

  const loadFeeTypes = async () => {
    const response = await getData("FeeTypes");
    const data = await response.json();
    const options = data as SelectOption[];
    setTriggerOptions(options);
  };

  const loadTypes = async () => {
    setLoading(true);
    try {
      await loadFeeTypes();
      await loadTriggerTypes();
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadTypes();
    })();
  }, []);

  return (
    <FeesForm
      onFormSubmit={onFormSubmit}
      onFormChange={onFormChange}
      formData={feesFormData}
      loading={loading}
      typeOptions={typeOptions}
      triggerOptions={triggerOptions}
    ></FeesForm>
  );
};
