import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  StepContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  withStyles
} from "@material-ui/core";
import PracticeSubform from "../subforms/PracticeSubform";
import SeriesSubform from "../subforms/SeriesSubform";
import AppointmentSubform from "../subforms/AppointmentSubform";
import ConfirmSubform from "../subforms/ConfirmSubform";
import AuthContext, { AuthConsumer } from "../../../contexts/AuthContext";
import FormContext, {
  FormConsumer,
  FormProvider
} from "../../../contexts/FormContext";
import NewAppointmentStyles from "./NewAppointment.styles";
import axios from "axios";

class NewAppointment extends Component {
  state = {
    activeStep: 0,
    selectedPracticeId: "",
    type: "",
    date: new Date(),
    showDialog: false
  };

  setPractice = id => {
    this.setState({
      selectedPracticeId: id
    });
  };

  setAppointmentDate = date => {
    this.setState({
      date
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  showDialog = appointment => {
    this.setState({
      showDialog: true
    });
  };

  hideDialog = () => {
    this.setState({
      showDialog: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { type, date, selectedPracticeId } = this.state;
    if (type && date && selectedPracticeId) {
      axios
        .post("/appointments", { type, date, selectedPracticeId })
        .then(() => {
          this.props.history.push("/appointments");
        });
    } else {
      this.showDialog();
      return (
        <Dialog open={this.state.showDialog}>
          <DialogContent>
            <DialogContentText>
              You must choose a practice and fill in all appointment details
            </DialogContentText>
            <DialogActions>
              <Button onClick={this.hideDialog}>Back to form</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      );
    }
  };

  //   Stepper functions
  getSteps = () => {
    return ["Location", "Series", "Appointment details", "Confirm and save"];
  };
  getStepContent = (step, FormContext) => {
    switch (step) {
      case 0:
        return <PracticeSubform formContext={FormContext} />;
        break;
      case 1:
        return <SeriesSubform />;
        break;
      case 2:
        return <AppointmentSubform formContext={FormContext} />;
        break;
      case 3:
        return <ConfirmSubform formContext={FormContext} />;
        break;
      default:
        return "Sorry, there was an error in the form";
    }
  };

  // get help from TAs: how to translate to class intead of hooks
  handleNext = () => {
    const newActiveStep = this.state.activeStep + 1;
    this.setState({
      activeStep: newActiveStep
    });
  };

  handleBack = () => {
    const newActiveStep = this.state.activeStep - 1;
    this.setState({
      activeStep: newActiveStep
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const steps = this.getSteps();
    const { classes } = this.props;

    return (
      <div>
        <FormProvider
          value={{
            state: this.state,
            setPractice: this.setPractice,
            handleChange: this.handleChange,
            setAppointmentDate: this.setAppointmentDate
          }}
        >
          <AuthConsumer>
            {userContext => {
              return (
                <FormConsumer>
                  {formContext => (
                    <>
                      <h1>Add an appointment</h1>
                      <Stepper
                        activeStep={this.state.activeStep}
                        orientation="vertical"
                      >
                        {steps.map((label, index) => {
                          return (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                              <StepContent key={label}>
                                {this.getStepContent(index, formContext)}
                                <div className={classes.actionsContainer}>
                                  <div>
                                    <Button
                                      disabled={this.state.activeStep === 0}
                                      onClick={this.handleBack}
                                      className={classes.button}
                                    >
                                      Back
                                    </Button>
                                    {this.state.activeStep ===
                                    steps.length - 1 ? (
                                      <Button
                                        className="btn"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleSubmit}
                                        // className={classes.button}
                                      >
                                        Save appointment
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                      >
                                        Next
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </StepContent>
                            </Step>
                          );
                        })}
                        {/* up end of map, below end of return and render */}
                      </Stepper>
                      {this.state.activeStep === steps.length && (
                        <Link to="/appointments">
                          <Button>See all my appointments</Button>
                        </Link>
                      )}
                    </>
                  )}
                </FormConsumer>
              );
            }}
          </AuthConsumer>
        </FormProvider>
      </div>
    );
  }
}

export default withStyles(NewAppointmentStyles)(NewAppointment);
