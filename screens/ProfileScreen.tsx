import {Pressable, StyleSheet, Image, ScrollView, Modal} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import {RootTabScreenProps} from "../types";
import {useEffect, useRef, useState} from "react";
import LoginForm from "../components/LoginForm";
import * as SecureStore from "expo-secure-store";
import axiosClient from "../constants/AxiosClient";
import Layout from "../constants/Layout";
import SettingsModal from "../components/SettingsModal";

export default function ProfileScreen({ navigation, ...props }: RootTabScreenProps<'Profile'>) {
    const loginRef = useRef<any>();
    const settingsRef = useRef<any>();
    const [user, setUser] = useState<any>(undefined);
    const [accessToken, setAccessToken] = useState<any>(null);
    const fetchUser = async () => {
        let at = await SecureStore.getItemAsync('access_token');
        setAccessToken(at);
        console.log('accessToken', accessToken);

        if(!accessToken || accessToken === '') {
            setUser(undefined);
        } else {
            axiosClient.get('/user/profile/info', {headers: {Authorization: `Bearer ${accessToken}`}}).then(res => {
                console.log(res);
                setUser(res);
            }).catch(err => {
                console.error(err);
                setUser(undefined);
            })
        }
    }
    useEffect( () => {

        fetchUser().then(() => console.log('user fetch!')).catch(err => console.error(err));
    }, [user])
  return (
    <View style={styles.container}>
        {!user ?
        <>
            <Text style={styles.title}>Wallet not connected</Text>
            <Text style={{width: '80%', textAlign:'center'}}>To view Profile you need to create an account and enter a wallet address</Text>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <LoginForm fetchUser={fetchUser} ref={loginRef}/>

            <Pressable style={{
                backgroundColor: '#2196F3',
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 20
            }} onPress={() => loginRef?.current?.show()}><Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18
            }}>Login</Text></Pressable>
        </>:
       <ScrollView>
           <SettingsModal fetchUser={fetchUser} ref={settingsRef}/>
           <View style={styles.header}>
               <Pressable onPress={() => navigation.navigate('Modal')}  style={{backgroundColor: '#f5f5f5',  borderRadius: 100}}>
                   <Feather name="settings" size={24} color="black" style={{margin: 5}}
                           /></Pressable>
               <Pressable onPress={() => settingsRef.current.show()}  style={{backgroundColor: '#f5f5f5',  borderRadius: 100}}>
                   <Feather name="more-horizontal" size={24} color="black" style={{margin: 5}}/></Pressable>
           </View>
           <View style={styles.headerContent}>
               <Image style={styles.avatar}
                      source={{uri: 'http://10.0.255.71:8030/public/'+user.avatarUrl}}/>
               <Text style={styles.name}>{user.privateKey.substring(0,4)}...{user.privateKey.substring(user.privateKey.length-4)}</Text>

               {/*<Text style={styles.name}>{user.name}</Text>*/}
               {/*<Text style={styles.userInfo}>{user.email}</Text>*/}
           </View>
           {/*<View style={styles.body}>*/}
           {/*    <View style={styles.item}>*/}
           {/*        <View style={styles.iconContent}>*/}
           {/*            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/cottage.png'}}/>*/}
           {/*        </View>*/}
           {/*        <View style={styles.infoContent}>*/}
           {/*            <Text style={styles.info}>Home</Text>*/}
           {/*        </View>*/}
           {/*    </View>*/}

           {/*    <View style={styles.item}>*/}
           {/*        <View style={styles.iconContent}>*/}
           {/*            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/administrator-male.png'}}/>*/}
           {/*        </View>*/}
           {/*        <View style={styles.infoContent}>*/}
           {/*            <Text style={styles.info}>Settings</Text>*/}
           {/*        </View>*/}
           {/*    </View>*/}

           {/*    <View style={styles.item}>*/}
           {/*        <View style={styles.iconContent}>*/}
           {/*            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/filled-like.png'}}/>*/}
           {/*        </View>*/}
           {/*        <View style={styles.infoContent}>*/}
           {/*            <Text style={styles.info}>News</Text>*/}
           {/*        </View>*/}
           {/*    </View>*/}

           {/*    <View style={styles.item}>*/}
           {/*        <View style={styles.iconContent}>*/}
           {/*            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/facebook-like.png'}}/>*/}
           {/*        </View>*/}
           {/*        <View style={styles.infoContent}>*/}
           {/*            <Text style={styles.info}>Shop</Text>*/}
           {/*        </View>*/}
           {/*    </View>*/}

           {/*</View>*/}
       </ScrollView>}

    </View>
  );
}

const styles = StyleSheet.create({
    header:{
        padding: 20,
        backgroundColor: "#e0e0e0",
        width: Layout.window.width,
        height: 145,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: 'row'
    },
    headerContent:{
        alignItems: 'center',
        top: -40,
        backgroundColor: 'rgba(0,0,0,0)'

    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white",
        marginBottom: 10
    },
    name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
    },
    userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
    },
    body:{
        backgroundColor: "#778899",
        height:500,
        alignItems:'center',
    },
    item:{
        flexDirection : 'row',
    },
    infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
    },
    iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
    },
    icon:{
        width:30,
        height:30,
        marginTop:20,
    },
    info:{
        fontSize:18,
        marginTop:20,
        color: "#FFFFFF",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 30,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#98B3B7',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
