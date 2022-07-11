import React, {useEffect, useState} from 'react';
import {Button, ImageBackground, Pressable, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from "../constants/Layout";
import axiosClient from "../constants/AxiosClient";
import { Entypo } from '@expo/vector-icons';
export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

    const [expanded, setExpanded] = useState(true);
    const [collections, setCollections] = useState<any>(undefined)
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        onRefresh();
    }, []);


    function onRefresh() {

    }

    return (
      <ScrollView >

      <View style={styles.container}>
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
          />
          <View style={styles.header}><Text style={styles.title}>My NFT Portfolio</Text>
              <Pressable><Text style={styles.link}>Manage wallet</Text></Pressable>

          </View>
          <ImageBackground source={require('../assets/images/nft_profile_img.png')} imageStyle={{ borderRadius: 10}} style={styles.nftProfile}>
             <View style={{...styles.refreshTitle, ...styles.nftProfileItem}}>
                 <Text style={styles.nftProfileItem}>Total value</Text>
                 <Pressable onPress={() => onRefresh()} style={{backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderRadius: 100, marginRight: 20}}>
                     <Feather  name="refresh-ccw" size={14} color="white" /></Pressable>
             </View>
              <View style={{...styles.etherTitle,...styles.nftProfileItem}}>
                  <Text style={{...styles.nftProfileItem, fontSize: 24}}>0 </Text>
                  <Text style={{...styles.nftProfileItem, fontSize: 18}}>ETH</Text>
              </View>
              <View style={{...styles.etherTitle,...styles.nftProfileItem}}>
                  <Text style={{...styles.nftProfileItem, fontSize: 24}}>$0 </Text>
              </View>
          </ImageBackground>
          <Collapse style={styles.collections} isExpanded={expanded} >
              <CollapseHeader>
                  <Pressable onPress={()=>setExpanded(!expanded)} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                      <Text style={styles.title}>Collections</Text>
                      {
                          !expanded?
                              <Entypo name="chevron-small-down" size={24} color="black" />
                              :
                              <Entypo name="chevron-small-up" size={24} color="black" />

                      }
                  </Pressable>
              </CollapseHeader>
              <CollapseBody>
                  <Text style={{textAlign: "center", ...styles.title, fontSize: 24}}>Login wallet to track your NFT portfolio</Text>
                  <Text style={{textAlign: "center", fontSize: 17, marginTop: 10, padding: 10, }}>Coming soon! Or try to explore something for you on our{"\n"} marketplace</Text>
                  <View style={{flex: 1, justifyContent: "center", alignItems: "center", margin: 20}}>
                      <Pressable style={{paddingBottom: 10,paddingTop: 8, borderRadius: 16, backgroundColor: '#1e54fd',  width: 100 }}>
                          <Text style={{textAlign: "center", color: '#fff', fontSize: 16, fontWeight: "bold"}}>Connect</Text></Pressable>
                  </View>
              </CollapseBody>
          </Collapse>
      </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
      width: Layout.window.width
  },
    etherTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end"
    },
    refreshTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    nftProfileItem: {
      backgroundColor: 'rgba(0,0,0,0)',
        color: '#fff',
        fontSize: 16,
    },
    link: {
      color: '#003fd2'
    },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
    header: {
      marginTop: 20,
        padding: 10,
        paddingBottom: 0,
      flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '90%',
  },
    nftProfile: {
      width: Layout.window.width-40,
        borderRadius: 100,
        margin: 20,
        padding: 20,
  },
    collections: {
        margin: 20,
    }

});
