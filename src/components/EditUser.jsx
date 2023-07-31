import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import signup from "../assets/signup.svg";
import {addStudents} from '../service/api'
import withRouter from './withRouter';
import { getStudent,editStudents } from "../service/api";
class EditUser extends React.Component {
     constructor(props){
        super(props);
        
        this.state = {
          id1:null,
            student:{
            uname:'',
            email:'',
            address:'',
            phone:'',
            pincode:''
            },
            id:false,
            submitted:true,
        };
     }
     handleChange = (event) => {
        this.setState({
          student: {
            ...this.state.student,
            [event.target.name]: event.target.value
          }
        });
      };

    handleSubmit=async(event)=>{
      event.preventDefault();
      if(this.state.id)
      {
          console.log("data Updated",this.state.student)
          console.log("id",this.state.id1);
          await editStudents(this.state.id1,this.state.student);
          this.setState({ submitted: true });
          this.props.navigate('/');
      }else{
        console.log('form sumbitted',this.state.student);
        await addStudents(this.state.student);
        this.setState({ submitted: true });
        this.props.navigate('/');
      }
    }
    async componentDidMount() {
      console.log('Props:', this.props.params.id);
      this.id = this.props.params.id;
      // this.id1=this.props.params.id;
  
      // Check if id is available
      if (this.id) {
        try {
          const response = await getStudent(this.id);
          console.log("Response--->>", response);
  
          // Update the student state with response data
          this.setState({
            student: {
              ...this.state.student,
              uname: response.data.uname,
              email: response.data.email,
              address: response.data.address,
              phone: response.data.phone,
              pincode: response.data.pincode,
            },
            id: true,
            id1:this.id
          });
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
    }
  
    

  render() {
       const { id } = this.state;
    return (
      <>
        <Grid container sx={{ height: "90vh" }}>
          <Grid
            item
            lg={7}
            sm={5}
            sx={{
              backgroundImage: `url(${signup})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: { xs: "none", sm: "block" },
            }}
          ></Grid>
          <Grid item lg={5} sm={7}>
            <Box component={"form"} sx={{ mt: 1, mx: 1 }} onSubmit={this.handleSubmit}>
              <TextField
                required
                margin="normal"
                fullWidth
                id="uname"
                name="uname"
                label="Enter Name"
                value={this.state.student.uname}
                onChange={this.handleChange} 
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="email"
                name="email"
                label="Enter Eamil"
                value={this.state.student.email}
                onChange={this.handleChange} 
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="Address"
                name="address"
                label="Enter address"
                variant="outlined"
                value={this.state.student.address}
                onChange={this.handleChange} 
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="phone"
                name="phone"
                label="Enter phone number"
                variant="outlined"
                value={this.state.student.phone}
                onChange={this.handleChange} 
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="pincode"
                name="pincode"
                value={this.state.student.pincode}
                label="Enter pincode"
                variant="outlined"
                onChange={this.handleChange} 
              />
              <Box textAlign="center">
                
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  style={{
                    maxWidth: "30rem",
                    maxHeight: "30rem",
                    minWidth: "34rem",
                    minHeight: "2rem",
                    border:'2px solid',
                    fontWeight: 'bold',
                    borderRadius:'5px'
                  }}
                >  {id ? 'Update' : 'Login'}
                  {/* {id? 'update':'Login'} */}
                  {/* Login */}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default withRouter(EditUser);
