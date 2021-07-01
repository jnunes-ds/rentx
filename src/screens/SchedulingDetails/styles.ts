import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    background-color: ${ ({ theme }) =>theme.colors.background_secondary };
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    position: absolute;
    margin-top: ${getStatusBarHeight() + 18}px;
    margin-left: 24px;
`;

export const CardImage = styled.View`
    margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        padding: 24,
        alignItems: 'center',
    },
    showsVertivalScroolIndicator: false
})``;

export const Details = styled.View`
    width: 100%;
    
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 38px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.secondary_500 };
    color: ${ ({ theme }) => theme.colors.text_detail };
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;

export const Name = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.secondary_500 };
    color: ${ ({ theme }) => theme.colors.title };
    font-size: ${RFValue(25)}px;
`;

export const Rent = styled.View``;

export const Period = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.secondary_500 };
    color: ${ ({ theme }) => theme.colors.text_detail };
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;

export const Price = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.secondary_500 };
    color: ${ ({ theme }) => theme.colors.main };
    font-size: ${RFValue(25)}px;
`;

export const About = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.secondary_400 };
    color: ${ ({ theme }) => theme.colors.text };
    font-size: ${RFValue(15)}px;
    text-align: justify;

    margin-top: 23px;
    line-height: ${RFValue(25)}px;
`;

export const Acessories = styled.View`
    width: 100%;

    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    margin-top: 16px;
`;

export const Footer = styled.View`
    width: 100%;
    background-color: ${ ({ theme }) => theme.colors.background_secondary };

    padding: 24px 24px;
    padding-bottom: ${getBottomSpace() + 24}px;
`;

export const RentalPeriod = styled.View`
    width: 100%;
    
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: ${RFValue(40)}px;
    border-bottom-width: 1px;
    border-bottom-color: ${ ({ theme }) => theme.colors.line };
    padding-bottom: ${RFValue(16)}px;
`;

export const CalendarIcon = styled.View`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    background-color: ${ ({ theme }) => theme.colors.main };

    justify-content: center;
    align-items: center;
`;

export const DateInfo = styled.View``;

export const DateTitle = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.primary_500 };
    color: ${ ({ theme }) => theme.colors.text_detail };
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;

export const DateValue = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.primary_500 };
    color: ${ ({ theme }) => theme.colors.title };
    font-size: ${RFValue(15)}px;
`;

export const RentalPrice = styled.View`
    width: 100%;
    margin-top: ${RFValue(16)}px;
`;

export const RentalPriceLabel = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.primary_500 };
    color: ${ ({ theme }) => theme.colors.text_detail };
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;

export const RentalPriceDetails = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const RentalriceQuota = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.primary_500 };
    color: ${ ({ theme }) => theme.colors.title };
    font-size: ${RFValue(15)}px;
`;

export const RentalPriceTotal = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.secondary_500 };
    color: ${ ({ theme }) => theme.colors.success };
    font-size: ${RFValue(24)}px;
`;

