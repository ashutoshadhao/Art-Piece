import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { clearErrors, contactDetails } from "../../actions/userAction";
const ContactForm = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const alert = useAlert();

    const { error, contacts } = useSelector((state) => state.allUsers);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(contactDetails());
    }, [dispatch, alert, error]);

    const columns = [
        {
            field: "id",
            headerName: "Contact ID",
            minWidth: 180,
            flex: 0.8
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 50,
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            type: "email",
            minWidth: 270,
            flex: 0.1,
        },

        {
            field: "phone",
            headerName: "Phone Number",
            type: "text",
            minWidth: 170,
            flex: 0.1,
        },
        {
            field: "message",
            headerName: "Message",
            type: "text",
            minWidth: 130,
            minHight: 400,
            flex: 0.5,
        }
    ];

    const rows = [];

    contacts &&
        contacts.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                phone: item.phone,
                message: item.message
            });
        });

    return (
        <Fragment>
            <MetaData title={`Contact Details - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">Contact Form</h1>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    </div>

                </div>
            </div>
        </Fragment >
    );
}

export default ContactForm