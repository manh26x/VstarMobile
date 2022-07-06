import { Text, View } from './Themed';
import {Image} from "react-native";
import NftItem from "./NftItem";

export default function CollectionTab(collection: any){
    // const listNft = collection.nfts.reduce((nft: any) => NftItem(nft));
    return (
          <View style={{ backgroundColor: 'green'}}><Text>This is Collection Tab</Text></View>
    );
}
