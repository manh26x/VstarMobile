import { Text, View } from './Themed';
import {Image, Pressable, ScrollView, StyleSheet} from "react-native";
import Constants from "../constants/Constants";
import {useEffect, useState} from "react";

const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ImageChangeShow = ({...props}) =>{
    const nftImages = props.nftImages;
    const imageSize = nftImages.length;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        wait(2000/imageSize).then(() => setIndex((index + 1) % imageSize));
    }, [index])
    return (<Image style={styles.imageShow} source={{uri: ''+Constants.API_PUBLIC_URL + nftImages[index]}} />)
}

export default function CollectionTab({...props}){
    const [nftImages, setNftImages] = useState([]);
    const [collectionsView, setCollectionsView] = useState(undefined)
    useEffect(() => {
        setNftImages(props.collections);
        let index = 1;
        setCollectionsView(props.collections.map((collection: any) =>
                <Pressable onPress={() => {
                    console.log('collection id', collection._id);
                    props.navigation.navigate('CollectionDetail', {
                        collectionId: collection._id,
                    });
                }} key={collection._id} style={styles.collectionContainer}><View style={styles.index}><Text style={{fontSize: 11}}>{index++}</Text></View><ImageChangeShow nftImages={collection.nftImages} />
                <View style={styles.textBox}>
                    <Text style={styles.collectionName}>{collection.collectionName}</Text>
                    <Text style={styles.collectionDescription}>{collection.description}</Text></View>
                </Pressable>
            ))
    }, [])
    return (
        <>
            <ScrollView>{collectionsView }</ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    collectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: "center"
    },
    index: {
        width: 25,
        height: 25,
        borderRadius: 100,
        backgroundColor: '#ccc',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 15,

        padding: 5
    },
    imageShow: {
        height: 50,
        width: 50,
        borderRadius: 100
    },
    textBox: {
        padding: 10,
    },
    collectionName: {
        fontWeight: 'bold',
        fontSize: 18
    },
    collectionDescription: {
        fontWeight: '400',
        fontSize: 14,
        color : '#464646'
    }
})
