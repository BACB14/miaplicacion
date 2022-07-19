import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useNavigate } from "react-router-dom";
import config from './../../helpers/config.json';

const ClientsAdd = () => {
    let navigate = useNavigate();
    const cancel = () => {
        var {clientId, operatorId, name, rol} = document.forms[0];
        var change = clientId.value.length > 0|| operatorId.value.length > 0 || name.value.length > 0 || rol.value.length > 0;
        if(change){
            if(window.confirm("Existen cambios sin guardar. ¿Seguro de querer cancelar?")){
                navigate("/clients");
            }
        } else {
            navigate("/clients");
        }
    }

    const save = async (event) => {
        event.preventDefault();
        var {name, rol, clientId } = document.forms[0];
        var errors = "";
        errors += parseInt(name.value) == (parseInt(name)) ? "Este usuario esta repetido.\n": "";
        errors += parseInt(rol.value) == (parseInt(rol)) ? "Este rol ya esta registrado.\n":"";
        if(errors.length > 0){
            window.alert("Corrija los siguiente errores:\n"+errors);
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({"operatorId":config.operatorId,"clientId":clientId.value, "name":name.value, "rol":rol.value})
            }
            fetch(config.apiURL+"clients", requestOptions).then((response) => {
                switch(response.status){
                    case 400:
                        console.log("Faltan campos obligatorios para la consulta");
                        break;
                    default:
                        //
                }
                return response.json();
            }).then((result) => {
                window.alert("Registro de cliente exitoso");
                navigate("/clients");
            })
        }
    }
    return (<div>
            <Topbar />
            <Sidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Incorporación de Cliente</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/clients">Cloud Sales</a></li>
                                    <li className="breadcrumb-item"><a href="/clients">Clientes</a></li>
                                    <li className="breadcrumb-item active">Agregar</li>
                                </ol>
                            </div>   
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={save}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="name" className="control-label">Nombre</label>
                                        <input type="text" name="name" id="name" className="form-control"required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="rol" className="control-label">rol</label>
                                        <input type="text" name="rol" id="rol" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="<clientId>" className="control-label">ClientId</label>
                                        <input type="text" name="clientId" id="clientId" className="form-control" required />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="button" onClick={cancel} className="btn btn-secondary"><i className="fas fa-times"></i> Cancelar</button>
                                    <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Guardar</button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </section>               
            </div>
        </div>
    )
} 

export default ClientsAdd;