import * as React from 'react'
import { Appbar, Menu } from 'react-native-paper'
import styles from './styles'

const CustomAppBar = ({ title, navigation, previous, showMenu, route }) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);


    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction size={20} onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title ? title : route?.name} />
            {showMenu ? (
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="menu" color="white" onPress={openMenu} />
                    }>
                    <Menu.Item onPress={() => { console.log('Option 1 was pressed') }} title="Option 1" />
                    <Menu.Item onPress={() => { console.log('Option 2 was pressed') }} title="Option 2" />
                    <Menu.Item onPress={() => { console.log('Option 3 was pressed') }} title="Option 3" disabled />
                </Menu>
            ) : null}
        </Appbar.Header>
    )
}

export default CustomAppBar