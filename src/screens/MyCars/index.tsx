import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import {
    BackButton,
    Car
} from '../../components';


import {
    Container,
    Header,
    SubTitle,
    Title,
    Content,
    Appointment,
    AppointmentsTitle,
    AppointmentsQuantity
} from './styles';

interface CarProps{
    id: string;
    user_id: string;
    car: CarDTO;
}

export function MyCars(){
    const [ cars, setCars ] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

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
                <BackButton
                    color={theme.colors.shape} 
                    onPress={handleGoBack}
                />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>

            </Header>

            <Content>
                <Appointment>
                    <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                    <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                </Appointment>

                <FlatList 
                    data={cars}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Car 
                            data={item.car}
                        />
                    )}
                />

            </Content>

        </Container>
    );
}