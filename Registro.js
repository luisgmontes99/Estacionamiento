import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {MaskedTextInput} from 'react-native-mask-text';

export default class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrar_calendario: false,
      mostrar_reloj: false,
      fechaSeleccionada: new Date(),
      date: new Date(),
      //Datos para el registro
      Nombre: '',
      Marca: '',
      Placas: '',
      Color: '',
      Entrada: '',
      Puerta: '',
      Dia: '',
      Destino: '',
    };
  }
  //https://mglgproyecto1.000webhostapp.com/Proyecto/Registro.php?NO=1&MA=1&PL=1&CO=1&EN=09:30:00&PU=2&DI=2023-10-31&DE=MODULO%20I
  render() {
    const Salir = () => {
      this.props.navigation.navigate('Inicio');
    };
    const Resgistrar = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if (xhttp.responseText === '1') {
            Alert.alert('Registro insertado');
            Salir();
          } else {
            Alert.alert('Error');
          }
        }
      };
      xhttp.open(
        'GET',
        'https://mglgproyecto1.000webhostapp.com/Proyecto/Registro.php?NO=' +
          this.state.Nombre +
          '&MA=' +
          this.state.Marca +
          '&PL=' +
          this.state.Placas +
          '&CO=' +
          this.state.Color +
          '&EN=' +
          this.state.Entrada +
          '&PU=' +
          this.state.Puerta +
          '&DI=' +
          this.state.Dia +
          '&DE=' +
          this.state.Destino,
        true,
      );
      xhttp.send();
    };
    return (
      <View>
        <View style={styles.Pantalla}>
          <Image
            source={{uri: 'https://cecm.proulex.com/2021/images/udg_w.png'}}
            style={styles.Img1}
          />
          <ScrollView style={styles.Formulario}>
            <Text style={styles.Titulo}>INGRESA UN NUEVO REGISTRO</Text>
            <View style={styles.Casilla}>
              <Text style={styles.Texto1}>Nombre del visitante</Text>
              <TextInput
                editable={!this.state.mostrar_calendario}
                placeholder="INGRESA TU NOMBRE"
                placeholderTextColor="gray"
                style={{color: 'white'}}
                onChangeText={Nombre => this.setState({Nombre})}></TextInput>
            </View>
            <View style={styles.Casilla}>
              <Text style={styles.Texto1}>Marca del vehiculo</Text>
              <TextInput
                editable={!this.state.mostrar_calendario}
                placeholder="INGRESA LA MARCA DEL VEHICULO"
                placeholderTextColor="gray"
                style={{color: 'white'}}
                onChangeText={Marca => this.setState({Marca})}></TextInput>
            </View>
            <View style={styles.Casilla}>
              <Text style={styles.Texto1}>Placas</Text>
              <MaskedTextInput
                mask="AAA-99999"
                editable={!this.state.mostrar_calendario}
                onChangeText={Placas => this.setState({Placas})}
                placeholder="AAA-99999"
                placeholderTextColor="gray"
                style={{color: 'white'}}
              />
            </View>
            <View style={styles.Casilla}>
              <Text style={styles.Texto1}>Color</Text>
              <TextInput
                editable={!this.state.mostrar_calendario}
                placeholder="INGRESA EL COLOR DE TU VEHICULO"
                placeholderTextColor="gray"
                style={{color: 'white'}}
                onChangeText={Color => this.setState({Color})}></TextInput>
            </View>
            <View style={styles.Casilla}>
              <Text style={styles.Texto1}>Dia de ingreso</Text>
              <TouchableOpacity
                onPress={() => this.setState({mostrar_calendario: true})}>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    {this.state.Dia ? this.state.Dia : 'Abrir Calendario'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {this.state.mostrar_calendario && (
              <View style={styles.CalendarioContainer}>
                <Calendar
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height: 350,
                  }}
                  onDayPress={day => {
                    this.setState({
                      Dia: day.dateString,
                      mostrar_calendario: false,
                    });
                  }}
                />
              </View>
            )}
            <View style={styles.Casilla}>
              <Text style={styles.Texto1}>Hora de ingreso</Text>
              <MaskedTextInput
                mask="99:99:99"
                keyboardType="numeric"
                editable={!this.state.mostrar_calendario}
                onChangeText={Entrada => this.setState({Entrada})}
                placeholder="HH:MM:SS"
                placeholderTextColor="gray"
                style={{color: 'white'}}
              />
            </View>
            <View style={styles.Casilla}>
              <Text style={styles.Texto1}>Puerta de ingreso</Text>
              <MaskedTextInput
                mask="9"
                keyboardType="numeric"
                editable={!this.state.mostrar_calendario}
                onChangeText={Puerta => this.setState({Puerta})}
                placeholder="ELIGE EL NUMERO DE PUERTA (1,2,3)"
                placeholderTextColor="gray"
                style={{color: 'white'}}
              />
            </View>
            <View style={styles.Casilla}>
              <Text style={styles.Texto1}>Modulo Destino</Text>
              <TextInput
                editable={!this.state.mostrar_calendario}
                placeholder="MODULO-(LETRA DEL MODULO)"
                placeholderTextColor="gray"
                style={{color: 'white'}}
                onChangeText={Destino => this.setState({Destino})}></TextInput>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() =>Resgistrar()}>
                <View style={styles.Boton}>
                  <Text style={{color: 'white'}}>Registrar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Salir()}>
                <View style={styles.Boton2}>
                  <Text style={{color: 'white'}}>Cancelar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Pantalla: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F16020',
  },
  Img1: {
    height: 150,
    marginTop: 10,
    resizeMode: 'contain',
  },
  Titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    alignSelf: 'center',
  },
  Formulario: {
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 25,
    width: '85%',
    backgroundColor: '#012765',
    borderRadius: 10,
  },
  Casilla: {
    display: 'flex',
    flexDirection: 'Column',
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '90%',
    height: 70,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 8,
  },
  Texto1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  Boton: {
    width: 100,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'black',
    alignSelf: 'center',
    borderRadius: 15,
    marginRight: 20,
  },
  Boton2: {
    width: 100,
    height: 40,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: 15,
  },
  CalendarioContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  CerrarCalendario: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
