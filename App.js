import 'react-native-gesture-handler';
/**
 * Quickstart:
 * 1. Instale as dependencias: `npm install`
 * 2. Preencha `firebaseConfig` em `src/services/firebase.js`
 * 3. Rode o app com `npx expo start` (use `npm run seed` apos configurar o Firebase se quiser dados exemplo)
 */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import * as Notifications from 'expo-notifications';

import LoginScreen from './src/auth/LoginScreen';
import DashboardScreen from './src/representante/DashboardScreen';
import PrioridadesScreen from './src/representante/PrioridadesScreen';
import RoteirizacaoScreen from './src/representante/RoteirizacaoScreen';
import ClienteScreen from './src/representante/ClienteScreen';
import PositivacaoScreen from './src/representante/PositivacaoScreen';
import DashboardGestorScreen from './src/gestor/DashboardGestorScreen';
import GestaoIndividualScreen from './src/gestor/GestaoIndividualScreen';
import PlanoAcaoScreen from './src/gestor/PlanoAcaoScreen';
import CampanhasScreen from './src/gestor/CampanhasScreen';
import useAuthStore from './src/store/useAuthStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function RepresentanteTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Prioridades" component={PrioridadesScreen} />
      <Tab.Screen name="Roteirizacao" component={RoteirizacaoScreen} />
      <Tab.Screen name="Clientes" component={ClienteScreen} />
      <Tab.Screen name="Positivacao" component={PositivacaoScreen} />
    </Tab.Navigator>
  );
}

function GestorTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DashboardGestor" component={DashboardGestorScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Gestao Individual" component={GestaoIndividualScreen} />
      <Tab.Screen name="Planos de Acao" component={PlanoAcaoScreen} />
      <Tab.Screen name="Campanhas" component={CampanhasScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const { user, perfil, isLoading, bootstrapAuth } = useAuthStore();

  useEffect(() => {
    const unsub = bootstrapAuth();
    // Configure notificacoes push assim que tiver as chaves/credenciais reais do Expo
    // Ex.: obter token e registrar no Firestore para o usuario logado
    return () => {
      if (typeof unsub === 'function') {
        unsub();
      }
    };
  }, [bootstrapAuth]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={LoginScreen} />
        ) : perfil === 'gestor' ? (
          <Stack.Screen name="Gestor" component={GestorTabs} />
        ) : (
          <Stack.Screen name="Representante" component={RepresentanteTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
