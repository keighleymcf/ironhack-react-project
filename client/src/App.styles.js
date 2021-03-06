import { createMuiTheme } from "@material-ui/core/styles";
import "./App.scss";

// import teal from '@material-ui/core/colors/teal';

/*gradient for buttons: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);*/
/*gradient for text: (15deg, #1c78ad 0%, #72bbb2 100%)*/
// const primary = teal[200]

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#80cbc4"
    }
  },
  typography: {
    fontFamily: "Zilla Slab"
  },
  shadows: ["none"]
  // paper: {
  //   top: "0px"
  // }
});

export default mainTheme;
