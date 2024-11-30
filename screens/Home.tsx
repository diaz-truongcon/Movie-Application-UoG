// Home.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import UpcomingScreen from './UpcomingScreen';
import PlanScreen from './PlanScreen';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Splash from './Splash';


import ProductDetail from '../components/ProductDetail'; // Import the ProductDetail screen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = 'home-outline';
                            break;
                        case 'Search':
                            iconName = 'search-outline';
                            break;
                        case 'Upcoming':
                            iconName = 'calendar-outline';
                            break;
                        case 'Plan':
                            iconName = 'clipboard-outline';
                            break;
                        case 'Profile':
                            iconName = 'person-outline';
                            break;
                        default:
                            iconName = 'circle-outline';
                            break;
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Upcoming" component={UpcomingScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Plan" component={PlanScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail as React.ComponentType<any>} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />


        </Stack.Navigator>
    );
};

export default Home;
