import React from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';

import { Button } from '../../components';

import { Container, Header, Title, Subtitle, Footer } from './styles';

export function SingIn() {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>
          Estamos {'\n'}
          quase lá.
        </Title>
        <Subtitle>
          Faça seu login para começar {'\n'}
          uma experiência incrível.
        </Subtitle>
      </Header>

      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          light
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
      </Footer>
    </Container>
  );
}
