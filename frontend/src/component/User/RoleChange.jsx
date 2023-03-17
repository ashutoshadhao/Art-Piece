import React, { useEffect } from 'react'
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import "./RoleChange.css"


const RoleChange = () => {
    const { user } = useSelector((state) => state.user);

 
    return (
        <div className="role-change-me">
            <CheckCircleIcon />
            <Typography> Your Role Change to {user.role} Successfully </Typography>
        </div>
    )
}

export default RoleChange