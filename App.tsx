import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, ProgressBar, Text } from '@ui-kitten/components';
import theme from './theme.json'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import NumericInput from 'react-native-numeric-input'
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useTimer } from './hooks/useTimer';
import { playGong } from './utils';



const HomeScreen = () => {
  const [durationInMinutes, setDurationInMinutes] = useState<number>(0)
  const { isTimerRunning, timeLeftInSeconds, progress, startTimer } = useTimer()

  const startMeditation = () => {
    playGong()
    startTimer(durationInMinutes)
  }

  return (
    <Layout style={styles.container}>
      <Text category='h1' style={styles.heading}>Meditation</Text>

      {isTimerRunning ?
        <ProgressBar progress={progress} style={styles.progressBar} />
        : <>
          <View style={styles.durationContainer}>
            <NumericInput minValue={0} rounded rightButtonBackgroundColor={theme['color-primary-500']} borderColor={theme['color-primary-500']} textColor="white" leftButtonBackgroundColor={theme['color-primary-500']} value={durationInMinutes} step={5} onChange={value => setDurationInMinutes(value)} />
            <Button disabled={isTimerRunning || durationInMinutes === 0} style={styles.button} onPress={startMeditation}>Start</Button>
          </View>
        </>
      }
    </Layout >
  );

}



export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
    <HomeScreen />
  </ApplicationProvider>
);


const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  heading: { marginTop: "30%", marginBottom: 80, color: theme['color-primary-500'] },
  progressBar: {
    borderRadius: 10,
    width: "80%",
    height: 20,
  },
  durationContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 },
  durationLabel: { margin: 10 },
  button: { borderRadius: 10, height: 53, margin: 10 },
});