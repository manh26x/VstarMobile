import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React, {useEffect, useState} from "react";
import axiosClient from "../constants/AxiosClient";
import CollectionTab from "../components/CollectionTab";
import {RootTabScreenProps} from "../types";
import {map} from "rxjs";
import Layout from "../constants/Layout";

export default function CollectionsScreen({ navigation, ...props }: RootTabScreenProps<'Collections'>) {
  const [collections, setCollections] = useState<any>([])
  useEffect(() => {
    axiosClient.get('/nft/collection')
        .pipe(map((collections:any) => {
          if(collections ) {
            collections.forEach((collection:any) => {
              if(collection?.nfts) {
                collection.nftImages = [];
                collection.nftImages.push(collection.cid);
                collection.nfts.forEach((nft:any) => collection.nftImages.push(nft.cid));
              }
            })
          }
          return collections;
        })).subscribe(res => {
      setCollections(res);
    });
  }, [])

  return (
    <View style={styles.container}>
      <CollectionTab collections={collections} navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Layout.window.width
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
});
