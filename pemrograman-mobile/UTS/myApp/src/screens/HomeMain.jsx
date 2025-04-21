import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const {width} = Dimensions.get('window');

const HomeMain = () => {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selamat Datang di Deltaromeo Outdoor!</Text>
      <Text style={styles.subtitle}>Sahabat Petualanganmu 🌄</Text>

      <Image
        source={require('../../assets/delta.png')}
        style={styles.banner}
        resizeMode="contain"
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Promo Spesial Minggu Ini!</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Diskon 25% Alat Camping</Text>
          <Text style={styles.cardDesc}>Dapatkan promo hingga akhir pekan ini!</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kenapa Deltaromeo Outdoor?</Text>
        <Text style={styles.benefit}>✅ Produk Berkualitas Tinggi</Text>
        <Text style={styles.benefit}>✅ Harga Terjangkau</Text>
        <Text style={styles.benefit}>✅ Layanan Pelanggan Ramah</Text>
        <Text style={styles.benefit}>✅ Cocok untuk Semua Jenis Petualangan</Text>
      </View>
      <Image
        source={require('../../assets/2.png')}
        style={styles.banner}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/3.png')}
        style={styles.banner}
        resizeMode="contain"
      />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5fff8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#153932',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#417d5a',
    marginBottom: 20,
  },
  banner: {
    width: width * 0.9, // 90% dari lebar layar
    height: width * 1.0, // tinggi disesuaikan agar proporsional (bisa kamu ubah)
    alignSelf: 'center', // biar tetap di tengah
    marginVertical: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f3d2e',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#b3dbc1',
    padding: 15,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#103c2e',
  },
  cardDesc: {
    fontSize: 14,
    color: '#204d3a',
  },
  benefit: {
    fontSize: 14,
    marginVertical: 4,
    color: '#2a5c43',
  },
});

export default HomeMain;