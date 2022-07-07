/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';
import NftDetailModal from "../screens/NftDetailModal";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          Collections: {
            screens: {
              CollectionsScreen: 'collections',
            },
          },
        },
      },
      Modal: 'modal',
      CollectionDetail: 'collectionDetail',
      NftDetailModal: 'nftDetail',
      NotFound: '*',
    },
  },
};

export default linking;
