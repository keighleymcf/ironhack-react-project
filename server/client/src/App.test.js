import React from "react";
import ReactDOM from "react-dom";
import { render, unmountComponentAtNode } from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { routerWrapper, shallowWrapper } from "./testHelpers";
import Home from "./components/Home";

configure({ adapter: new Adapter() });

it("checks if the test works", () => {
  expect(true).toEqual(true);
});

describe("app component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(<App />, div);
    unmountComponentAtNode(div);
  });
});

// HOME
describe("home component", () => {
  // Does the Home render? //USES ROUTER WRAPPER WORKAROUND - IMPROVE LATER
  it("renders the Home component inside App without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(shallowWrapper(<Home />), div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // does the navbar render but not show up at the top (hidden/only shows on scroll down)?

  // If I scroll past point X, does the navbar slide down from the top of the screen?

  //Do the signup and login buttons render inside home?
  // it("renders the signup button inside Home without crashing", () => {
  //   const div = document.createElement("div");
  //   //ReactDOM.render(shallow(<Home />), div);
  //   ReactDOM.unmountComponentAtNode(div);
  // });

  // it("renders the login button inside Home without crashing", () => {
  //   const div = document.createElement("div");
  //   //ReactDOM.render(shallow(<Home />), div);
  //   ReactDOM.unmountComponentAtNode(div);
  // });

  // If I click on signup, am I redirected to the signup page?

  //it("redirects to the signup page when the signup button is clicked");

  // If I click on login, am I redirected to the login page?
});

// SIGN UP

// Does the form render to enter email(username) and password?

// Does the state update when the user types into the email input?

// What about password state…????

// Does the Sign up button post a new user when clicked?

// // username and password must meet conditions

// Is the user added to the db with a username and password?

// Does the button click redirect to the log in page?

// LOG IN

// Does the form render to enter email(username) and password?

// Does the state update when the user types into the email input?

// What about password state…????

// //username and password meeting conditions

// Does the log in button get a matching user from the db when clicked and update user context?

// Does the button click redirect to the dashboard?

// DASHBOARD

// Does the dashboard render?

// Does the dashboard use the correct user?

// Does a tile for all appointments, all appt series, and all practices render?

// Do the tiles route to the correct pages when clicked?

// ALL APPOINTMENTS

// Does a list of all upcoming appointments render with appt db entries for the correct user?
// Does a list of all past appointments render?

// Does it show all (or XX most recent/soonest?) appointments? //Should it show first 5 upcoming and first 5 past, with a button to load the next 5?

// Are the upcoming appointments ordered by ascending date beginning with today?

// Are the past appointments ordered by descending date beginning with most recent from today?

// - Add button

// Does a button to add a new appointment render?

// Does the button route to the add new appt form with no prefilled sections?
