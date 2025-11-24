import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import InfoCard from '../components/InfoCard';
import { formatCurrency } from '../utils/money';

const mockDados = {
  metaRegional: 250000,
  realizado: 182500,
  positivacao: 78,
  ticketMedio: 1450,
  ranking: [
    { id: 'rep1', nome: 'Ana Costa', valor: 52000 },
    { id: 'rep2', nome: 'Bruno Lima', valor: 48000 },
    { id: 'rep3', nome: 'Carlos Dias', valor: 41000 },
  ],
};

const DashboardGestorScreen = () => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
    <Text style={styles.title}>Painel Regional</Text>
    <InfoCard title="Meta regional" value={formatCurrency(mockDados.metaRegional)} />
    <InfoCard title="Realizado" value={formatCurrency(mockDados.realizado)} />
    <InfoCard title="% Positivação" value={`${mockDados.positivacao}%`} subtitle="Baseado em clientes ativos" />
    <InfoCard title="Ticket médio" value={formatCurrency(mockDados.ticketMedio)} />

    <Text style={styles.title}>Ranking por RC</Text>
    {mockDados.ranking.map((rep, index) => (
      <View key={rep.id} style={styles.card}>
        <Text style={styles.rank}>{index + 1}º</Text>
        <View>
          <Text style={styles.name}>{rep.nome}</Text>
          <Text style={styles.subtitle}>{formatCurrency(rep.valor)}</Text>
        </View>
      </View>
    ))}
    <Text style={styles.hint}>Substitua `mockDados` por agregações Firestore (collectionGroup de vendas).</Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  rank: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#475569',
  },
  hint: {
    color: '#94a3b8',
    marginTop: 16,
  },
});

export default DashboardGestorScreen;

