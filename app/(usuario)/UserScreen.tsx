import React from "react";
import { NativeWindStyleSheet } from "nativewind";


import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { ProgressChart, BarChart } from "react-native-chart-kit";
import LoadingIcon from "../../components/loadingIcon";

const screenWidth = Dimensions.get("window").width;

const DashboardScreen = () => {
  const progressData = {
    labels: ["Programs"],
    data: [0.74], // Progreso (37/50 programas)
  };

  const barData = {
    labels: ["Arrays", "Matemáticas", "Lógica"],
    datasets: [
      {
        data: [30, 70, 50], // Datos para cada categoría
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://i.pinimg.com/474x/9b/67/88/9b6788434b3ea5d2c1ade31388def253.jpg",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Estudiante ITS</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statText}>PUNTOS</Text>
            <Text style={styles.statNumber}>590</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statText}>PROGRAMADOR</Text>
            <Text style={styles.statNumber}>Junior</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statText}>PUESTO</Text>
            <Text style={styles.statNumber}>#32</Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>
          Haz programado 24 códigos este mes!
        </Text>
        <View style={styles.progressContainer}>
          {/* Gráfico circular */}
          <ProgressChart
            data={progressData}
            width={screenWidth * 0.8}
            height={180}
            strokeWidth={12}
            radius={40}
            chartConfig={chartConfig}
            hideLegend={true} // Ocultar la leyenda predeterminada
          />
          {/* Texto superpuesto dentro del gráfico */}
          <View style={styles.textInCircle}>
            <Text style={styles.programsText}>37/50</Text>
            <Text style={styles.programsSubText}>programas</Text>
          </View>
        </View>

        {/* Rectángulos para "5 Quizzes Creados" y "21 Programados" */}
        <View style={styles.statsRow}>
          <View style={styles.statBoxGreen}>
            <Text style={styles.statBoxText}>5 Quizzes Creados</Text>
          </View>
          <View style={styles.statBoxWhite}>
            <Text style={styles.statBoxText}>21 Programados</Text>
          </View>
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categorías Top!</Text>
        <BarChart
          data={barData}
          width={screenWidth * 0.8}
          height={220}
          yAxisLabel="" // Prefijo vacío
          yAxisSuffix="%"
          yAxisInterval={1} // Para mostrar cada valor, 0, 25, 50, 75, 100
          fromZero={true} // Asegura que el eje Y comience desde 0
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
      </View>
    </ScrollView>
  );
};

// Configuración de los gráficos
const chartConfig = {
  backgroundGradientFrom: "#e6e6fa",
  backgroundGradientTo: "#e6e6fa",
  color: (opacity = 1) => `rgba(63, 191, 127, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // opcional
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#28a745",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  statBox: {
    alignItems: "center",
  },
  statText: {
    fontSize: 12,
    color: "#fff",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  statsSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  textInCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  programsText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  programsSubText: {
    fontSize: 10,
    color: "#555",
  },
  statBoxGreen: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  statBoxWhite: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#28a745",
  },
  statBoxText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  categoriesSection: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default DashboardScreen;
