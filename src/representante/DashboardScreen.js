import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import useAuthStore from '../store/useAuthStore';
import useSalesStore from '../store/useSalesStore';
import InfoCard from '../components/InfoCard';
import { formatCurrency } from '../utils/money';
import { getClientesInativos } from '../services/firestoreQueries';

const DashboardScreen = () => {
  const { user } = useAuthStore();
  const { metas, vendas, resumo, carregarDados } = useSalesStore();
  const [clientesInativos, setClientesInativos] = useState([]);
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  useEffect(() => {
    if (!user) return;
    carregarDados(user.uid);
    getClientesInativos(user.uid, 45).then(setClientesInativos);
  }, [user, carregarDados]);

  const metaDoMes = metas[0];
  const vendasDoMes = vendas.reduce((acc, venda) => acc + venda.valor, 0);
  const metaSemanal = metaDoMes ? metaDoMes.valor / 4 : 0;
  const faltaParaMetaSemana = Math.max(0, metaSemanal - vendasDoMes / (new Date().getDate() / 30 || 1));

  const resumoCards = [
    {
      key: 'metaMes',
      title: 'Meta do mes',
      value: metaDoMes ? formatCurrency(metaDoMes.valor) : 'Sem meta configurada',
      subtitle: 'Configure/importe via Firestore metas',
    },
    { key: 'vendas', title: 'Vendas realizadas', value: formatCurrency(vendasDoMes) },
    {
      key: 'percentual',
      title: '% realizado',
      value: `${resumo.percentual}%`,
      subtitle: 'Baseado no total de vendas x meta',
    },
    {
      key: 'forecast',
      title: 'Forecast',
      value: formatCurrency(resumo.forecast),
      subtitle: 'Projecao ate o fim do mes',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.inner, isWide && styles.innerWide]}>
          <Text style={styles.sectionTitle}>Resumo do mes</Text>
          <View style={[styles.cardGrid, isWide && styles.cardGridWide]}>
            {resumoCards.map((card) => (
              <InfoCard key={card.key} {...card} style={styles.cardResponsive} />
            ))}
          </View>

          <View style={[styles.alert, isWide && styles.alertWide]}>
            <Text style={styles.alertTitle}>Meta semanal</Text>
            <Text style={styles.alertText}>
              Faltam {formatCurrency(faltaParaMetaSemana)} para atingir a meta estimada da semana.
            </Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.sectionTitle}>Daily Sales GPS</Text>
            <Text style={styles.panelSubtitle}>Clientes com risco de perder share.</Text>
            {clientesInativos.map((cliente) => (
              <View key={cliente.id} style={styles.listItem}>
                <View>
                  <Text style={styles.listTitle}>{cliente.nome}</Text>
                  <Text style={styles.listSubtitle}>{cliente.segmento ?? 'Segmento nao informado'}</Text>
                </View>
                <Text style={styles.listBadge}>{cliente.diasSemCompra} dias</Text>
              </View>
            ))}
            {clientesInativos.length === 0 && (
              <Text style={styles.emptyText}>
                Sem clientes inativos (>=45 dias). Conecte esta lista com Firestore via `getClientesInativos`.
              </Text>
            )}
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
    padding: 16,
  },
  inner: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  innerWide: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0f172a',
  },
  cardGrid: {
    gap: 12,
    marginBottom: 12,
  },
  cardGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardResponsive: {
    flexBasis: '48%',
    minWidth: 240,
  },
  alert: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 16,
    marginVertical: 20,
    gap: 4,
  },
  alertWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertTitle: {
    color: '#fcd34d',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  alertText: {
    color: '#fff',
    fontWeight: '500',
  },
  panel: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 4,
  },
  panelSubtitle: {
    color: '#64748b',
  },
  listItem: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listTitle: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  listSubtitle: {
    color: '#6b7280',
    fontSize: 12,
  },
  listBadge: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    fontWeight: '700',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  emptyText: {
    color: '#94a3b8',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default DashboardScreen;
