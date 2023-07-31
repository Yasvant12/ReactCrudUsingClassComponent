import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Component } from "react";
import Paper from "@mui/material/Paper";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { getStudentAll, deleteStudents } from "../service/api";
import { NavLink } from "react-router-dom";

export default class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 5,
      page: 0,
      isLoading: true,
      users: [],
      error: null,
      openSnackbar: false,
      snackBarMessage: "",
      showDeleteConfirmation: false,
      deleteCandidateId: null, 
    };
  }

  async componentDidMount() {
    await this.getAllStudent();
  }
  handleDeleteConfirmation = (id) => {
    this.setState({ showDeleteConfirmation: true, deleteCandidateId: id });
  };
  handleDeleteCancel = () => {
    this.setState({ showDeleteConfirmation: false, deleteCandidateId: null });
  };

  style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


  getAllStudent = async () => {
    try {
      const response = await getStudentAll();
      console.log("data---------------", response);
      this.setState({ users: response?.data, isLoading: false });
      console.log("User list", this.state.users);
    } catch (error) {
      console.log(error);
      this.setState({
        error: "Failed to fetch data",
        isLoading: false,
        openSnackbar: true,
        snackBarMessage: "Error while fetching user details!",
      });
    }
  };

  handleDelete = async () => {
    const { deleteCandidateId } = this.state;
    this.setState({ isLoading: true, showDeleteConfirmation: false });

    try {
      await deleteStudents(deleteCandidateId);
      this.setState({
        isLoading: false,
        openSnackbar: true,
        snackbarMessage: "Data deleted successfully!",
        deleteCandidateId: null,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
        openSnackbar: true,
        snackBarMessage: "Error, please try again!",
      });
    }
  };
  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
  };

  renderSnackBar = () => {
    return (
      <>
        <Snackbar
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert
            onClose={this.handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            deleted
          </Alert>
        </Snackbar>
      </>
    );
  };
  renderDeleteConfiramationModel = () => {
    const { showDeleteConfirmation } = this.state; 
    return (
      <>
        <Modal
          open={showDeleteConfirmation} 
          onClose={this.handleDeleteCancel}
          aria-labelledby="delete-confirmation-modal-title"
          aria-describedby="delete-confirmation-modal-description"
        >
          <Box sx={{ ...this.style, width: 400,borderColor: 'primary.main',backgroundColor:'#E55451',color:'#E5E4E2'}}> 
            <h2 id="delete-confirmation-modal-title"sx={{}}>Confirm Deletion</h2>
            <p id="delete-confirmation-modal-description">
              Are you sure you want to delete this data?
            </p>
            <Button onClick={this.handleDeleteCancel} sx={{backgroundColor:'#DCDCDC',mx:1}}>No</Button>
            <Button onClick={this.handleDelete} sx={{backgroundColor:'#DCDCDC'}}>Yes</Button>
          </Box>
        </Modal>
      </>
    );
  };

  render() {
    const { users, isLoading } = this.state;
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
            {this.renderDeleteConfiramationModel()}
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
                  <TableCell
                    style={{
                      color: "#ffffff",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.uname}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.address}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.pincode}</TableCell>
                    <TableCell
                      align="right"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Tooltip title="View" placement="top">
                        <NavLink to={`/view/${user.id}`}>
                          <VisibilityRoundedIcon />
                        </NavLink>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <DeleteRoundedIcon
                          onClick={() =>this.handleDeleteConfirmation(user.id)}
                        />
                      </Tooltip>
                      <Tooltip title="Edit" placement="top">
                        <NavLink to={`/edit/${user.id}`}>
                          <EditRoundedIcon />
                        </NavLink>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    );
  }
}
