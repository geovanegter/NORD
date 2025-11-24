import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const campanhasAtivas = [
  { id: 'camp1', nome: 'Campanha Outono', descricao: 'Combo 3 caixas', vigencia: '01/05 a 31/05' },
  { id: 'camp2', nome: 'XP Turbo', descricao: 'Incremento 2x XP em positivação premium', vigencia: '15/05 a 30/06' },
];

const rankingCampanha = [
  { id: 'rep1', nome: 'Ana Costa', pontos: 120 },
  { id: 'rep2', nome: 'Bruno Lima', pontos: 95 },
  { id: 'rep3', nome: 'Carlos Dias', pontos: 80 },
];

const CampanhasScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Campanhas ativas</Text>
    {campanhasAtivas.map((campanha) => (
      <View key={campanha.id} style={styles.card}>
        <Text style={styles.cardTitle}>{campanha.nome}</Text>
        <Text>{campanha.descricao}</Text>
        <Text style={styles.subtitle}>{campanha.vigencia}</Text>
      </View>
    ))}

    <Text style={styles.title}>Ranking</Text>
    <FlatList
      data={rankingCampanha}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View style={styles.rankingItem}>
          <Text style={styles.rank}>{index + 1}º</Text>
          <View>
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.subtitle}>{item.pontos} pts</Text>
          </View>
        </View>
      )}
      ListFooterComponent={
        <Text style={styles.hint}>
          Sincronize com a coleção `campanhas` e subcoleções de participação para ranking real.
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#64748b',
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 30,
  },
  name: {
    fontWeight: 'bold',
  },
  hint: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 16,
  },
});

export default CampanhasScreen;

