// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/cwh/code/dayingjiaadmin/node_modules/.pnpm/registry.npmmirror.com+@umijs+runtime@3.5.20_react@16.14.0/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "exact": true,
    "path": "/",
    "component": require('@/index').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
