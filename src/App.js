import React, { Component } from 'react';
import MapGL,{Layer,Feature,Polygon,Popup} from 'react-mapbox-gl';
import MapFaro from './components/map';
import Personas from './components/personas';
import Popup2 from './components/popup2';
//var ReactMapboxGl = require("react-mapbox-gl");
import logo from './uber.png';
import './App.css';
//import {geojson} from './data/geojson.json';
import {centros} from './data/todosroles.json';
import {tendencias,roles} from './data/tablas.json';
import {observadores} from './data/observadores.json';
//https://www.youtube.com/watch?v=I7WfxhF2wEg

//https://medium.com/@to_pe/deploying-create-react-app-on-microsoft-azure-c0f6686a4321
//npm run build  
//console.log(rolessss)
const TOKEN="pk.eyJ1IjoiZmFyb21hcGJveCIsImEiOiJjamt6amF4c3MwdXJ3M3JxdDRpYm9ha2pzIn0.V8cqmZH6dFIcxtKoaWcZZw"
const Map = MapGL({
  accessToken: TOKEN
});
const polygon = [[10.516082,-66.94928], [10.517082,-66.959286], [10.517082,-66.953286]]
//const CENTROS={centros}
const markersId=[1,2,3]

let popupInfo0={"coordinates":[0,0],"nombre":"oJo","error":"sin error"}
console.log("App Inicio")
let centro=[-66.95286,7]
let zoom=[5]
//const centros=centros


class App extends Component {
  constructor(props){
    super(props);    
    this.state={
      heading:"Centros de Votacion",
      center:centro,
      zoom:zoom,
      
      popupInfo:null,
      cvnombre:"",
      popupInfo2:popupInfo0,
      nuevodefensor:{}
    }
    
  //console.log({centros})
    //this.renderPopup = this.renderPopup.bind(this)  
    this.onFeatureClick = this.onFeatureClick.bind(this)
    this.onFeatureMouseEnter = this.onFeatureMouseEnter.bind(this)
    this.onListMouseEnter = this.onListMouseEnter.bind(this)
    
    //this._onClickMap=this._onClickMap.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.onPopupClose=this.onPopupClose.bind(this) 
  }
 
  onFeatureClick(evt) {
    //console.log(evt.feature.properties);
    //console.log(evt.feature.properties.latlng);
        //console.log(pop)
    this.setState({zoom:[5]})
    this.setState({center:JSON.parse(evt.feature.properties.latlng)})
    let pop={"coordinates":JSON.parse(evt.feature.properties.latlng),"nombre":evt.feature.properties.nombre}
   this.setState({popupInfo2:pop})
    //this.setState({dummy:"bbbb"})
    
  }
  onPopupClose(e) {
     console.log("App:popupclo ")
     //console.log(e)
      this.setState({popupInfo2:{"coordinates":[0,0],"nombre":"oJo","error":"sin error"}})
      
  }

  onFeatureMouseEnter(e) {
   console.log(e)
    //console.log(e.feature.properties.nombre)
    this.setState({heading:e.feature.properties.nombre})
    console.log("e");
  }
  handleSubmit(f) {
    //FORM
    console.log(this.refs);
    if(this.refs.cedula.value===""){
      
      const pop=this.state.popupInfo2
      pop.error="Falta Cedula";
      this.setState({popupInfo2:pop})
    }else{
      //con selectIndex obtengo el id del rol o tendencia
      this.setState({nuevodefensor:{
        cedula:this.refs.cedula.value,
        telefono:this.refs.telefono.value,
        correo:this.refs.correo.value,
        
        rol:this.refs.rol.value,
        idtendencia:this.refs.tendencia.selectedIndex,
      }},function(){
        console.log("promise")
        alert(JSON.stringify(this.state.nuevodefensor))
        console.log(this.state.nuevodefensor);
     
      }
    
    )
    }
    
    f.preventDefault()
  }
  renderPopup(){
    return this.state.popupInfo && (
      <Popup tipSize={5}
        anchor="bottom-right"
        longitude={this.state.popupInfo.state.longitude}
        latitude={this.state.popupInfo.state.latitude}
        onClose={() => this.setState({popupInfo: null})}
        closeOnClick={true}>
        <p>{"YOUR POPUP INFO"}</p>
      </Popup>
    )
  }
  //_onClickMap(map, evt) {
  //  console.log("onClickMapaa")
    //console.log(evt);
  //  this.setState({popupInfo2:{"coordinates":[0,0],"nombre":"oJo"}})
  // }
  onListMouseEnter(e) {
   
    console.log("onListMouseEnter")
    console.log(e)
    //this.setState({heading:e})
    const p=e.nombre1+" "+e.apellido1+" ["+e.cvestado+"-"+e.cvmunicipio+"-"+e.cvparroquia+"-"+e.cvcentro+"]"
    this.setState({heading:p})
    //console.log(evt.feature.properties.latlng);
    
   // let pop={"coordinates":JSON.parse(evt.feature.properties.latlng),"nombre":evt.feature.properties.nombre}
    //console.log(pop)
    
  }
  render() {
    const centrosvot=centros;
    const { popupInfo2,center,zoom,heading } = this.state;
    //let features=this.state.cv.map(m=>{   LOS DOS FUNCIONAN
    
     
      // console.log(rolesOpciones)
    return (
      <div className= "App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />          
          <h3 className="App-title">{heading} </h3>
        </header>
        <table><row>
          <td valign="top" style={{width:'200px',height:'300px',scrollBehavior:'auto'}} >
             <Personas  mouseenter={this.onListMouseEnter}></Personas>
        </td>
        <td ><span>
          <MapFaro
             popupinfo2props={this.state.popupInfo2} onpopupclose={this.onPopupClose}
             onMouseEnter={this.onFeatureMouseEnter} onClick={this.onFeatureClick}
          >    
        </MapFaro>
        </span></td>
          </row>
          </table>
        
        
      </div>
    );

  }


}

export default App;

