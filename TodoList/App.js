
    import {StyleSheet, Text, View, FlatList, TextInput, Button, StatusBar} from 'react-native';

    const sampleGoals = [
      "Faire les courses",
      "Aller à la salle de sport 3 fois par semaine",
      "Monter à plus de 5000m d altitude",
      "Acheter mon premier appartement",
      "Perdre 5 kgs",
      "Gagner en productivité",
      "Apprendre un nouveau langage",
      "Faire une mission en freelance",
      "Organiser un meetup autour de la tech",
      "Faire un triathlon",
    ];
    const renderItem = ({ index, item }) => (
        <View style={{ flexDirection:'row' }}>
            <Text>{item} </Text>

        </View>)

    export default function App() {

        return (

        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.text}>What's 42?</Text>
            <FlatList style={styles.list}
                data={sampleGoals}
                renderItem={renderItem} />
     <TextInput
            style={styles.input}
            placeholder={"Don't write here"}
          />
          <Button
              title="Don't Press me"
          />

    </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: '#F00',
        fontWeight: 'bold',
      },
      input: {
        height: 40,
        minWidth:80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
        objective: {
            color: '#F00',
        },
        list: {

        }
    });
