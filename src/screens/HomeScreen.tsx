import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Footer from '../components/common/Footer';
import { homeStyles } from '../styles/screens/HomeScreen.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

// Datos de productos estáticos - FRUTAS Y VERDURAS
const productsData = [
  {
    id: '1',
    name: 'Manzana Roja',
    duration: 'Fresca por 2 semanas',
    price: 20,
    category: 'frutas',
    image: 'https://cdn-icons-png.flaticon.com/512/415/415682.png',
    description: 'Manzanas rojas frescas de temporada'
  },
  {
    id: '2',
    name: 'Plátano',
    duration: 'Fresco por 1 semana',
    price: 20,
    category: 'frutas',
    image: 'https://cdn-icons-png.flaticon.com/512/2909/2909761.png',
    description: 'Plátanos maduros naturales'
  },
  {
    id: '3',
    name: 'Naranja',
    duration: 'Fresca por 3 semanas',
    price: 20,
    category: 'frutas',
    image: 'https://cdn-icons-png.flaticon.com/512/3076/3076041.png',
    description: 'Naranjas jugosas de Valencia'
  },
  {
    id: '4',
    name: 'Zanahoria',
    duration: 'Fresca por 1 mes',
    price: 20,
    category: 'verduras',
    image: 'https://cdn-icons-png.flaticon.com/512/2484/2484769.png',
    description: 'Zanahorias orgánicas frescas'
  },
  {
    id: '5',
    name: 'Tomate',
    duration: 'Fresco por 2 semanas',
    price: 20,
    category: 'verduras',
    image: 'https://cdn-icons-png.flaticon.com/512/1997/1997927.png',
    description: 'Tomates de huerta madurados al sol'
  },
  {
    id: '6',
    name: 'Lechuga',
    duration: 'Fresca por 1 semana',
    price: 20,
    category: 'verduras',
    image: 'https://cdn-icons-png.flaticon.com/512/1998/1998742.png',
    description: 'Lechuga iceberg crujiente'
  },
  {
    id: '7',
    name: 'Fresa',
    duration: 'Fresca por 5 días',
    price: 20,
    category: 'frutas',
    image: 'https://cdn-icons-png.flaticon.com/512/1998/1998614.png',
    description: 'Fresas dulces de temporada'
  },
  {
    id: '8',
    name: 'Brócoli',
    duration: 'Fresco por 2 semanas',
    price: 20,
    category: 'verduras',
    image: 'https://cdn-icons-png.flaticon.com/512/1998/1998730.png',
    description: 'Brócoli fresco rico en nutrientes'
  },
  {
    id: '9',
    name: 'Uvas',
    duration: 'Frescas por 1 semana',
    price: 20,
    category: 'frutas',
    image: 'https://cdn-icons-png.flaticon.com/512/1998/1998570.png',
    description: 'Uvas rojas sin semillas'
  },
  {
    id: '10',
    name: 'Pimiento',
    duration: 'Fresco por 2 semanas',
    price: 20,
    category: 'verduras',
    image: 'https://cdn-icons-png.flaticon.com/512/1998/1998750.png',
    description: 'Pimientos rojos dulces'
  },
  {
    id: '11',
    name: 'Mango',
    duration: 'Fresco por 1 semana',
    price: 20,
    category: 'frutas',
    image: 'https://cdn-icons-png.flaticon.com/512/2909/2909778.png',
    description: 'Mangos maduros tropicales'
  },
  {
    id: '12',
    name: 'Cebolla',
    duration: 'Fresca por 1 mes',
    price: 20,
    category: 'verduras',
    image: 'https://cdn-icons-png.flaticon.com/512/2484/2484730.png',
    description: 'Cebollas blancas para cocinar'
  }
];

