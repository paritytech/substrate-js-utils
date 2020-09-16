// Copyright 2018-2020 @paritytech/Nomidot authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ApiPromise } from '@polkadot/api';
import { TypeRegistry } from '@polkadot/types';
import { logger } from '@polkadot/util';
import React, { useEffect, useState } from 'react';

import { ApiPromiseContextProviderProps } from './types';
import { useDidUpdateEffect } from './util';

export interface ApiPromiseContextType {
  api: ApiPromise; // From @polkadot/api\
  isApiReady: boolean;
}

const l = logger('api-context');

const registry = new TypeRegistry();

export const ApiPromiseContext: React.Context<ApiPromiseContextType> = React.createContext(
  {} as ApiPromiseContextType
);

export function ApiPromiseContextProvider(
  props: ApiPromiseContextProviderProps
): React.ReactElement {
  const { children = null, provider, types } = props;
  const [apiPromise, setApiPromise] = useState<ApiPromise>(
    new ApiPromise({ provider, types })
  );
  const [isReady, setIsReady] = useState(false);

  useDidUpdateEffect(() => {
    // We want to fetch all the information again each time we reconnect. We
    // might be connecting to a different node, or the node might have changed
    // settings.
    setApiPromise(new ApiPromise({ provider, types }));

    setIsReady(false);
  }, [provider]);

  useEffect(() => {
    // We want to fetch all the information again each time we reconnect. We
    // might be connecting to a different node, or the node might have changed
    // settings.
    apiPromise.isReady
      .then(_ => {
        if (types) {
          registry.register(types);
        }

        l.log(`Api ready.`);
        setIsReady(true);
      })
      .catch(e => console.error(e));
  }, [apiPromise.isReady, types]);

  return (
    <ApiPromiseContext.Provider
      value={{ api: apiPromise, isApiReady: isReady }}
    >
      {children}
    </ApiPromiseContext.Provider>
  );
}
