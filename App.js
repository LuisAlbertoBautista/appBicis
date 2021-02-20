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
    refresh: false
  }

  click = () => {
    this.state.list.push(this.state.valorInput);
    console.log(this.state.list)
    this.setState({valorInput:""})
  }

  refresh = () => {
    this.setState({refresh: !this.state.refresh})
  }

  clean = (pos) => {
    this.state.list.splice(pos, 1);
    this.refresh()
  }


  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <TextInput value={this.state.valorInput} onChangeText={newText => {
              this.setState({valorInput: newText});
            }}  style={{borderRadius:10,backgroundColor:'white',marginTop:50,borderColor:'black',width:200,alignSelf:'center',marginBottom:20}}></TextInput>
            <TouchableOpacity style={{alignItems:'center',width:100,alignSelf:'center',padding:15, backgroundColor: "#2AA90B",borderColor:'white', borderRadius: 5}} onPress={this.click}>
              <Text style={{color: '#ffff'}}>Añadir</Text>
            </TouchableOpacity>
            {this.state.list.map((valor, i) =>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{flex:2}}>{valor}</Text>
                <TouchableOpacity style={ {flex:1,margin:3,alignItems:'center',alignSelf:'center',padding: 15,width:100,backgroundColor:'#D42C42',borderRadius:3}} onPress={() => this.clean(i)}>
                  <Text style={{color:'#ffff'}}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
            
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
