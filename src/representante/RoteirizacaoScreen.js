import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import useAuthStore from '../store/useAuthStore';
import { getClientesInativos } from '../services/firestoreQueries';
import { haversineDistance, openInGoogleMaps } from '../services/geo';

const RoteirizacaoScreen = () => {
  const { user } = useAuthStore();
  const [location, setLocation] = useState(null);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Ative a localização para usar a roteirização.');
        return;
      }
      const current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);
    })();
  }, []);

  useEffect(() => {
    if (!user || !location) return;
    getClientesInativos(user.uid, 15).then((lista) => {
      // Este mock atribui coordenadas fixas; substitua com campos vindos do Firestore.
      const enriched = lista.map((cliente, index) => ({
        ...cliente,
        coords: cliente.lastLocation ?? {
          latitude: -23.55 + index * 0.01,
          longitude: -46.63 + index * 0.01,
        },
      }));
      setClientes(
        enriched.map((cliente) => ({
          ...cliente,
          distancia: location ? haversineDistance(location, cliente.coords) : 0,
        }))
      );
    });
  }, [user, location]);

  const handleOpenRoute = (cliente) => {
    if (!location) return;
    openInGoogleMaps(location, cliente.coords);
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={location} title="Você" pinColor="blue" />
          {clientes.map((cliente) => (
            <Marker key={cliente.id} coordinate={cliente.coords} title={cliente.nome} />
          ))}
        </MapView>
      )}
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.subtitle}>{item.distancia.toFixed(1)} km</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleOpenRoute(item)}>
              <Text style={styles.buttonText}>Ver rota</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Capture a localização para sugerir clientes próximos.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    height: 200,
  },
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  name: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#64748b',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#111827',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
  },
  empty: {
    textAlign: 'center',
    padding: 16,
    color: '#94a3b8',
  },
});

export default RoteirizacaoScreen;

