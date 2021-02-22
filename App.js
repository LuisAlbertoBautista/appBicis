/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { showLocation } from 'react-native-map-link'

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';




export default class extends React.Component {
  state={
    list: [],
    refresh: false,
    loading: false,
    visibleModal: false,
    itemTemp: null,
  }

  

  obtenerInfo = () => {
    this.setState({loading:true})
    fetch('https://api.citybik.es/v2/networks/ecobici')
    .then(respuesta=>respuesta.json())
    .then((respuesta)=>{
      //console.log(JSON.stringify(respuesta))
      this.setState({ list: respuesta.network.stations, loading: false}, () =>{
      });
      
    })    
  }
  componentDidMount(){
    this.obtenerInfo();
  }

  

  render(){
    if(this.state.loading){
      return(
        <View><Text>Descargando inf</Text></View>
      )

    }
    return (
      <>

        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            >
            <View style={{ flex: 1, padding: 24 }}>
              <Modal  visible={this.state.visibleModal} transparent={true} style={{flex:1}}>
                <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: 'center'}}>
                {
                    this.state.itemTemp != null ?
                      <View style={{backgroundColor:'white', padding: 20, borderRadius: 15, margin: 20}}>
                        <Text >Nombre: {this.state.itemTemp.name}</Text>
                        <Text >Dirección: {this.state.itemTemp.extra.address}</Text>
                        <Text >Lugares Vacíos: {this.state.itemTemp.empty_slots}</Text>
                        <Text >Bicicletas Libres: {this.state.itemTemp.free_bikes}</Text>
                        <Text >Fecha de Actulizacion: {this.state.itemTemp.timestamp}</Text>

                        <TouchableOpacity style={ {margin:3,alignItems:'center',alignSelf:'center',padding: 15,width:100,backgroundColor:'#D42C42',borderRadius:3}}
                            onPress={
                              () => {
                                showLocation({
                                  latitude: this.state.itemTemp.latitude,
                                  longitude: this.state.itemTemp.longitude, 
                                  appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
                                  naverCallerName: 'com.app_bicis' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
                                  // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
                              
                                  // app: 'uber'  // optionally specify specific app to use
                              })
                              }
                          }
                        >
                          <Text>Abrir en google Maps</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={ {margin:3,alignItems:'center',alignSelf:'center',padding: 15,width:100,backgroundColor:'#D42C42',borderRadius:3}}
                            onPress={
                              () => { 
                                this.setState({visibleModal: false
                                })
                              }
                          }
                        >
                          <Text>Cerrar</Text>
                        </TouchableOpacity>
                      </View>
                      : null
                  }
                  </View>
              </Modal>
              {
                this.state.list.map((item) => 
                <View style={{flex:1,flexDirection:'row'}}>
                  <Text style={{flex:2}}>{item.name}</Text>
                  <TouchableOpacity style={ {flex:1,margin:3,alignItems:'center',alignSelf:'center',padding: 15,width:100,backgroundColor:'#D42C42',borderRadius:3}} 
                    onPress={
                         () =>  { 
                          this.setState({visibleModal: true, itemTemp: item
                          }
                          
                          )
                        }
                    }
                  >
                    <Text style={{color:'#ffff'}}>Detalles</Text>
                  </TouchableOpacity>
                </View>
                )
                
              }
             </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};