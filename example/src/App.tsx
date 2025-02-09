import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import TimeInput from '@tighten/react-native-time-input';

export default function App() {
  const [time, setTime] = React.useState<string>('');
  const [valid, setValid] = React.useState<boolean>(true);

  const handleOnTimeChange = (newTime: string, isValid: boolean): void => {
    setTime(newTime);
    setValid(isValid);
  };

  return (
    <View style={styles.container}>
      <TimeInput
        onTimeChange={handleOnTimeChange}
        initialValue={new Date('1/1/2020 11:35 AM')}
      />

      {Boolean(time.length) && valid && <Text>Set time: {time}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
