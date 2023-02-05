/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, Pressable, FlatList, Alert} from 'react-native';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';

function App(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  const pacienteEditar = (id: any) => {
    const pacienteEditado = pacientes.filter(pacienteFilter => pacienteFilter.id === id);
    setPaciente(pacienteEditado[0]);
  };

  const pacienteEliminar = id => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text: 'Cancelar'},
        {text: 'Sí, Eliminar', onPress: () => {
          const pacientesActualizados = pacientes.filter(
            pacientesState => pacientesState.id !== id
          );
          setPacientes(pacientesActualizados);
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        onPressOut={() => setModalVisible(!modalVisible)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>
      {pacientes.length === 0 ? 
        <Text style={styles.noPacientes}>No hay pacientes aún</Text> : 
        <FlatList 
        style={styles.listado}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (<Paciente 
                      item={item} 
                      setModalVisible={setModalVisible}
                      pacienteEditar={pacienteEditar}
                      pacienteEliminar={pacienteEliminar}
                    />);
          }}
        />
      }
      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6d28d9',
  },
  btnNuevaCita: {
    backgroundColor: '#6d28d9',
    padding: 20,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
