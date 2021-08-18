import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Car, LoadAnimation } from '../../components';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  LoadContainer,
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert('Você está OnLine', `${netInfo.type}`);
    } else {
      Alert.alert('Você está OffLine', `${netInfo.type}`);
    }
  }, [netInfo.type]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total {`${cars.length}`} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadContainer>
          <LoadAnimation />
        </LoadContainer>
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
