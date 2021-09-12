import React,{Component} from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image, Modal} from 'react-native';
import Constants from 'expo-constants';


const ShowDetalhes = ({display,toogleModal,mensagem}) => (   
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>{mensagem}</Text>
                </Pressable>
          </View>
        </View>
    
    </Modal>
 )

 const Pessoa = ({albumId,id,title,url,thumbnailUrl}) => {

    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={url}/>
      
      <Pressable onPress={mudaModal}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: thumbnailUrl,
          }}
        />

        <Text style={styles.paragraph}>{title}</Text>
      </Pressable>
    </View>
    )
}


export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dados: responseJson
      })
    })
  }
  
  meuItem = ({item, index}) => {
    return(
              <Pessoa 
      albumId={item.albumId}
      id={item.id}
      title = {item.title}
      url = {item.url}
      thumbnailUrl = {item.thumbnailUrl}
      />
    )
  }

  render(){
    let{welcome, container} = styles
    let{dados, isLoading} = this.state
  return (
    <View style={styles.container}>
      <FlatList
      data = {dados}
      renderItem = {this.meuItem}
      keyExtractor = {(item, index) => index.toString()}
      />
    </View>
  );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'pink'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
