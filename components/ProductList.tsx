import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Product {
    categoryId: string[];
    nameMovie: string;
    imgUrl: string;
    describe: string;
    duration: string;
    rentalPrice: string;
}

interface ProductListProps {
    categoryName: string;
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ categoryName, products }) => {
    const navigation = useNavigation<NavigationProp<any>>();

    console.log(products)
    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>{categoryName}</Text>
            <FlatList
                horizontal
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    >
                        <View style={styles.productContainer}>
                            <Image source={{ uri: item.imgUrl }} style={styles.productImage} />
                            <Text style={styles.productTitle}>{item.nameMovie}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.categoryId[0]}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#333',
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    productContainer: {
        marginRight: 10,
        width: 150,
        height: 200,
        backgroundColor: '#444',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#fff',
        textAlign: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
    },
    productPrice: {
        fontSize: 12,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 4,
    },
});

export default ProductList; 