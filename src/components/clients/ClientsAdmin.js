import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { Link, useNavigate } from "react-router-dom";
import config from './../../helpers/config.json';

const ClientsAdmin = () => {
    let navigate = useNavigate();
    const [rowsData, setRows] = useState(0);
    useEffect(() => {
        updateClients();
    });

    const updateClients = () => {
        const requestOptions = {
            method: 'GET', headers: { 'Content-Type': 'application/json'}
        };
        fetch(config.apiURL+"clients/"+config.operatorId, requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            // this.setState({ clientsList: result.data.map((client) => { return client; }) });
            let clientsList = result.data.map((client) => { return client; });
            let rowData;
            if(clientsList.length === 0){
                rowData = (<tr><td colSpan="4" className="text-center">No existe Cliente</td></tr>);
            } else {
                rowData = clientsList.map(c => {
                    let button;
                    if(c.active){
                        button = <button className="btn btn-secondary" onClick={() => disable(c)}><i className="fas fa-eye-slash"></i> Deshabilitar</button>;
                    } else {
                        button = <button className="btn btn-primary" onClick={() => enable(c)}><i className="fas fa-eye"></i> Habilitar</button>;
                    }
                    
                    return (<tr>
                        <td>{c.name}</td><td className="text-right">{c.rol}</td><td className="text-right">
                            {button}
                            <button className="btn btn-warning" onClick={() => edit(c)}><i className="fas fa-pencil"></i> Editar</button>
                        </td>
                    </tr>); 
                });
            }
            setRows(rowData);
        });
    };

    const disable = (client) => {
        if(window.confirm("¿Está seguro/a de querer deshabilitar:\n"+client.name)){
            const requestOptionsPatch = {
                method: 'PUT', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({
                    operatorId: config.operatorId,
                    name: client.name,
                    rol: parseInt(client.rol),
                    active: false
                })
            };
            fetch(config.apiURL+"clients/"+client.id, requestOptionsPatch).then((response) => {
                return response.json();
            }).then((result) => {
                updateClients();
                window.alert("Deshabilitación completada");
            });   
        }
    }
    const enable = (client) => {
        if(window.confirm("¿Está seguro/a de querer volver a habilitar:\n"+client.name)){
            const requestOptionsPatch = {
                method: 'PUT', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({
                    operatorId: config.operatorId,
                    name: client.name,
                    rol: parseInt(client.rol),
                    active: true
                })
            };
            fetch(config.apiURL+"clients/"+client.id, requestOptionsPatch).then((response) => {
                return response.json();
            }).then((result) => {
                updateClients();
                window.alert("Habilitación completada")
            });   
        }
    }
    
    const edit = (clients) => {
        let clientsData = JSON.stringify(clients);
        sessionStorage.setItem("client", clientsData);
        navigate("/clients/edit");
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
                                <h1>Panel de Clientes</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Cloud Sales</a></li>
                                    <li className="breadcrumb-item active">Clientes</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    </section>
                    <section className="content">
                        <div className="card">
                            <div className="card-header">
                                <Link to="/clients/add" className="btn btn-success"><i className="fas fa-plus"></i> Nuevo</Link>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Cliente</th>
                                                <th>Rol</th>
                                                <th><center>Acciones</center></th>
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
export default ClientsAdmin;