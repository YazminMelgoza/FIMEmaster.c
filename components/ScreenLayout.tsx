import { StyleSheet, View } from 'react-native'
import { ReactNode } from 'react'; // Importa ReactNode para tipar 'children'

export function Screen({ children }: { children: ReactNode }) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: 
    {
        backgroundColor: "#ffffff",
        //backgroundColor: "#000000",
    }
})