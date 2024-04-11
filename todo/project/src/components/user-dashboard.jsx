import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function UserDashBoard(){

    const [cookies, setCookie, removeCookie] = useCookies('userid');
    const [appointments, setAppointments] = useState([{Appointment_Id:0, Title:'', Description:'', Date:''}])
    let navigate = useNavigate();


    useEffect(()=>{
         axios.get(`http://127.0.0.1:7000/appointments/${cookies['userid']}`)
         .then(response=>{
             setAppointments(response.data);
         })
    },[])


    function handleSignout(){
        removeCookie('userid');
        navigate('/login');
        window.location.reload();
    }

    function handleCloseClick(e){
        axios.delete(`http://127.0.0.1:7000/delete-task/${e.target.name}`)
        .then(()=>{
            alert('Appointment Delete');
        });
        window.location.reload();
    }

    return(
        <div className="bg-light p-4" style={{height:'100vh', width:'100%'}}>
            <h2>Your Appointments <button onClick={handleSignout} className='btn btn-warning'>Signout</button> </h2>
            <div className="mb-3">
                <button className="btn btn-primary bi bi-calendar-check"> Add Appointment</button>
            </div>
            {
                appointments.map(appointment=>
                     <div key={appointment.Appointment_Id} className="alert alert-success alert-dismissible">
                        <button  name={appointment.Appointment_Id}  className="btn btn-close" data-bs-dismiss="alert" onClick={handleCloseClick}></button>
                        <h2>{appointment.Title} </h2>
                        <p>{appointment.Description}</p>
                        <p>{appointment.Date}</p>
                        <button className="btn btn-warning bi bi-pen-fill"> Edit </button>
                     </div>
                    )
            }
        </div>
    )
}