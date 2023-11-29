import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const image = {
      uri: 'https://w0.peakpx.com/wallpaper/803/708/HD-wallpaper-geometric-art-abstract-arty-bright-circle-geometry-shapes-simple-slick-texture-triangle.jpg',
    };

    const REG = () => {
      this.props.navigation.navigate('Registro');
    };
    const EDI = () => {
      this.props.navigation.navigate('Edicion');
    };
    return (
      <View style={Estilos.Pantalla}>
        <Image
          source={{uri: 'https://cecm.proulex.com/2021/images/udg_w.png'}}
          style={Estilos.Img1}
        />
        <Text style={Estilos.Text1}>ESTACIONAMIENTO</Text>
        <View style={Estilos.Recuadro}>
          <Text style={Estilos.Titulo}> SELECCIONA UNA OPCION </Text>
          <TouchableOpacity onPress={REG} style={{marginVertical: 20}}>
            <View style={Estilos.Casilla}>
              <Text style={{color: 'white', fontSize: 16}}>IR A REGISTRO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={EDI} style={{marginBottom: 20}}>
            <View style={Estilos.Casilla2}>
              <Text style={{color: 'white', fontSize: 16}}>IR A EDICION</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={Estilos.Text2}>APP CUCEI</Text>
      </View>
    );
  }
}

const Estilos = StyleSheet.create({
  Pantalla: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F16020',
    alignItems: 'center',
  },
  Img1: {
    marginTop:60,
    height: 200,
    width:200,
  },
  Text1: {
    color: 'white',
    fontSize:30,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    marginBottom:80,
    marginTop:10,
  },
  Text2: {
    color: 'white',
    fontSize:50,
    fontWeight: 'bold',
    fontStyle:'italic',
    fontFamily: 'Roboto-Regular',
    marginTop:70,
  },
  Recuadro: {
    borderWidth: 5,
    borderRadius: 35,
    backgroundColor: '#FFF',
    width: '80%',
    height: 'auto',
    alignItems: 'center',
  },
  Titulo: {
    marginTop: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 25,
    color: 'black',
    alignSelf: 'center',
  },
  Casilla: {
    borderWidth: 2,
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  Casilla2: {
    borderWidth: 2,
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom:20,
  },
});
export default Inicio;
