import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import axios from 'axios';
import api from '../../../services/api';

import { BackButton, Bullet, InputPassword, Button } from '../../../components';

import { ConfirmationParams } from '../../index';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

interface UserParams {
  name: string;
  email: string;
  driverLicense: string;
}

interface Params {
  user: UserParams;
}

export function SingUpSecondStep() {
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister(): Promise<void> {
    try {
      if (!password || !repeatPassword) {
        return Alert.alert('Informe a senha e a confirmação.');
      }

      if (password !== repeatPassword) {
        return Alert.alert('As senhas não são iguais');
      }

      const response = await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      });
      if (response) {
        navigation.navigate('Confirmation', {
          nextScreenRoute: 'SingIn',
          title: 'Conta criada!',
          message: 'Agora é só fazer login\ne aproveitar',
        } as ConfirmationParams);
      }
    } catch (error) {
      console.error(
        `handleRegister is Axios Error? ${axios.isAxiosError(error)}`,
      );
      if (axios.isAxiosError(error)) {
        console.error('handleRegister', error.message);
      }
      console.error('handleRegister', error);
      Alert.alert('Opa!', 'Não foi possível efetuar o cadastro.');
    }
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>
            Crie sua {'\n'}
            conta
          </Title>
          <Subtitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </Subtitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setRepeatPassword}
              value={repeatPassword}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
