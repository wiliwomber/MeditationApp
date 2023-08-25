import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text } from '@ui-kitten/components';
import theme from './theme.json'
import { Audio } from 'expo-av';

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Meditation</Text>
    <Button onPress={playSound}>Play gong</Button>
  </Layout>
);

async function playSound() {
  console.log('Loading Sound');
  const { sound } = await Audio.Sound.createAsync(require('./assets/gong.mp3')
  );
  await sound.playAsync();
}


export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
    <HomeScreen />
  </ApplicationProvider>
);

