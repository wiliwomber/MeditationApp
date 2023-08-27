import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

export async function playGong() {
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