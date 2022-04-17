import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../store/actions/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../constans/Colors'

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
            // props.navigation.replace('AuthorizationStack');
            return;
        }
        const jsonUserData = JSON.parse(userData);
        const { userId, token, expireDate } = jsonUserData;
        if (new Date(expireDate) <= new Date() || !userId || !token) {
            // props.navigation.replace('AuthorizationStack');
            return;
        }
        const nowExpiresIn = new Date(expireDate).getTime() - new Date().getTime();
        props.navigation.replace('ShopDrawer');
        dispatch(AuthActions.authenticate(token, userId, nowExpiresIn))
    }, [])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
}

export default StartupScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})