// Categorías
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'frutas', name: 'Frutas' },
  { id: 'verduras', name: 'Verduras' },
  { id: 'ofertas', name: 'Ofertas' },
  { id: 'nuevos', name: 'Nuevos' }
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? productsData 
    : productsData.filter(product => product.category === selectedCategory);

  return (
    <View style={homeStyles.container}>
      <ScrollView style={homeStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Banner Hero de Bienvenida con Imagen */}
        <ImageBackground
          source={require('../../assets/imagenes/fondo.jpg')}
          style={homeStyles.heroBanner}
          imageStyle={homeStyles.heroBannerImage}
        >
          <View style={homeStyles.heroOverlay}>
            <Text style={homeStyles.heroTitle}>¡Frutas y verduras de temporada!</Text>
            <Text style={homeStyles.heroSubtitle}>
              ¡Mejora tu vida con la calidad y frescura de las frutas y verduras de Rassa-Jala!
            </Text>
            <Text style={homeStyles.heroDescription}>
              Arma tu pedido con nuestro sitio web y recógelo en nuestro local.
            </Text>
          
          </View>
        </ImageBackground>

        {/* Sección de Nuestros Productos */}
        <View style={homeStyles.productsSection}>
          <Text style={homeStyles.productsTitle}>Nuestros productos</Text>
          
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

          {/* Grid de productos */}
          <View style={homeStyles.productsGrid}>
            {filteredProducts.map(product => (
              <TouchableOpacity 
                key={product.id} 
                style={homeStyles.productCard}
                onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              >
                <View style={homeStyles.productImageContainer}>
                  <Image 
                    source={{ uri: product.image }} 
                    style={homeStyles.productImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={homeStyles.productInfo}>
                  <Text style={homeStyles.productName} numberOfLines={1}>{product.name}</Text>
                  <Text style={homeStyles.productDuration}>{product.duration}</Text>
                  <Text style={homeStyles.productPrice}>${product.price.toFixed(2)}</Text>
                  
                  <TouchableOpacity style={homeStyles.addToCartButton}>
                    <Text style={homeStyles.addToCartText}>Añadir al carrito</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {/* Sección Misión, Visión y Valores */}
        <View style={homeStyles.valuesSection}>
          <View style={homeStyles.valuesContainer}>
            
            {/* Tarjeta Misión - Semilla */}
            <View style={homeStyles.valueCard}>
              <View style={homeStyles.valueCardIconContainer}>
                <Icon name="grass" size={40} color="#FFFFFF" />
              </View>
              <Text style={homeStyles.valueCardTitle}>Misión</Text>
              <View style={homeStyles.divider} />
              <Text style={homeStyles.valueCardText}>
                Nuestra misión es proporcionar frutas y verduras frescas de temporada directamente del campo a tu mesa, 
                promoviendo una alimentación saludable y sostenible mientras apoyamos a productores locales.
              </Text>
            </View>
            
            {/* Tarjeta Visión - Planta */}
            <View style={homeStyles.valueCard}>
              <View style={homeStyles.valueCardIconContainer}>
                <Icon name="spa" size={40} color="#FFFFFF" />
              </View>
              <Text style={homeStyles.valueCardTitle}>Visión</Text>
              <View style={homeStyles.divider} />
              <Text style={homeStyles.valueCardText}>
                Ser la empresa líder en distribución de productos agrícolas frescos, innovando constantemente 
                en procesos sostenibles y expandiendo nuestro alcance para beneficiar a más comunidades.
              </Text>
            </View>
            
            {/* Tarjeta Valores - Árbol */}
            <View style={homeStyles.valueCard}>
              <View style={homeStyles.valueCardIconContainer}>
                <Icon name="park" size={40} color="#FFFFFF" />
              </View>
              <Text style={homeStyles.valueCardTitle}>Valores</Text>
              <View style={homeStyles.divider} />
              <Text style={homeStyles.valueCardText}>
                Calidad, frescura, sostenibilidad y compromiso social. Valoramos la transparencia en cada proceso 
                y el trato justo tanto con nuestros productores como con nuestros clientes.
              </Text>
            </View>
            
          </View>
        </View>
        
        <Footer />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;