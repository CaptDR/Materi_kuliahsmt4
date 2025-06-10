import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getAuth, signOut } from 'firebase/auth'; // Import getAuth dan signOut
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../firebaseConfig'; // Pastikan db diimpor
import tw from '../../tailwind';

// Komponen MenuItem yang sedikit disesuaikan
const MenuItem = ({ icon, label, isLogout = false, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center p-3 border-b border-green-100 ${isLogout ? '' : 'last:border-b-0'}`} // Hapus border bawah untuk item terakhir
    >
      <Ionicons
        name={icon}
        size={20}
        color={isLogout ? '#dc2626' : '#065f46'}
        style={tw`mr-3`}
      />
      <Text
        style={[
          tw`text-base`,
          isLogout ? tw`text-red-600 font-bold` : tw`text-green-900`,
        ]}
      >
        {label}
      </Text>
      {/* Tambahkan ikon panah jika bukan logout */}
      {!isLogout && <Ionicons name="chevron-forward" size={18} color={tw.color('green-700')} style={tw`ml-auto`} />}
    </TouchableOpacity>
  );
};

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser; // Ambil informasi user yang sedang login

  const [profile, setProfile] = useState(null); // State untuk data profil
  const [loading, setLoading] = useState(true); // State untuk indikator loading awal
  const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
  const [tempProfile, setTempProfile] = useState({}); // State sementara untuk data yang diedit
  const [isLoadingSave, setIsLoadingSave] = useState(false); // State untuk loading saat menyimpan

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'user_profiles', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
            setTempProfile(docSnap.data()); // Isi tempProfile dengan data yang ada
            console.log("Profile data loaded:", docSnap.data());
          } else {
            // Fallback: Jika dokumen profil belum ada (misal user lama atau error saat signup)
            console.warn("User profile document does not exist for UID:", user.uid, ". Creating initial profile as fallback.");
            const initialProfileData = {
              uid: user.uid,
              email: user.email || '',
              username: user.displayName || '', // Ambil dari Auth displayName sebagai username awal
              fullName: user.displayName || '', // Ambil dari Auth displayName sebagai nama lengkap awal
              phoneNumber: '',
              defaultAddress: {
                street: '',
                city: '',
                postalCode: '',
                province: ''
              },
              notificationPreferences: {
                orderUpdates: true,
                promotions: false,
              },
              createdAt: serverTimestamp(), // Gunakan serverTimestamp untuk konsistensi
              updatedAt: serverTimestamp(),
            };
            await setDoc(docRef, initialProfileData);
            setProfile(initialProfileData);
            setTempProfile(initialProfileData);
          }
        } catch (error) {
          console.error("Error fetching or creating profile:", error);
          Alert.alert("Error", "Gagal memuat atau membuat data profil.");
        } finally {
          setLoading(false); // Hentikan loading
        }
      } else {
        setLoading(false); // Jika tidak ada user, hentikan loading
        // Bisa juga arahkan ke LoginScreen jika tidak ada user
        // navigation.replace('Login');
      }
    };

    fetchProfile();
  }, [user]); // Dependensi user, agar dijalankan ulang jika user berubah (misal setelah login/logout)

  const handleSaveProfile = async () => {
    setIsLoadingSave(true); // Mulai loading simpan
    try {
      if (user && tempProfile) {
        const docRef = doc(db, 'user_profiles', user.uid);
        await setDoc(docRef, {
          ...tempProfile,
          updatedAt: serverTimestamp() // Update timestamp saat disimpan
        }, { merge: true }); // Penting: merge agar tidak menimpa field lain

        setProfile(tempProfile); // Update state profile dengan data yang disimpan
        setIsEditing(false); // Keluar dari mode edit
        Alert.alert('Sukses', 'Profil berhasil diperbarui!');
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert('Error', 'Gagal menyimpan profil. Silakan coba lagi.');
    } finally {
      setIsLoadingSave(false); // Hentikan loading simpan
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await signOut(auth);
              Alert.alert('Logout Berhasil', 'Anda telah keluar dari akun.');
              navigation.replace('Login'); // Ganti dengan nama screen login Anda
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert('Error Logout', 'Terjadi kesalahan saat logout.');
            }
          }
        }
      ]
    );
  };

  // Tampilkan loading spinner jika data sedang diambil
  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-green-50`}>
        <ActivityIndicator size="large" color={tw.color('green-700')} />
        <Text style={tw`mt-2 text-green-600`}>Memuat profil...</Text>
      </SafeAreaView>
    );
  }

  // Tampilkan pesan jika tidak ada user yang login
  if (!user) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-green-50 p-4`}>
        <Text style={tw`text-lg text-green-700 mb-4 text-center`}>Anda belum login.</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={tw`bg-green-600 py-3 px-6 rounded-md shadow-md`}
        >
          <Text style={tw`text-white font-bold text-base`}>Login Sekarang</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-green-50`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Header Profile */}
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={tw`items-center mb-6`}
        >
          <Image
            source={require('../../assets/delta.png')} // Ganti dengan user.photoURL jika tersedia
            style={tw`w-24 h-24 rounded-full mb-2 border-2 border-green-300`}
          />
          <Text style={tw`text-xl font-bold text-green-900`}>{profile?.username || user.displayName || 'Nama Pengguna'}</Text>
          <Text style={tw`text-sm text-green-700`}>{profile?.email || user.email || 'email@example.com'}</Text>
        </Animated.View>

        {/* Informasi Akun */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={tw`bg-white rounded-xl p-4 shadow-md mb-4`}
        >
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-base font-bold text-green-800`}>Informasi Pribadi</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Ionicons name={isEditing ? "close-circle" : "pencil"} size={22} color={tw.color('green-700')} />
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <View style={tw`mb-2`}>
            <Text style={tw`text-sm font-medium text-green-600`}>Nama Lengkap:</Text>
            {isEditing ? (
              <TextInput
                style={tw`border border-green-300 rounded-md px-3 py-2 text-base text-green-900`}
                placeholder="Isi nama lengkap Anda"
                placeholderTextColor={tw.color('green-400')}
                value={tempProfile.fullName}
                onChangeText={(text) => setTempProfile({ ...tempProfile, fullName: text })}
              />
            ) : (
              <Text style={tw`text-base text-green-900`}>{profile?.fullName || 'Belum diatur'}</Text>
            )}
          </View>

          {/* Phone Number */}
          <View style={tw`mb-2`}>
            <Text style={tw`text-sm font-medium text-green-600`}>Nomor HP:</Text>
            {isEditing ? (
              <TextInput
                style={tw`border border-green-300 rounded-md px-3 py-2 text-base text-green-900`}
                placeholder="Isi nomor telepon Anda"
                placeholderTextColor={tw.color('green-400')}
                value={tempProfile.phoneNumber}
                onChangeText={(text) => setTempProfile({ ...tempProfile, phoneNumber: text })}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={tw`text-base text-green-900`}>{profile?.phoneNumber || 'Belum diatur'}</Text>
            )}
          </View>

          {/* Default Address */}
          <View style={tw`mb-2`}>
            <Text style={tw`text-sm font-medium text-green-600`}>Alamat Default:</Text>
            {isEditing ? (
              <>
                <TextInput
                  style={tw`border border-green-300 rounded-md px-3 py-2 mb-1 text-base text-green-900`}
                  placeholder="Jalan, Nomor, RT/RW"
                  placeholderTextColor={tw.color('green-400')}
                  value={tempProfile.defaultAddress?.street || ''}
                  onChangeText={(text) => setTempProfile(prev => ({ ...prev, defaultAddress: { ...prev.defaultAddress, street: text } }))}
                />
                <TextInput
                  style={tw`border border-green-300 rounded-md px-3 py-2 mb-1 text-base text-green-900`}
                  placeholder="Kota"
                  placeholderTextColor={tw.color('green-400')}
                  value={tempProfile.defaultAddress?.city || ''}
                  onChangeText={(text) => setTempProfile(prev => ({ ...prev, defaultAddress: { ...prev.defaultAddress, city: text } }))}
                />
                <TextInput
                  style={tw`border border-green-300 rounded-md px-3 py-2 text-base text-green-900`}
                  placeholder="Provinsi"
                  placeholderTextColor={tw.color('green-400')}
                  value={tempProfile.defaultAddress?.province || ''}
                  onChangeText={(text) => setTempProfile(prev => ({ ...prev, defaultAddress: { ...prev.defaultAddress, province: text } }))}
                />
                {/* Anda bisa tambahkan field lain seperti postalCode */}
              </>
            ) : (
              <Text style={tw`text-base text-green-900`}>
                {profile?.defaultAddress?.street || 'Belum diatur'}
                {profile?.defaultAddress?.city ? `, ${profile.defaultAddress.city}` : ''}
                {profile?.defaultAddress?.province ? `, ${profile.defaultAddress.province}` : ''}
              </Text>
            )}
          </View>

          {/* Tombol Simpan Perubahan */}
          {isEditing && (
            <TouchableOpacity
              onPress={handleSaveProfile}
              style={tw`bg-green-600 py-3 rounded-md mt-4 ${isLoadingSave ? 'opacity-50' : ''}`}
              disabled={isLoadingSave}
            >
              <Text style={tw`text-white text-center font-semibold text-base`}>
                {isLoadingSave ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Menu Lain */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(500)}
          style={tw`bg-white rounded-xl p-2 shadow-md`}
        >
          {/* Mengganti "Ubah Profil" karena sudah ada fungsi edit di atas */}
          {/* <MenuItem icon="person" label="Ubah Profil" onPress={() => setIsEditing(true)} /> */}
          <MenuItem icon="receipt" label="Riwayat Pesanan" onPress={() => navigation.navigate('MainApp')} /> {/* Sesuaikan nama rute */}
          <MenuItem
            icon="settings"
            label="Pengaturan Akun"
            onPress={() => navigation.getParent()?.navigate('Settings')} // Navigasi ke Settings
          />
          {/* <MenuItem icon="moon" label="Mode Gelap" onPress={() => console.log('Mode Gelap ditekan')} /> */}
          <MenuItem icon="log-out" label="Keluar" isLogout onPress={handleLogout} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;