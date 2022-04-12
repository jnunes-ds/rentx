import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { BackButton, Car, LoadAnimation } from '../../components';
import { useAuth } from '~/hooks/auth';

import {
  Container,
  Header,
  SubTitle,
  Title,
  Content,
  Appointment,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/rentals`);

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={handleGoBack} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointment>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>
              {cars.length < 10 ? `0${cars.length}` : cars.length}
            </AppointmentsQuantity>
          </Appointment>

          <FlatList
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Períod</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
