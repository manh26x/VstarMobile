import {Pressable, StyleSheet, Image, ScrollView, Clipboard, Dimensions} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import {RootTabScreenProps} from "../types";
import React, {useEffect, useRef, useState} from "react";
import LoginForm from "../components/LoginForm";
import * as SecureStore from "expo-secure-store";
import axiosClient from "../constants/AxiosClient";
import Layout from "../constants/Layout";
import SettingsModal from "../components/SettingsModal";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Constants from "../constants/Constants";
import OnSaleTab from "../components/OnSaleTab";
import CollectionTab from "../components/CollectionTab";
import CreatedTab from "../components/CreatedTab";

const initialLayout = { width: Dimensions.get('window').width };

export default function ProfileScreen({ navigation, ...props }: RootTabScreenProps<'Profile'>) {
    const loginRef = useRef<any>();
    const settingsRef = useRef<any>();
    const [copied, setCopied] = useState(false);
    const [user, setUser] = useState<any>(undefined);
    const [accessToken, setAccessToken] = useState<any>(null);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'onSales', title: 'On Sales' },
        { key: 'collectibles', title: 'Collectibles' },
        { key: 'created', title: 'Created' },
    ]);

    const renderScene = SceneMap({
        onSales: OnSaleTab,
        collectibles: CollectionTab,
        created: CreatedTab
    });
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
    }, [])
  return (
    <View style={styles.container}>
        {
            user?
            <View style={{position: 'absolute',top: 0, zIndex: 1001,  display: "flex",
                padding: 20,
                width: Dimensions.get('window').width,
                justifyContent: "space-between",
                alignItems: "flex-start",
                backgroundColor:'rgba(0,0,0,0)',
                flexDirection: 'row'}}>
                <Pressable onPress={() => navigation.navigate('Modal')}  style={{backgroundColor: '#f5f5f5',  borderRadius: 100,}}>
                    <Feather name="settings" size={24} color="black" style={{margin: 5}}
                    /></Pressable>
                <Pressable onPress={() => settingsRef.current.show()}  style={{backgroundColor: '#f5f5f5',  borderRadius: 100}}>
                    <Feather name="more-horizontal" size={24} color="black" style={{margin: 5}}/></Pressable>
            </View>: <></>
        }

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

           </View>
           <View style={styles.headerContent}>
               <Image style={styles.avatar}
                      source={user.avatarUrl ? {uri: Constants.BASE_URL + '/public/'+user.avatarUrl} : require('../assets/images/commonavt.jpg')}/>
               <Text style={styles.name}>{user.privateKey.substring(0,6)}...{user.privateKey.substring(user.privateKey.length-4)}</Text>
               <Pressable
                   onPress={() => {
                       Clipboard.setString(user.privateKey);
                       setCopied(true);
                       setTimeout(() => setCopied(false), 5000)
                   }}
                   style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10, backgroundColor: '#ccc', padding: 5,
                       borderRadius: 15, paddingLeft: 10, paddingRight: 10}}>
                   {copied ? <Text style={{fontWeight: 'normal'}}>Copied</Text> :
                       <>
                       <Image style={{width: 20, height: 20, marginRight: 10}} source={require('../assets/images/etherlogo.png')}/>
                       <Text style={{fontWeight: 'normal'}}>{user.privateKey.substring(0, 6) + '...' + user.privateKey.substring(user.privateKey.length - 4)}</Text>
                       </> }

                   </Pressable>
               <Text  style={styles.name}>{user.name}</Text>
               <Text  style={styles.bio}>{user.bio}</Text>
           </View>
           <TabView
               navigationState={{ index, routes }}

               renderTabBar={props => (
                   <TabBar
                       {...props}
               indicatorStyle={{backgroundColor: '#000'}}

                       renderLabel={({ route, focused, color }) => (
                           <Text style={{ color: focused ? '#000': '#838383', margin: 8 }}>
                               {route.title}
                           </Text>
                       )}
                       style={{backgroundColor: 'white'}}
                   />
               )}
               renderScene={renderScene}
               onIndexChange={setIndex}
               initialLayout={initialLayout}
               style={{ height: 700 }}
           />
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
    bio:{
        fontSize:18,
        color:"#313131",
        fontWeight:'300',
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

    scene: {
        flex: 1,
    },
});
