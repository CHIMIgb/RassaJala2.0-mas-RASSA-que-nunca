// src/screens/ProductDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { productDetailStyles } from '../styles/screens/ProductDetailsScreen.styles';

type ProductDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

// Datos de productos (mismos que en HomeScreen)
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
    image: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png',
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
    image: 'https://cdn-icons-png.flaticon.com/512/2504/2504940.png',
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
    image: 'https://cdn-icons-png.flaticon.com/512/2504/2504919.png',
    description: 'Contenido Televisa: novelas y programas exclusivos'
  },
  {
    id: '9',
    name: 'Amazon Prime Video',
    duration: '3 meses',
    price: 14.99,
    category: 'streaming',
    image: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png',
    description: 'Series originales y envíos gratis en Amazon'
  },
  {
    id: '10',
    name: 'Apple Music',
    duration: '2 meses',
    price: 10.99,
    category: 'musica',
    image: 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png',
    description: 'Catálogo musical completo y exclusivas'
  },
  {
    id: '11',
    name: 'HIDIVE Anime',
    duration: '1 mes',
    price: 4.99,
    category: 'anime',
    image: 'https://cdn-icons-png.flaticon.com/512/2504/2504940.png',
    description: 'Anime clásico y contenido exclusivo'
  },
  {
    id: '12',
    name: 'Paramount+',
    duration: '2 meses',
    price: 9.99,
    category: 'streaming',
    image: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png',
    description: 'Contenido de Nickelodeon, MTV y Comedy Central'
  }
];

// Opciones de duración disponibles
const durationOptions = [
  { id: '1', label: '1 mes', price: 9.99 },
  { id: '3', label: '3 meses', price: 24.99, discount: '10%' },
  { id: '6', label: '6 meses', price: 44.99, discount: '20%' },
  { id: '12', label: '12 meses', price: 79.99, discount: '30%' },
];

const ProductDetailScreen = () => {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const route = useRoute();
  const { productId } = route.params as { productId: string };
  
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0].id);
  
  // Buscar el producto por ID
  const product = productsData.find(p => p.id === productId);
  
  if (!product) {
    return (
      <View style={productDetailStyles.container}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }
  
  const selectedDurationOption = durationOptions.find(opt => opt.id === selectedDuration);
  
  const handleAddToCart = () => {
    console.log('Añadir al carrito:', {
      product: product.name,
      duration: selectedDurationOption?.label,
      price: selectedDurationOption?.price
    });
  };
  
  const handleBuyNow = () => {
    console.log('Comprar ahora:', {
      product: product.name,
      duration: selectedDurationOption?.label,
      price: selectedDurationOption?.price
    });
  };

  return (
    <ScrollView style={productDetailStyles.container}>
      {/* Imagen del producto */}
      <View style={productDetailStyles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={productDetailStyles.productImage}
          resizeMode="contain"
        />
      </View>
      
      {/* Información del producto */}
      <View style={productDetailStyles.infoContainer}>
        <Text style={productDetailStyles.productName}>{product.name}</Text>
        
        {/* Selección de duración */}
        <Text style={productDetailStyles.sectionTitle}>Selecciona la duración:</Text>
        <View style={productDetailStyles.durationOptions}>
          {durationOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                productDetailStyles.durationOption,
                selectedDuration === option.id && productDetailStyles.durationOptionSelected
              ]}
              onPress={() => setSelectedDuration(option.id)}
            >
              <Text style={[
                productDetailStyles.durationLabel,
                selectedDuration === option.id && productDetailStyles.durationLabelSelected
              ]}>
                {option.label}
              </Text>
              <Text style={productDetailStyles.durationPrice}>${option.price}</Text>
              {option.discount && (
                <Text style={productDetailStyles.discountBadge}>{option.discount} descuento</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Precio total */}
        <View style={productDetailStyles.totalContainer}>
          <Text style={productDetailStyles.totalLabel}>Precio total:</Text>
          <Text style={productDetailStyles.totalPrice}>${selectedDurationOption?.price}</Text>
        </View>
        
        {/* Descripción del producto */}
        <View style={productDetailStyles.descriptionContainer}>
          <Text style={productDetailStyles.descriptionTitle}>Descripción:</Text>
          <Text style={productDetailStyles.productDescription}>{product.description}</Text>
        </View>
        
        {/* Información adicional */}
        <View style={productDetailStyles.additionalInfo}>
          <Text style={productDetailStyles.infoTitle}>¿Qué incluye?</Text>
          <Text style={productDetailStyles.infoText}>• Acceso completo a todos los contenidos</Text>
          <Text style={productDetailStyles.infoText}>• Calidad HD/4K (dependiendo del plan)</Text>
          <Text style={productDetailStyles.infoText}>• Soporte técnico 24/7</Text>
          <Text style={productDetailStyles.infoText}>• Garantía de reembolso de 7 días</Text>
        </View>
        
        {/* Botones de acción - EN COLUMNA */}
        <View style={productDetailStyles.actionsContainer}>
          <TouchableOpacity 
            style={[productDetailStyles.actionButton, productDetailStyles.buyNowButton]}
            onPress={handleBuyNow}
          >
            <Text style={productDetailStyles.actionButtonText}>Comprar ahora</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[productDetailStyles.actionButton, productDetailStyles.addToCartButton]}
            onPress={handleAddToCart}
          >
            <Text style={productDetailStyles.actionButtonText}>Añadir al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;