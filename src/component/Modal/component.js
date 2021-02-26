import * as React from 'react';
import { Modal, Portal, Text, Button, Provider, ActivityIndicator } from 'react-native-paper';

const PopUp = ({ visible, onDismiss, containerStyle, dismissable, content }) => {
    return (
        <Provider>
            <Portal>
                <Modal dismissable={dismissable} visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
                    {content ? content : <ActivityIndicator />}
                </Modal>
            </Portal>
        </Provider>
    );
};

export default PopUp;