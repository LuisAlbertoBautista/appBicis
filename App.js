/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



export default class extends React.Component {
  state={
    list: [],
    valorInput: "",
    refresh: false,
    loading: false
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

  details (index) {
    console.log(this.state.list[index])
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
            style={styles.scrollView}>
            <View style={{ flex: 1, padding: 24 }}>
              
              {
                this.state.list.map((item,i) => 
                <View style={{flex:1,flexDirection:'row'}}>
                  <Text style={{flex:2}}>{item.name}</Text>
                  <TouchableOpacity style={ {flex:1,margin:3,alignItems:'center',alignSelf:'center',padding: 15,width:100,backgroundColor:'#D42C42',borderRadius:3}} 
                  onPress={
                    () => console.log(item)
                  }>
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