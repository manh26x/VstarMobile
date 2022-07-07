import {Text, View} from "../components/Themed";
import {FlatList, Image, Platform, Pressable, ScrollView, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import axiosClient from "../constants/AxiosClient";
import Loader from "../components/Loader";
import Constants from "../constants/Constants";
import Layout from "../constants/Layout";
const sizeThum = (Layout.window.width-40)/2 - 20;

export default function CollectionDetailModal({route, navigation})  {
    const [collectionId, setCollectionId] = useState(route.params?.collectionId);
    const [collection, setCollection] = useState<any>(undefined);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setCollectionId(route.params?.collectionId);
        setLoading(true);
        axiosClient.get('/nft/collection/'+collectionId).pipe().subscribe((res: any) => {
                setCollection(res);
            }, () => setCollection(undefined),
            () => setLoading(false))
    }, [])

    return (
        <View style={styles.container}>{collection?
            <>
                <Loader loading={loading} />
                <ScrollView >
                    <View style={{backgroundColor: '#ccc', height: 125}}>
                    </View>
                    <Image style={{width: 75, height: 75, top: -25, left: 20, borderRadius: 25}} source={{uri: Constants.API_PUBLIC_URL + collection.cid}} />
                    <View style={{paddingLeft: 20}}>
                        <View>
                        <Text style={styles.title}>{collection?.collectionName}</Text>
                        <Text style={styles.description} >{collection.description}</Text>
                        </View>
                        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                        <View >
                            <Text style={styles.title}>Items</Text>
                            {collection.nfts.length > 0 ?
                            <FlatList data={collection.nfts}  style={{paddingRight: 10, paddingBottom: 30, marginTop: 20}} numColumns={2} keyExtractor={nft => nft._id} renderItem={({item}) =>
                                <Pressable onPress={() => navigation.navigate('NftDetail', {nft: item._id, collectionName: collection?.collectionName})} style={styles.nftThum} horizontal={true}>
                              <Image style={styles.thum}  source={{uri: Constants.API_PUBLIC_URL+ item.cid}}/>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ flex: 1, width: sizeThum, fontWeight: "bold", fontSize: 16}}>{item.name}</Text>
                                    <Text style={styles.price}> {item.price} ETH</Text>
                                </Pressable>
                            } />
                                : <Text>Oops! It's look like empty!</Text>}
                        </View>
                    </View>

                </ScrollView>



            </>
            :<Text>Oops! Some thing when wrong!</Text>
        }
    </View>
);
}

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    description: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#696969'
    },
    nftThum: {
        marginRight: 10,
        padding: 10,
        backgroundColor: '#efefef',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
    },
    thum: {
        borderRadius: 15,
        height: sizeThum-20,
        width: sizeThum
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#b0b0b0',
        textAlign: 'left',
        width: sizeThum
    }
});
