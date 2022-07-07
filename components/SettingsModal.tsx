import React, {createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Button,
    Image, Keyboard,
    KeyboardAvoidingView,
    Modal, Pressable,
    ScrollView,
    StyleSheet, TextInput,
    TouchableOpacity
} from 'react-native';
import { Text, View } from './Themed';
import  axiosClient  from '../constants/AxiosClient';
import SignUpForm from "./SignUpForm";
import Loader from "./Loader";
import { AntDesign } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
import Constants from "../constants/Constants";
const SettingsModal = forwardRef((props: any, ref: any) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const registerRef = useRef<any>();
    useImperativeHandle(ref, () => ({
        show: () => {
            setModalVisible(true);
        },
        hide: () => {
            setModalVisible(false);
        }
    }));


    const handleSubmitPress = () => {

    }

    let pageY = -1;
    function moveTouch(evt:any) {
        if(pageY === -1) {
            pageY = evt.nativeEvent.pageY;
        }else if(pageY < evt.nativeEvent.pageY) {
            setModalVisible(false);
        }else {
            pageY = -1;
        }
        setTimeout(() => pageY = -1, 10);
    }

    async function handleLogout() {
        Constants.ACCESS_TOKEN = '';
        Constants.USER_NAME = '';
        Constants.REFRESH_TOKEN = '';
        props.fetchUser();
        setModalVisible(false);

    }

    return (
        <Modal
            style={{ height: '100%'}}

            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}>
            <Loader loading={loading} />
<SignUpForm ref={registerRef}/>
            <Pressable

                style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    height: '100%',
                    marginTop: 'auto',
                }}
                onPress={() => setModalVisible(false)}
            >
                <Pressable
                    onTouchMove={moveTouch}
                    style={{
                        backgroundColor: 'white',
                        height: '95%',
                        marginTop: 'auto',
                        borderRadius: 20
                    }}>
                <Pressable
    style={{
        height: 2,
        width: '50%',
        alignSelf: "center",
        position: 'absolute',

    }}/>
                    <View style={{display: "flex", justifyContent: 'center', alignItems: "center", marginTop: 10}}>
                        <Text style={styles.title}>Settings</Text>
                    </View>
                <View style={styles.mainBody}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignContent: 'center',

                        }}>
                        <Pressable style={styles.buttonStyle} onPress={handleLogout}>
                            <View style={{display: "flex", flexDirection: 'row'}}>
                                <MaterialIcons name="logout" size={24} color="blue" />
                            <Text style={{marginLeft: 5, fontSize: 18, fontWeight:'bold'}}>Disconnect</Text>
                            </View>
                            <AntDesign name="right" size={24} color="blue"  style={{marginLeft: 5, fontWeight: 'bold'}} /></Pressable>
                    </ScrollView>
                </View>

            </Pressable>
            </Pressable>
        </Modal>

    );
});
export default SettingsModal;

const styles = StyleSheet.create({

    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        fontSize: 'normal',
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        display: 'flex',
        flexDirection: 'row',
        elevation: 8,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
        padding: 10,
        justifyContent: "space-between"
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
        paddingTop: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '90%',
    },
});
