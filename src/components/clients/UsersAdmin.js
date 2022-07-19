import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { Link, useNavigate } from "react-router-dom";
import config from './../../helpers/config.json';

const UsersAdmin = () => {
    let navigate = useNavigate();
    const [rowsData, setRows] = useState(0);
    useEffect(() => {
        updateUsers();
    });

    const updateUsers = () => {
        const requestOptions = {
            method: 'GET', headers: { 'Content-Type': 'application/json'}
        };
        fetch(config.apiURL+"users/"+config.operatorId, requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            // this.setState({ usersList: result.data.map((user) => { return user; }) });
            let usersList = result.data.map((user) => { return user; });
            let rowData;
            if(usersList.length === 0){
                rowData = (<tr><td colSpan="4" className="text-center">No existen usuarios</td></tr>);
            } else {
                rowData = usersList.map(u => {
                    let button;
                    if(u.active){
                        button = <button className="btn btn-secondary" onClick={() => disable(u)}><i className="fas fa-eye-slash"></i> Deshabilitar</button>;
                    } else {
                        button = <button className="btn btn-primary" onClick={() => enable(u)}><i className="fas fa-eye"></i> Habilitar</button>;
                    }
                    
                    return (<tr>
                        <td>{u.name}</td><td className="text-right">{u.nickname}</td><td className="text-right">{u.level}</td>
                        <td className="d-flex justify-content-between">
                            {button}
                            <button className="btn btn-warning" onClick={() => edit(u)}><i className="fas fa-pencil"></i> Editar</button>
                        </td>
                    </tr>); 
                });
            }
            setRows(rowData);
        });
    }; 
    const disable = (user) => {
        if(window.confirm("¿Está seguro/a de querer deshabilitar:\n"+user.name)){
            const requestOptionsPatch = {
                method: 'PUT', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({
                    operatorId: config.operatorId,
                    name: user.name,
                    nickname: user.nickname,
                    level: user.level,
                    active: false
                })
            };
            fetch(config.apiURL+"users/"+user.id, requestOptionsPatch).then((response) => {
                return response.json();
            }).then((result) => {
                updateUsers();
                window.alert("Deshabilitación completada");
            });   
        }
    }   
    const enable = (user) => {
        if(window.confirm("¿Está seguro/a que quieres volver a habilitar:\n"+user.name)){
            const requestOptionsPatch = {
                method: 'PUT', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({
                    operatorId: config.operatorId,
                    name: user.name,
                    nickname: user.nickname,
                    level: user.level,
                    active: true
                })
            };
            fetch(config.apiURL+"users/"+user.id, requestOptionsPatch).then((response) => {
                return response.json();
            }).then((result) => {
                updateUsers();
                window.alert("Habilitación completada")
            });   
        }
    }
    const edit = (user) => {
        let usersData = JSON.stringify(user);
        sessionStorage.setItem("user", usersData);
        navigate("/users/edit");
    }
    return (
            <div>
            <Topbar />
            <Sidebar />
                <div className="content-wrapper">
                    <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Panel de Usuarios</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Cloud Sales</a></li>
                                    <li className="breadcrumb-item active">Usuarios</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    </section>
                    <section className="content">
                        <div className="card">
                            <div className="card-header">
                                <Link to="/users/add" className="btn btn-success"><i className="fas fa-plus"></i> Nuevo</Link>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Usuario</th>
                                                <th>Nickname</th>
                                                <th>level</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {rowsData}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
    );
}
export default UsersAdmin;