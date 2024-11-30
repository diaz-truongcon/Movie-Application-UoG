import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebaseFirestore';
import ProductList from '../components/ProductList';
import { useNavigation } from '@react-navigation/native';

// Define types for categories and movies
type Category = {
    id: string;
    nameCategory: string;
};

type Movie = {
    categoryId: string;
    title: string;
    createdAt: string;
    describe: string;
    duration: string;
    imgUrl: string;
    likeCount: number;
    nameMovie: string;
    protagonist: string;
    rentalPrice: number;
    views: number;
    vip: boolean;
    movieId: string;
};

const HomeScreen = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigation = useNavigation();

    const fetchCategories = useCallback(async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Categories'));
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                nameCategory: doc.data().nameCategory,
            }));
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    }, []);

    const fetchMovies = useCallback(async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Movies'));
            const moviesData = querySnapshot.docs.map(doc => ({
                categoryId: doc.data().categoryId,
                title: doc.data().title,
                createdAt: doc.data().createdAt,
                describe: doc.data().describe,
                duration: doc.data().duration,
                imgUrl: doc.data().imgUrl,
                likeCount: doc.data().likeCount,
                nameMovie: doc.data().nameMovie,
                protagonist: doc.data().protagonist,
                rentalPrice: doc.data().rentalPrice,
                views: doc.data().views,
                vip: doc.data().vip,
                movieId: doc.id,
            }));
            setMovies(moviesData);
        } catch (error) {
            console.error("Error fetching movies: ", error);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
        fetchMovies();
    }, [fetchCategories, fetchMovies]);

    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={require('../assets/Home.png')} style={styles.background}>
                <View style={styles.overlay} />
                <View style={styles.content}>
                    <Text style={styles.title}>VIETNAMESE MOVIE</Text>
                    <Text style={styles.subtitle}>Gặp Lại</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={fetchCategories}>
                            <Ionicons name="add-circle-outline" size={20} color="#000" />
                            <Text style={styles.buttonText}>Add to list</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={fetchMovies}>
                            <Ionicons name="star-outline" size={20} color="#000" />
                            <Text style={styles.buttonText}>Upgrade package</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => { fetchCategories(); fetchMovies(); }}>
                            <Ionicons name="information-circle-outline" size={20} color="#000" />
                            <Text style={styles.buttonText}>Detail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            {categories.map((category) => {
                const categoryMovies = movies.filter(movie => movie.categoryId.includes(category.id));
                if (categoryMovies.length > 0) {
                    return (
                        <ProductList
                            key={category.id}
                            categoryName={category.nameCategory}
                            products={categoryMovies}
                            onProductPress={(product) => navigation.navigate('ProductDetail', { product })}
                        />
                    );
                }
                return null;
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    background: {
        width: '100%',
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        objectFit: 'fill'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    subtitle: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#ffffff',
        marginLeft: 5,
    },
});

export default HomeScreen; 