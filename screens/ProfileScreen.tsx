import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseInit';

const ProfileScreen = () => {
    const [userData, setUserData] = useState({
        imgUrl: '',
        phone: '',
        role: '',
        username: '',
        email: '',
    });

    const [isEditable, setIsEditable] = useState(false);
    const auth = getAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userProfile = await AsyncStorage.getItem('userProfile');
                if (userProfile) {
                    setUserData(JSON.parse(userProfile));
                }
            } catch (error) {
                console.error('Error loading user data: ', error);
            }
        };

        loadUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.navigate('Login' as never);
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const userEmail = userData.email.replace('@', '.');
            const userDoc = doc(db, "Customers", userEmail);
            const docSnap = await getDoc(userDoc);

            if (docSnap.exists()) {
                await updateDoc(userDoc, {
                    phone: userData.phone,
                    username: userData.username,
                });
                alert('Thông tin đã được cập nhật!');
            } else {
                console.error('Không tìm thấy tài liệu người dùng!');
            }

            setIsEditable(false);
        } catch (error) {
            console.error('Error updating profile: ', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {userData.imgUrl ? (
                <Image source={{ uri: userData.imgUrl }} style={styles.profileImage} />
            ) : (
                <Icon name="person-circle-outline" size={100} color="#ffffff" style={styles.profileImage} />
            )}
            <Text style={styles.name}>{userData.username}</Text>
            <Text style={styles.role}>{userData.role}</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={userData.email}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                    editable={isEditable}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    value={userData.phone}
                    onChangeText={(text) => setUserData({ ...userData, phone: text })}
                    editable={isEditable}
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Vai trò</Text>
                <TextInput
                    style={styles.input}
                    value={userData.role}
                    onChangeText={(text) => setUserData({ ...userData, role: text })}
                    editable={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tên người dùng</Text>
                <TextInput
                    style={styles.input}
                    value={userData.username}
                    onChangeText={(text) => setUserData({ ...userData, username: text })}
                    editable={isEditable}
                />
            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                    if (isEditable) {
                        handleUpdate();
                    } else {
                        setIsEditable(true);
                    }
                }}
            >
                <Text style={styles.editButtonText}>{isEditable ? 'Lưu thay đổi' : 'Chỉnh sửa'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        alignItems: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    role: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    editButton: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 40,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    editButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 15,
        paddingVertical: 12,
        paddingHorizontal: 40,
        backgroundColor: '#f44336',
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
