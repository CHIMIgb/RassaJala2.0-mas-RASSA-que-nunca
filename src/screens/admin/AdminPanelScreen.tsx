// src/screens/admin/AdminPanelScreen.tsx
import React, {useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import { adminPanelStyles } from '../../styles/screens/admin/AdminPanelScreen.styles';

type AdminPanelScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AdminPanelScreen = () => {
  const navigation = useNavigation<AdminPanelScreenNavigationProp>();

  // Usar useFocusEffect para manejar el evento solo cuando la pantalla está enfocada
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Cerrar la aplicación en AdminPanelScreen
        BackHandler.exitApp()
        return true;
      };

      // Agregar el event listener cuando la pantalla obtiene foco
      // BackHandler.addEventListener devuelve un objeto con método remove()
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      // Remover el event listener cuando la pantalla pierde foco
      return () => {
        subscription.remove(); // ← Forma correcta para RN 0.81.4
      };
    }, [])
  );

  const screenWidth = Dimensions.get('window').width;

  // Datos para gráficas
  const streamingSalesData = [
    { name: 'Netflix', sales: 45, color: '#E50914', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Disney+', sales: 30, color: '#113CCF', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'HBO Max', sales: 25, color: '#0000FF', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Amazon Prime', sales: 20, color: '#00A8E1', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Spotify', sales: 35, color: '#1DB954', legendFontColor: '#7F7F7F', legendFontSize: 12 },
  ];

  const monthlySalesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [120, 145, 180, 210, 240, 280],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const categorySalesData = {
    labels: ['Películas', 'Series', 'Música', 'Deportes', 'Kids'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5]
      }
    ]
  };

  const quickStats = [
    { title: 'Ventas Hoy', value: '₡250,000', icon: '💰', change: '+12%' },
    { title: 'Usuarios Activos', value: '1,250', icon: '👥', change: '+5%' },
    { title: 'Cuentas Vendidas', value: '156', icon: '📊', change: '+8%' },
    { title: 'Tasa Conversión', value: '4.2%', icon: '📈', change: '+1.5%' },
  ];

  const menuItems = [
    { title: 'Gestión de Cuentas', icon: '🔐', screen: 'AccountManagement' },
    { title: 'Control de Stock', icon: '📦', screen: 'StockManagement' },
    { title: 'Reportes Detallados', icon: '📋', screen: 'DetailedReports' },
    { title: 'Clientes Premium', icon: '⭐', screen: 'PremiumClients' },
  ];

  const handleMenuItemPress = (screen: string) => {
    alert(`Navegaría a: ${screen}`);
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#007AFF'
    }
  };

  return (
    <ScrollView style={adminPanelStyles.container}>
      {/* Header */}
      <View style={adminPanelStyles.header}>
        <Text style={adminPanelStyles.title}>Dashboard de Ventas</Text>
        <Text style={adminPanelStyles.subtitle}>Análisis de cuentas de streaming</Text>
      </View>

      {/* Estadísticas rápidas */}
      <View style={adminPanelStyles.statsGrid}>
        {quickStats.map((stat, index) => (
          <View key={index} style={adminPanelStyles.statCard}>
            <Text style={adminPanelStyles.statIcon}>{stat.icon}</Text>
            <Text style={adminPanelStyles.statValue}>{stat.value}</Text>
            <Text style={adminPanelStyles.statTitle}>{stat.title}</Text>
            <Text style={[adminPanelStyles.statChange, stat.change.includes('+') ? adminPanelStyles.positive : adminPanelStyles.negative]}>
              {stat.change}
            </Text>
          </View>
        ))}
      </View>

      {/* Gráfica de ventas por plataforma */}
      <View style={adminPanelStyles.chartContainer}>
        <Text style={adminPanelStyles.chartTitle}>Distribución por Plataforma</Text>
        <PieChart
          data={streamingSalesData}
          width={screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          accessor={"sales"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 0]}
          absolute
        />
      </View>

      {/* Gráfica de ventas mensuales */}
      <View style={adminPanelStyles.chartContainer}>
        <Text style={adminPanelStyles.chartTitle}>Tendencia de Ventas Mensuales</Text>
        <LineChart
          data={monthlySalesData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={adminPanelStyles.chart}
        />
      </View>


      {/* Acciones rápidas */}
      <View style={adminPanelStyles.actionsContainer}>
        <Text style={adminPanelStyles.sectionTitle}>Acciones Rápidas</Text>
        <View style={adminPanelStyles.actionsGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={adminPanelStyles.actionButton}
              onPress={() => handleMenuItemPress(item.screen)}
            >
              <Text style={adminPanelStyles.actionIcon}>{item.icon}</Text>
              <Text style={adminPanelStyles.actionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Resumen adicional */}
      <View style={adminPanelStyles.summaryContainer}>
        <Text style={adminPanelStyles.sectionTitle}>Resumen del Mes</Text>
        <View style={adminPanelStyles.summaryRow}>
          <View style={adminPanelStyles.summaryItem}>
            <Text style={adminPanelStyles.summaryNumber}>₡1,250,000</Text>
            <Text style={adminPanelStyles.summaryLabel}>Ingresos Totales</Text>
          </View>
          <View style={adminPanelStyles.summaryItem}>
            <Text style={adminPanelStyles.summaryNumber}>892</Text>
            <Text style={adminPanelStyles.summaryLabel}>Cuentas Vendidas</Text>
          </View>
          <View style={adminPanelStyles.summaryItem}>
            <Text style={adminPanelStyles.summaryNumber}>94%</Text>
            <Text style={adminPanelStyles.summaryLabel}>Satisfacción</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminPanelScreen;