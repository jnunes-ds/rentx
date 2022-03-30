import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { format } from 'date-fns';
import { Alert } from 'react-native';
import axios from 'axios';
import { BackButton, ImageSlider, Accessory, Button } from '../../components';
import { ConfirmationParams } from '../index';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';
import {
  Container,
  Header,
  CardImage,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalriceQuota,
  RentalPriceTotal,
} from './styles';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';
import { useAuth } from '~/hooks/auth';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface IRentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod,
  );
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const { user } = useAuth();

  const rentTotal = Number(dates.length * Number(car.price));

  async function handleConfirm() {
    try {
      setLoading(true);
      // console.log(':::::scheduleByCar:::::');
      const schedulesByCar = await api.get(`/rentals/car/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];
      const start_date = format(
        getPlatformDate(new Date(dates[0])),
        'yyyy-MM-dd',
      );
      const end_date = format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'yyyy-MM-dd',
      );

      console.log(':::::START DATE:::::', start_date);
      console.log(':::::END DATE:::::', end_date);

      const scheduleByUserResponse = await api.post('/rentals', {
        user_id: user.id,
        car_id: car.id,
        start_date,
        end_date,
        total: car.price,
      });

      const scheduleByCarResponse = await api.get(`/rentals/car/${car.id}`);

      if (scheduleByUserResponse && scheduleByCarResponse) {
        navigation.navigate('Confirmation', {
          title: 'Carro alugado!',
          message:
            'Agora você só precisa ir\naté a concessionária da RENTX\npegar seu automóvel',
          nextScreenRoute: 'Home',
        } as ConfirmationParams);
      }
    } catch (error) {
      console.error(
        `handleConfirm is axios error? ${axios.isAxiosError(error)}`,
      );
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.html);
      }
      console.error(error);

      Alert.alert('Não foi possível confirmar o agendamento');
    } finally {
      setLoading(false);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy',
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CardImage>
        <ImageSlider imagesUrl={car.photos} />
      </CardImage>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirm}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
