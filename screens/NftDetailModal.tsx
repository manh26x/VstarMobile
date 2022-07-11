import {Text, View} from '../components/Themed';
import {useEffect, useState} from "react";
import axiosClient from "../constants/AxiosClient";
import { map, mergeMap} from "rxjs";
import {Image, ScrollView, StyleSheet} from "react-native";
import Layout from "../constants/Layout";
import Constants from "../constants/Constants";
import { AntDesign } from '@expo/vector-icons';
export default function NftDetailModal({...props}) {
    const [nft, setNft] = useState<any>(undefined);
    const [user, setUser] = useState<any>(undefined);
    useEffect(() => {
        axiosClient.get('/nft/detail/'+props.route.params.nft).pipe(
            map(res => res.data),
            mergeMap((nft:any) => {
                setNft(nft);
                console.log(nft);
               return axiosClient.get('/user/' + nft.owner);
            }),

        ).subscribe((res: any) => {
            setUser(res);
            }, () => console.log('err'))
    }, []);
    return(
        <View style={{backgroundColor: '#fff'}}>
        {!nft ||
                <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
                <Image style={{height: 200, width: Layout.window.width-20, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}
                       source={{uri: Constants.API_PUBLIC_URL +  nft.cid}} />
                    <View>
                        <View style={{display: "flex", flexDirection: "row", marginTop: 10 }}>
                            <Image style={{height: 40, width: 40, borderRadius: 100, marginRight: 10}} source={user? {uri: Constants.API_PUBLIC_URL + user?.avatarUrl} :
                            require('../assets/images/commonavt.jpg')} />
                            <View style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18}}>{user?.name || 'Anonymous'}</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 14, color: '#888888'}}>Owner</Text>
                        </View>

                    </View>
                </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 24}}>{props.route.params.collectionName}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 24}}>{nft.name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#888888'}}>{nft.description}</Text>
                    <View style={{display: "flex", flexDirection: "row", marginTop: 20, marginBottom: 20}}>
                        <View style={{display: "flex", width: Layout.window.width*0.6, ...styles.chooseBox, marginRight: 10}}>
                            <View style={styles.flexCenter}><Text style={{ fontWeight: 'bold', fontSize: 16}}>Sales Activity </Text>
                                <AntDesign name="right" style={{fontWeight: 'bold'}} size={14} color="black" />
                            </View>
                            <Text style={{color: '#afafaf'}}>Price</Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: '#505050',
                                textAlign: 'left'
                            }}>{nft.price} ETH</Text>

                            <Text style={{color: '#afafaf'}}>Last sales</Text>
                        </View>
                        <View >

                            <View style={{...styles.chooseBox, width: Layout.window.width*0.4 -30, marginBottom: 10}}>
                                <Text style={{fontWeight: 'bold', fontSize: 16}} >Royalty</Text>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: '#505050',
                                    textAlign: 'left'
                                }} >{nft.royalty}/100</Text>
                            </View>
                            <View style={{...styles.flexCenter, ...styles.chooseBox, width: Layout.window.width*0.4 -30}}>
                                <Text style={{fontWeight: 'bold', fontSize: 16}}>Traits </Text><AntDesign name="right" style={{fontWeight: 'bold'}} size={14} color="black" /></View>
                        </View>

                    </View>

            </ScrollView>
           }

        </View>

    );
}

const styles = StyleSheet.create({
    flexCenter: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: 'rgba(0,0,0,0)'
    },
    chooseBox: {
        backgroundColor: '#e8e8e8',
        borderRadius: 10,
        padding: 10
    },

})
