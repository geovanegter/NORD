import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useAuthStore from '../store/useAuthStore';
import { getClientesInativos } from '../services/firestoreQueries';

const PrioridadesScreen = () => {
  const { user } = useAuthStore();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    if (!user) return;
    getClientesInativos(user.uid, 30).then((lista) => {
      setClientes(
        lista.map((cliente) => ({
          ...cliente,
          prioridade: cliente.diasSemCompra > 60 ? 'Crítico' : 'Atento',
          proximaAcao: cliente.diasSemCompra > 60 ? 'Visitar presencialmente' : 'Ligação',
        }))
      );
    });
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prioridades do dia</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.subtitle}>{item.diasSemCompra} dias sem compra</Text>
            <Text style={styles.tag}>{item.prioridade}</Text>
            <Text style={styles.action}>Próxima ação: {item.proximaAcao}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Cadastre clientes no Firestore e sincronize esta lista.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f5f9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#64748b',
  },
  tag: {
    marginTop: 8,
    backgroundColor: '#e0f2fe',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    color: '#0369a1',
    fontWeight: '600',
  },
  action: {
    marginTop: 8,
    color: '#0f172a',
  },
  empty: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 32,
  },
});

export default PrioridadesScreen;

