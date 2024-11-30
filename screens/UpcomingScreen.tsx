import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import db from '../firebaseFirestore';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Movie {
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
}

const UpcomingScreen = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchMovies = async () => {
            const querySnapshot = await getDocs(collection(db, 'Movies'));
            const moviesList: Movie[] = querySnapshot.docs.map(doc => ({
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
            }));
            setMovies(moviesList);
        };

        fetchMovies();
    }, []);

    const renderMovie = ({ item }: { item: Movie }) => (

        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>

            <View style={styles.movieContainer}>
                <Image source={{ uri: item.imgUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>{item.nameMovie}</Text>
                        {item.vip && (
                            <View style={styles.vipBadge}>
                                <Text style={styles.vipText}>VIP</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.infoRow}>
                        <View style={[styles.infoItem, { marginRight: 20 }]}>
                            <Ionicons name="time-outline" size={20} color="white" />
                            <Text style={styles.infoText}>{item.duration}</Text>
                        </View>
                        <View style={[styles.infoItem, { marginRight: 20 }]}>
                            <Ionicons name="eye-outline" size={20} color="white" />
                            <Text style={styles.infoText}>{item.views}</Text>
                        </View>
                        <View style={[styles.infoItem, { marginRight: 20 }]}>
                            <Ionicons name="pricetag-outline" size={20} color="white" />
                            <Text style={styles.infoText}>{item.rentalPrice}</Text>
                        </View>
                    </View>

                    <Text style={styles.protagonist}>
                        <Ionicons name="people-outline" size={16} color="#ccc" /> {item.protagonist}
                    </Text>

                    <Text style={styles.description} numberOfLines={2}>{item.describe}</Text>

                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="bookmark-outline" size={24} color="#fff" />
                            <Text style={styles.actionText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="heart-outline" size={24} color="#fff" />
                            <Text style={styles.actionText}>{item.likeCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="share-social-outline" size={24} color="#fff" />
                            <Text style={styles.actionText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Movie Upcoming</Text>
            <Text style={styles.description2}>
                Check out our upcoming movie releases.
            </Text>
            <FlatList
                data={movies}
                renderItem={renderMovie}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
        marginTop: 20
    },
    description2: {
        fontSize: 16,
        color: '#bbb',
        marginBottom: 16,
        textAlign: 'center',
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
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
    },
    movieContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#2c2c2c',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    textContainer: {
        marginTop: 10,
        gap: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
    },
    vipBadge: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginLeft: 8,
    },
    vipText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12,
    },
    infoContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    duration: {
        color: '#ccc',
        fontSize: 14,
    },
    views: {
        color: '#ccc',
        fontSize: 14,
    },
    price: {
        color: '#ccc',
        fontSize: 14,
    },
    protagonist: {
        color: '#ccc',
        fontSize: 14,
    },
    description: {
        fontSize: 14,
        color: '#ccc',
        lineHeight: 20,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#3c3c3c',
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        color: '#ccc',
        fontSize: 12,
        marginTop: 4,
    },
});

export default UpcomingScreen;