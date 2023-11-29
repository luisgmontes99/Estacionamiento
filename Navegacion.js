import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from './Registro';
import Edicion from './Edicion';
import Inicio from './Inicio';


const Stack = createNativeStackNavigator();

const Navegacion =()=>{
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Inicio" component={Inicio} options={{headerShown:false}}/>
                    <Stack.Screen name="Registro" component={Registro} options={{headerShown:false}}/>
                    <Stack.Screen name="Edicion" component={Edicion} options={{headerShown:false}}/>                    
                </Stack.Navigator>
            </NavigationContainer>
        );
}

export default Navegacion;
