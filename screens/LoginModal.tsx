import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';

export default function LoginModal() {
    return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 1110
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '90%',
    },
});
