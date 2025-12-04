// src/screens/CartScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { cartStyles } from '../styles/screens/CartScreen.styles';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

// Tipo para los items del carrito
interface CartItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  image: string;
  quantity: number;
}

const CartScreen = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  
  // Estado para los items del carrito
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Manzana Roja',
      duration: 'Fresca por 2 semanas',
      price: 20,
      image: 'https://cdn-icons-png.flaticon.com/512/415/415682.png',
      quantity: 2
    },
    {
      id: '2',
      name: 'Zanahoria Orgánica',
      duration: 'Fresca por 1 mes',
      price: 15,
      image: 'https://cdn-icons-png.flaticon.com/512/2484/2484769.png',
      quantity: 3
    },
    {
      id: '3',
      name: 'Tomate de Huerta',
      duration: 'Fresco por 2 semanas',
      price: 18,
      image: 'https://cdn-icons-png.flaticon.com/512/1997/1997927.png',
      quantity: 1
    }
  ]);

  // Función para incrementar la cantidad
  const increaseQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  // Función para disminuir la cantidad
  const decreaseQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  // Función para eliminar item
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calcular totales
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16; // 16% de impuestos
  const total = subtotal + tax;

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  const handleCheckout = () => {
    console.log('Proceder al pago');
    // Navegación estática - sin funcionalidad real
  };

  return (
    <View style={cartStyles.container}>
      <ScrollView style={cartStyles.scrollContainer}>
        {/* Header del Carrito */}
        <View style={cartStyles.cartHeader}>
          <Text style={cartStyles.cartTitle}>Carrito de Apartados</Text>
          <Text style={cartStyles.itemsCount}>{cartItems.length} productos</Text>
        </View>

        {/* Lista de Productos */}
        <View style={cartStyles.itemsContainer}>
          {cartItems.map(item => (
            <View key={item.id} style={cartStyles.cartItem}>
              <Image 
                source={{ uri: item.image }} 
                style={cartStyles.itemImage}
                resizeMode="contain"
              />
              
              <View style={cartStyles.itemInfo}>
                <Text style={cartStyles.itemName}>{item.name}</Text>
                <Text style={cartStyles.itemDuration}>{item.duration}</Text>
                <Text style={cartStyles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>

              <View style={cartStyles.itemActions}>
                {/* Controles de cantidad */}
                <View style={cartStyles.quantityControls}>
                  <TouchableOpacity 
                    style={cartStyles.quantityButton}
                    onPress={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    <Text style={[
                      cartStyles.quantityButtonText,
                      item.quantity <= 1 && cartStyles.quantityButtonDisabled
                    ]}>-</Text>
                  </TouchableOpacity>
                  
                  <View style={cartStyles.quantityDisplay}>
                    <Text style={cartStyles.quantityText}>{item.quantity} kg</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={cartStyles.quantityButton}
                    onPress={() => increaseQuantity(item.id)}
                  >
                    <Text style={cartStyles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Precio total del item */}
                <Text style={cartStyles.itemTotalPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>

                {/* Botón eliminar */}
                <TouchableOpacity 
                  style={cartStyles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Text style={cartStyles.removeText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>


      </ScrollView>

      {/* Botones de Acción*/}
      <View style={cartStyles.actionButtons}>
        {/* Resumen de Compra */}
        <View style={cartStyles.summaryContainer}>
          <Text style={cartStyles.summaryTitle}>Resumen de compra</Text>
          
          <View style={cartStyles.summaryRow}>
            <Text style={cartStyles.summaryLabel}>Subtotal</Text>
            <Text style={cartStyles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={cartStyles.summaryRow}>
            <Text style={cartStyles.summaryLabel}>Impuestos (16%)</Text>
            <Text style={cartStyles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          
          <View style={[cartStyles.summaryRow, cartStyles.totalRow]}>
            <Text style={cartStyles.totalLabel}>Total</Text>
            <Text style={cartStyles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[cartStyles.actionButton, cartStyles.checkoutButton]}
          onPress={handleCheckout}
        >
          <Text style={cartStyles.checkoutButtonText}>Proceder a apartar pedido</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CartScreen;