import React, { useEffect, useState } from "react";
import { getData, postData } from "../../helpers/fetch";
import { FeesForm, FeesFormData, SelectOption } from "./Fees.Form";

export const postStatuses = {
  'POST_SUCCESS' : 1,
  'POST_FAILURE' : 2,
  'DIRTY': 3
}

export const Fees = () => {
  const defaultFeesForm: FeesFormData = {
    name: "",
    amount: 0.0,
    feeType: undefined,
    triggerType: undefined,
  };

  const [feesFormData, setFeesFormData] = useState(defaultFeesForm);
  const [typeOptions, setTypeOptions] = useState<SelectOption[]>([]);
  const [triggerOptions, setTriggerOptions] = useState<SelectOption[]>([]);
  const [feeTypeIsInvalid, setFeeTypeIsInvalid] = useState(true);
  const [triggerTypeIsInvalid, setTriggerTypeIsInvalid] = useState(true);

  const [feePostStatus, setFeePostStatus] = useState(postStatuses['DIRTY']);
  const [loading, setLoading] = useState(false);

  const onFormChange = (field: string, value: any) => {
    setFeesFormData({
      ...feesFormData,
      [field]: value,
    });

    if ("feeType" === field) {
      setFeeTypeIsInvalid(isSelectInvalid(+value));
    }

    if ("triggerType" === field) {
      setTriggerTypeIsInvalid(isSelectInvalid(+value));
    }
    setFeePostStatus(postStatuses['DIRTY']);
  };

  const onFormSubmit = async () => {
    setLoading(true);
    await postData("Fee", feesFormData)
      .then(response => {
        if (response.status === 200) {
          setFeePostStatus(postStatuses['POST_SUCCESS']);
        } else if (response.status === 400 && response.headers.get("content-type")?.indexOf("javascript")) {
          setFeePostStatus(postStatuses['POST_FAILURE']);
        }
      })
      .catch(() => {
        console.log("Unhandled error");
      })
      .finally(() => {
        setLoading(false);
      });
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

  useEffect(() => {
    setLoading(true);
    try {
      loadFeeTypes();
      loadTriggerTypes();
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <FeesForm
      onFormSubmit={onFormSubmit}
      onFormChange={onFormChange}
      formData={feesFormData}
      loading={loading}
      typeOptions={typeOptions}
      triggerOptions={triggerOptions}
      feeTypeIsInvalid={feeTypeIsInvalid}
      triggerTypeIsInvalid={triggerTypeIsInvalid}
      postStatus={feePostStatus}
    ></FeesForm>
  );
};

function isSelectInvalid(value?: number) {
  if (undefined === value || isNaN(value)) {
    return true;
  }

  return false;
}
