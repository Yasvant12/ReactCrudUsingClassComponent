import {
    CircularProgress,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React from "react";
  import Paper from "@mui/material/Paper";
  import { getStudent } from "../service/api";
  
//   import { Link } from 'react-router-dom';
//   import { useNavigate, useParams } from 'react-router-dom';
import withRouter from './withRouter';
class ViewById extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rowsPerPage: 5,
        page: 0,
        isLoading: true,
        user: {},
        error: null,
        openSnackbar: false,
        snackBarMessage: "",
        id:null
      };
    }
  
    async getStudent() {
      try {
        const response = await getStudent(this.id);
        console.log("data---------------", response.data);
         this.setState({ user: response?.data, isLoading: false });
        console.log("User list", this.state.user);
      } catch (error) {
        console.log(error);
        this.setState({
          error: "Failed to fetch data",
          isLoading: false,
          openSnackbar: true,
          snackbarMessage: "Error while fetching user details!",
        });
      }
    }
    async componentDidMount() {
      console.log('Props:', this.props.params.id);
      this.id=this.props.params.id;
      await this.getStudent();
    }
    // componentDidMount() {
    //   this.getAllStudent();
    // }
    handleCloseSnackbar = () => {
      this.setState({ openSnackbar: false });
    };
    renderSnackBar = () => {
      return (
        <>
          <Snackbar
            open={this.openSnackbar}
            autoHideDuration={6000}
            onClose={this.handleCloseSnackbar}
            message={this.snackBarMessage}
          />
        </>
      );
    };
  
    render() {
      const { user, isLoading } = this.state;
      
      return (
        <>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10rem",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <TableContainer
              component={Paper}
              style={{ width: "80%", marginLeft: "8rem", marginTop: "3rem" }}
            >
              {this.renderSnackBar()}
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#808B96", color: "red" }}>
                    <TableCell
                      align="center"
                      style={{
                        color: "#ffffff",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      Id
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#ffffff",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#ffffff",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#ffffff",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      Address
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#ffffff",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#ffffff",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      Pincode
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.uname}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.address}</TableCell>
                  <TableCell align="center">{user.phone}</TableCell>
                  <TableCell align="center">{user.pincode}</TableCell>
                </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      );
    }
  }
  export default withRouter(ViewById);
  // export default ViewById;