// src/screens/ProductDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { productDetailStyles } from '../styles/screens/ProductDetailsScreen.styles';
import { Ionicons } from '@expo/vector-icons';

type ProductDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

// Datos de productos - FRUTAS Y VERDURAS
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

// Opciones de cantidad disponibles
const quantityOptions = [
  { id: '1', label: '1 kg', price: 20 },
  { id: '2', label: '2 kg', price: 38, discount: '5%' },
  { id: '3', label: '5 kg', price: 90, discount: '10%' },
  { id: '4', label: '10 kg', price: 170, discount: '15%' },
];

const ProductDetailScreen = () => {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const route = useRoute();
  const { productId } = route.params as { productId: string };
  
  const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[0].id);
  const [quantity, setQuantity] = useState(1);
  
  // Buscar el producto por ID
  const product = productsData.find(p => p.id === productId);
  
  if (!product) {
    return (
      <View style={productDetailStyles.container}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }
  
  const selectedQuantityOption = quantityOptions.find(opt => opt.id === selectedQuantity);
  const totalPrice = selectedQuantityOption ? selectedQuantityOption.price * quantity : 0;
  
  const handleAddToCart = () => {
    console.log('Añadir al carrito:', {
      product: product.name,
      quantity: `${quantity} ${selectedQuantityOption?.label}`,
      price: totalPrice
    });
  };
  
  const handleBuyNow = () => {
    console.log('Comprar ahora:', {
      product: product.name,
      quantity: `${quantity} ${selectedQuantityOption?.label}`,
      price: totalPrice
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <ScrollView style={productDetailStyles.container}>
      {/* Header con botón de volver */}
      <View style={productDetailStyles.header}>

        <Text style={productDetailStyles.headerTitle}>Detalles del Producto</Text>
        <TouchableOpacity style={productDetailStyles.wishlistButton}>
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Imagen del producto con etiqueta de categoría */}
      <View style={productDetailStyles.imageContainer}>
        <View style={productDetailStyles.categoryBadge}>
          <Text style={productDetailStyles.categoryText}>{product.category.toUpperCase()}</Text>
        </View>
        <Image 
          source={{ uri: product.image }} 
          style={productDetailStyles.productImage}
          resizeMode="contain"
        />
        <View style={productDetailStyles.imageIndicators}>
          <View style={productDetailStyles.indicatorActive} />
          <View style={productDetailStyles.indicator} />
          <View style={productDetailStyles.indicator} />
          <View style={productDetailStyles.indicator} />
        </View>
      </View>
      
      {/* Información del producto */}
      <View style={productDetailStyles.infoContainer}>
        <View style={productDetailStyles.titleRow}>
          <Text style={productDetailStyles.productName}>{product.name}</Text>
          <View style={productDetailStyles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={productDetailStyles.ratingText}>4.8</Text>
            <Text style={productDetailStyles.reviewsText}>(128 reseñas)</Text>
          </View>
        </View>

        {/* Duración de frescura */}
        <View style={productDetailStyles.freshnessContainer}>
          <Ionicons name="time-outline" size={20} color="#82B421" />
          <Text style={productDetailStyles.freshnessText}>{product.duration}</Text>
          <View style={productDetailStyles.organicBadge}>
            <Ionicons name="leaf-outline" size={16} color="#fff" />
            <Text style={productDetailStyles.organicText}>ORGÁNICO</Text>
          </View>
        </View>

        {/* Precio */}
        <View style={productDetailStyles.priceContainer}>
          <Text style={productDetailStyles.currentPrice}>${totalPrice.toFixed(2)}</Text>
          {selectedQuantityOption?.discount && (
            <View style={productDetailStyles.discountContainer}>
              <Text style={productDetailStyles.originalPrice}>
                ${(selectedQuantityOption.price / (1 - parseInt(selectedQuantityOption.discount) / 100)).toFixed(2)}
              </Text>
              <View style={productDetailStyles.discountTag}>
                <Text style={productDetailStyles.discountText}>{selectedQuantityOption.discount} OFF</Text>
              </View>
            </View>
          )}
        </View>

        {/* Selección de cantidad */}
        <Text style={productDetailStyles.sectionTitle}>Selecciona la cantidad:</Text>
        <View style={productDetailStyles.quantityOptions}>
          {quantityOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                productDetailStyles.quantityOption,
                selectedQuantity === option.id && productDetailStyles.quantityOptionSelected
              ]}
              onPress={() => setSelectedQuantity(option.id)}
            >
              <Text style={[
                productDetailStyles.quantityLabel,
                selectedQuantity === option.id && productDetailStyles.quantityLabelSelected
              ]}>
                {option.label}
              </Text>
              <Text style={productDetailStyles.quantityPrice}>${option.price}</Text>
              {option.discount && (
                <Text style={productDetailStyles.discountBadge}>Ahorra {option.discount}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Selector de cantidad */}
        <View style={productDetailStyles.quantitySelector}>
          <Text style={productDetailStyles.quantityTitle}>Cantidad:</Text>
          <View style={productDetailStyles.counterContainer}>
            <TouchableOpacity 
              style={productDetailStyles.counterButton}
              onPress={handleDecreaseQuantity}
            >
              <Ionicons name="remove" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={productDetailStyles.counterValue}>{quantity}</Text>
            <TouchableOpacity 
              style={productDetailStyles.counterButton}
              onPress={handleIncreaseQuantity}
            >
              <Ionicons name="add" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Descripción del producto */}
        <View style={productDetailStyles.descriptionContainer}>
          <Text style={productDetailStyles.descriptionTitle}>Descripción</Text>
          <Text style={productDetailStyles.productDescription}>{product.description}</Text>
        </View>
        
        {/* Características del producto */}
        <View style={productDetailStyles.featuresContainer}>
          <Text style={productDetailStyles.featuresTitle}>Características:</Text>
          <View style={productDetailStyles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#82B421" />
            <Text style={productDetailStyles.featureText}>Producto 100% orgánico</Text>
          </View>
          <View style={productDetailStyles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#82B421" />
            <Text style={productDetailStyles.featureText}>Libre de pesticidas</Text>
          </View>
          <View style={productDetailStyles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#82B421" />
            <Text style={productDetailStyles.featureText}>Recolección diaria</Text>
          </View>
          <View style={productDetailStyles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#82B421" />
            <Text style={productDetailStyles.featureText}>Entrega en 24 horas</Text>
          </View>
        </View>

        {/* Información nutricional */}
        <View style={productDetailStyles.nutritionContainer}>
          <Text style={productDetailStyles.nutritionTitle}>Información Nutricional (por 100g)</Text>
          <View style={productDetailStyles.nutritionGrid}>
            <View style={productDetailStyles.nutritionItem}>
              <Text style={productDetailStyles.nutritionValue}>52 kcal</Text>
              <Text style={productDetailStyles.nutritionLabel}>Calorías</Text>
            </View>
            <View style={productDetailStyles.nutritionItem}>
              <Text style={productDetailStyles.nutritionValue}>14g</Text>
              <Text style={productDetailStyles.nutritionLabel}>Carbohidratos</Text>
            </View>
            <View style={productDetailStyles.nutritionItem}>
              <Text style={productDetailStyles.nutritionValue}>0.3g</Text>
              <Text style={productDetailStyles.nutritionLabel}>Grasas</Text>
            </View>
            <View style={productDetailStyles.nutritionItem}>
              <Text style={productDetailStyles.nutritionValue}>0.3g</Text>
              <Text style={productDetailStyles.nutritionLabel}>Proteínas</Text>
            </View>
          </View>
        </View>

        {/* Botones de acción fijos en la parte inferior */}
        <View style={productDetailStyles.bottomActions}>
          <View style={productDetailStyles.totalPriceContainer}>
            <Text style={productDetailStyles.totalLabel}>Total:</Text>
            <Text style={productDetailStyles.totalPrice}>${totalPrice.toFixed(2)}</Text>
          </View>
          <View style={productDetailStyles.actionButtons}>
            <TouchableOpacity 
              style={[productDetailStyles.actionButton, productDetailStyles.addToCartButton]}
              onPress={handleAddToCart}
            >
              <Ionicons name="cart-outline" size={22} color="#fff" />
              <Text style={productDetailStyles.actionButtonText}>Añadir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[productDetailStyles.actionButton, productDetailStyles.buyNowButton]}
              onPress={handleBuyNow}
            >
              <Ionicons name="bag-check-outline" size={22} color="#fff" />
              <Text style={productDetailStyles.actionButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;