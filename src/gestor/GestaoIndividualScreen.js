import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const mockRepresentantes = [
  { id: 'rep1', nome: 'Ana Costa', metas: 60000, vendas: 52000, positivacao: 82 },
  { id: 'rep2', nome: 'Bruno Lima', metas: 55000, vendas: 43000, positivacao: 71 },
  { id: 'rep3', nome: 'Carlos Dias', metas: 48000, vendas: 41000, positivacao: 64 },
];

const GestaoIndividualScreen = () => (
  <View style={styles.container}>
    <FlatList
      data={mockRepresentantes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.nome}</Text>
          <Text>Meta: {item.metas}</Text>
          <Text>Vendas: {item.vendas}</Text>
          <Text>Positivação: {item.positivacao}%</Text>
        </View>
      )}
      ListFooterComponent={
        <Text style={styles.hint}>
          Troque este mock por um listener em `representantes` + agregados de `vendas`.
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
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 16,
  },
});

export default GestaoIndividualScreen;

