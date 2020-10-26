import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import { FormError } from "../../models";
import { FormValidationRule } from "../../models";
import "./People.css";

export interface PeopleFormData {
  name: string;
  ssn: string;
  startDate: string;
  fullTime: boolean;
}

export interface PeopleProps {
  formData: PeopleFormData;
  loading: boolean;
  onFormSubmit: () => unknown;
  onFormChange: (field: string, value: string) => unknown;
}

export const People = ({
  formData,
  loading,
  onFormSubmit,
  onFormChange,
}: PeopleProps) => {
  const formValidation: FormValidationRule[] = [
    {
      field: "ssn",
      regex: /^\d{3}-?\d{2}-?\d{4}$/,
      required: true,
    },
    {
      field: "name",
      regex: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/g,
      required: true,
    },
    {
      field: "startDate",
      required: true,
    },
  ];

  const [formErrors, setFormErrors] = useState<Record<string, FormError[]>>({});
  const today = new Date().toISOString().substr(0, 10);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formErrors) {
      return;
    }
    onFormSubmit();
  };

  const validateField = (field: string, value: string) => {
    let errors: FormError[] = [];

    const rule = formValidation.find((r) => r.field === field);
    if (!rule) {
      setFormErrors({ ...formErrors, [field]: errors });
      return;
    }

    if (!value) {
      if (rule.required) {
        errors.push({ field, message: `${field} is required` });
      }

      setFormErrors({ ...formErrors, [field]: errors });
      return;
    }

    if (rule.regex) {
      if (!rule.regex.test(value)) {
        errors.push({ field, message: `${field} is invalid` });
      }
    }

    setFormErrors({ ...formErrors, [field]: errors });
  };

  const onChange = (field: string, value: string) => {
    onFormChange(field, value);
    validateField(field, value);
  };

  return (
    <Container className="people">
      <Row>
        <Col className="pt-3 pb-3">
          People <LoadingIndicator loading={loading} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form disabled={loading} onSubmit={onSubmit}>
            <Row form>
              <Col md="6">
                <FormGroup>
                  <Label for="input-name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    id="input-name"
                    disabled={loading}
                    required
                    invalid={formErrors["name"]?.length > 0}
                  />
                  <FormFeedback>
                    {formErrors["name"]?.map((x, i) => (
                      <span key={`name-error-${i}`}>{x.message}</span>
                    ))}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="input-ssn">SSN</Label>
                  <Input
                    type="text"
                    name="ssn"
                    id="input-ssn"
                    value={formData.ssn}
                    onChange={(e) => onChange("ssn", e.target.value)}
                    disabled={loading}
                    invalid={formErrors["ssn"]?.length > 0}
                  />
                  <FormFeedback>
                    {formErrors["ssn"]?.map((x, i) => (
                      <span key={`ssn-error-${i}`}>{x.message}</span>
                    ))}
                  </FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md="6">
                <FormGroup>
                  <Label for="input-date">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="input-date"
                    value={formData.startDate}
                    onChange={(e) => onChange("startDate", e.target.value)}
                    disabled={loading}
                    invalid={formErrors["startDate"]?.length > 0}
                    min={today}
                    required
                  />
                  <FormFeedback>
                    {formErrors["startDate"]?.map((x, i) => (
                      <span key={`startDate-error-${i}`}>{x.message}</span>
                    ))}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      disabled={loading}
                      value={formData.fullTime ? 0 : 1}
                      onChange={(e) => onChange("fullTime", e.target.value)}
                    />{" "}
                    Full-Time
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-right">
                <Button
                  type="submit"
                  disabled={loading || Object.keys(formErrors).length > 0}
                >
                  Save {Object.keys(formErrors).length}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
