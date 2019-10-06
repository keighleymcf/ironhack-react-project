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
import AuthContext from "../../../contexts/AuthContext";
import NewAppointmentStyles from "./NewAppointment.styles";

class NewAppointment extends Component {
  static contextType = AuthContext;

  state = {
    user: this.context.user,
    activeStep: 0
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //const { username, password } = this.state;
    //   login(username, password).then(data => {
    //     if (data.message) {
    //       this.setState({
    //         message: data.message,
    //         username: "",
    //         password: ""
    //       });
    //     } else {
    //       // successfully signed up
    //       // update the state for the parent component
    //       this.context.setUser(data);
    //       this.props.history.push("/dashboard");
    //     }
    //   });
  };

  //   Stepper functions
  getSteps = () => {
    return ["Location", "Series", "Appointment details"];
  };
  getStepContent = step => {
    switch (step) {
      case 0:
        return <PracticeSubform />;
      case 1:
        return <SeriesSubform />;
      case 2:
        return <AppointmentSubform />;
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
        <Typography variant="h1">Add an appointment</Typography>
        <Stepper activeStep={this.state.activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent key={label}>
                  {this.getStepContent(index)}
                  <div className={classes.actionsContainer}>
                    <div>
                          <Button
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {this.state.activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </div>
                    </div>
                    
                </StepContent>
              </Step> 
            );
          })}
          {/* up end of map, below end of return and render */}
        </Stepper>
      </div>
    );
  }
}

export default withStyles(NewAppointmentStyles)(NewAppointment);

/*

            : (
              <div>
                <Typography className={classes.instructions}>
                  Appointment saved
                </Typography>
                <Button
                  onClick={this.handleReset}
                  className={classes.button}
                >
                  Add a new appointment
                </Button>
                <Link to="/appointments">
                  <Button color="primary" className={classes.button}>
                    View all my appointments
                  </Button>
                </Link>
              </div> 
            ) */
