import {View} from "./Themed";
import {Image} from 'react-native';
import Constants from "../constants/Constants";

export default function NftItem(nft:any) {
    return (
        <View><Image source={{uri: Constants.API_PUBLIC_URL + nft.url}}/></View>
    );
}
