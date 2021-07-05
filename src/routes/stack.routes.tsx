import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import {
    Home,
    CarDetails,
    Scheduling,
    SchedulingComplete,
    SchedulingDetails
} from '../screens';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes(){
    return (
        <Navigator headerMode="none">
            <Screen 
                name="Home"
                component={Home}
            />
            <Screen 
                name="CarDetails"
                component={CarDetails}
            />
            <Screen 
                name="Scheduling"
                component={Scheduling}
            />
            <Screen 
                name="SchedulingComplete"
                component={SchedulingComplete}
            />
            <Screen 
                name="SchedulingDetails"
                component={SchedulingDetails}
            />
        </Navigator>
    );
}