import React, {createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {
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
import {map} from "rxjs";
import Constants from "../constants/Constants";

const LoginForm = forwardRef((props: any, ref: any) => {
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
        setLoading(true);
        let dataToSend = {username: userEmail, password: userPassword};
        axiosClient.post<any>('/user/login', dataToSend)
            .subscribe((res:any) => {
                Constants.REFRESH_TOKEN = res.refresh_token;
                Constants.ACCESS_TOKEN = res.access_token;
                props.fetchUser();
                setModalVisible(false);
            }, () => {
            console.log('fail');
            setErrortext('Please check your username and password!');
                setLoading(false);
                Constants.ACCESS_TOKEN = '';
        },() => {
                console.log('finished')
                setLoading(false);
            });
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
                    <View style={{display: "flex", justifyContent: 'center', alignItems: "center", marginTop: 30}}>
                    <Image  source={require('../assets/images/logo.png')} />
                    </View>
                    <Text style={styles.title}>
                    Login with Vstar account to enable all features</Text>
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
                                {errortext != '' ? (
                                    <Text style={styles.errorTextStyle}>
                                        {errortext}
                                    </Text>
                                ) : null}
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    activeOpacity={0.5}
                                    onPress={handleSubmitPress}>
                                    <Text style={styles.buttonTextStyle}>LOGIN</Text>
                                </TouchableOpacity>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <Text style={{ textAlign: 'center'}}>You don't have account?  </Text>
                                    <Pressable  onPress={() => registerRef.current.show()}><Text style={{ color: '#0C3DE5FF'}}>Create one!</Text></Pressable>
                                </View>
                                <Pressable onPress={() => setModalVisible(!modalVisible)} style={{
                                    display: 'flex',
                                    alignItems:'center',
                                    justifyContent: 'center',
                                    marginTop: 20
                                }}><Text style={{color:'#0C3DE5FF'}}>Skip for now</Text></Pressable>

                            </KeyboardAvoidingView>

                        </View>
                    </ScrollView>
                </View>

            </Pressable>
            </Pressable>
        </Modal>

    );
});
export default LoginForm;

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
        fontSize: 18,
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
