import React from "react";
import { render } from "react-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import { postStatuses } from "../Widgets"
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
  postStatus: number,
  onFormSubmit: () => unknown;
  onFormChange: (field: string, value: string) => unknown;
}

export const People = ({
  formData,
  loading,
  postStatus,
  onFormSubmit,
  onFormChange,
}: PeopleProps) => {
  const today = new Date().toISOString().substr(0, 10);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // validate form
    // call submit callback prop
    onFormSubmit();
  };

  const onChange = (field: string, value: string) => {
    onFormChange(field, value);
  };

  const renderSuccess = postStatus === postStatuses['POST_SUCCESS'];
  const renderFailure = postStatus === postStatuses['POST_FAILURE'];
  return (
    <Container className="people">
      <Row>
        <Col className="pt-3 pb-3">People <LoadingIndicator loading={loading} /></Col>
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
                  />
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
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md="6">
                <FormGroup>
                  <Label for="input-date">Start Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="input-date"
                    value={formData.startDate}
                    onChange={(e) => onChange("startDate", e.target.value)}
                    disabled={loading}
                    min={today}
                    required
                  />
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
              <Col>
                {renderSuccess && <span className="post-success">Post Succeeded!</span>}
                {renderFailure && <span className="post-failure">Post Failed!</span>}
              </Col>
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
