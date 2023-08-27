import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, ProgressBar, Text } from '@ui-kitten/components';
import theme from './theme.json'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import NumericInput from 'react-native-numeric-input'
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';



const HomeScreen = () => {
  const [durationInSeconds, setDurationInSeconds] = useState<number>(0)
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const isMeditationRunning = timeLeftInSeconds !== null

  async function playSound() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      playThroughEarpieceAndroid: false
    });
    const { sound } = await Audio.Sound.createAsync(require('./assets/gong.mp3'));
    await sound.playAsync();
  }

  async function startMeditation(duration: number) {
    playSound()
    setTimeLeftInSeconds(duration)
  }

  async function finishMeditation() {
    setProgress(1)
    playSound()

    // let the gong play for 5 seconds before letting the user start a new meditation
    setInterval(() => {
      setTimeLeftInSeconds(null)
    }, 5000);


  }

  useEffect(() => {
    if (timeLeftInSeconds === 0) {
      finishMeditation()
    }
    // exit early when we reach 0
    if (!timeLeftInSeconds) return;
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeftInSeconds(timeLeftInSeconds - 1);
      console.log((1 - (timeLeftInSeconds / durationInSeconds)))
      setProgress((1 - (timeLeftInSeconds / durationInSeconds)))
    }, 1000);
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeftInSeconds]);


  return (
    <Layout style={styles.container}>
      <Text category='h1' style={styles.heading}>Meditation</Text>

      {isMeditationRunning ?
        <ProgressBar progress={progress} style={styles.progressBar} />
        : <>
          <View style={styles.durationContainer}>
            <NumericInput minValue={0} rounded rightButtonBackgroundColor={theme['color-primary-500']} borderColor={theme['color-primary-500']} textColor="white" leftButtonBackgroundColor={theme['color-primary-500']} value={durationInSeconds / 60} step={5} onChange={value => setDurationInSeconds(value * 60)} />
            <Button disabled={durationInSeconds === 0} style={styles.button} onPress={() => startMeditation(durationInSeconds)}>Start</Button>
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
  button: { margin: 10, padding: 0 },
});