import React from "react";
import { BrowserRouter } from "react-router-dom";
import Enzyme, { shallow, mount } from "enzyme";

// Instantiate router context //WORKAROUND SOLUTION FOR INITIAL TESTING - IMPROVE LATER
export const routerWrapper = component => {
  return <BrowserRouter key="test">{component}</BrowserRouter>;
};

export const shallowWrapper = component => {
  let shallowCopy = shallow(component);
  return routerWrapper(shallowCopy);
};

// const router = {
//   history: new BrowserRouter().history,
//   route: {
//     location: {},
//     match: {}
//   }
// };

// const createContext = () => ({
//   context: { router },
//   childContextTypes: { router: shape({}) }
// });

// export function mountWrap(node) {
//   return mount(node, createContext());
// }

// export function shallowWrap(node) {
//   return shallow(node, createContext());
// }
