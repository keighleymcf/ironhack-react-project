import React, { Component } from "react";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select, Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

export default class PracticeSubform extends Component {
  static contextType = AuthContext;

  state = {
    practices: [],
    type: "",
    name: "",
    street: "",
    city: "",
    zip: "",
    phone: "",
    showDialog: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSelect = event => {
    const selectedPracticeId = event.target.value;
if (selectedPracticeId === "new") {
  this.showDialog()
} else {
      this.props.formContext.setPractice(selectedPracticeId);
}
  };

  showDialog = () => {
    this.setState({
      showDialog: true
    });
  };

  hideDialog = () => {
    this.setState({
      showDialog: false,
    });
  };

  handleNewPracticeSubmit = () => {
    const { type, name, street, city, zip, phone } = this.state;
    axios.post("/practices", {
      type,
      name,
      street,
      city,
      zip,
      phone
    }).then(()=> {
      this.hideDialog()
      this.getPractices()
    })
  };

  getPractices = () => {
    axios.get("/practices").then(response => {
      const practices = response.data;
      this.setState({ practices });
    });
  }

  componentDidMount() {
    this.getPractices()
  }

  render() {
    return (
      <div>
        <Typography>Choose from existing practices</Typography>
        <FormControl
          variant="outlined"
          // className={classes.formControl}
        >
          <InputLabel
            // ref={this.inputLabel}
            htmlFor="outlined-practices-native-simple"
          >
            Practices
          </InputLabel>
          <Select
            native
            onChange={this.handleSelect}
            //value={this.state.practices}
            //labelWidth={labelWidth}
            inputProps={{
              name: "selectedPractice",
              id: "outlined-practices-native-simple"
            }}
          > <option> </option>
           {this.state.practices.map(practice => {
              return(
                <option
                value={practice._id}>{`${practice.name}, ${practice.address.street}`}</option>
              )
            })}
            <option value="new">Add a new practice...</option>
          </Select>
        </FormControl>
        <Dialog open={this.state.showDialog}>
  <DialogContent>
  <DialogContentText><Typography>Add new practice</Typography>
          <TextField
            id="outlined-name-input"
            label="Name of practice"
            //className={classes.textField}
            name="name"
            //autoComplete="name"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <TextField
            id="outlined-type-input"
            label="Type of practice"
            //className={classes.textField}
            name="type"
            autoComplete="type"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.type}
          />
          <TextField
            id="outlined-street-input"
            label="Street"
            //className={classes.textField}
            name="street"
            //autoComplete="type"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.street}
          />
          <TextField
            id="outlined-city-input"
            label="City"
            //className={classes.textField}
            name="city"
            //autoComplete="city"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.city}
          />
          <TextField
            id="outlined-zip-input"
            label="Zip code"
            //className={classes.textField}
            name="zip"
            // autoComplete="zip"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.zip}
          />
          <TextField
            id="outlined-phone-input"
            label="Phone number"
            //className={classes.textField}
            name="phone"
            //autoComplete="phone"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.phone}
          /></DialogContentText>
          <DialogActions>
          <Button onClick={this.handleNewPracticeSubmit}>Save new practice</Button>
          </DialogActions>
          </DialogContent>
</Dialog>
        
      </div>
    );
  }
}
