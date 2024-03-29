import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useNavigate } from "react-router-dom";
import config from './../../helpers/config.json';

const UsersAdd = () => {
    let navigate = useNavigate(); 
    const cancel = () => {
        var {name, nickname, password, level} = document.forms[0]; 
        var hasChanges = name.value.length > 0 ||  nickname.value.length > 0 || password.value.length > 0 || level.value.length > 0;
        if(hasChanges){
            if(window.confirm("Existen cambios sin guardar. ¿Seguro de querer cancelar?")){
                navigate("/users");
            }
        } else {
            navigate("/users")
        }
    }

    const save = async(event) => {
        event.preventDefault();
        var {name, nickname, password, level} = document.forms[0];
        var errors = "";
        errors += parseInt(name.value) == (parseInt(name)) ? "Usted ya posee cuenta.\n": "";
        errors += parseInt(nickname.value) == (parseInt(nickname)) ? "Nombre de Usuario existente.\n": "";
        if(errors.length > 0){
            window.alert("Corrija los siguientes errores:\n"+errors);
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ "operatorId": config.operatorId, "name": name.value,"nickname": nickname.value,
                "password": password.value,"level": level.value})
            }
              fetch(config.apiURL+"users", requestOptions).then((response) => {
                switch(response.status){
                  case 400:
                    console.log("Faltan campos obligatorios para la consulta");
                    break;
                  default:
                    //
                }
                return response.json();
                }).then((result) => {
                  window.alert("Regitro existoso");
                  navigate("/users");
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
                                <h1>Incorporación de Usuario</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Cloud Sales</a></li>
                                    <li className="breadcrumb-item"><a href="/users">Usuarios</a></li>
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
                                        <label htmlFor="nickname" className="control-label">NickName</label>
                                        <input type="text" name="nickname" id="nickname" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="Password" className="control-label">Contraseña</label>
                                        <input type="password" name="password" id="password" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                    <label className="control-label">Level</label>
                                        <select htmlFor="level" name="level" id="level" className="form-control">
                                            <option value="admin">Admin</option>
                                            <option value="selle">Vendedor</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" onClick={cancel} className="btn btn-secondary"><i className="fas fa-times"></i> Cancelar</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Guardar</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default UsersAdd;