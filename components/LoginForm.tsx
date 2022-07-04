import React, {createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button, Keyboard,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet, TextInput,
    TouchableOpacity
} from 'react-native';
import { Text, View } from './Themed';
import  axiosClient  from '../constants/AxiosClient';

const Loader = (props: { [x: string]: any; loading: any; }) => {
    const {loading, ...attributes} = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
                console.log('close modal');
            }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={true}
                        color="#000000"
                        size="large"
                        style={styles.activityIndicator}
                    />
                </View>
            </View>
        </Modal>
    );
};
const LoginForm = forwardRef((props: any, ref: any) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    useImperativeHandle(ref, () => ({
        show: () => {
            setModalVisible(true);
        }
    }));

    const passwordInputRef = createRef<any>();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        setLoading(true);
        let dataToSend = {username: userEmail, password: userPassword};
        axiosClient.post<any>('/user/login', dataToSend)
            .then(res => {
                setLoading(false);
                console.log(res);
            })
            .catch(err=> {
                setLoading(false);
                console.log(err);
            })
    }



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}>
            <View
                style={{
                    height: '75%',
                    marginTop: 'auto',
                    backgroundColor:'blue'
                }}>

                <View style={styles.mainBody}>
                    <Loader loading={loading} />
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
                                        placeholder="Enter Email" //dummy@abc.com
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

                            </KeyboardAvoidingView>
                        </View>
                    </ScrollView>
                </View>

            </View>
            <Button title={'skip for now'} onPress={() => setModalVisible(!modalVisible)}/>
        </Modal>

    );
});
export default LoginForm;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
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
