import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {MaskedTextInput} from 'react-native-mask-text';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Edicion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrar_calendario: false,
      mostrar_reloj: false,
      Modal_edicion: false,
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
      Identificador: '',
      INFO: [],
    };
  }
  //https://mglgproyecto1.000webhostapp.com/Proyecto/Editar.php?NO=1&MA=1&PL=1&CO=1&EN=09:30:00&PU=2&DI=2023-10-31&DE=MODULO%20I
  render() {
    const image = {
      uri: 'https://w0.peakpx.com/wallpaper/495/148/HD-wallpaper-minimalism-geometric-figures-colorful-shapes-digital-art-gradient-vertical-lines.jpg',
    };
    const Recarga = () => {
      this.props.navigation.navigate('Inicio');
    };
    const Salir = () => {
      this.props.navigation.navigate('Inicio');
    };

    const Eliminar = () => {
      const cadena =
        'https://mglgproyecto1.000webhostapp.com/Proyecto/Eliminar.php?ID=' +
        this.state.Identificador;
      cadena_nueva = encodeURI(cadena);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          //console.log(xhttp.responseText);
          if (xhttp.responseText === '1') {
            Alert.alert('Registro Eliminado');
            Salir();
          } else {
            Alert.alert('Error');
          }
        }
      };
      console.log(cadena_nueva);
      xhttp.open('GET', cadena_nueva, true);
      xhttp.send();
    };

    const EDIT = () => {
      const cadena =
        'https://mglgproyecto1.000webhostapp.com/Proyecto/Editar.php?NO=' +
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
        this.state.Destino +
        '&ID=' +
        this.state.Identificador;
      cadena_nueva = encodeURI(cadena);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if (xhttp.responseText === '1') {
            Alert.alert('Registro modificado');
            Recarga();
          } else {
            Alert.alert('Error');
          }
        }
      };
      console.log(cadena_nueva);
      xhttp.open('GET', cadena_nueva, true);
      xhttp.send();
      this.setState({
        Modal_edicion: false,
      });
    };
    const EDITAR = async () => {
      const response = await fetch(
        'https://mglgproyecto1.000webhostapp.com/Proyecto/Edicion.php?NO=' +
          this.state.Nombre,
        {cache: 'no-store'},
      );
      const data = await response.json();
      if (data != null && data != '0') {
        this.setState({
          Nombre: data['Nombre'],
          Marca: data['Marca'],
          Placas: data['Placas'],
          Color: data['Color'],
          Entrada: data['Entrada'],
          Puerta: data['Puerta'],
          Dia: data['Dia'],
          Destino: data['Destino'],
          Identificador: data['ID'],
          Modal_edicion: true,
        });
      }
      return data;
    };
    return (
      <View>
        <View style={styles.Pantalla}>
          <Image
            source={{uri: 'https://cecm.proulex.com/2021/images/udg_w.png'}}
            style={styles.Img1}
          />
          <View style={styles.Inicio}>
            <Text style={styles.Titulo}>INGRESA EL NOMBRE DEL REGISTRO</Text>
            <View style={styles.Casilla2}>
              <TextInput
                editable={!this.state.Modal_edicion}
                placeholder="INGRESA EL NOMBRE"
                placeholderTextColor="gray"
                style={{
                  color: 'black',
                  width: '100%',
                  borderWidth: 2,
                  borderRadius: 10,
                }}
                onChangeText={Nombre => this.setState({Nombre})}></TextInput>
            </View>
            <TouchableOpacity onPress={() => EDITAR()}>
              <View style={styles.Boton2}>
                <Text style={{color: 'white'}}>BUSQUEDA</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modal transparent={false} visible={this.state.Modal_edicion}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#F16020',
              }}>
              <KeyboardAwareScrollView >
                <View style={styles.Formulario}>
                  <View style={styles.Casilla}>
                    <Text style={styles.Texto1}>Nombre del visitante</Text>
                    <TextInput
                      value={this.state.Nombre}
                      editable={!this.state.mostrar_calendario}
                      placeholder="INGRESA TU NOMBRE"
                      placeholderTextColor="gray"
                      style={{color: 'white'}}
                      onChangeText={Nombre =>
                        this.setState({Nombre})
                      }></TextInput>
                  </View>
                  <View style={styles.Casilla}>
                    <Text style={styles.Texto1}>Marca del vehiculo</Text>
                    <TextInput
                      editable={!this.state.mostrar_calendario}
                      value={this.state.Marca}
                      placeholder="INGRESA LA MARCA DEL VEHICULO"
                      placeholderTextColor="gray"
                      style={{color: 'white'}}
                      onChangeText={Marca =>
                        this.setState({Marca})
                      }></TextInput>
                  </View>
                  <View style={styles.Casilla}>
                    <Text style={styles.Texto1}>Placas</Text>
                    <MaskedTextInput
                      mask="AAA-9999"
                      editable={!this.state.mostrar_calendario}
                      value={this.state.Placas}
                      onChangeText={Placas => this.setState({Placas})}
                      placeholder="AAA-9999"
                      placeholderTextColor="gray"
                      style={{color: 'white'}}
                    />
                  </View>
                  <View style={styles.Casilla}>
                    <Text style={styles.Texto1}>Color</Text>
                    <TextInput
                      editable={!this.state.mostrar_calendario}
                      value={this.state.Color}
                      placeholder="INGRESA EL COLOR DE TU VEHICULO"
                      placeholderTextColor="gray"
                      style={{color: 'white'}}
                      onChangeText={Color =>
                        this.setState({Color})
                      }></TextInput>
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
                      value={this.state.Entrada}
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
                      value={this.state.Puerta}
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
                      value={this.state.Destino}
                      placeholder="MODULO-(LETRA DEL MODULO)"
                      placeholderTextColor="gray"
                      style={{color: 'white'}}
                      onChangeText={Destino =>
                        this.setState({Destino})
                      }></TextInput>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row',marginBottom:20}}>
                    <TouchableOpacity onPress={() => EDIT()} style={{flex: 1}}>
                      <View style={styles.Boton}>
                        <Text style={{color: 'white'}}>EDITAR</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => Eliminar()}>
                      <View style={styles.Boton_El}>
                        <Text style={{color: 'white'}}>ELIMINAR</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1}} onPress={() => Salir()}>
                      <View style={styles.Boton_EX}>
                        <Text style={{color: 'black'}}>SALIR</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </Modal>
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
    height: 250,
    marginTop: '20%',
    resizeMode: 'contain',
  },
  Inicio: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#000',
    backgroundColor: '#FFF',
    padding: 10,
    marginTop: '10%',
    marginHorizontal: '5%',
  },
  Titulo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    alignSelf: 'center',
    color: 'black',
  },
  Formulario: {
    alignSelf: 'center',
    marginTop: 25,
    width: '95%',
    height: '100%',
    backgroundColor: '#012765',
    alignItems: 'center',
    borderRadius: 10,
  },
  Casilla: {
    display: 'flex',
    flexDirection: 'Column',
    borderBottomWidth: 2,
    borderColor: 'gray',
    width: '95%',
    height: 60,
    margin: 5,
    borderRadius: 15,
  },
  Casilla2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    width: '75%',
    height: 40,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  Texto1: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  Boton: {
    width: 100,
    height: 30,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'black',
    marginLeft: 15,
  },
  Boton2: {
    width: 100,
    height: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'blue',
  },
  Boton_El: {
    width: 100,
    height: 30,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'red',
  },
  Boton_EX: {
    width: 100,
    height: 30,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'white',
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
