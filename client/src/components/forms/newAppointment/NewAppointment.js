import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  StepContent,
  withStyles
} from "@material-ui/core";
import PracticeSubform from "../subforms/PracticeSubform";
import SeriesSubform from "../subforms/SeriesSubform";
import AppointmentSubform from "../subforms/AppointmentSubform";
import AuthContext, { AuthConsumer } from "../../../contexts/AuthContext";
import FormContext, { FormConsumer, FormProvider } from "../../../contexts/FormContext";
import NewAppointmentStyles from "./NewAppointment.styles";
import axios from "axios";

class NewAppointment extends Component {
  state = {
    activeStep: 0,
    selectedPracticeId: "",
    type: "",
    date: ""
  };

  setPractice = id => {
    this.setState({
      selectedPracticeId: id
    });
    console.log("selected id: ", this.state.selectedPracticeId)
  };

  setAppointment = (type, date) => {
    this.setState({
      type,
      date
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { type, date, selectedPracticeId } = this.state;
    axios.post("/appointments", { type, date, selectedPracticeId }).then(() => {
      this.props.history.push("/appointments");
    });
  };

  //   Stepper functions
  getSteps = () => {
    return ["Location", "Series", "Appointment details"];
  };
  getStepContent =( step, FormContext )=> {
    switch (step) {
      case 0:
        return <PracticeSubform formContext={FormContext}/>;
      case 1:
        return <SeriesSubform />;
      case 2:
        return <AppointmentSubform formContext={FormContext}/>;
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
        <FormProvider value ={{state:this.state, setPractice: this.setPractice, setAppointment: this.setAppointment}}>
        <AuthConsumer>
          {userContext => {
            return (
              <FormConsumer>
                {formContext => (
                  <>
                    <Typography variant="h1">Add an appointment</Typography>
                    <Stepper
                      activeStep={this.state.activeStep}
                      orientation="vertical"
                    >
                      {console.log(userContext, formContext)}
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
                                      variant="contained"
                                      color="primary"
                                      onClick={this.handleSubmit}
                                      className={classes.button}
                                    >
                                      "Finish"
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={this.handleNext}
                                      className={classes.button}
                                    >
                                      "Next"
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
