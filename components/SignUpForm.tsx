import React, {createRef, forwardRef, useImperativeHandle, useState} from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput, ToastAndroid,
    TouchableOpacity
} from 'react-native';

import EditScreenInfo from './EditScreenInfo';
import { Text, View } from './Themed';
import Loader from "./Loader";
import axiosClient from "../constants/AxiosClient";
import * as SecureStore from "expo-secure-store";

const SignUpForm = forwardRef((props: any, ref: any) => {

    const [showForm, setShowForm] = useState(false);
    const [privateKey, setPrivateKey] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    useImperativeHandle(ref, () => ({
        show: () => {
            setShowForm(true);
        },
        hide: () => {
            setShowForm(false);
        }
    }));

    const passwordInputRef = createRef<any>();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Username');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        if (!privateKey) {
            alert('Please fill your private key');
            return;
        }
        setLoading(true);
        let dataToSend = {username: userEmail, password: userPassword, privateKey: privateKey};
        axiosClient.post<any>('/user/sign-up', dataToSend)
            .subscribe(async (res:any) => {
                ToastAndroid.show(res.message, 2000);
                setShowForm(false);
            }, err=> {
                console.log('fail');
                setErrortext(err.message);
            }, () => setLoading(false));
    }

    return (
        <Modal
            style={{ height: '100%'}}

            animationType="slide"
            transparent={true}
            visible={showForm}
            onRequestClose={() => {
                setShowForm(!showForm)
            }}>
            <Loader loading={loading} />

            <View

                style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    height: '100%',
                    marginTop: 'auto',
                }}
            >
                <Pressable
                    onTouchMove={() => setShowForm(false)}
                    style={{
                        backgroundColor: 'white',
                        height: '85%',
                        marginTop: 'auto',
                        borderRadius: 20

                    }}>
                    <Pressable
                        onTouchMove={() => setShowForm(false)}
                        style={{
                            height: 2,
                            width: '50%',
                            alignSelf: "center",
                            position: 'absolute',

                        }}/>
                    <View style={{display: "flex", justifyContent: 'center', alignItems: "center", marginTop: 30}}>
                        <Image  source={require('../assets/images/logo.png')} />
                        <Text style={styles.title}>
                            Create wallet with Vstar</Text>
                        <Text>Please keep your private key safe. Do not share your private key with anyone.</Text>
                    </View>

                    <View style={styles.mainBody}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                flex: 1,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}>

                            <View>
                                <KeyboardAvoidingView enabled>
                                    <View style={{alignItems: 'center'}}>

                                    </View>
                                    <View style={styles.SectionStyle}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            onChangeText={(UserEmail) =>
                                                setUserEmail(UserEmail)
                                            }
                                            placeholder="Enter your username" //dummy@abc.com
                                            placeholderTextColor="#8b9cb5"
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            onSubmitEditing={() =>
                                                passwordInputRef.current &&
                                                passwordInputRef.current.focus()
                                            }
                                            underlineColorAndroid="#f000"
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    <View style={styles.SectionStyle}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            onChangeText={(UserPassword) =>
                                                setUserPassword(UserPassword)
                                            }
                                            placeholder="Enter Password" //12345
                                            placeholderTextColor="#8b9cb5"
                                            keyboardType="default"
                                            ref={passwordInputRef}
                                            onSubmitEditing={Keyboard.dismiss}
                                            blurOnSubmit={false}
                                            secureTextEntry={true}
                                            underlineColorAndroid="#f000"
                                            returnKeyType="next"
                                        />
                                    </View>

                                    <View style={styles.SectionStyle}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            onChangeText={(privateKey) =>
                                                setPrivateKey(privateKey)
                                            }
                                            placeholder="Enter your private key" //dummy@abc.com
                                            placeholderTextColor="#8b9cb5"
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            onSubmitEditing={() =>
                                                passwordInputRef.current &&
                                                passwordInputRef.current.focus()
                                            }
                                            underlineColorAndroid="#f000"
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    {errortext != '' ? (
                                        <Text style={styles.errorTextStyle}>
                                            {errortext}
                                        </Text>
                                    ) : null}
                                    <TouchableOpacity
                                        style={styles.buttonStyle}
                                        activeOpacity={0.5}
                                        onPress={handleSubmitPress}>
                                        <Text style={styles.buttonTextStyle}>Sign up</Text>
                                    </TouchableOpacity>

                                </KeyboardAvoidingView>

                            </View>
                        </ScrollView>
                    </View>

                </Pressable>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
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
        backgroundColor: '#22c1c3',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#22c1c3',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 1110
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '90%',
    },
});
export default SignUpForm;
