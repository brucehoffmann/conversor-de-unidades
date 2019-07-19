import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Text,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        margin: 25
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 12,
        marginBottom: 16,
    },
    icon: {
        width: 50,
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    currencyText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    currencyButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        width: 70,
        height: 50,
        margin: 10,
        borderRadius: 5,
    },
    currencyButtonSelectedColor: {
        backgroundColor: '#EAE4E3',
    },
    currencyButtonColor: {
        backgroundColor: 'white',
    }
});

const CurrencyButton = ({ currency, value, currencySelected, navigation, setCurrency }) => (
    <View style={styles.currencyButtonContainer}>
        <TouchableOpacity style={[styles.currencyButton, currency == currencySelected ? styles.currencyButtonSelectedColor : styles.currencyButtonColor]}
            onPress={() => { setCurrency(currency, value); navigation.goBack() }}>
            <Text style={styles.currencyText}>{currency}</Text>
        </TouchableOpacity>
    </View>
);

export default class CurrencySelection extends React.Component {

    render() {
        const { navigation } = this.props;
        const dataArray = navigation.getParam('dataArray');
        const currencySelected = navigation.getParam('currencySelected');
        const setCurrency = navigation.getParam('setCurrency')

        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.icon} source={require('../assets/close.png')} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Selecione uma moeda</Text>
                <View style={styles.buttonContainer}>
                    {
                        dataArray.map(el => <CurrencyButton key={el.currency} setCurrency={setCurrency} navigation={navigation} currencySelected={currencySelected} currency={el.currency} value={el.value}></CurrencyButton>)
                    }
                </View>
            </ScrollView>
        )
    }

};
