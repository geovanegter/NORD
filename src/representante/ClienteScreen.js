import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const clientesMock = [
  { id: 'c1', nome: 'Mercado Aurora', ultimaCompra: '2025-04-29', categoria: 'Key Account' },
  { id: 'c2', nome: 'Padaria Solar', ultimaCompra: '2025-05-02', categoria: 'Tradicional' },
  { id: 'c3', nome: 'Empório Norte', ultimaCompra: '2025-03-10', categoria: 'Especialista' },
];

const ClienteScreen = () => (
  <View style={styles.container}>
    <FlatList
      data={clientesMock}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.nome}</Text>
          <Text>Última compra: {item.ultimaCompra}</Text>
          <Text>Categoria: {item.categoria}</Text>
        </View>
      )}
      ListFooterComponent={
        <Text style={styles.hint}>
          Troque este mock por dados vindos da coleção `clientes` com filtros por carteira do representante.
        </Text>
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    marginBottom: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  hint: {
    color: '#94a3b8',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default ClienteScreen;

