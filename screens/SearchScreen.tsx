import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebaseFirestore';
import debounce from 'lodash.debounce';

type Movie = {
    movieId: string;
    nameMovie: string;
    imgUrl: string;
    categoryId: string;
    createdAt: string;
    describe: string;
    duration: string;
    likeCount: number;
    protagonist: string;
    rentalPrice: number;
    views: number;
    vip: boolean;
};

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [randomMovies, setRandomMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const fetchMovies = useCallback(async () => {
        try {
            setIsLoading(true);
            const querySnapshot = await getDocs(collection(db, 'Movies'));
            const moviesData = querySnapshot.docs.map(doc => ({
                movieId: doc.id,
                ...doc.data(),
            } as Movie));
            setMovies(moviesData);
            setRandomMovies(moviesData.sort(() => 0.5 - Math.random()).slice(0, 4));
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu phim: ', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handleSearch = useCallback(
        debounce((query: string) => {
            if (!query) {
                setFilteredMovies([]);
                setIsDropdownVisible(false);
                return;
            }
            const results = movies.filter(movie =>
                movie.nameMovie?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMovies(results);
            setIsDropdownVisible(true);
        }, 300),
        [movies]
    );

    const onSearchChange = (text: string) => {
        setSearchQuery(text);
        handleSearch(text);
    };

    const handleMoviePress = (movie: Movie) => {
        console.log(`Chọn: ${movie.nameMovie}`);
        navigation.navigate('ProductDetail', { product: movie });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tìm Kiếm Phim</Text>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color="#888" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Nhập tên phim, diễn viên, hoặc thể loại..."
                    placeholderTextColor="#ccc"
                    value={searchQuery}
                    onChangeText={onSearchChange}
                />
            </View>

            {isDropdownVisible && (
                <View style={styles.dropdownContainer}>
                    {filteredMovies.length > 0 ? (
                        <FlatList
                            data={filteredMovies}
                            keyExtractor={item => item.movieId}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMoviePress(item)}>
                                    <Image source={{ uri: item.imgUrl }} style={styles.dropdownImage} />
                                    <Text style={styles.dropdownText}>{item.nameMovie}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <Text style={styles.noResultsText}>Không tìm thấy kết quả phù hợp.</Text>
                    )}
                </View>
            )}

            {isLoading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <>
                    <Text style={styles.suggestionTitle}>Có thể bạn quan tâm</Text>
                    <FlatList
                        data={randomMovies}
                        horizontal
                        keyExtractor={item => item.movieId}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.suggestionItem} onPress={() => handleMoviePress(item)}>
                                <Image source={{ uri: item.imgUrl }} style={styles.suggestionImage} />
                                <Text style={styles.suggestionText}>{item.nameMovie}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 15,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#fff',
        fontSize: 16,
    },
    dropdownContainer: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
        maxHeight: 250,
        marginBottom: 20,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dropdownImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    dropdownText: {
        color: '#fff',
        fontSize: 16,
    },
    noResultsText: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
    },
    suggestionTitle: {
        fontSize: 20,
        color: '#ffffff',
        marginVertical: 15,
    },
    suggestionItem: {
        marginRight: 10,
        alignItems: 'center',
    },
    suggestionImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    suggestionText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
        width: 140
    },
});

export default SearchScreen;
