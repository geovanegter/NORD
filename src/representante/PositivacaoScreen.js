import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import useAuthStore from '../store/useAuthStore';
import { salvarVenda, incrementarXP } from '../services/firestoreQueries';

const PositivacaoScreen = () => {
  const { user } = useAuthStore();
  const [clienteId, setClienteId] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!clienteId || !valor) {
      Alert.alert('Campos obrigatórios', 'Informe cliente e valor.');
      return;
    }
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da localização para registrar a positivação.');
        return;
      }
      const coords = await Location.getCurrentPositionAsync({});
      const payload = {
        cliente_id: clienteId,
        representante_id: user?.uid,
        valor: Number(valor),
        data: new Date().toISOString(),
        coords: {
          latitude: coords.coords.latitude,
          longitude: coords.coords.longitude,
        },
      };
      await salvarVenda(payload);
      await incrementarXP(user.uid, 25);
      setClienteId('');
      setValor('');
      Alert.alert('Sucesso', 'Venda registrada e XP atualizado.');
    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar positivação</Text>
      <TextInput
        placeholder="Cliente ID"
        value={clienteId}
        onChangeText={setClienteId}
        style={styles.input}
      />
      <TextInput
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSalvar} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar venda'}</Text>
      </TouchableOpacity>
      <Text style={styles.hint}>
        Essa tela grava vendas no Firestore (`vendas`) e incrementa o campo XP do usuário.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  hint: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 12,
  },
});

export default PositivacaoScreen;

