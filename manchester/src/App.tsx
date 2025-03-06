import './App.css'
import "@fontsource/montserrat"
// import Footer from './components/Footer'
import Search from './components/Search'
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  // typography: {
  //   fontFamily: "Arial, sans-serif",
  // },
});

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
      <Search />
    </ThemeProvider>
    </>
  )
}

export default App

