import { Text, View } from './Themed';
import {Image} from "react-native";
import Constants from "../constants/Constants";
import {useEffect, useState} from "react";

export default function CollectionTab({...props}){
    const [collections, setCollections] = useState(props.collections);
    const [collectionsView, setCollectionsView] = useState(undefined)
    useEffect(() => {
       setCollections(props.collections);

        setCollectionsView(collections.map((collection: any) =>
            <View><Image style={{width: 100, height: 100}} source={{uri: ''+Constants.API_PUBLIC_URL + collection.cid}} />
                <Text>{collection.collectionName}</Text>
                <Text>{collection.description}</Text></View>))
    }, [])
    return (
        <>
            {collectionsView }
        </>
    );
}
