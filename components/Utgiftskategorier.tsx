import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    }, 
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,1.0)',
    },
    item: {
        padding: 10, 
        fontSize: 18,
        height: 44,
    },
});

export const UtgiftskategorierSectionList = () => {
    return (
        <View style={styles.container}>
            <SectionList
            sections={[
                {title: 'Seksjon 1', data: ['Mat og drikke', 'Klær og sko', 'Personlig pleie', 'Lek og mediebruk']},
                {title: 'Seksjon 2', data: ['Reisekostnader (til arbeid o.l)', 'Spedbarnsutstyr', 'Andre dagligvarer', 'Husholdningsartikler']},
                {title: 'Seksjon 3', data: ['Møbler', 'Mediebruk og fritid', 'Bilkostnader (drift og vedlikehold)', 'Barnehage', 'Skolefritidsordning (SFO)']},         
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={item => `utgiftListEntry-${item}`}
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
*/