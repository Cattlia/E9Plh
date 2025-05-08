import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import { ButtonBasics } from '@/components/ButtonBasics'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    }, 
    item: {
        padding: 10, 
        fontSize: 18,
        height: 44,
    },
});

export const UtgiftskategorierFlatList2 = () => {
    return (
        <View style={styles.container}>
            
            <FlatList
            data={[
                {key: 'Mat og drikke'},
                {key: 'Klær og sko'},
                {key: 'Personlig pleie'},
                {key: 'Lek og mediebruk'},
                {key: 'Reisekostnader (til arbeid o.l)'},
                {key: 'Spedbarnsutstyr'},
                {key: 'Andre dagligvarer'},
               
            ]}
            
            
            renderItem={({item}) => <Text style={styles.item}>{item.key}
            
</Text>}
      />
      
    </View>
    );
};











/*
Mat og drikke
Klær og sko
Personlig pleie
Lek og mediebruk
Reisekostnader (til arbeid o.l)
Spedbarnsutstyr
Andre dagligvarer
Husholdningsartikler
Møbler
Mediebruk og fritid
Bilkostnader (drift og vedlikehold)
Barnehage
Skolefritidsordning (SFO)
*/

/* Ikke inkluderte utgifter:
bolig
feriereiser
tobakk
alkohol
gaver
helsetjenester

 {key: 'Husholdningsartikler'},
                {key: 'Møbler'},
                {key: 'Mediebruk og fritid'},
                {key: 'Bilkostnader (drift og vedlikehold)'},
                {key: 'Barnehage'},
                {key: 'Skolefritidsordning (SFO)'},
*/