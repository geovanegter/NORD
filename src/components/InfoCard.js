import { View, Text, StyleSheet } from 'react-native';

const InfoCard = ({ title, value, subtitle, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexGrow: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#777',
  },
});

export default InfoCard;
