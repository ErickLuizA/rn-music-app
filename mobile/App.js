import React from 'react';
import { StatusBar } from 'expo-status-bar';

import AppTabs from './src/routes/AppTabs'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppTabs />
    </>
  );
}