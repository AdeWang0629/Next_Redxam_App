import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const ItemCard = ({ title, price, ...props }) => {
  return (
    <Card mode="outlined">
      <Card.Title title={title} subtitle={price} />
      <Card.Cover
        source={{
          uri: 'https://static.wixstatic.com/media/aa18fb_c03f8864073b47c6b6ef4866bb98c251~mv2.jpg/v1/fill/w_428,h_428,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/aa18fb_c03f8864073b47c6b6ef4866bb98c251~mv2.jpg'
        }}
      />
    </Card>
  );
};

const itemList = [
  { title: '1 Tree', price: '$10.00', return: '$30 return' },
  { title: '12.5 Trees', price: '$125.00', return: '$375 return' },
  { title: '1 Acre', price: '$2,430.00', return: '$7,290 return' },
  { title: '1 Hectare', price: '$6,000.00', return: '$18,000 return' },
  { title: '10 Hectares', price: '$60,000.00', return: '$180,000 return' },
  { title: '1 km²', price: '$600,000.00', return: '$1.8M return' }
];

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text>America Foundation!</Text>
      {itemList.map(item => (
        <ItemCard title={item.title} price={item.price} />
      ))}
      <Card>
        <Card.Title title={''} subtitle={''} />
      </Card>
      <Card>
        <Card.Title title={''} subtitle={''} />
      </Card>
      <Card>
        <Card.Title title={''} subtitle={''} />
      </Card>
      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 80,
    paddingBottom: 950,
    marginBottom: 500,
    backgroundColor: '#fff'
    // alignItems: 'center'
    // justifyContent: 'center'
  }
});
