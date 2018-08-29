import React, { Component } from 'react';
import MapGL,{Layer,Feature,Polygon,Popup} from 'react-mapbox-gl';
//var ReactMapboxGl = require("react-mapbox-gl");
import {centros} from '../data/todosroles.json';
import {tendencias,roles} from '../data/tablas.json';
import {observadores} from '../data/observadores.json';
class Popup2 extends Component {
handleSubmit(f) {
 console.log("handleSubmit ")

}
onPopupClose(e) {
  console.log("popupclose ")
  //console.log(e)
  // this.setState({popupInfo2:{"coordinates":[0,0],"nombre":"oJo","error":"sin error"}})
   
}
render() {

  const popupinfo2=this.props.popupinfo2props 
  console.log("popup renderrr rrr")
  console.log(popupinfo2)
  //const popupinfo2={"coordinates":[0,0],"nombre":"oJo","error":"sin error"}
    
     let observadoresOpciones=observadores.map(o=>{       
      return(
         <option key={o.identificacion} value={o.identificacion}>{o.nombre}</option>
           )
     } )
     let rolesOpciones=roles.map(r=>{
       
      return(
         <option key={r.idr}  value={r.idr}>{r.rol}</option>
           )
     } )
     let tendenciasOpciones=tendencias.map(t=>{
     
     return(
        <option key={t.idt} value={t.idy}>{t.tendencia}</option>
          )
    } )
      // console.log(rolesOpciones)
    return (
      <div className= "Popup2">
   
   <Popup       
               key={1}
               coordinates={popupinfo2.coordinates}
               offset={{'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]}}
              // onClick={this.onPopupClick.bind(this)}
     >
            <h3>{popupinfo2.nombre}</h3>
            <div>
            <label>Padron:</label>
            <select ref="observador">
                {observadoresOpciones}
            </select>
            </div>
            <form onSubmit={this.handleSubmit.bind(this)}>
             <div>
              <label>Cedula:</label>
              <input type="text" ref="cedula" />
            </div>
            <div>
              <label>Correo:</label>
              <input type="text" ref="correo" />
            </div>
            <div>
            <label>Telefono:</label>
             <input type="text" ref="telefono" />
            </div>
            <div>
            <label>Rol:</label>
             <select ref="rol">
              {rolesOpciones}
            </select>
            </div>
            <div>
            <label>Tendencia:</label>
            <select ref="tendencia">
              {tendenciasOpciones}
            </select>
            </div>
            <input type="submit" value="Submit" />
            <input type="button"  onClick={this.props.onpopupclose} value="X" />
           
         </form>
         <h4>{popupinfo2.error}</h4>
  </Popup>
        
      </div>
    );
  }
}
export default Popup2;
