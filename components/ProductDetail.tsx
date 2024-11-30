import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebaseFirestore';

interface ProductDetailProps {
    route: {
        params: {
            product: {
                nameMovie: string;
                imgUrl: string;
                describe: string;
                duration: string;
                rentalPrice: string;
                protagonist: string;
                views: number;
                likeCount: number;
                movieId: string;
            };
        };
    };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
    const { product } = route.params;
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const fetchEpisodeData = async () => {
        if (!product.movieId) {
            Alert.alert('Movie ID is missing.');
            return;
        }
        try {
            const q = query(collection(db, 'Episodes'), where('movieId', '==', product.movieId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const episodeData = querySnapshot.docs[0].data();
                setVideoUrl(episodeData.URLmovie);
                openYouTube();
            } else {
                Alert.alert('No episode found for this movie.');
            }
        } catch (error) {
            console.error("Error fetching episode data: ", error);
            Alert.alert('Error fetching episode data.');
        }
    };

    const openYouTube = () => {
        if (videoUrl) {
            Linking.openURL(videoUrl).catch(err => {
                console.error("Failed to open URL: ", err);
                Alert.alert('Failed to open URL.');
            });
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product?.imgUrl }} style={styles.productImage} />
            <View style={styles.detailsContainer}>
                <Text style={styles.productTitle}>{product.nameMovie}</Text>
                
                <View style={styles.infoRow}>
                    <View style={[styles.infoItem, { marginRight: 20 }]}>
                        <Ionicons name="time-outline" size={20} color="white" />
                        <Text style={styles.infoText}>{product.duration}</Text>
                    </View>
                    <View style={[styles.infoItem, { marginRight: 20 }]}>
                        <Ionicons name="eye-outline" size={20} color="white" />
                        <Text style={styles.infoText}>{product.views}</Text>
                    </View>
                    <View style={[styles.infoItem, { marginRight: 20 }]}>
                        <Ionicons name="heart-outline" size={20} color="white" />
                        <Text style={styles.infoText}>{product.likeCount}</Text>
                    </View>
                </View>
                <Text style={styles.productInfo}>Protagonist: {product.protagonist}</Text>

                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconButton} onPress={fetchEpisodeData}>
                        <Ionicons name="play-circle" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="add-circle" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="download" size={40} color="white" />
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.productDescription}>{product.describe}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
    },
    productImage: {
        width: '100%',
        height: 300,
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: '#2c2c2c',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    productTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    infoItem: {
        flexDirection: 'row',
    },
    infoText: {
        fontSize: 14,
        color: '#aaa',
        marginLeft: 5,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    productDescription: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 20,
    },
    productInfo: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 18,
        color: '#888',
        marginTop: 10,
        textAlign: 'center',
    },
    iconButton: {
        padding: 10,
    },
    videoUrl: {
        fontSize: 16,
        color: '#00f',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default ProductDetail; 