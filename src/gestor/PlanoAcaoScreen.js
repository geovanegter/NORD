import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const PlanoAcaoScreen = () => {
  const [planos, setPlanos] = useState([
    { id: 'p1', titulo: 'Aumentar share na Zona Leste', responsavel: 'Ana', status: 'Em andamento' },
    { id: 'p2', titulo: 'Campanha combos premium', responsavel: 'Bruno', status: 'Pendente' },
  ]);
  const [titulo, setTitulo] = useState('');
  const [responsavel, setResponsavel] = useState('');

  const handleAdicionar = () => {
    if (!titulo || !responsavel) return;
    setPlanos((prev) => [
      ...prev,
      { id: String(Date.now()), titulo, responsavel, status: 'Pendente' },
    ]);
    setTitulo('');
    setResponsavel('');
  };

  const marcarConcluido = (id) => {
    setPlanos((prev) => prev.map((plano) => (plano.id === id ? { ...plano, status: 'Concluído' } : plano)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo plano</Text>
      <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={styles.input} />
      <TextInput placeholder="Responsável" value={responsavel} onChangeText={setResponsavel} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleAdicionar}>
        <Text style={styles.buttonText}>Criar plano</Text>
      </TouchableOpacity>

      <FlatList
        data={planos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text>Responsável: {item.responsavel}</Text>
            <Text>Status: {item.status}</Text>
            {item.status !== 'Concluído' && (
              <TouchableOpacity style={styles.smallButton} onPress={() => marcarConcluido(item.id)}>
                <Text style={styles.smallButtonText}>Marcar concluído</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListFooterComponent={
          <Text style={styles.hint}>
            Persista estes dados em `planos_acao` no Firestore usando addDoc/updateDoc.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  smallButton: {
    marginTop: 8,
    backgroundColor: '#0ea5e9',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  smallButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  hint: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 16,
  },
});

export default PlanoAcaoScreen;

