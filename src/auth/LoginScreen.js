import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import useAuthStore from '../store/useAuthStore';

const LoginScreen = () => {
  const { signIn } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email.trim(), password);
    } catch (error) {
      Alert.alert('Falha no login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={[styles.panel, isWide && styles.panelWide]}>
          <View style={[styles.leftPane, isWide && styles.leftPaneWide]}>
            <Text style={styles.brand}>NORD</Text>
            <Text style={styles.subtitle}>Inteligencia comercial, agora tambem na web.</Text>
          </View>
          <View style={[styles.form, isWide && styles.formWide]}>
            <Text style={styles.title}>Acessar conta</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
            </TouchableOpacity>
            <Text style={styles.hint}>
              Conecte este formulario ao Firebase Auth (email/senha) apos preencher `firebaseConfig`.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e2e8f0',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  panel: {
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    gap: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 8,
  },
  panelWide: {
    flexDirection: 'row',
    padding: 40,
  },
  leftPane: {
    gap: 12,
  },
  leftPaneWide: {
    flex: 1,
    paddingRight: 40,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#e2e8f0',
  },
  brand: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
  },
  form: {
    width: '100%',
    gap: 12,
  },
  formWide: {
    flex: 1,
    paddingLeft: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  button: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  hint: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default LoginScreen;
