import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Footer from '../components/common/Footer';
import { homeStyles } from '../styles/screens/HomeScreen.styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

// Datos de productos estáticos
const productsData = [
  {
    id: '1',
    name: 'Netflix Premium',
    duration: '1 mes',
    price: 9.99,
    category: 'streaming',
    image: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png',
    description: 'Cuenta premium con 4 pantallas simultáneas'
  },
  {
    id: '2',
    name: 'Spotify Premium',
    duration: '3 meses',
    price: 12.99,
    category: 'musica',
    image: 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png',
    description: 'Música sin anuncios y descarga offline'
  },
  {
    id: '3',
    name: 'Disney Plus',
    duration: '2 meses',
    price: 8.99,
    category: 'streaming',
    image: 'https://cdn-icons-png.flaticon.com/512/5977/5977610.png',
    description: 'Todo el contenido de Disney, Marvel, Star Wars y más'
  },
  {
    id: '4',
    name: 'HBO Max',
    duration: '1 mes',
    price: 7.99,
    category: 'streaming',
    image: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png', // Mismo que Netflix por ahora
    description: 'Series exclusivas y películas de estreno'
  },
  {
    id: '5',
    name: 'Crunchyroll Premium',
    duration: '6 meses',
    price: 19.99,
    category: 'anime',
    image: 'https://cdn-icons-png.flaticon.com/512/2504/2504940.png',
    description: 'Anime sin anuncios y simulcasts exclusivos'
  },
  {
    id: '6',
    name: 'Funimation Premium',
    duration: '3 meses',
    price: 14.99,
    category: 'anime',
    image: 'https://cdn-icons-png.flaticon.com/512/2504/2504940.png', // Mismo que Crunchyroll
    description: 'Anime doblado y subtitulado de alta calidad'
  },
  {
    id: '7',
    name: 'VIX Premium',
    duration: '1 mes',
    price: 5.99,
    category: 'novelas',
    image: 'https://cdn-icons-png.flaticon.com/512/2504/2504919.png',
    description: 'Telenovelas y series exclusivas en español'
  },
  {
    id: '8',
    name: 'Blim Premium',
    duration: '2 meses',
    price: 6.99,
    category: 'novelas',
    image: 'https://cdn-icons-png.flaticon.com/512/2504/2504919.png', // Mismo que VIX
    description: 'Contenido Televisa: novelas y programas exclusivos'
  },
  {
    id: '9',
    name: 'Amazon Prime Video',
    duration: '3 meses',
    price: 14.99,
    category: 'streaming',
    image: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png', // Mismo icono genérico
    description: 'Series originales y envíos gratis en Amazon'
  },
  {
    id: '10',
    name: 'Apple Music',
    duration: '2 meses',
    price: 10.99,
    category: 'musica',
    image: 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png', // Mismo que Spotify
    description: 'Catálogo musical completo y exclusivas'
  },
  {
    id: '11',
    name: 'HIDIVE Anime',
    duration: '1 mes',
    price: 4.99,
    category: 'anime',
    image: 'https://cdn-icons-png.flaticon.com/512/2504/2504940.png', // Mismo icono anime
    description: 'Anime clásico y contenido exclusivo'
  },
  {
    id: '12',
    name: 'Paramount+',
    duration: '2 meses',
    price: 9.99,
    category: 'streaming',
    image: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png', // Mismo icono streaming
    description: 'Contenido de Nickelodeon, MTV y Comedy Central'
  }
];

// Categorías
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'streaming', name: 'Streaming' },
  { id: 'musica', name: 'Música' },
  { id: 'anime', name: 'Anime' },
  { id: 'novelas', name: 'Novelas' }
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? productsData 
    : productsData.filter(product => product.category === selectedCategory);

  return (
    <View style={homeStyles.container}>
      <ScrollView style={homeStyles.container}>

        {/* Categorías */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={homeStyles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                homeStyles.categoryButton,
                selectedCategory === category.id && homeStyles.categoryButtonSelected
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                homeStyles.categoryText,
                selectedCategory === category.id && homeStyles.categoryTextSelected
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Contenido principal */}
        <View style={homeStyles.content}>
          <Text style={homeStyles.sectionTitle}>
            {selectedCategory === 'all' ? 'Todos los productos' : 
            categories.find(c => c.id === selectedCategory)?.name}
          </Text>

          {/* Grid de productos */}
          <View style={homeStyles.productsGrid}>
            {filteredProducts.map(product => (
              <TouchableOpacity 
                key={product.id} 
                style={homeStyles.productCard}
                onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              >
                <Image 
                  source={{ uri: product.image }} 
                  style={homeStyles.productImage}
                  resizeMode="contain"
                />
                <View style={homeStyles.productInfo}>
                  <Text style={homeStyles.productName} numberOfLines={1}>{product.name}</Text>
                  <Text style={homeStyles.productDuration}>Duración: {product.duration}</Text>
                  <Text style={homeStyles.productPrice}>${product.price}</Text>
                  
                  <View style={homeStyles.productActions}>
                    <TouchableOpacity style={[homeStyles.productButton, homeStyles.buyNowButton]}>
                      <Text style={homeStyles.productButtonText}>Comprar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[homeStyles.productButton, homeStyles.addToCartButton]}>
                      <Text style={homeStyles.productButtonText}>Añadir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </View>
        
        <Footer />
      </ScrollView>
    </View>
  );
};


export default HomeScreen;