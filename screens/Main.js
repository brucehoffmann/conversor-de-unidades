import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br'


const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const ConversionInput = ({ currency, value, navigation, dataArray, editable, setCurrency, setValue }) => (
    <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.leftInput}
            onPress={() => navigation.navigate('CurrencySelection', { dataArray: dataArray, currencySelected: currency, setCurrency, setValue })}>
            <Text style={styles.inputTitle}>{currency}</Text>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="0,00" value={value} keyboardType={'numeric'} editable={editable} onChangeText={setValue} />
    </View>
);

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
            currency1: "USD",
            currency2: "BRL",
            currencyValue1: 1,
            currencyValue2: 3.7613018279,
            value1: '',
            value2: '',
            date: '',
        }
    }

    async componentWillMount() {
        const response = await fetch('https://api.exchangeratesapi.io/latest?base=USD');
        const data = await response.json();
        let dataArray = Object.entries(data.rates).map(([key, value]) => ({ currency: key, value: value }));

        this.setState({ dataArray: dataArray, date: moment(data.date).locale('pt-br').format('LL') });
    }

    reverseCurrency() {
        let currency1 = this.state.currency1;
        let currency2 = this.state.currency2;
        let currencyValue1 = this.state.currencyValue1;
        let currencyValue2 = this.state.currencyValue2;

        this.setState({
            currency1: currency2,
            currency2: currency1,
            currencyValue1: currencyValue2,
            currencyValue2: currencyValue1
        });

    }

    setCurrency(currency1, currencyValue1, currency2, currencyValue2) {
        this.setState({
            currency1: currency1,
            currency2: currency2,
            currencyValue1: currencyValue1,
            currencyValue2: currencyValue2
        });
    }

    setValue(value) {
        this.setState(prevState => {
            let valueToMultiple = Number(prevState.currencyValue2) / Number(prevState.currencyValue1);
            let valueToSet = value ? (Number(value) * valueToMultiple).toFixed(2) : '';

            return {
                ...prevState,
                value1: value,
                value2: valueToSet
            }
        });
    }

    render() {
        const { navigation } = this.props;


        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={require('../assets/logo.png')} />
                </View>

                <Text style={styles.title}>Conversor de Moedas</Text>

                <ConversionInput setValue={newValue => this.setValue(newValue)}
                    setCurrency={(newCurrency, newCurrencyValue) => {
                        this.setCurrency(newCurrency, newCurrencyValue, this.state.currency2, this.state.currencyValue2);
                        this.setValue(this.state.value1);
                    }}
                    editable={true}
                    currency={this.state.currency1} value={this.state.value1}
                    navigation={navigation} dataArray={this.state.dataArray} />

                <ConversionInput setCurrency={(newCurrency, newCurrencyValue) => {
                    this.setCurrency(this.state.currency1, this.state.currencyValue1, newCurrency, newCurrencyValue);
                    this.setValue(this.state.value1);
                }}
                    editable={false}
                    currency={this.state.currency2} value={this.state.value2}
                    navigation={navigation} dataArray={this.state.dataArray} />

                <Text style={styles.conversionText}>1 {this.state.currency1} = {(this.state.currencyValue2 / this.state.currencyValue1).toFixed(2)} {this.state.currency2} em {this.state.date}</Text>

                <TouchableOpacity style={styles.bottomButton} onPress={() => {
                    this.reverseCurrency();
                    this.setValue(this.state.value1);
                }}>
                    <Image style={styles.bottomButtonIcon} source={require('../assets/change.png')} />
                    <Text style={styles.bottomButtonText}>Alternar Moedas</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(73, 97, 110)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 12,
        marginBottom: 16,
    },
    conversionText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 12,
    },
    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomButtonIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: 'white',
        marginRight: 10,
    },
    bottomButtonText: {
        fontSize: 20,
        color: 'white',
    },
    inputContainer: {
        width: windowWidth - 24 * 2,
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 24,
    },
    leftInput: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    inputTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(33, 57, 70)',
    },
    input: {
        fontSize: 22,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});
