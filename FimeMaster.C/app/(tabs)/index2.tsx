import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Usa expo vector icons o instala react-native-vector-icons

const quizzes = [
  {
    id: '1',
    title: 'Programa Arrays',
    subtitle: 'Estructura de Datos',
    icon: 'bar-chart-outline',
  },
  {
    id: '2',
    title: 'Programa Arrays',
    subtitle: 'Estructura de Datos',
    icon: 'bar-chart-outline',
  },
  {
    id: '3',
    title: 'Programa calculadora',
    subtitle: 'Logica matematica',
    icon: 'calculator-outline',
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>BUENOS DIAS</Text>
          <Text style={styles.username}>Yazmin Melgoza</Text>
        </View>
        <Image
          source={{ uri: 'https://i.imgur.com/6VBx3io.png' }} // Imagen de perfil
          style={styles.profileImage}
        />
      </View>

      {/* Botones de Acción */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="qr-code-outline" size={50} color="green" />
          <Text style={styles.actionButtonText}>Escanear Código</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="code-outline" size={50} color="green" />
          <Text style={styles.actionButtonText}>Crear test</Text>
        </TouchableOpacity>
      </View>

      {/* Quiz Recientes */}
      <View style={styles.quizSection}>
        <View style={styles.quizHeader}>
          <Text style={styles.quizTitle}>Quiz Recientes</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>ver todos {'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Quizzes */}
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.quizItem}>
              <Ionicons name={item.icon} size={40} color="green" style={styles.quizIcon} />
              <View style={styles.quizTextContainer}>
                <Text style={styles.quizTitleText}>{item.title}</Text>
                <Text style={styles.quizSubtitleText}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={24} color="gray" />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity>
          <Ionicons name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={30} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between', // Distribuye el contenido con espacio entre ellos
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30, // Aumentamos el padding del header
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 180, // Incrementamos la altura para más espacio en el área verde
  },
  headerTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center', // Centramos el contenido verticalmente
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // tamaño de la imagen de perfil
    alignSelf: 'center',// Centramos la imagen en el header
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionButton: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  actionButtonText: {
    marginTop: 10,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  quizSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#4CAF50',
  },
  quizItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10,
  },
  quizIcon: {
    marginRight: 20,
  },
  quizTextContainer: {
    flex: 1,
  },
  quizTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizSubtitleText: {
    color: '#757575',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignSelf: 'stretch', // Empuja la barra hacia abajo
  },
});
