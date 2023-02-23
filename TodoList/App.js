
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
            <Text style={styles.objective}>{item} </Text>

        </View>)

    export default function App() {

        const handleButtonPress = () => {
            console.log("Button pressed");
        };
        return (

        <View style={styles.container}>
          <StatusBar style="auto"/>
          <Text style={styles.text}>What's 42?</Text>
            <View style={styles.list}>

            <FlatList contentContainerStyle={styles.containerList}
                data={sampleGoals}
                renderItem={renderItem} />
            </View>
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
            alignSelf: 'center',
        },
        containerList: {
          flex: 1,
          justifyContent:'center',
          
        }
    });
