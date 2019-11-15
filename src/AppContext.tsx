// Copyright 2018-2019 @paritytech/substrate-light-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import ApiRx from '@polkadot/api/rx';
import { ChainProperties, Health } from '@polkadot/types/interfaces';
import React from 'react';

import { InjectedAccountExt } from './types';

export interface System {
  chain: string;
  health: Health;
  name: string;
  properties: ChainProperties;
  version: string;
}

export interface AppContextType {
  api: ApiRx; // From @polkadot/api
  injectedAccounts: InjectedAccountExt[]; // accounts injected from @polkadot/extension
  isReady: boolean; // Are api and keyring loaded?
  isWeb3Injected: boolean; // waiting on @polkadotjs/extension accounts?
  system: System; // Information about the chain
}

export const AppContext: React.Context<AppContextType> = React.createContext({} as AppContextType);
