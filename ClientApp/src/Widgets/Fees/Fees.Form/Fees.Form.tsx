import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
} from "reactstrap";
import "./Fees.Form.css";

export interface SelectOption {
  id: string;
  desc: number;
}

export interface FeesFormData {
  name: string;
  amount: number;
  feeType?: number;
  triggerType?: number;
}

export interface FeesFormProps {
  formData: FeesFormData;
  loading: boolean;
  onFormSubmit: () => unknown;
  onFormChange: (field: string, value: string) => unknown;
  typeOptions: SelectOption[];
  triggerOptions: SelectOption[];
}

export const FeesForm = ({
  loading,
  formData,
  onFormSubmit,
  onFormChange,
  typeOptions,
  triggerOptions,
}: FeesFormProps) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit();
  };

  const onChange = (field: string, value: string) => {
    onFormChange(field, value);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form disabled={loading} onSubmit={onSubmit}>
            <Row form>
              <Col md="6">
                <FormGroup>
                  <Label for="input-fee-name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    id="input-fee-name"
                    disabled={loading}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="input-amount">Amount</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input
                      type="text"
                      name="amount"
                      id="input-amount"
                      value={formData.amount}
                      onChange={(e) => onChange("amount", e.target.value)}
                      disabled={loading}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md="6">
                <FormGroup>
                  <Label for="input-type">Type</Label>
                  <Input
                    type="select"
                    name="feeType"
                    id="input-type"
                    value={formData.feeType}
                    onChange={(e) => onChange("feeType", e.target.value)}
                    disabled={loading}
                  >
                    <option>Select</option>
                    {typeOptions.map((t, i) => (
                      <option key={`type-option-${i}`} value={t.id}>
                        {t.desc}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="input-trigger">Trigger</Label>
                  <Input
                    type="select"
                    name="triggerType"
                    id="input-trigger"
                    value={formData.triggerType}
                    onChange={(e) => onChange("triggerType", e.target.value)}
                    disabled={loading}
                  >
                    <option>Select</option>
                    {triggerOptions.map((t, i) => (
                      <option key={`trigger-option-${i}`} value={t.id}>
                        {t.desc}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-right">
                <Button type="submit" disabled={loading}>
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
