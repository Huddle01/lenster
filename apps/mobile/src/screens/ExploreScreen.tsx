import type { FC } from 'react';
import React from 'react';
import { ScrollView } from 'react-native';

import Timeline from '../components/Shared/Timeline';

export const ExploreScreen: FC = () => {
  return (
    <ScrollView>
      <Timeline />
    </ScrollView>
  );
};