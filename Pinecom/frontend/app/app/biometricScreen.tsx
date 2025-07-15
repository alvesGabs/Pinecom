import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';


export async function Authenticator(){
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Autentique-se',
    fallbackLabel: 'Usar senha',
    cancelLabel: 'Cancelar',
    disableDeviceFallback: false,
  });

  if (result.success) {
    router.push("/home");
    return true;
  } else {
    Alert.alert('Falhou', 'Autenticação falhou ou foi cancelada');
    return false;
  }
}
export default function BiometricScreen() {
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricAvailable(compatible && enrolled);
    })();
  }, []);

  const handleAuthentication = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autentique-se',
      fallbackLabel: 'Usar senha',
      cancelLabel: 'Cancelar',
      disableDeviceFallback: false,
    });

    if (result.success) {
      router.push("/home");
      return true;
    } else {
      Alert.alert('Falhou', 'Autenticação falhou ou foi cancelada');
      return false;
    }
  };

  useEffect(() => {
    handleAuthentication();
  }, [])

  return (
    <View>
    </View>
  );
}
